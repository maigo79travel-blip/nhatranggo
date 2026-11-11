import "server-only";
import { cache } from "react";
import { db } from "./db";
import type { SiteData, ContentEntry, Fare } from "@/components/content";
import type { Product } from "./types";
export const getSiteData = cache(async (): Promise<SiteData> => {
  const [products, entries, fares] = await Promise.all([
    db.query<Product>(
      "SELECT * FROM products WHERE active=true ORDER BY position,id",
    ),
    db.query<ContentEntry & { key: string }>(
      "SELECT key,kind,label,value FROM site_content ORDER BY key",
    ),
    db.query<Fare>(
      "SELECT route,vehicle,price FROM transfer_fares ORDER BY route,vehicle",
    ),
  ]);
  return {
    products: products.rows,
    content: Object.fromEntries(
      entries.rows.map(({ key, ...entry }) => [key, entry]),
    ),
    fares: fares.rows,
  };
});
