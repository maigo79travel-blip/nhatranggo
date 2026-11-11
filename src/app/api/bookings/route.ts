import { ModuleError } from "@/modules/admin/service";
import { bookingSchema } from "@/lib/validation";
import {
  createBooking,
  getBookingByIdAndPhone,
} from "@/lib/services/booking-service";

export async function POST(request: Request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }

  const result = bookingSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      { error: result.error.issues[0].message },
      { status: 400 },
    );
  }

  try {
    const booking = await createBooking(result.data);
    return Response.json(booking, { status: 201 });
  } catch (error) {
    const message = (error as Error).message;
    if (error instanceof ModuleError) {
      return Response.json({ error: message }, { status: error.status });
    }
    return Response.json(
      { error: "Chưa gửi được yêu cầu. Vui lòng thử lại hoặc gọi hotline." },
      { status: 503 },
    );
  }
}

export async function GET(request: Request) {
  const p = new URL(request.url).searchParams;
  const id = p.get("id") || "";
  const phone = p.get("phone") || "";

  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      id,
    ) ||
    !phone
  ) {
    return Response.json(
      { error: "Nhập mã đặt chỗ và số điện thoại" },
      { status: 400 },
    );
  }

  try {
    const booking = await getBookingByIdAndPhone(id, phone);
    return booking
      ? Response.json(booking)
      : Response.json(
          { error: "Không tìm thấy yêu cầu phù hợp" },
          { status: 404 },
        );
  } catch {
    return Response.json(
      { error: "Không thể tra cứu lúc này" },
      { status: 503 },
    );
  }
}
