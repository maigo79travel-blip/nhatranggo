CREATE TABLE IF NOT EXISTS request_limits (
  key text PRIMARY KEY,
  attempts integer NOT NULL CHECK(attempts>0),
  expires_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS request_limits_expiry_idx ON request_limits(expires_at);
