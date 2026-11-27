import "server-only";

// Route joins use r, pickup and dropoff. Product queries use p.
export const publicRouteWhere = "r.active AND pickup.active AND dropoff.active";

export const publicRouteDestinations =
  "JOIN destinations pickup ON pickup.id = r.pickup_id JOIN destinations dropoff ON dropoff.id = r.dropoff_id";

export const publicProductWhere = `
  p.active AND (
    p.type <> 'transfer' OR EXISTS (
      SELECT 1
      FROM transfer_fares f
      JOIN transfer_routes r ON r.code=f.route
      ${publicRouteDestinations}
      WHERE f.route=split_part(p.id,'-',2)
        AND f.vehicle=split_part(p.id,'-',3)
        AND f.active
        AND p.id='transfer-'||f.route||'-'||f.vehicle
        AND ${publicRouteWhere}
    )
  )
`;

export const publicFareFrom = `
  FROM transfer_fares f
  JOIN transfer_routes r ON r.code=f.route
  ${publicRouteDestinations}
  JOIN products p ON p.id='transfer-'||f.route||'-'||f.vehicle AND p.type='transfer'
`;

export const publicFareWhere = `f.active AND p.active AND ${publicRouteWhere}`;

// Public views never select internal relationships, timestamps or future columns.
export const publicProductFields = (
  price = "p.price",
  originalPrice = "p.original_price",
) => `
  p.id,p.type,${price} AS price,p.image,p.rating,${originalPrice} AS original_price,p.active,
  p.position,p.collection_id,p.template_id,p.destination_id,
  concat_ws(
    ' ',
    p.title,
    p.location,
    p.description,
    (
      SELECT string_agg(entry.value->>'value', ' ')
      FROM jsonb_each(COALESCE(p.content, '{}'::jsonb)) AS entry
      WHERE entry.value->>'kind' = 'text'
    )
  ) AS search_text,
  COALESCE(t.value->>'title',p.title) AS title,
  COALESCE(t.value->>'description',p.description) AS description,
  COALESCE(t.value->>'location',p.location) AS location,
  p.content || COALESCE(t.value->'content','{}'::jsonb) AS content
`;
