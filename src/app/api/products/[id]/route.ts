import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { errorResponse } from "@/lib/http";
import { publicProductWhere } from "@/modules/travel/product-visibility";
import { vietnamToday } from "@/modules/travel/search";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const id = z
      .string()
      .min(1)
      .max(100)
      .parse((await params).id);
    const {
      rows: [product],
    } = await db.query<{ type: string }>(
      `SELECT p.type FROM products p WHERE p.id=$1 AND ${publicProductWhere}`,
      [id],
    );
    if (!product) throw new AppError("Dịch vụ không tồn tại", 404);
    const rooms =
      product.type === "hotel"
        ? (
            await db.query(
              "SELECT id,title,price,capacity,image,description FROM rooms WHERE product_id=$1 AND active ORDER BY price,id",
              [id],
            )
          ).rows
        : [];
    const departures =
      product.type === "tour"
        ? (
            await db.query(
              "SELECT id,date::text,notes FROM departures WHERE product_id=$1 AND active AND date >= $2::date ORDER BY date,id",
              [id, vietnamToday()],
            )
          ).rows
        : [];
    return Response.json({ rooms, departures });
  } catch (error) {
    return errorResponse(error);
  }
}
