import { AppError } from "@/lib/errors";
import { errorResponse, readJson } from "@/lib/http";
import { rateLimit, sameOrigin } from "@/lib/request-security";
import { bookingSchema } from "@/modules/bookings/validation";
import {
  createBooking,
  getBookingByIdAndPhone,
} from "@/modules/bookings/service";

export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) throw new AppError("Yêu cầu không hợp lệ", 403);
    const input = bookingSchema.parse(await readJson(request));
    await rateLimit(request, "booking", 40, 900);
    return Response.json(await createBooking(input), { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function GET(request: Request) {
  try {
    await rateLimit(request, "booking-lookup", 120, 60);
    const params = new URL(request.url).searchParams;
    const id = params.get("id") || "";
    const phone = params.get("phone") || "";
    if (
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        id,
      ) ||
      !/^(\+84|0)[0-9]{9,10}$/.test(phone)
    )
      throw new AppError("Nhập mã đặt chỗ và số điện thoại");
    const booking = await getBookingByIdAndPhone(id, phone);
    if (!booking) throw new AppError("Không tìm thấy yêu cầu phù hợp", 404);
    return Response.json(booking, {
      headers: { "Cache-Control": "private, no-store" },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
