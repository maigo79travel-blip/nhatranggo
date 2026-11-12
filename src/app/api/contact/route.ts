import { sendContact } from "@/modules/support/service";
import { errorResponse, readJson } from "@/lib/http";
import { sameOrigin, rateLimit } from "@/lib/request-security";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  try {
    await rateLimit(request, "contact", 15, 900);
    return Response.json(
      {
        id: await sendContact(await readJson(request)),
        message: "Đã nhận yêu cầu. Nhân viên sẽ liên hệ hỗ trợ.",
      },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
