CREATE INDEX IF NOT EXISTS bookings_admin_created_idx ON bookings (created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS bookings_admin_status_created_idx ON bookings (status, created_at DESC, id DESC);
CREATE INDEX IF NOT EXISTS bookings_admin_departure_idx ON bookings (departure_date);
