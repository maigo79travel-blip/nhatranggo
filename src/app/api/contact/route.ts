import { sendContact } from "@/modules/support/service";
import { getCurrentMessages } from "@/lib/i18n";
import { errorResponse, readJson } from "@/lib/http";
import { requireSameOrigin, rateLimit } from "@/lib/request-security";
export async function POST(request: Request) {
  try {
    const t = await getCurrentMessages();
    requireSameOrigin(request, t.errors.invalidRequest);
    await rateLimit(request, "contact", 15, 900);
    return Response.json(
      {
        id: await sendContact(await readJson(request)),
        message: t.errors.contactReceived,
      },
      { status: 201 },
    );
  } catch (e) {
    return errorResponse(e);
  }
}
