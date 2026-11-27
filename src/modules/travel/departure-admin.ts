import "server-only";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { text } from "@/lib/validation";
import { vietnamToday } from "./search";
import { tourBookedGuests } from "./tour-availability";
import type {
  AdminTourDeparture,
  AdminTourOption,
} from "./tour-departure-types";

const productId = z.string().trim().min(1).max(100);
const pageSize = 15;
const departureFilters = z.object({
  tour: productId.optional(),
  range: z.enum(["upcoming", "past", "all"]).default("all"),
  status: z.enum(["open", "closed", "full", "all"]).default("all"),
  page: z.coerce.number().int().min(1).max(1000).default(1),
});
const revision = z.number().int().positive().max(2147483647).optional();
const departureInput = z.object({
  product_id: productId,
  date: z.iso.date(),
  end_date: z.iso.date().optional(),
  active: z.boolean(),
  notes: text,
  capacity: z.number().int().min(1).max(10000).nullable().optional(),
  price_override: z.number().int().min(0).max(2000000000).nullable().optional(),
  revision,
});

export async function listAdminTourOptions() {
  const { rows } = await db.query<AdminTourOption>(
    "SELECT id, title, active FROM products WHERE type='tour' ORDER BY active DESC,title,id",
  );
  return rows;
}

export async function listAdminDepartures(params: URLSearchParams) {
  const filters = departureFilters.parse({
    tour: params.get("tour") || undefined,
    range: params.get("range") ?? undefined,
    status: params.get("status") ?? undefined,
    page: params.get("page") ?? undefined,
  });
  const values: (string | number)[] = [];
  const bind = (value: string | number) => "$" + values.push(value);
  const where = ["p.type='tour'"];
  const today = vietnamToday();
  if (filters.tour) where.push(`d.product_id=${bind(filters.tour)}`);
  if (filters.range !== "all")
    where.push(
      `d.date ${filters.range === "past" ? "<" : ">="} ${bind(today)}::date`,
    );
  if (filters.status === "closed") where.push("NOT d.active");
  if (filters.status === "open" || filters.status === "full") {
    where.push("d.active AND p.active");
    if (filters.range !== "upcoming")
      where.push(`d.date >= ${bind(today)}::date`);
  }
  if (filters.status === "full")
    where.push(`d.capacity <= ${tourBookedGuests}`);
  if (filters.status === "open")
    where.push(`(d.capacity IS NULL OR d.capacity > ${tourBookedGuests})`);
  const { rows } = await db.query<AdminTourDeparture>(
    `SELECT d.id,d.product_id,d.date::text,d.notes,d.active,d.capacity,d.price_override,d.revision,
            p.title,p.price AS base_price,p.active AS product_active,${tourBookedGuests} AS booked_guests
     FROM departures d JOIN products p ON p.id=d.product_id
     WHERE ${where.join(" AND ")}
     ORDER BY d.date ${filters.range === "past" ? "DESC" : "ASC"}, d.id
     LIMIT ${pageSize + 1} OFFSET ${bind((filters.page - 1) * pageSize)}`,
    values,
  );
  return { data: rows.slice(0, pageSize), hasNext: rows.length > pageSize };
}

