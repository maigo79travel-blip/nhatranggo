import "server-only";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/locale";
import type { Product } from "@/lib/types";
import {
  publicProductFields,
  publicProductWhere,
  publicRouteDestinations,
} from "./product-visibility";
import { normalizeSearch } from "./search";
import {
  homeHotelTerms,
  homeProductLimits,
  type HomeHotelFilter,
} from "./home-catalog-options";

const sortOrders = {
  recommended: "p.position,p.id",
  price: "p.price,p.id",
  "price-desc": "p.price DESC,p.id",
  rating: "p.rating DESC,p.id",
} as const;

const accents =
  "àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ";
const ascii = normalizeSearch(accents);
const pattern = (value: string) =>
  "%" + normalizeSearch(value).replace(/[\\%_]/g, "\\$&") + "%";

const localizedTitle = "COALESCE(t.value->>'title',p.title)";
const localizedLocation = "COALESCE(t.value->>'location',p.location)";
const localizedSearch = `translate(lower(concat_ws(' ',${localizedTitle},${localizedLocation})), '${accents}', '${ascii}')`;
const categorySearch = `translate(lower(concat_ws(' ',${localizedTitle},${localizedLocation},p.title,p.location,p.description,p.content::text)), '${accents}', '${ascii}')`;

export async function listHomeProducts(locale: Locale) {
  const { rows } = await db.query<Product>(
    `SELECT card.*
     FROM unnest($2::text[], $3::int[]) AS section(type, size)
     CROSS JOIN LATERAL (
       SELECT ${publicProductFields},p.featured
       FROM products p LEFT JOIN translations t
         ON t.entity='product' AND t.entity_key=p.id AND t.locale=$1
       WHERE p.type=section.type AND p.active
       ORDER BY p.featured DESC,p.position,p.id LIMIT section.size
     ) AS card
     ORDER BY card.featured DESC,card.position,card.id`,
    [locale, Object.keys(homeProductLimits), Object.values(homeProductLimits)],
  );
  return rows;
}

export async function findHomeSearchTypes(
  locale: Locale,
  queries: readonly string[],
) {
  if (!queries.length) return new Map<string, string[]>();
  const { rows } = await db.query<{ query: string; types: string[] }>(
    `SELECT suggestion.query, array_agg(DISTINCT p.type) AS types
     FROM unnest($2::text[], $3::text[]) AS suggestion(query, pattern)
     JOIN products p ON p.active AND p.type IN ('hotel','tour','combo')
     LEFT JOIN translations t
       ON t.entity='product' AND t.entity_key=p.id AND t.locale=$1
     WHERE ${localizedSearch} LIKE suggestion.pattern
     GROUP BY suggestion.query`,
    [locale, queries, queries.map(pattern)],
  );
  return new Map(rows.map(({ query, types }) => [query, types]));
}

export async function listPublicProducts({
  locale,
  types,
  query = "",
  sort = "recommended",
  featuredFirst = false,
  homeHotelFilter,
  destination,
  categoryTerms,
  date,
  guests,
  limit,
  offset = 0,
}: {
  locale: Locale;
  types?: readonly string[];
  query?: string;
  sort?: keyof typeof sortOrders;
  featuredFirst?: boolean;
  homeHotelFilter?: HomeHotelFilter;
  destination?: string;
  categoryTerms?: readonly string[];
  date?: string;
  guests?: number;
  limit?: number;
  offset?: number;
}) {
  const values: unknown[] = [locale];
  const bind = (value: unknown) => "$" + values.push(value);
  const where = [publicProductWhere];
  if (types?.length) where.push(`p.type=ANY(${bind(types)}::text[])`);
  if (destination) where.push(`p.destination_id=${bind(destination)}::uuid`);
  const search = query.split(/[,;]/).map(normalizeSearch).filter(Boolean);
  if (search.length) {
    where.push(`translate(lower(concat_ws(' ',${localizedTitle}, ${localizedLocation},
      CASE WHEN p.type='transfer' THEN (SELECT pickup.name||' '||dropoff.name
        FROM transfer_routes r ${publicRouteDestinations} WHERE r.code=split_part(p.id,'-',2)) END)), '${accents}', '${ascii}') LIKE ANY(${bind(search.map(pattern))}::text[])`);
  }
  if (categoryTerms?.length)
    where.push(
      `${categorySearch} LIKE ANY(${bind(categoryTerms.map(pattern))}::text[])`,
    );
  if (homeHotelFilter && homeHotelFilter !== "all") {
    where.push(
      homeHotelFilter === "special-deal"
        ? "p.original_price > p.price"
        : `${categorySearch} LIKE ANY(${bind(homeHotelTerms[homeHotelFilter].map(pattern))}::text[])`,
    );
  }
  if (date) {
    where.push(`(p.type<>'tour' OR NOT EXISTS (SELECT 1 FROM departures d WHERE d.product_id=p.id AND d.active)
      OR EXISTS (SELECT 1 FROM departures d WHERE d.product_id=p.id AND d.active AND d.date=${bind(date)}::date))`);
  }
  if (guests) {
    const capacity = bind(guests);
    where.push(`(p.type<>'hotel' OR NOT EXISTS (SELECT 1 FROM rooms r WHERE r.product_id=p.id AND r.active)
      OR EXISTS (SELECT 1 FROM rooms r WHERE r.product_id=p.id AND r.active AND r.capacity>=${capacity}))`);
    where.push(`(p.type<>'transfer' OR EXISTS (SELECT 1 FROM transfer_vehicle_types v
      WHERE v.code=split_part(p.id,'-',3) AND v.passenger_capacity>=${capacity}))`);
  }

  return (
    await db.query<Product>(
      `SELECT ${publicProductFields}
       FROM products p LEFT JOIN translations t
         ON t.entity='product' AND t.entity_key=p.id AND t.locale=$1
       WHERE ${where.join(" AND ")}
       ORDER BY ${featuredFirst ? "p.featured DESC," : ""}${sortOrders[sort]} LIMIT ${bind(limit ?? null)} OFFSET ${bind(offset)}`,
      values,
    )
  ).rows;
}
