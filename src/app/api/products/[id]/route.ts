import { db } from "@/lib/db";
import { publicProductWhere } from "@/lib/services/product-visibility";
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const product = (
      await db.query(
        `SELECT p.id FROM products p WHERE p.id=$1 AND ${publicProductWhere}`,
        [id],
      )
    ).rows[0];
    if (!product)
      return Response.json({ error: "Dịch vụ không tồn tại" }, { status: 404 });
    const [rooms, departures] = await Promise.all([
      db.query(
        "SELECT id,title,price,capacity,image,description FROM rooms WHERE product_id=$1 AND active=true ORDER BY price,title",
        [id],
      ),
      db.query(
        "SELECT id,date::text,notes FROM departures WHERE product_id=$1 AND active=true AND date>=CURRENT_DATE ORDER BY date",
        [id],
      ),
    ]);
    return Response.json({ rooms: rooms.rows, departures: departures.rows });
  } catch {
    return Response.json(
      { error: "Không tải được chi tiết dịch vụ" },
      { status: 503 },
    );
  }
}
