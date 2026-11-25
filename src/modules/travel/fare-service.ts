import "server-only";
import { db } from "@/lib/db";
import { publicFareFrom, publicFareWhere } from "./product-visibility";

export type FareQuote = {
  price: number;
  productId: string;
};

export async function getFareQuote(
  pickup: string,
  dropoff: string,
  vehicle: string,
): Promise<FareQuote | null> {
  const { rows } = await db.query<FareQuote>(
    `SELECT f.price,p.id AS "productId"
     ${publicFareFrom}
     WHERE pickup.code=$1 AND dropoff.code=$2
       AND f.route=$1||'_'||$2 AND f.vehicle=$3 AND ${publicFareWhere}`,
    [pickup, dropoff, vehicle],
  );
  return rows[0] ?? null;
}
