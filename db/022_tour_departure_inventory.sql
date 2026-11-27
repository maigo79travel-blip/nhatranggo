ALTER TABLE departures
  ADD COLUMN capacity integer CHECK (capacity BETWEEN 1 AND 10000),
  ADD COLUMN price_override integer CHECK (price_override BETWEEN 0 AND 2000000000),
  ADD COLUMN revision integer NOT NULL DEFAULT 1;

CREATE INDEX departures_admin_date_idx ON departures (date, id);
CREATE INDEX bookings_tour_seats_idx ON bookings (product_id, departure_date)
  INCLUDE (guests) WHERE status <> 'cancelled';
