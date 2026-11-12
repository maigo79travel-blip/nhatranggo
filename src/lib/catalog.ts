import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { db } from "./db";
import { parseLocale } from "@/modules/settings/locale";
import type { SiteData, ContentEntry, Fare, Product } from "./types";
import { publicProductWhere } from "./services/product-visibility";
export const getSiteData = cache(async (): Promise<SiteData> => {
  const locale = parseLocale((await cookies()).get("site_locale")?.value);
  const [products, entries, fares, destinations] = await Promise.all([
    db.query<Product>(
      `SELECT p.*,COALESCE(t.value->>'title',p.title) AS title,COALESCE(t.value->>'description',p.description) AS description,COALESCE(t.value->>'location',p.location) AS location,COALESCE(t.value->'content',p.content) AS content FROM products p LEFT JOIN translations t ON t.entity='product' AND t.entity_key=p.id AND t.locale=$1 WHERE ${publicProductWhere} ORDER BY p.position,p.id`,
      [locale],
    ),
    db.query<ContentEntry & { key: string }>(
      `SELECT c.key,c.kind,c.label,COALESCE(t.value->'value',c.value) AS value FROM site_content c LEFT JOIN translations t ON t.entity='content' AND t.entity_key=c.key AND t.locale=$1 ORDER BY c.key`,
      [locale],
    ),
    db.query<Fare>(
      "SELECT f.route,f.vehicle,f.price FROM transfer_fares f LEFT JOIN transfer_routes r ON r.code=f.route WHERE r.id IS NULL OR r.active=true ORDER BY f.route,f.vehicle",
    ),
    db.query<{ id: string; name: string; code: string }>(
      "SELECT id,name,code FROM destinations WHERE active=true ORDER BY name",
    ),
  ]);
  return {
    products: products.rows,
    content: Object.fromEntries(
      entries.rows.map(({ key, ...entry }) => [key, entry]),
    ),
    fares: fares.rows,
    destinations: destinations.rows,
    locale,
  };
});
