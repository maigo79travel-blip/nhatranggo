import { createHash } from "node:crypto";
import sharp from "sharp";
import { adminUser } from "@/modules/admin/auth";
import { canAccess } from "@/modules/admin/permissions";
import { sameOrigin, rateLimit } from "@/lib/request-security";
import { errorResponse, readRequestBytes } from "@/lib/http";
import { AppError } from "@/lib/errors";
import { db } from "@/lib/db";

const photoTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request: Request) {
  try {
    const user = await adminUser();
    if (!user) throw new AppError("Vui lòng đăng nhập", 401);
    if (!canAccess(user, "content") || !sameOrigin(request))
      throw new AppError("Bạn không có quyền tải ảnh", 403);
    if (!photoTypes.has(request.headers.get("content-type") || ""))
      throw new AppError("Chọn ảnh JPG, PNG hoặc WebP", 415);
    await rateLimit(request, "admin-media", 30, 60, user.id);
    const bytes = await readRequestBytes(request, 3 * 1024 * 1024);
    let image: Buffer;
    try {
      const instance = sharp(bytes, { limitInputPixels: 24000000 });
      const metadata = await instance.metadata();
      if (!metadata.format || !photoTypes.has(`image/${metadata.format}`))
        throw new Error("Unsupported image");
      image = await instance
        .rotate()
        .resize({
          width: 1920,
          height: 1920,
          fit: "inside",
          withoutEnlargement: true,
        })
        .webp({ quality: 84 })
        .toBuffer();
    } catch {
      throw new AppError("Ảnh không hợp lệ hoặc có kích thước quá lớn", 422);
    }
    if (image.length > 3 * 1024 * 1024)
      throw new AppError("Ảnh sau khi xử lý vẫn quá lớn", 422);
    const id = createHash("sha256").update(image).digest("hex");
    await db.query(
      "INSERT INTO site_images(id,data) VALUES($1,$2) ON CONFLICT (id) DO NOTHING",
      [id, image],
    );
    return Response.json({ url: `/api/media/${id}` }, { status: 201 });
  } catch (error) {
    return errorResponse(error);
  }
}
