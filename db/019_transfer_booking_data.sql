CREATE TABLE transfer_vehicle_types (
  code text PRIMARY KEY,
  seats smallint NOT NULL CHECK (seats > 0),
  passenger_capacity smallint NOT NULL CHECK (passenger_capacity > 0 AND passenger_capacity <= seats)
);

INSERT INTO transfer_vehicle_types (code,seats,passenger_capacity) VALUES
  ('4cho',4,3), ('7cho',7,5), ('16cho',16,15);

ALTER TABLE transfer_vehicle_types ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE transfer_vehicle_types FROM PUBLIC;
DO $$
DECLARE api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon','authenticated'] LOOP
    IF EXISTS (SELECT FROM pg_roles WHERE rolname=api_role) THEN
      EXECUTE format('REVOKE ALL ON TABLE transfer_vehicle_types FROM %I', api_role);
    END IF;
  END LOOP;
END $$;

ALTER TABLE bookings
  ADD COLUMN return_time time,
  ADD COLUMN return_unit_price integer CHECK (return_unit_price >= 0),
  ADD COLUMN flight_number text CHECK (char_length(flight_number) <= 30),
  ADD CHECK (return_time IS NULL OR return_date IS NOT NULL),
  ADD CHECK (return_unit_price IS NULL OR return_time IS NOT NULL);

CREATE INDEX IF NOT EXISTS departures_public_product_date_idx
  ON departures(product_id,date) WHERE active;
