import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { status, id, text } from "@/lib/validation";
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
        "SELECT id FROM partners WHERE id=$1 AND active=true",
        [input.partner_id],
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
export async function exportBookings() {
  const { rows } = await db.query(
    "SELECT b.id,b.customer_name,b.phone,p.title,b.departure_date::text,b.return_date::text,b.guests,b.unit_price,b.confirmed_total,b.status,b.internal_notes FROM bookings b JOIN products p ON p.id=b.product_id ORDER BY b.created_at DESC LIMIT 10000",
  );
  const headers = [
    "id",
    "customer_name",
    "phone",
    "title",
    "departure_date",
    "return_date",
    "guests",
    "unit_price",
    "confirmed_total",
    "status",
    "internal_notes",
  ];
  const cell = (v: unknown) => {
    let value = String(v ?? "");
    if (/^[=+@\-\t\r]/.test(value)) value = "'" + value;
    return '"' + value.replaceAll('"', '""') + '"';
  };
  return (
    "\uFEFF" +
    [headers, ...rows.map((row) => headers.map((key) => row[key]))]
      .map((row) => row.map(cell).join(","))
      .join("\r\n")
  );
}