export async function saveAdminDeparture(body: unknown, id?: string) {
  const input = departureInput.parse(body);
  const endDate = input.end_date ?? input.date;
  const interval = (Date.parse(endDate) - Date.parse(input.date)) / 86400000;
  if (interval < 0 || interval > 59 || (id && interval))
    throw new AppError(
      "Mỗi lần tạo tối đa 60 ngày. Khi sửa, chỉ chọn một ngày.",
    );

  const client = await db.connect();
  try {
    await client.query("BEGIN");
    // Booking and status changes hold a shared lock on the same product.
    const tour = await client.query(
      "SELECT id FROM products WHERE id=$1 AND type='tour' FOR UPDATE",
      [input.product_id],
    );
    if (!tour.rowCount) throw new AppError("Vui lòng chọn một tour hợp lệ");
    const existing = id
      ? (
          await client.query<
            Pick<
              AdminTourDeparture,
              | "id"
              | "product_id"
              | "date"
              | "revision"
              | "capacity"
              | "price_override"
            >
          >(
            `SELECT id,product_id,date::text,revision,capacity,price_override
             FROM departures WHERE id=$1 FOR UPDATE`,
            [id],
          )
        ).rows[0]
      : undefined;
    if (id && !existing)
      throw new AppError("Không tìm thấy lịch khởi hành", 404);
    if (existing && existing.product_id !== input.product_id)
      throw new AppError("Không thể chuyển lịch khởi hành sang tour khác");
    if (
      existing &&
      input.revision != null &&
      existing.revision !== input.revision
    )
      throw new AppError(
        "Lịch đã được cập nhật. Hãy tải lại trước khi sửa.",
        409,
      );
    if (input.date !== existing?.date && input.date < vietnamToday())
      throw new AppError("Ngày khởi hành mới phải từ hôm nay");
    if (existing && input.date !== existing.date) {
      const booked = await client.query(
        "SELECT 1 FROM bookings WHERE product_id=$1 AND departure_date=$2::date LIMIT 1",
        [existing.product_id, existing.date],
      );
      if (booked.rowCount)
        throw new AppError(
          "Lịch đã có đơn. Hãy đóng bán và tạo lịch mới nếu cần đổi ngày.",
          409,
        );
    }

    const capacity =
      input.capacity === undefined
        ? (existing?.capacity ?? null)
        : input.capacity;
    const price =
      input.price_override === undefined
        ? (existing?.price_override ?? null)
        : input.price_override;
    if (capacity !== null) {
      const {
        rows: [overCapacity],
      } = await client.query<{ date: string; guests: number }>(
        `SELECT b.departure_date::text AS date, sum(b.guests)::int AS guests
         FROM bookings b
         WHERE b.product_id=$1 AND b.departure_date BETWEEN $2::date AND $3::date
           AND b.status<>'cancelled'
           AND ($5::boolean OR NOT EXISTS (
             SELECT 1 FROM departures d WHERE d.product_id=b.product_id AND d.date=b.departure_date
           ))
         GROUP BY b.departure_date HAVING sum(b.guests)>$4
         ORDER BY b.departure_date LIMIT 1`,
        [input.product_id, input.date, endDate, capacity, Boolean(id)],
      );
      if (overCapacity)
        throw new AppError(
          `Ngày ${overCapacity.date} đã giữ ${overCapacity.guests} chỗ. Sức chứa phải đủ cho các đơn hiện có.`,
          409,
        );
    }

    const fields = [
      input.product_id,
      input.date,
      input.notes,
      input.active,
      capacity,
      price,
    ];
    const { rows } = id
      ? await client.query(
          `UPDATE departures SET date=$2,notes=$3,active=$4,capacity=$5,price_override=$6,revision=revision+1
           WHERE product_id=$1 AND id=$7
           RETURNING id,product_id,date::text,notes,active,capacity,price_override,revision`,
          [...fields, id],
        )
      : await client.query(
          `INSERT INTO departures(id,product_id,date,notes,active,capacity,price_override)
           SELECT gen_random_uuid(),$1,$2::date+day,$3,$4,$5,$6
           FROM generate_series(0,$7::integer) AS series(day)
           ON CONFLICT(product_id,date) DO NOTHING
           RETURNING id,product_id,date::text,notes,active,capacity,price_override,revision`,
          [...fields, interval],
        );
    if (!interval && !rows.length)
      throw new AppError("Tour đã có lịch vào ngày này", 409);
    await client.query("COMMIT");
    return {
      data: rows[0] ?? null,
      saved: rows.length,
      skipped: interval + 1 - rows.length,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    if ((error as { code?: string }).code === "23505")
      throw new AppError("Tour đã có lịch vào ngày này", 409);
    throw error;
  } finally {
    client.release();
  }
}

export async function closeAdminDeparture(body: unknown) {
  const input = z.object({ id: z.uuid(), revision }).parse(body);
  const { rows } = await db.query(
    `UPDATE departures SET active=false,revision=revision+1
     WHERE id=$1 AND ($2::integer IS NULL OR revision=$2) RETURNING id`,
    [input.id, input.revision ?? null],
  );
  if (!rows.length)
    throw new AppError(
      input.revision == null
        ? "Không tìm thấy lịch khởi hành"
        : "Lịch đã thay đổi. Hãy tải lại dữ liệu.",
      input.revision == null ? 404 : 409,
    );
  return rows[0];
}
