import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { Booking } from "@/lib/types";

export type CreateBookingInput = {
  productId: string;
  name: string;
  phone: string;
  date: string;
  guests: number;
  notes?: string;
};

export type BookingResult = {
  id: string;
  status: string;
  message: string;
};

export async function createBooking(
  input: CreateBookingInput,
): Promise<BookingResult> {
  const product = await db.query(
    "SELECT price FROM products WHERE id=$1 AND active=true",
    [input.productId],
  );
  if (!product.rowCount) {
    throw new Error("Dịch vụ không tồn tại");
  }

  const id = randomUUID();
  await db.query(
    "INSERT INTO bookings(id,product_id,customer_name,phone,departure_date,guests,unit_price,notes) VALUES($1,$2,$3,$4,$5,$6,$7,$8)",
    [
      id,
      input.productId,
      input.name,
      input.phone,
      input.date,
      input.guests,
      product.rows[0].price,
      input.notes || "",
    ],
  );

  return {
    id,
    status: "pending",
    message:
      "Đã nhận yêu cầu. Nhân viên sẽ liên hệ xác nhận tình trạng chỗ và tổng giá.",
  };
}

export async function getBookingByIdAndPhone(
  id: string,
  phone: string,
): Promise<Booking | null> {
  const { rows } = await db.query(
    "SELECT b.id,b.status,b.departure_date::text AS departure_date,b.guests,p.title FROM bookings b JOIN products p ON p.id=b.product_id WHERE b.id=$1 AND b.phone=$2",
    [id, phone],
  );
  return (rows[0] as Booking) || null;
}
