import { db } from "@/lib/db";
export async function GET(request: Request) {
  const params = new URL(request.url).searchParams;
  const type = params.get("type");
  const q = (params.get("q") || "").slice(0, 150);
  const sort =
    { price: "price ASC", rating: "rating DESC", recommended: "position ASC" }[
      params.get("sort") || "recommended"
    ] || "position ASC";
  try {
    const { rows } = await db.query(
      `SELECT * FROM products WHERE active=true AND ($1::text IS NULL OR type=$1) AND ($2='' OR title ILIKE '%' || $2 || '%' OR location ILIKE '%' || $2 || '%') ORDER BY ${sort},id LIMIT 200`,
      [type, q],
    );
    return Response.json({ data: rows });
  } catch {
    return Response.json(
      { error: "Không thể kết nối dữ liệu. Vui lòng thử lại." },
      { status: 503 },
    );
  }
}
