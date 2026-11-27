import "server-only";
import { cache } from "react";
import { db } from "./db";
import { getPublicLocale } from "./i18n";
import type {
  SiteData,
  ContentEntry,
  Fare,
  TransferRoute,
  TransferVehicleType,
} from "./types";
import {
  publicFareFrom,
  publicFareWhere,
  publicRouteDestinations,
  publicRouteWhere,
} from "@/modules/travel/product-visibility";
import {
  listHomeProducts,
  listPublicProducts,
} from "@/modules/travel/public-products";

export { getPublicLocale };

export const getSiteContent = cache(async (scope: string) => {
  const locale = await getPublicLocale();
  const { rows } = await db.query<ContentEntry & { key: string }>(
    `SELECT c.key,c.kind,c.label,COALESCE(t.value->'value',c.value) AS value
     FROM site_content c
     LEFT JOIN translations t ON t.entity='content' AND t.entity_key=c.key AND t.locale=$1
     WHERE c.scope=ANY($2::text[])`,
    [locale, scope === "shared" ? ["header", "footer", "site"] : [scope]],
  );
  return Object.fromEntries(rows.map(({ key, ...entry }) => [key, entry]));
});

export const getPublicDestinations = cache(
  async () =>
    (
      await db.query<SiteData["destinations"][number]>(
        "SELECT id,name,code FROM destinations WHERE active=true ORDER BY name,id",
      )
    ).rows,
);

const pageProductTypes = {
  hotels: ["hotel"],
  tours: ["tour"],
  transfers: ["transfer"],
} as const;

export const getSiteData = cache(
  async (scope: keyof typeof pageProductTypes | "home"): Promise<SiteData> => {
    const locale = await getPublicLocale();
    const transfersPage = scope === "transfers";
    const [
      products,
      content,
      fares,
      destinations,
      transferRoutes,
      hotelRooms,
      vehicleTypes,
    ] = await Promise.all([
      scope === "home"
        ? listHomeProducts(locale)
        : listPublicProducts({
            locale,
            types: pageProductTypes[scope],
            featuredFirst: scope === "tours",
          }),
      getSiteContent(scope),
      transfersPage
        ? db.query<Fare>(
            `SELECT f.route,f.vehicle,f.price ${publicFareFrom} WHERE ${publicFareWhere} ORDER BY f.route,f.vehicle`,
          )
        : null,
      transfersPage || scope === "tours" ? getPublicDestinations() : [],
      transfersPage
        ? db.query<TransferRoute>(
            `SELECT r.code,r.title,r.category,pickup.code AS pickup,dropoff.code AS dropoff
           FROM transfer_routes r ${publicRouteDestinations}
           WHERE ${publicRouteWhere}
           ORDER BY CASE r.code WHEN 'CXR_NT_CENTER' THEN 0 WHEN 'CXR_BAI_DAI' THEN 1 ELSE 2 END,r.title,r.code`,
          )
        : null,
      scope === "hotels"
        ? db.query<{ id: string; capacity: number }>(
            `SELECT p.id,max(room.capacity)::int AS capacity
           FROM rooms room JOIN products p ON p.id=room.product_id
           WHERE room.active AND p.active AND p.type='hotel' GROUP BY p.id`,
          )
        : null,
      transfersPage
        ? db.query<TransferVehicleType>(
            "SELECT code,seats,passenger_capacity FROM transfer_vehicle_types ORDER BY seats,code",
          )
        : null,
    ]);
    return {
      products,
      content,
      fares: fares?.rows ?? [],
      destinations,
      transferRoutes: transferRoutes?.rows ?? [],
      transferVehicleTypes: vehicleTypes?.rows ?? [],
      hotelCapacities: Object.fromEntries(
        (hotelRooms?.rows ?? []).map(({ id, capacity }) => [id, capacity]),
      ),
      locale,
    };
  },
);
