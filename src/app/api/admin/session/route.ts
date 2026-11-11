import { db } from "@/lib/db";
import {
  adminUser,
  verifyPassword,
  createSession,
  destroySession,
  sameOrigin,
} from "@/lib/admin-auth";
const attempts = new Map<string, { count: number; reset: number }>();
export async function GET() {
  const user = await adminUser();
  return user
    ? Response.json({ user })
    : Response.json({ error: "Vui lòng đăng nhập" }, { status: 401 });
}
export async function POST(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  const ip = request.headers.get("x-forwarded-for") || "local";
  const now = Date.now();
  let limit = attempts.get(ip);
  if (!limit || limit.reset < now) {
    limit = { count: 0, reset: now + 15 * 60 * 1000 };
    attempts.set(ip, limit);
  }
  if (limit.count >= 10)
    return Response.json({ error: "Thử lại sau 15 phút" }, { status: 429 });
  let data;
  try {
    data = await request.json();
  } catch {
    return Response.json({ error: "Dữ liệu không hợp lệ" }, { status: 400 });
  }
  if (
    typeof data.username !== "string" ||
    typeof data.password !== "string" ||
    data.password.length > 200
  )
    return Response.json(
      { error: "Thông tin đăng nhập không hợp lệ" },
      { status: 400 },
    );
  const { rows } = await db.query(
    "SELECT id,password_hash FROM admin_users WHERE username=$1",
    [data.username],
  );
  if (!rows[0] || !verifyPassword(data.password, rows[0].password_hash)) {
    limit.count++;
    return Response.json(
      { error: "Tên đăng nhập hoặc mật khẩu không đúng" },
      { status: 401 },
    );
  }
  attempts.delete(ip);
  await createSession(rows[0].id, new URL(request.url).protocol === "https:");
  return Response.json({ ok: true });
}
export async function DELETE(request: Request) {
  if (!sameOrigin(request))
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  await destroySession();
  return Response.json({ ok: true });
}
