import brand from "@/config/brand.json";
import { getCurrentMessages } from "@/lib/i18n";
import { sendServiceRequest } from "@/modules/support/service";
import { errorResponse, readJson } from "@/lib/http";
import { requireSameOrigin, rateLimit } from "@/lib/request-security";
export async function POST(request: Request) {
  try {
    const t = await getCurrentMessages();
    requireSameOrigin(request, t.errors.invalidRequest);
    await rateLimit(request, "service-request", 15, 900);
    return Response.json(
      {
        id: await sendServiceRequest(await readJson(request)),
        message: t.errors.requestReceivedTemplate.replace("{brand}", brand.name),
      },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
