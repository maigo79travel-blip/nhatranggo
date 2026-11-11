CREATE TABLE IF NOT EXISTS favorites (
  visitor_id text NOT NULL,
  product_id text NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY(visitor_id,product_id)
);
