import type { Product } from "@/lib/types";
import { normalizeSearch, productSearchBlob } from "@/modules/travel/search";
import type { HotelSearchState } from "./hotels-hero";

export type SortMode =
  "recommended" | "deals" | "price-asc" | "rating-desc" | "beach";

export interface FilterState {
  maxPrice: number;
  priceRanges: string[];
  stars: string[];
  areas: string[];
  amenities: string[];
  policies: string[];
}

export type ArrayFilterKey =
  "priceRanges" | "stars" | "areas" | "amenities" | "policies";

export const MAX_SLIDER_PRICE = 8_000_000;
export const MIN_SLIDER_PRICE = 500_000;

export const emptyFilters: FilterState = {
  maxPrice: MAX_SLIDER_PRICE,
  priceRanges: [],
  stars: [],
  areas: [],
  amenities: [],
  policies: [],
};

export const areaKeywords: Record<string, string[]> = {
  "tran-phu": ["tran phu"],
  "bai-dai": ["bai dai", "cam ranh"],
  "hon-tre": ["hon tre", "vinpearl"],
  "pho-tay": ["nguyen thien thuat", "loc tho"],
  "an-vien": ["an vien"],
};

export const filterGroups: {
  key: ArrayFilterKey;
  title: string;
  options: { id: string; label: string }[];
}[] = [
  {
    key: "priceRanges",
    title: "Khoảng giá / đêm",
    options: [
      { id: "under-1m", label: "Dưới 1.000.000đ" },
      { id: "1m-2m", label: "1.000.000đ - 2.000.000đ" },
      { id: "2m-4m", label: "2.000.000đ - 4.000.000đ" },
      { id: "over-4m", label: "Trên 4.000.000đ (Luxury)" },
    ],
  },
  {
    key: "stars",
    title: "Hạng sao chuẩn quốc tế",
    options: [
      { id: "3", label: "3 Sao" },
      { id: "4", label: "4 Sao" },
      { id: "5", label: "5 Sao VIP" },
    ],
  },
  {
    key: "areas",
    title: "Khu vực địa lý",
    options: [
      { id: "tran-phu", label: "Trục đường biển Trần Phú" },
      { id: "bai-dai", label: "Bãi Dài Cam Ranh Resort" },
      { id: "hon-tre", label: "Đảo Hòn Tre (Vinpearl)" },
      { id: "pho-tay", label: "Trung tâm Phố Tây Nguyễn Thiện Thuật" },
      { id: "an-vien", label: "Khu biệt thự ven biển An Viên" },
    ],
  },
  {
    key: "amenities",
    title: "Tiện ích đặc quyền",
    options: [
      { id: "infinity-pool", label: "Hồ bơi vô cực tràn bờ" },
      { id: "private-beach", label: "Bãi tắm riêng sát biển" },
      { id: "buffet", label: "Miễn phí buffet sáng cao cấp" },
      { id: "airport-shuttle", label: "Đưa đón sân bay miễn phí" },
      { id: "water-park", label: "Công viên nước nội khu (Water Park)" },
      { id: "spa", label: "Liệu trình Spa & Massage tặng kèm" },
      { id: "kids-free", label: "Miễn phí 1–2 trẻ em dưới 6–12 tuổi" },
    ],
  },
  {
    key: "policies",
    title: "Chính sách linh hoạt",
    options: [
      { id: "free-cancel", label: "Miễn phí hủy phòng trước 48h" },
      { id: "zero-deposit", label: "Thanh toán linh hoạt / Giữ chỗ 0đ" },
    ],
  },
];

export const sortOptions: { id: SortMode; label: string }[] = [
  { id: "recommended", label: "Sắp xếp" },
  { id: "deals", label: "Ưu đãi tốt nhất" },
  { id: "price-asc", label: "Giá thấp nhất" },
  { id: "rating-desc", label: "Đánh giá cao nhất" },
  { id: "beach", label: "Gần biển nhất" },
];

export function matchesFilters(
  product: Product,
  filters: FilterState,
  search: HotelSearchState,
) {
  const text = productSearchBlob(product);

  if (search.query.trim()) {
    const q = normalizeSearch(search.query);
    if (
      !q.includes("nha trang, khanh hoa") &&
      !q.includes("nha trang - khanh hoa")
    ) {
      if (!text.includes(q)) return false;
    }
  }

  const requestedStars = search.category.match(/^([345])-star$/)?.[1];
  if (requestedStars && !text.includes(`${requestedStars} sao`)) return false;
  if (search.category === "resort" && !text.includes("resort")) return false;

  if (filters.maxPrice < MAX_SLIDER_PRICE && product.price > filters.maxPrice) {
    return false;
  }

  if (filters.priceRanges.length > 0) {
    const inPrice = filters.priceRanges.some((range) => {
      if (range === "under-1m") return product.price < 1_000_000;
      if (range === "1m-2m")
        return product.price >= 1_000_000 && product.price <= 2_000_000;
      if (range === "2m-4m")
        return product.price > 2_000_000 && product.price <= 4_000_000;
      return product.price > 4_000_000;
    });
    if (!inPrice) return false;
  }

  if (filters.stars.length > 0) {
    const hasStar = filters.stars.some((star) => text.includes(`${star} sao`));
    if (!hasStar) return false;
  }

  if (filters.areas.length > 0) {
    const hasArea = filters.areas.some((area) =>
      areaKeywords[area]?.some((kw) => text.includes(kw)),
    );
    if (!hasArea) return false;
  }

  if (filters.amenities.length > 0) {
    const amenityMap: Record<string, string[]> = {
      "infinity-pool": ["ho boi", "vo cuc", "be boi"],
      "private-beach": ["bai cat", "bai tam", "bien", "beach"],
      buffet: ["buffet", "bua sang"],
      "airport-shuttle": ["san bay", "dua don", "xe bus"],
      "water-park": ["water park", "cong vien nuoc"],
      spa: ["spa", "massage"],
      "kids-free": ["tre em", "cho be", "duoi 12"],
    };
    const hasAmenity = filters.amenities.every((item) =>
      amenityMap[item]?.some((kw) => text.includes(kw)),
    );
    if (!hasAmenity) return false;
  }

  if (filters.policies.length > 0) {
    const policyMap: Record<string, string[]> = {
      "free-cancel": ["huy phong", "linh hoat"],
      "zero-deposit": ["xac nhan", "zalo", "0d"],
    };
    const hasPolicy = filters.policies.every((item) =>
      policyMap[item]?.some((kw) => text.includes(kw)),
    );
    if (!hasPolicy) return false;
  }

  return true;
}
