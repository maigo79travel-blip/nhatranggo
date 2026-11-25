import { z } from "zod";
import { db } from "@/lib/db";
import {
  adminUser,
  verifyPassword,
  createSession,
  destroySession,
} from "@/modules/admin/auth";
import { sameOrigin, secureCookies, rateLimit } from "@/lib/request-security";
import { readJson, errorResponse } from "@/lib/http";
import { AppError } from "@/lib/errors";

export async function GET() {
  try {
    const user = await adminUser();
    return user
      ? Response.json({ user })
      : Response.json({ error: "Vui lòng đăng nhập" }, { status: 401 });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function POST(request: Request) {
  try {
    if (!sameOrigin(request)) throw new AppError("Yêu cầu không hợp lệ", 403);
    const data = z
      .object({
        username: z.string().trim().min(1).max(80),
        password: z.string().min(1).max(200),
      })
      .parse(await readJson(request));
    const key = await rateLimit(
      request,
      "login",
      10,
      900,
      data.username.toLowerCase(),
    );
    const { rows } = await db.query(
      "SELECT id,password_hash FROM admin_users WHERE username=$1 AND active=true",
      [data.username],
    );
    const validPassword = verifyPassword(
      data.password,
      rows[0]?.password_hash || `login-placeholder:${"0".repeat(128)}`,
    );
    if (!rows[0] || !validPassword)
      throw new AppError("Tên đăng nhập hoặc mật khẩu không đúng", 401);
    await db.query("DELETE FROM request_limits WHERE key=$1", [key]);
    await createSession(rows[0].id, secureCookies(request));
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
export async function DELETE(request: Request) {
  try {
    if (!sameOrigin(request)) throw new AppError("Yêu cầu không hợp lệ", 403);
    await destroySession();
    return Response.json({ ok: true });
  } catch (error) {
    return errorResponse(error);
  }
}
