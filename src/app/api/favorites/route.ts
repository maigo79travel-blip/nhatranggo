import { cookies } from "next/headers";
import { randomBytes, createHash } from "node:crypto";
import { z } from "zod";
import { sameOrigin } from "@/lib/admin-auth";
import {
  getFavoriteProductIds,
  toggleFavorite,
} from "@/lib/services/favorite-service";

async function getVisitorHash(request: Request) {
  const jar = await cookies();
  let token = jar.get("booking_visitor")?.value;
  if (!token || !/^[A-Za-z0-9_-]{43}$/.test(token)) {
    token = randomBytes(32).toString("base64url");
    jar.set("booking_visitor", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: new URL(request.url).protocol === "https:",
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
  }
  return createHash("sha256").update(token).digest("hex");
}

export async function GET(request: Request) {
  try {
    const visitorId = await getVisitorHash(request);
    const ids = await getFavoriteProductIds(visitorId);
    return Response.json({ ids });
  } catch {
    return Response.json(
      { error: "Không tải được danh sách yêu thích" },
      { status: 503 },
    );
  }
}

export async function POST(request: Request) {
  if (!sameOrigin(request)) {
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  }

  try {
    const p = z
      .object({ productId: z.string().max(100), favorite: z.boolean() })
      .parse(await request.json());

    const visitorId = await getVisitorHash(request);
    const ids = await toggleFavorite(visitorId, p.productId, p.favorite);
    return Response.json({ ids });
  } catch (error) {
    if ((error as Error).message === "Dịch vụ không tồn tại") {
      return Response.json({ error: "Dịch vụ không tồn tại" }, { status: 404 });
    }
    return Response.json(
      { error: "Không lưu được danh sách yêu thích" },
      { status: error instanceof z.ZodError ? 400 : 503 },
    );
  }
}
