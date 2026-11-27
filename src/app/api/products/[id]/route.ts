import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { errorResponse } from "@/lib/http";
import { getCurrentMessages } from "@/lib/i18n";
import { publicProductWhere } from "@/modules/travel/product-visibility";
import { getTransferFareForProduct } from "@/modules/travel/fare-service";
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
    const [t, { rows: [product] }] = await Promise.all([
      getCurrentMessages(),
      db.query<{ type: string }>(
        `SELECT p.type FROM products p WHERE p.id=$1 AND ${publicProductWhere}`,
        [id],
      ),
    ]);
    if (!product) throw new AppError(t.errors.productNotFound, 404);
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
    const quote =
      product.type === "transfer" ? await getTransferFareForProduct(id) : null;
    if (product.type === "transfer" && !quote)
      throw new AppError(t.errors.transferUnavailable, 404);
    return Response.json({
      rooms,
      departures,
      ...(quote ? { maxGuests: quote.maxGuests } : {}),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
