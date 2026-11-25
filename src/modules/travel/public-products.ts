import "server-only";
import { db } from "@/lib/db";
import type { Locale } from "@/lib/locale";
import type { Product } from "@/lib/types";
import { publicProductFields, publicProductWhere } from "./product-visibility";

const sortOrders = {
  recommended: "p.position,p.id",
  price: "p.price,p.id",
  rating: "p.rating DESC,p.id",
} as const;

export async function listPublicProducts({
  locale,
  types,
  query = "",
  sort = "recommended",
  featuredFirst = false,
  limit,
  offset = 0,
}: {
  locale: Locale;
  types?: readonly string[];
  query?: string;
  sort?: keyof typeof sortOrders;
  featuredFirst?: boolean;
  limit?: number;
  offset?: number;
}) {
  const pattern = query.replace(/[\\%_]/g, "\\$&");
  return (
    await db.query<Product>(
      `SELECT ${publicProductFields}
     FROM products p LEFT JOIN translations t
       ON t.entity='product' AND t.entity_key=p.id AND t.locale=$1
     WHERE ($2::text[] IS NULL OR p.type=ANY($2))
       AND ${publicProductWhere}
       AND ($3='' OR COALESCE(t.value->>'title',p.title) ILIKE '%'||$3||'%'
         OR COALESCE(t.value->>'location',p.location) ILIKE '%'||$3||'%')
     ORDER BY ${featuredFirst ? "p.featured DESC," : ""}${sortOrders[sort]} LIMIT $4 OFFSET $5`,
      [locale, types ?? null, pattern, limit ?? null, offset],
    )
  ).rows;
}
