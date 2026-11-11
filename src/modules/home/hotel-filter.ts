import type { Product } from "@/lib/types";
import { normalizeSearch } from "@/modules/travel/search";
export type HomeHotelFilter =
  "all" | "cam-ranh" | "nha-trang" | "beach" | "pool";
export function matchesHotelFilter(product: Product, filter: HomeHotelFilter) {
  if (filter === "all") return true;
  const text = normalizeSearch(
    [
      product.title,
      product.location,
      product.description,
      ...Object.values(product.content || {})
        .filter((entry) => entry.kind === "text")
        .map((entry) => String(entry.value)),
    ].join(" "),
  );
  const terms: Record<Exclude<HomeHotelFilter, "all">, string[]> = {
    "cam-ranh": ["cam ranh"],
    "nha-trang": ["nha trang"],
    beach: ["bien", "beach"],
    pool: ["vo cuc", "infinity"],
  };
  return terms[filter].some((term) => text.includes(term));
}
