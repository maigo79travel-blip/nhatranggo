import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { status, id, text } from "@/lib/validation";
import type { BookingFilters } from "./admin-filters";

function bookingSelection(filters: BookingFilters) {
  const params: string[] = [];
  const bind = (value: string) => {
    params.push(value);
    return `$${params.length}`;
  };
  const filtersSql = [];
  if (filters.status) filtersSql.push(`b.status=${bind(filters.status)}`);
  if (filters.type) filtersSql.push(`p.type=${bind(filters.type)}`);
  if (filters.from)
    filtersSql.push(`b.departure_date>=${bind(filters.from)}::date`);
  if (filters.to)
    filtersSql.push(`b.departure_date<=${bind(filters.to)}::date`);
  if (filters.q) {
    const pattern = bind("%" + filters.q.replace(/[\\%_]/g, "\\$&") + "%");
    filtersSql.push(
      `(b.id::text ILIKE ${pattern} OR b.phone ILIKE ${pattern} OR b.customer_name ILIKE ${pattern} OR p.title ILIKE ${pattern})`,
    );
  }
  const from = "FROM bookings b JOIN products p ON p.id=b.product_id";
  return {
    selection: filtersSql.length
      ? `${from} WHERE ${filtersSql.join(" AND ")}`
      : from,
    params,
  };
}

export async function listAdminBookings(
  filters: BookingFilters,
  requestedPage: number,
) {
  const { selection, params } = bookingSelection(filters);
  const pageSize = 10;
  const {
    rows: [count],
  } = await db.query<{ total: number }>(
    `SELECT count(*)::int AS total ${selection}`,
    params,
  );
  const pages = Math.max(1, Math.ceil(count.total / pageSize));
  const page = Math.min(requestedPage, pages);
  const { rows } = await db.query(
    `SELECT b.*,b.departure_date::text AS departure_date,b.return_date::text AS return_date,
       p.type AS product_type,p.title,(SELECT title FROM rooms WHERE id=b.room_id) AS room_title
       ${selection} ORDER BY b.created_at DESC,b.id DESC LIMIT ${pageSize} OFFSET $${params.length + 1}`,
    [...params, (page - 1) * pageSize],
  );
  return { data: rows, total: count.total, page, pages };
}
export const bookingUpdateSchema = z.object({
  id: z.uuid(),
  status,
  partner_id: id,
  internal_notes: text,
  confirmed_total: z.coerce
    .number()
    .int()
    .min(0)
    .max(1000000000000)
    .nullable()
    .default(null),
  name: z.string().trim().min(2).max(120).optional(),
  phone: z
    .string()
    .regex(/^(\+84|0)[0-9]{9,10}$/)
    .optional(),
});
export async function updateBooking(
  input: z.infer<typeof bookingUpdateSchema>,
  actorId: string,
) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    if (input.partner_id) {
      const partner = await client.query(
        `SELECT id FROM partners WHERE id=$1 AND
           (active OR id=(SELECT partner_id FROM bookings WHERE id=$2)) FOR SHARE`,
        [input.partner_id, input.id],
      );
      if (!partner.rowCount) throw new AppError("Đối tác không hoạt động");
    }
    const result = await client.query(
      "UPDATE bookings SET status=$2,partner_id=$3,internal_notes=$4,customer_name=COALESCE($5,customer_name),phone=COALESCE($6,phone),confirmed_total=$7,updated_at=now() WHERE id=$1 RETURNING *",
      [
        input.id,
        input.status,
        input.partner_id,
        input.internal_notes,
        input.name ?? null,
        input.phone ?? null,
        input.confirmed_total,
      ],
    );
    if (!result.rowCount) throw new AppError("Không tìm thấy yêu cầu", 404);
    await client.query(
      "INSERT INTO booking_history(id,booking_id,actor_id,status,notes) VALUES($1,$2,$3,$4,$5)",
      [randomUUID(), input.id, actorId, input.status, input.internal_notes],
    );
    const booking = result.rows[0];
    await client.query(
      "INSERT INTO customers(id,name,phone) VALUES($1,$2,$3) ON CONFLICT(phone) DO UPDATE SET name=EXCLUDED.name",
      [randomUUID(), booking.customer_name, booking.phone],
    );
    await client.query("COMMIT");
    return result.rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
}
const exportColumns = [
  { key: "id", header: "Mã yêu cầu", width: 38 },
  { key: "customer_name", header: "Khách hàng", width: 25 },
  { key: "phone", header: "Điện thoại", width: 18 },
  { key: "title", header: "Dịch vụ", width: 48 },
  { key: "departure_date", header: "Ngày sử dụng", width: 16 },
  { key: "return_date", header: "Ngày trả phòng / lượt về", width: 23 },
  { key: "guests", header: "Số khách", width: 12 },
  { key: "unit_price", header: "Giá tham khảo (VNĐ)", width: 23 },
  { key: "confirmed_total", header: "Tổng xác nhận (VNĐ)", width: 24 },
  { key: "status", header: "Trạng thái", width: 19 },
  { key: "internal_notes", header: "Ghi chú nội bộ", width: 48 },
  { key: "departure_time", header: "Giờ đón", width: 12 },
  { key: "return_time", header: "Giờ đón lượt về", width: 17 },
  { key: "return_unit_price", header: "Giá lượt về (VNĐ)", width: 21 },
  { key: "flight_number", header: "Chuyến bay", width: 17 },
] as const;

export async function exportBookings(
  filters: BookingFilters,
  format: "xlsx" | "csv",
) {
  const { selection, params } = bookingSelection(filters);
  const { rows } = await db.query(
    `SELECT b.id,b.customer_name,b.phone,p.title,b.departure_date::text,b.return_date::text,b.departure_time::text,b.return_time::text,b.return_unit_price,b.flight_number,b.guests,b.unit_price,b.confirmed_total,b.status,b.internal_notes
       ${selection} ORDER BY b.created_at DESC,b.id DESC LIMIT 10001`,
    params,
  );
  if (rows.length > 10000)
    throw new AppError(
      "Mỗi lần xuất tối đa 10.000 đơn. Hãy thu hẹp khoảng ngày.",
      422,
    );

  if (format === "xlsx") {
    const { default: writeExcel } = await import("write-excel-file/node");
    const body = await writeExcel(
      [
        exportColumns.map(({ header }) => ({
          value: header,
          fontWeight: "bold" as const,
        })),
        ...rows.map((row) =>
          exportColumns.map(({ key }) => {
            const value = row[key];
            if (value == null) return null;
            return key === "confirmed_total" || typeof value === "number"
              ? { value: Number(value) }
              : { value: String(value) };
          }),
        ),
      ],
      {
        sheet: "Đặt chỗ",
        stickyRowsCount: 1,
        columns: exportColumns.map(({ width }) => ({ width })),
      },
    ).toBuffer();
    return {
      body: new Uint8Array(body),
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };
  }

  const cell = (v: unknown) => {
    let value = String(v ?? "");
    if (/^[\s]*[=+@-]|^[\t\r\n]/.test(value)) value = "'" + value;
    return '"' + value.replaceAll('"', '""') + '"';
  };
  const keys = exportColumns.map(({ key }) => key);
  return {
    body:
      "\uFEFF" +
      [keys, ...rows.map((row) => keys.map((key) => row[key]))]
        .map((row) => row.map(cell).join(","))
        .join("\r\n"),
    type: "text/csv; charset=utf-8",
  };
}
