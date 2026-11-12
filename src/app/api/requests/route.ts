import brand from "@/config/brand.json";
import { sendServiceRequest } from "@/modules/support/service";
import { errorResponse, readJson } from "@/lib/http";
import { sameOrigin, rateLimit } from "@/lib/request-security";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  try {
    await rateLimit(request, "service-request", 15, 900);
    return Response.json(
      {
        id: await sendServiceRequest(await readJson(request)),
        message: `Đã nhận yêu cầu. ${brand.name} sẽ kiểm tra và liên hệ xác nhận dịch vụ.`,
      },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
