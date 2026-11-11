import { cookies } from "next/headers";
import { z } from "zod";
import { sameOrigin } from "@/lib/admin-auth";
import { locale } from "@/modules/admin/validation";
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  try {
    const body = z.object({ locale }).parse(await request.json());
    (await cookies()).set("site_locale", body.locale, {
      httpOnly: true,
      sameSite: "lax",
      secure: new URL(request.url).protocol === "https:",
      path: "/",
      maxAge: 31536000,
    });
    return Response.json({ ok: true });
  } catch {
    return Response.json({ error: "Ngôn ngữ không hợp lệ" }, { status: 400 });
  }
}
