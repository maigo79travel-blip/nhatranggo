import "server-only";
import { db } from "@/lib/db";

export type FareQuote = {
  price: number;
  productId: string;
};

export async function getFareQuote(
  pickup: string,
  dropoff: string,
  vehicle = "4cho",
): Promise<FareQuote | null> {
  const route = `${pickup}_${dropoff}`;
  const { rows } = await db.query<{ price: number }>(
    "SELECT f.price FROM transfer_fares f LEFT JOIN transfer_routes r ON r.code=f.route JOIN products p ON p.id='transfer-'||f.route||'-'||f.vehicle WHERE f.route=$1 AND f.vehicle=$2 AND p.active=true AND (r.id IS NULL OR r.active=true)",
    [route, vehicle],
  );

  if (!rows[0]) return null;

  return {
    price: rows[0].price,
    productId: `transfer-${route}-${vehicle}`,
  };
}
