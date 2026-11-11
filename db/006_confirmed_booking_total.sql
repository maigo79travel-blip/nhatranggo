ALTER TABLE bookings ADD COLUMN IF NOT EXISTS confirmed_total bigint CHECK(confirmed_total>=0);
