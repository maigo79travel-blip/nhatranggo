CREATE TABLE IF NOT EXISTS products (
  id text PRIMARY KEY,
  type text NOT NULL CHECK (type IN ('hotel','tour','combo','transfer')),
  title text NOT NULL,
  price integer NOT NULL CHECK(price >= 0),
  image text NOT NULL DEFAULT '',
  location text NOT NULL,
  rating real NOT NULL DEFAULT 4.8,
  description text NOT NULL DEFAULT '',
  position integer NOT NULL DEFAULT 0
);
CREATE INDEX IF NOT EXISTS products_type_idx ON products(type);
CREATE TABLE IF NOT EXISTS transfer_fares (
  route text NOT NULL, vehicle text NOT NULL, price integer NOT NULL CHECK(price >= 0),
  PRIMARY KEY(route,vehicle)
);
CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY,
  product_id text NOT NULL REFERENCES products(id),
  customer_name text NOT NULL,
  phone text NOT NULL,
  departure_date date NOT NULL,
  guests integer NOT NULL CHECK(guests BETWEEN 1 AND 100),
  unit_price integer NOT NULL CHECK(unit_price >= 0),
  notes text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS subscribers (
  email text PRIMARY KEY,
  created_at timestamptz NOT NULL DEFAULT now()
);
