ALTER TABLE products ADD COLUMN IF NOT EXISTS original_price integer CHECK(original_price >= 0);
ALTER TABLE products ADD COLUMN IF NOT EXISTS collection_id text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS template_id text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;
ALTER TABLE products ADD COLUMN IF NOT EXISTS content jsonb NOT NULL DEFAULT '{}';
ALTER TABLE products ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
CREATE INDEX IF NOT EXISTS products_collection_idx ON products(collection_id,position);
CREATE TABLE IF NOT EXISTS site_content (
  key text PRIMARY KEY,
  scope text NOT NULL,
  label text NOT NULL,
  kind text NOT NULL CHECK(kind IN ('text','attributes','settings')),
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY,
  username text NOT NULL UNIQUE,
  password_hash text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS admin_sessions (
  token_hash text PRIMARY KEY,
  user_id uuid NOT NULL REFERENCES admin_users(id) ON DELETE CASCADE,
  expires_at timestamptz NOT NULL
);
