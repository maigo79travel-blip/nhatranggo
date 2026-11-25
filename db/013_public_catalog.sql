ALTER TABLE transfer_routes
  ADD COLUMN category text NOT NULL DEFAULT 'local'
  CHECK (category IN ('airport','local','intercity'));

INSERT INTO transfer_routes(id,code,pickup_id,dropoff_id,title)
SELECT gen_random_uuid(),f.route,pickup.id,dropoff.id,pickup.name||' → '||dropoff.name
FROM (SELECT DISTINCT route FROM transfer_fares) f
JOIN destinations pickup ON starts_with(f.route,pickup.code||'_')
JOIN destinations dropoff ON dropoff.code=substring(f.route FROM length(pickup.code)+2)
WHERE pickup.id<>dropoff.id
ORDER BY pickup.id,dropoff.id
ON CONFLICT(code) DO NOTHING;

UPDATE transfer_routes r SET category=CASE
  WHEN 'CXR' IN (pickup.code,dropoff.code) THEN 'airport'
  WHEN pickup.code IN ('DALAT','TUY_HOA') OR dropoff.code IN ('DALAT','TUY_HOA') THEN 'intercity'
  ELSE 'local'
END
FROM destinations pickup,destinations dropoff
WHERE pickup.id=r.pickup_id AND dropoff.id=r.dropoff_id;

CREATE INDEX products_public_type_position_idx ON products(type,position,id) WHERE active;
CREATE INDEX rooms_public_product_price_idx ON rooms(product_id,price,id) WHERE active;
CREATE INDEX site_content_scope_idx ON site_content(scope);
