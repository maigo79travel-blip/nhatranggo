import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { errorResponse } from "@/lib/http";
import { getCurrentMessages } from "@/lib/i18n";
import { publicProductWhere } from "@/modules/travel/product-visibility";
import { getTransferFareForProduct } from "@/modules/travel/fare-service";
import { vietnamToday } from "@/modules/travel/search";
import { listBookableTourDepartures } from "@/modules/travel/tour-availability";

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
    const [
      t,
      {
        rows: [product],
      },
    ] = await Promise.all([
      getCurrentMessages(),
      db.query<{ type: string; price: number; tour_scheduled: boolean }>(
        `SELECT p.type, p.price, p.type='tour' AND EXISTS(
           SELECT 1 FROM departures d WHERE d.product_id=p.id
         ) AS tour_scheduled FROM products p WHERE p.id=$1 AND ${publicProductWhere}`,
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
        ? await listBookableTourDepartures(id, vietnamToday())
        : [];
    const quote =
      product.type === "transfer" ? await getTransferFareForProduct(id) : null;
    if (product.type === "transfer" && !quote)
      throw new AppError(t.errors.transferUnavailable, 404);
    return Response.json({
      rooms,
      departures,
      ...(product.type === "tour"
        ? { tourScheduled: product.tour_scheduled, basePrice: product.price }
        : {}),
      ...(quote ? { maxGuests: quote.maxGuests } : {}),
    });
  } catch (error) {
    return errorResponse(error);
  }
}
