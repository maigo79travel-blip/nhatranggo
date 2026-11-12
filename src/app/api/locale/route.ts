import { cookies } from "next/headers";
import { z } from "zod";
import { sameOrigin } from "@/lib/request-security";
import { locale } from "@/modules/admin/validation";
import { readJson, errorResponse } from "@/lib/http";
import { secureCookies } from "@/lib/request-security";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  try {
    const body = z.object({ locale }).parse(await readJson(request, 1024));
    (await cookies()).set("site_locale", body.locale, {
      httpOnly: true,
      sameSite: "lax",
      secure: secureCookies(request),
      path: "/",
      maxAge: 31536000,
    });
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
