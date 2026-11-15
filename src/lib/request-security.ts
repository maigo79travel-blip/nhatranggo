import "server-only";
import { createHash } from "node:crypto";
import { db } from "./db";
import { AppError } from "./errors";

function publicOrigin(request: Request) {
  const deployment =
    process.env.VERCEL_ENV === "preview"
      ? process.env.VERCEL_URL
      : process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;
  return new URL(
    process.env.APP_URL || (deployment ? `https://${deployment}` : request.url),
  ).origin;
}

export function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin || origin === publicOrigin(request)) return true;
  if (process.env.VERCEL_ENV === "preview") {
    return [process.env.VERCEL_URL, process.env.VERCEL_BRANCH_URL].some(
      (host) => host && origin === `https://${host}`,
    );
  }
  return false;
}

export function secureCookies(request: Request) {
  return (
    Boolean(process.env.VERCEL) || publicOrigin(request).startsWith("https:")
  );
}

export async function rateLimit(
  request: Request,
  scope: string,
  max: number,
  windowSeconds: number,
  identity = "",
) {
  const address =
    process.env.VERCEL === "1" || process.env.TRUST_PROXY === "true"
      ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local"
      : "direct";
  const key = createHash("sha256")
    .update(`${scope}:${address}:${identity}`)
    .digest("hex");
  await db.query("DELETE FROM request_limits WHERE expires_at < now()");
  const { rows } = await db.query<{ attempts: number; retry_after: number }>(
    `INSERT INTO request_limits(key,attempts,expires_at) VALUES($1,1,now()+make_interval(secs=>$2))
     ON CONFLICT(key) DO UPDATE SET attempts=CASE WHEN request_limits.expires_at<=now() THEN 1 ELSE request_limits.attempts+1 END,
       expires_at=CASE WHEN request_limits.expires_at<=now() THEN EXCLUDED.expires_at ELSE request_limits.expires_at END
     RETURNING attempts, greatest(1,ceil(extract(epoch FROM expires_at-now())))::int AS retry_after`,
    [key, windowSeconds],
  );
  if (rows[0].attempts > max)
    throw new AppError(
      "Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau.",
      429,
      { "Retry-After": String(rows[0].retry_after) },
    );
  return key;
}
