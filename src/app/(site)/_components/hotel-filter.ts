import type { Product } from "@/lib/types";
import { productSearchBlob } from "@/modules/travel/search";

export type HomeHotelFilter =
  | "all"
  | "near-beach"
  | "family"
  | "resort"
  | "special-deal";

export function matchesHotelFilter(product: Product, filter: HomeHotelFilter) {
  if (filter === "all") return true;
  const text = productSearchBlob(product);
  const terms: Record<Exclude<HomeHotelFilter, "all">, string[]> = {
    "near-beach": ["bien", "bai dai", "tran phu", "beach"],
    family: ["gia dinh", "tre em", "cho be", "duoi 12", "water park", "cinema", "can ho"],
    resort: ["resort"],
    "special-deal": ["mien phi", "tang", "giam", "uu dai"],
  };
  return terms[filter].some((term) => text.includes(term));
}
