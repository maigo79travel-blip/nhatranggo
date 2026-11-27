import "server-only";
import type { PoolClient } from "pg";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import { getCurrentMessages } from "@/lib/i18n";
import type { TourDeparture } from "./tour-departure-types";

// Availability readers use "d" for the departure being checked.
export const tourBookedGuests = `(
  SELECT COALESCE(sum(b.guests), 0)::int FROM bookings b
  WHERE b.product_id = d.product_id AND b.departure_date = d.date
    AND b.status <> 'cancelled'
)`;

export async function listBookableTourDepartures(
  productId: string,
  today: string,
) {
  const { rows } = await db.query<TourDeparture>(
    `SELECT d.id, d.date::text, d.price_override,
            CASE WHEN d.capacity IS NOT NULL
                 THEN GREATEST(0, d.capacity - ${tourBookedGuests}) END AS remaining_seats
     FROM departures d
     WHERE d.product_id=$1 AND d.active AND d.date >= $2::date
     ORDER BY d.date`,
    [productId, today],
  );
  return rows.filter((departure) => departure.remaining_seats !== 0);
}

export async function reserveTourSeats(
  client: PoolClient,
  productId: string,
  date: string,
  guests: number,
) {
  const {
    rows: [departure],
  } = await client.query<{
    id: string;
    active: boolean;
    capacity: number | null;
    price_override: number | null;
  }>(
    `SELECT id, active, capacity, price_override FROM departures
     WHERE product_id=$1 AND date=$2::date FOR UPDATE`,
    [productId, date],
  );
  if (!departure) {
    const scheduled = await client.query(
      "SELECT 1 FROM departures WHERE product_id=$1 LIMIT 1",
      [productId],
    );
    if (!scheduled.rowCount) return null;
  }
  const t = await getCurrentMessages();
  if (!departure?.active) throw new AppError(t.errors.tourNoDeparture);
  if (departure.capacity !== null) {
    // A fresh snapshot sees bookings committed while waiting for the departure lock.
    const {
      rows: [usage],
    } = await client.query<{ seats: number }>(
      `SELECT ${tourBookedGuests} AS seats FROM departures d WHERE d.id=$1`,
      [departure.id],
    );
    if (usage.seats + guests > departure.capacity)
      throw new AppError(t.errors.tourSeatsUnavailable, 409);
  }
  return departure.price_override;
}
