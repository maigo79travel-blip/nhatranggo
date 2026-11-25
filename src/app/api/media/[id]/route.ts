import { db } from "@/lib/db";
import { errorResponse } from "@/lib/http";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const { id } = await context.params;
  if (!/^[a-f0-9]{64}$/.test(id)) return new Response(null, { status: 404 });
  try {
    const {
      rows: [image],
    } = await db.query<{ data: Buffer }>(
      "SELECT data FROM site_images WHERE id=$1",
      [id],
    );
    if (!image) return new Response(null, { status: 404 });
    return new Response(new Uint8Array(image.data), {
      headers: {
        "Content-Type": "image/webp",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error) {
    return errorResponse(error);
  }
}
