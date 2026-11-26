import brand from "@/config/brand.json";
import "server-only";
import { randomUUID } from "node:crypto";
import { db } from "@/lib/db";
import type { z } from "zod";
import type { bookingSchema } from "./validation";
import type { Booking } from "@/lib/types";
import { AppError } from "@/lib/errors";
import { publicProductWhere } from "@/modules/travel/product-visibility";
import { getTransferFareForProduct } from "@/modules/travel/fare-service";
type CreateBookingInput = z.infer<typeof bookingSchema>;
export async function createBooking(
  input: CreateBookingInput,
  actorId?: string,
) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const product = (
      await client.query(
        `SELECT p.price,p.type FROM products p WHERE p.id=$1 AND ${publicProductWhere} FOR SHARE OF p`,
        [input.productId],
      )
    ).rows[0];
    if (!product) throw new AppError("Dịch vụ không tồn tại", 404);
    let price = product.price;
    let returnPrice: number | null = null;
    if (
      product.type === "hotel" &&
      (!input.returnDate || input.returnDate <= input.date)
    )
      throw new AppError("Ngày trả phòng phải sau ngày nhận phòng");
    if (
      product.type !== "transfer" &&
      (input.departureTime || input.returnTime || input.flightNumber)
    )
      throw new AppError("Thông tin chuyến xe không phù hợp với dịch vụ");
    if (
      product.type !== "hotel" &&
      product.type !== "transfer" &&
      input.returnDate
    )
      throw new AppError("Dịch vụ này không có ngày sử dụng lượt về");
    if (product.type === "transfer") {
      if (!input.departureTime) throw new AppError("Vui lòng chọn giờ đón");
      const roundTrip = Boolean(input.returnDate || input.returnTime);
      if (
        roundTrip &&
        (!input.returnDate ||
          !input.returnTime ||
          `${input.returnDate}T${input.returnTime}` <=
            `${input.date}T${input.departureTime}`)
      )
        throw new AppError("Thời điểm lượt về phải sau giờ đón lượt đi");
      const offer = await getTransferFareForProduct(
        input.productId,
        roundTrip,
        client,
      );
      if (!offer) throw new AppError("Tuyến xe không còn nhận yêu cầu", 404);
      if (input.guests > offer.maxGuests)
        throw new AppError(`Xe đã chọn chở tối đa ${offer.maxGuests} khách`);
      if (roundTrip && offer.returnPrice == null)
        throw new AppError(
          "Chưa có giá niêm yết cho lượt về. Vui lòng liên hệ.",
        );
      price = offer.price;
      returnPrice = offer.returnPrice;
    }
    if (input.roomId) {
      if (product.type !== "hotel")
        throw new AppError("Loại phòng không phù hợp với dịch vụ");
      const room = (
        await client.query(
          "SELECT price,capacity FROM rooms WHERE id=$1 AND product_id=$2 AND active=true FOR SHARE",
          [input.roomId, input.productId],
        )
      ).rows[0];
      if (!room || input.guests > room.capacity)
        throw new AppError("Loại phòng không phù hợp số khách");
      price = room.price;
    }
    if (product.type === "hotel" && !input.roomId) {
      const rooms = await client.query(
        "SELECT 1 FROM rooms WHERE product_id=$1 AND active LIMIT 1",
        [input.productId],
      );
      if (rooms.rowCount) throw new AppError("Vui lòng chọn loại phòng");
    }
    if (product.type === "tour") {
      const {
        rows: [schedule],
      } = await client.query<{ blocked: boolean }>(
        `SELECT EXISTS(SELECT 1 FROM departures WHERE product_id=$1 AND active)
            AND NOT EXISTS(SELECT 1 FROM departures WHERE product_id=$1 AND active AND date=$2::date) AS blocked`,
        [input.productId, input.date],
      );
      if (schedule.blocked)
        throw new AppError("Tour chưa có lịch khởi hành ngày đã chọn");
    }
    const bookingId = randomUUID();
    await client.query(
      "INSERT INTO bookings(id,product_id,customer_name,phone,departure_date,guests,unit_price,notes,return_date,departure_time,room_id,return_time,return_unit_price,flight_number) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",
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
        input.returnTime ?? null,
        returnPrice,
        input.flightNumber || null,
      ],
    );
    await client.query(
      "INSERT INTO customers(id,name,phone) VALUES($1,$2,$3) ON CONFLICT(phone) DO UPDATE SET name=EXCLUDED.name",
      [randomUUID(), input.name, input.phone],
    );
    await client.query(
      "INSERT INTO booking_history(id,booking_id,status,actor_id,notes) VALUES($1,$2,'pending',$3,$4)",
      [
        randomUUID(),
        bookingId,
        actorId ?? null,
        actorId ? "Nhân viên tạo đơn thủ công" : "Khách gửi yêu cầu",
      ],
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
    "SELECT b.id,b.status,b.departure_date::text AS departure_date,b.return_date::text AS return_date,b.departure_time,b.return_time,b.return_unit_price,b.flight_number,b.guests,b.unit_price,b.notes,p.title FROM bookings b JOIN products p ON p.id=b.product_id WHERE b.id=$1 AND b.phone=$2",
    [id, phone],
  );
  return rows[0] || null;
}
