import "server-only";
import type { PoolClient } from "pg";
import { db } from "@/lib/db";
import { publicFareFrom, publicFareWhere } from "./product-visibility";

export type FareQuote = {
  price: number;
  productId: string;
  maxGuests: number;
  returnPrice: number | null;
};

async function findFare(
  selection: string,
  params: readonly string[],
  roundTrip: boolean,
  connection: Pick<PoolClient, "query"> = db,
): Promise<FareQuote | null> {
  const { rows } = await connection.query<FareQuote>(
    `SELECT outbound.price,outbound.id AS "productId",outbound.capacity AS "maxGuests",
       CASE WHEN $${params.length + 1}::boolean THEN (
         SELECT f.price ${publicFareFrom}
         WHERE pickup.id=outbound.dropoff_id AND dropoff.id=outbound.pickup_id
           AND f.route=pickup.code||'_'||dropoff.code
           AND f.vehicle=outbound.vehicle AND ${publicFareWhere}
       ) END AS "returnPrice"
     FROM (
       SELECT f.price,p.id,f.vehicle,r.pickup_id,r.dropoff_id,v.passenger_capacity AS capacity
       ${publicFareFrom}
       JOIN transfer_vehicle_types v ON v.code=f.vehicle
       WHERE ${selection} AND ${publicFareWhere}
     ) AS outbound`,
    [...params, roundTrip],
  );
  return rows[0] ?? null;
}

export function getFareQuote(
  pickup: string,
  dropoff: string,
  vehicle: string,
  roundTrip = false,
) {
  return findFare(
    "pickup.code=$1 AND dropoff.code=$2 AND f.route=$1||'_'||$2 AND f.vehicle=$3",
    [pickup, dropoff, vehicle],
    roundTrip,
  );
}

export function getTransferFareForProduct(
  id: string,
  roundTrip = false,
  client?: PoolClient,
) {
  return findFare(
    "p.id=$1 AND f.route=split_part($1,'-',2) AND f.vehicle=split_part($1,'-',3)",
    [id],
    roundTrip,
    client,
  );
}
