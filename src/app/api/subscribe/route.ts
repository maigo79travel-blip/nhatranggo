import { subscribeSchema } from "@/lib/validation";
import { addSubscriber } from "@/lib/services/subscriber-service";

export async function POST(request: Request) {
  try {
    const p = subscribeSchema.safeParse(await request.json());
    if (!p.success) {
      return Response.json({ error: "Email không hợp lệ" }, { status: 400 });
    }
    await addSubscriber(p.data.email);
    return Response.json({ message: "Đã đăng ký nhận ưu đãi!" });
  } catch {
    return Response.json(
      { error: "Chưa đăng ký được. Vui lòng thử lại." },
      { status: 503 },
    );
  }
}
