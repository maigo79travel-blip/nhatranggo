import brand from "@/config/brand.json";
import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { z } from "zod";
import type { bookingSchema } from "@/lib/validation";
import type { Booking } from "@/lib/types";
import { AppError } from "@/lib/errors";
import { publicProductWhere } from "./product-visibility";
type CreateBookingInput = z.infer<typeof bookingSchema>;
export async function createBooking(input: CreateBookingInput) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const product = (
      await client.query(
        `SELECT p.price,p.type FROM products p WHERE p.id=$1 AND ${publicProductWhere}`,
        [input.productId],
      )
    ).rows[0];
    if (!product) throw new AppError("Dịch vụ không tồn tại", 404);
    let price = product.price;
    if (product.type === "hotel" && !input.returnDate)
      throw new AppError("Vui lòng chọn ngày trả phòng");
    if (input.roomId) {
      const room = (
        await client.query(
          "SELECT price,capacity FROM rooms WHERE id=$1 AND product_id=$2 AND active=true",
          [input.roomId, input.productId],
        )
      ).rows[0];
      if (!room || input.guests > room.capacity)
        throw new AppError("Loại phòng không phù hợp số khách");
      price = room.price;
    }
    const scheduled = await client.query(
      "SELECT date::text FROM departures WHERE product_id=$1 AND active=true",
      [input.productId],
    );
    if (
      product.type === "tour" &&
      scheduled.rowCount &&
      !scheduled.rows.some((r) => r.date === input.date)
    )
      throw new AppError("Tour chưa có lịch khởi hành ngày đã chọn");
    const bookingId = randomUUID();
    await client.query(
      "INSERT INTO bookings(id,product_id,customer_name,phone,departure_date,guests,unit_price,notes,return_date,departure_time,room_id) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)",
      [
        bookingId,
        input.productId,
        input.name,
        input.phone,
        input.date,
        input.guests,
        price,
        input.notes,
        input.returnDate ?? null,
        input.departureTime ?? null,
        input.roomId ?? null,
      ],
    );
    await client.query(
      "INSERT INTO customers(id,name,phone) VALUES($1,$2,$3) ON CONFLICT(phone) DO UPDATE SET name=EXCLUDED.name",
      [randomUUID(), input.name, input.phone],
    );
    await client.query(
      "INSERT INTO booking_history(id,booking_id,status,notes) VALUES($1,$2,'pending','Khách gửi yêu cầu')",
      [randomUUID(), bookingId],
    );
    await client.query("COMMIT");
    return {
      id: bookingId,
      status: "pending",
      message: `Đã nhận yêu cầu. ${brand.name} sẽ kiểm tra với đối tác và liên hệ xác nhận tình trạng chỗ, tổng giá.`,
    };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
export async function getBookingByIdAndPhone(
  id: string,
  phone: string,
): Promise<Booking | null> {
  const { rows } = await db.query(
    "SELECT b.id,b.status,b.departure_date::text AS departure_date,b.return_date::text AS return_date,b.departure_time,b.guests,b.unit_price,b.notes,p.title FROM bookings b JOIN products p ON p.id=b.product_id WHERE b.id=$1 AND b.phone=$2",
    [id, phone],
  );
  return rows[0] || null;
}
