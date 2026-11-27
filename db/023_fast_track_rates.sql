INSERT INTO site_content (key, scope, kind, label, value)
VALUES (
  'fast-track.rates',
  'fast-track',
  'settings',
  'Bảng giá Fast-track Cam Ranh',
  '{
    "passport-control":{"usd":20,"vnd":530000},
    "arrival-fast-track":{"usd":22,"vnd":583000},
    "vip-b-passport":{"usd":35,"vnd":927500},
    "vip-b-fast-track":{"usd":35,"vnd":927500},
    "vip-pro-passport":{"usd":50,"vnd":1325000},
    "vip-pro-fast-track":{"usd":50,"vnd":1325000},
    "departure-assistance":{"usd":25,"vnd":662500},
    "departure-vip":{"usd":37,"vnd":980500},
    "luggage-assistance":{"usd":20,"vnd":530000},
    "night-arrival":{"usd":5,"vnd":132500}
  }'::jsonb
)
ON CONFLICT (key) DO NOTHING;
