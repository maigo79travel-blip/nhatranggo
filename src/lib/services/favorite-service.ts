import "server-only";
import { db } from "@/lib/db";

export async function getFavoriteProductIds(
  visitorId: string,
): Promise<string[]> {
  const { rows } = await db.query<{ product_id: string }>(
    "SELECT f.product_id FROM favorites f JOIN products p ON p.id=f.product_id WHERE f.visitor_id=$1 AND p.active=true ORDER BY f.created_at",
    [visitorId],
  );
  return rows.map((r) => r.product_id);
}

export async function toggleFavorite(
  visitorId: string,
  productId: string,
  favorite: boolean,
): Promise<string[]> {
  if (favorite) {
    const result = await db.query(
      "INSERT INTO favorites(visitor_id,product_id) SELECT $1,id FROM products WHERE id=$2 AND active=true ON CONFLICT DO NOTHING RETURNING product_id",
      [visitorId, productId],
    );
    if (!result.rowCount) {
      const existing = await db.query(
        "SELECT product_id FROM favorites WHERE visitor_id=$1 AND product_id=$2",
        [visitorId, productId],
      );
      if (!existing.rowCount) {
        throw new Error("Dịch vụ không tồn tại");
      }
    }
  } else {
    await db.query(
      "DELETE FROM favorites WHERE visitor_id=$1 AND product_id=$2",
      [visitorId, productId],
    );
  }

  return getFavoriteProductIds(visitorId);
}
