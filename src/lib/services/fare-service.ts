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
    "SELECT price FROM transfer_fares WHERE route=$1 AND vehicle=$2",
    [route, vehicle],
  );

  if (!rows[0]) return null;

  return {
    price: rows[0].price,
    productId: `transfer-${route}-${vehicle}`,
  };
}
