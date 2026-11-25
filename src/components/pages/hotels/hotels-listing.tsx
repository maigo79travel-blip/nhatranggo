"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/lib/types";
import { useSiteData } from "@/components/content";
import { useCatalog } from "@/components/catalog/catalog-context";
import { CatalogCard, ProductField } from "@/components/catalog";
import { PriceStack } from "@/components/price-stack";
import { normalizeSearch, productSearchBlob } from "@/modules/travel/search";
import type { HotelSearchState } from "./hotels-hero";

type SortMode = "recommended" | "price-asc" | "rating-desc" | "beach";

interface FilterState {
  maxPrice: number;
  priceRanges: string[];
  stars: string[];
  areas: string[];
  amenities: string[];
  policies: string[];
}

type ArrayFilterKey = "priceRanges" | "stars" | "areas" | "amenities" | "policies";

const MAX_SLIDER_PRICE = 8_000_000;
const MIN_SLIDER_PRICE = 500_000;

const emptyFilters: FilterState = {
  maxPrice: MAX_SLIDER_PRICE,
  priceRanges: [],
  stars: [],
  areas: [],
  amenities: [],
  policies: [],
};

const areaKeywords: Record<string, string[]> = {
  "tran-phu": ["tran phu"],
  "bai-dai": ["bai dai", "cam ranh"],
  "hon-tre": ["hon tre", "vinpearl"],
  "pho-tay": ["nguyen thien thuat", "loc tho"],
  "an-vien": ["an vien"],
};

const filterGroups: {
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

const sortOptions: { id: SortMode; label: string }[] = [
  { id: "recommended", label: "Ưu đãi tốt nhất" },
  { id: "price-asc", label: "Giá thấp nhất" },
  { id: "rating-desc", label: "Đánh giá cao nhất" },
  { id: "beach", label: "Gần biển nhất" },
];

function matchesFilters(
  product: Product,
  filters: FilterState,
  search: HotelSearchState,
) {
  const text = productSearchBlob(product);

  if (search.query.trim()) {
    const q = normalizeSearch(search.query);
    if (!q.includes("nha trang, khanh hoa") && !q.includes("nha trang - khanh hoa")) {
      if (!text.includes(q)) return false;
    }
  }

  if (search.category === "5-star" && !text.includes("5 sao")) return false;
  if (search.category === "4-star" && !text.includes("4 sao")) return false;
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
    const hasAmenity = filters.amenities.some((item) =>
      amenityMap[item]?.some((kw) => text.includes(kw)),
    );
    if (!hasAmenity) return false;
  }

  if (filters.policies.length > 0) {
    const policyMap: Record<string, string[]> = {
      "free-cancel": ["huy phong", "linh hoat"],
      "zero-deposit": ["xac nhan", "zalo", "0d"],
    };
    const hasPolicy = filters.policies.some((item) =>
      policyMap[item]?.some((kw) => text.includes(kw)),
    );
    if (!hasPolicy) return false;
  }

  return true;
}

function HotelCard({
  product,
  search,
}: {
  product: Product;
  search: HotelSearchState;
}) {
  const catalog = useCatalog();
  const contentValue = (key: string) => {
    const val = product.content?.[key]?.value;
    return typeof val === "string" ? val : "";
  };

  const promoTag = contentValue("field-003") || contentValue("field-004");
  const starLabel = contentValue("field-007") || "Khách sạn & Resort";
  const ratingDesc = contentValue("field-008") || "Rất Tuyệt Vời";
  const reviewCount = contentValue("field-009") || "Đánh giá thực tế";
  const amenities = ["field-010", "field-011", "field-012"]
    .map(contentValue)
    .filter(Boolean);
  const policyText = contentValue("field-013");
  const mealNote = contentValue("field-015") || product.description;
  const ctaLabel = contentValue("field-016") || "Xem phòng & Đặt ngay";
  const starCount = starLabel.includes("4") ? 4 : starLabel.includes("3") ? 3 : 5;

  return (
    <CatalogCard
      productId={product.id}
      tag="article"
      className="bg-surface-container-lowest rounded-2xl border border-border-light shadow-card hover:shadow-card-hover transition-all duration-200 p-4 flex flex-col md:flex-row gap-5"
    >
      <div className="relative w-full md:w-[240px] aspect-[16/10] rounded-2xl overflow-hidden shrink-0">
        {promoTag && (
          <span className="absolute top-2.5 left-2.5 z-10 px-2.5 py-1 rounded-full bg-sale-crimson text-white text-[11px] font-bold shadow-sm">
            {promoTag}
          </span>
        )}
        <ProductField
          id={product.id}
          field="image"
          tag="div"
          className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute bottom-2.5 left-2.5 z-10 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-on-surface/75 backdrop-blur-sm text-white text-[11px] font-medium">
          <span className="material-symbols-outlined text-[13px]">photo_camera</span>
          Ảnh thực tế
        </span>
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 text-xs mb-1">
                <span className="inline-flex items-center text-rating-star" aria-hidden="true">
                  {Array.from({ length: starCount }).map((_, idx) => (
                    <span key={idx} className="material-symbols-outlined text-[14px]">
                      star
                    </span>
                  ))}
                </span>
                <span className="font-bold text-primary">{starLabel}</span>
              </div>

              <ProductField
                id={product.id}
                field="title"
                tag="h3"
                className="font-headline-sm text-lg md:text-xl font-extrabold text-on-surface leading-snug"
              />
            </div>

            <div className="shrink-0 flex items-center gap-2">
              <div className="text-right hidden sm:block">
                <div className="text-xs font-extrabold text-primary leading-tight">
                  {ratingDesc}
                </div>
                <div className="text-[11px] text-outline">{reviewCount}</div>
              </div>
              <div className="bg-primary text-white rounded-xl px-2.5 py-1.5 font-extrabold text-sm leading-none shadow-sm">
                {product.rating.toFixed(1)}
              </div>
            </div>
          </div>

          <p className="text-xs text-on-surface-variant mt-1">
            {product.location}
          </p>

          {amenities.length > 0 ? (
            <ul className="flex flex-wrap gap-x-3 gap-y-1.5 mt-2.5">
              {amenities.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1 text-xs font-medium text-on-surface"
                >
                  <span className="material-symbols-outlined text-[15px] text-secondary">
                    check_circle
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-on-surface-variant mt-2.5 line-clamp-2">
              {product.description}
            </p>
          )}
        </div>

        {policyText && (
          <p className="text-xs text-outline pt-1">{policyText}</p>
        )}
      </div>

      <div className="md:w-[220px] shrink-0 flex flex-col justify-end md:items-end md:text-right border-t md:border-t-0 md:border-l border-border-light/80 pt-3 md:pt-0 md:pl-5 gap-2">
        <div className="flex md:flex-col items-baseline md:items-end gap-2 md:gap-0.5">
          <PriceStack productId={product.id}>
            <ProductField
              id={product.id}
              field="price"
              tag="span"
              className="text-2xl font-extrabold text-primary"
            >
              <span className="text-xs font-normal text-outline ml-1">
                /đêm
              </span>
            </ProductField>
          </PriceStack>
        </div>

        {mealNote && (
          <p className="text-xs text-on-surface-variant line-clamp-1">
            {mealNote}
          </p>
        )}

        <button
          type="button"
          onClick={() =>
            catalog.open(product, {
              date: search.checkIn,
              returnDate: search.checkOut,
              guests: Number(search.guests) || 2,
            })
          }
          className="w-full md:w-auto px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-bold text-sm shadow-sm transition-colors mt-1"
        >
          {ctaLabel}
        </button>
      </div>
    </CatalogCard>
  );
}

export function HotelsListing({
  search,
  onResetSearch,
}: {
  search: HotelSearchState;
  onResetSearch: () => void;
}) {
  const { products } = useSiteData();
  const [draftFilters, setDraftFilters] = useState<FilterState>(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortMode>("recommended");
  const [sortOpen, setSortOpen] = useState(false);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const hotels = useMemo(() => {
    const filtered = products.filter(
      (p) =>
        p.type === "hotel" &&
        p.active &&
        matchesFilters(p, appliedFilters, search),
    );
    return [...filtered].sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "rating-desc") return b.rating - a.rating;
      if (sort === "beach") {
        const aBeach = productSearchBlob(a).includes("bien") ? 0 : 1;
        const bBeach = productSearchBlob(b).includes("bien") ? 0 : 1;
        return aBeach - bBeach || b.rating - a.rating;
      }
      const aDiscount = a.original_price ? (a.original_price - a.price) / a.original_price : 0;
      const bDiscount = b.original_price ? (b.original_price - b.price) / b.original_price : 0;
      return bDiscount - aDiscount;
    });
  }, [products, appliedFilters, search, sort]);

  const areaCounts = useMemo(() => {
    const activeHotels = products.filter((p) => p.type === "hotel" && p.active);
    const counts: Record<string, number> = {};
    for (const [id, kws] of Object.entries(areaKeywords)) {
      counts[id] = activeHotels.filter((h) => {
        const blob = productSearchBlob(h);
        return kws.some((kw) => blob.includes(kw));
      }).length;
    }
    return counts;
  }, [products]);

  const toggleFilter = (group: ArrayFilterKey, id: string) => {
    setDraftFilters((prev) => {
      const exists = prev[group].includes(id);
      return {
        ...prev,
        [group]: exists
          ? prev[group].filter((item) => item !== id)
          : [...prev[group], id],
      };
    });
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
    setMobileFilterOpen(false);
  };

  const resetFilters = () => {
    setDraftFilters(emptyFilters);
    setAppliedFilters(emptyFilters);
    onResetSearch();
    setMobileFilterOpen(false);
  };

  const filterFormContent = (
    <div className="space-y-5">
      <div className="flex items-center justify-between pb-2 border-b border-border-light">
        <h2 className="font-title-md text-lg font-extrabold text-on-surface">
          Bộ Lọc Tìm Kiếm
        </h2>
        <button
          type="button"
          onClick={resetFilters}
          className="text-xs font-bold text-primary hover:underline"
        >
          Đặt lại
        </button>
      </div>

      {filterGroups.map((group) => (
        <div key={group.key} className="space-y-2.5">
          <h3 className="font-bold text-sm text-on-surface">{group.title}</h3>

          {group.key === "priceRanges" && (
            <div className="space-y-1.5 pb-1">
              <div className="flex items-center justify-between text-[11px] font-bold text-primary">
                <span>500k</span>
                <span>
                  {draftFilters.maxPrice >= MAX_SLIDER_PRICE
                    ? "8.000k+"
                    : `≤ ${Math.round(draftFilters.maxPrice / 1000).toLocaleString("vi-VN")}k`}
                </span>
              </div>
              <input
                type="range"
                min={MIN_SLIDER_PRICE}
                max={MAX_SLIDER_PRICE}
                step={250_000}
                value={draftFilters.maxPrice}
                aria-label="Mức giá tối đa mỗi đêm"
                onChange={(e) =>
                  setDraftFilters((prev) => ({
                    ...prev,
                    maxPrice: Number(e.target.value),
                  }))
                }
                className="w-full accent-primary cursor-pointer"
              />
            </div>
          )}

          {group.key === "stars" ? (
            <div className="flex flex-wrap gap-2">
              {group.options.map((option) => {
                const selected = draftFilters.stars.includes(option.id);
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => toggleFilter("stars", option.id)}
                    className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      selected
                        ? "bg-ocean-light border-primary text-primary"
                        : "bg-surface-container-low border-border-light text-on-surface hover:border-primary"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[14px] text-rating-star">
                      star
                    </span>
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="space-y-2">
              {group.options.map((option) => (
                <label
                  key={option.id}
                  className="flex items-start gap-2.5 text-xs text-on-surface-variant hover:text-on-surface cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={draftFilters[group.key].includes(option.id)}
                    onChange={() => toggleFilter(group.key, option.id)}
                    className="mt-0.5 w-4 h-4 rounded border-outline-variant accent-primary shrink-0"
                  />
                  <span className="leading-snug flex-1 flex items-center justify-between gap-2">
                    <span>{option.label}</span>
                    {group.key === "areas" && (
                      <span className="text-outline font-medium">
                        ({areaCounts[option.id] ?? 0})
                      </span>
                    )}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <div className="flex items-center gap-2.5 pt-2">
        <button
          type="button"
          onClick={applyFilters}
          className="flex-1 py-2.5 px-4 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-bold text-sm transition-colors"
        >
          Áp dụng
        </button>
        <button
          type="button"
          onClick={resetFilters}
          className="flex-1 py-2.5 px-4 rounded-xl bg-surface-container-low border border-border-light hover:border-primary text-on-surface font-bold text-sm transition-colors"
        >
          Đặt lại
        </button>
      </div>

      <div className="rounded-2xl bg-gradient-to-br from-primary to-ocean-deep text-white p-4 space-y-3 shadow-sm">
        <div className="space-y-1">
          <p className="text-sm font-extrabold leading-snug">
            Cần phòng gấp giá đoàn?
          </p>
          <p className="text-xs text-white/85 leading-relaxed">
            Hỗ trợ giữ phòng nhanh, báo giá tốt cho nhóm &amp; gia đình.
          </p>
        </div>
        <Link
          href="/lien-he"
          className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-white text-primary hover:bg-ocean-light font-extrabold text-xs transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">chat</span>
          <span>Chat Zalo Ngay (24/7)</span>
        </Link>
      </div>
    </div>
  );

  return (
    <section className="site-container py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[290px_1fr] gap-8 items-start">
        {/* Desktop Sidebar */}
        <aside className="hidden lg:block bg-surface-container-lowest rounded-2xl border border-border-light shadow-card p-5">
          {filterFormContent}
        </aside>

        {/* Main Listing */}
        <div className="space-y-5 min-w-0">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                {hotels.length} khách sạn &amp; resort
              </h2>
              <p className="text-xs text-outline mt-0.5">
                tại Nha Trang - Cam Ranh
              </p>
            </div>

            <div className="flex items-center gap-2 relative">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(true)}
                className="lg:hidden px-4 py-2 rounded-xl bg-surface-container-lowest border border-border-light text-on-surface font-bold text-sm"
              >
                Bộ lọc
              </button>

              <div className="relative">
                <button
                  type="button"
                  aria-expanded={sortOpen}
                  onClick={() => setSortOpen((v) => !v)}
                  className="px-4 py-2 rounded-xl bg-surface-container-lowest border border-border-light hover:border-primary text-on-surface font-bold text-sm inline-flex items-center gap-2"
                >
                  <span>
                    {sortOptions.find((o) => o.id === sort)?.label || "Sắp xếp"}
                  </span>
                  <img
                    src="/images/figma/icons/chevron.svg"
                    alt=""
                    className="w-3.5 h-3.5"
                  />
                </button>

                {sortOpen && (
                  <div className="absolute right-0 mt-2 w-52 rounded-2xl bg-surface-container-lowest border border-border-light shadow-floating p-2 z-20 flex flex-col gap-1">
                    {sortOptions.map((option) => (
                      <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                          setSort(option.id);
                          setSortOpen(false);
                        }}
                        className={`text-left px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                          sort === option.id
                            ? "bg-surface-container text-primary"
                            : "text-on-surface hover:bg-surface-container-low"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {hotels.map((hotel) => (
              <HotelCard key={hotel.id} product={hotel} search={search} />
            ))}
            {hotels.length === 0 && (
              <div className="bg-surface-container-lowest rounded-2xl border border-border-light p-10 text-center space-y-3">
                <p className="font-bold text-on-surface">
                  Không tìm thấy khách sạn phù hợp với bộ lọc hiện tại.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-5 py-2.5 rounded-full bg-primary text-on-primary font-bold text-sm"
                >
                  Đặt lại bộ lọc
                </button>
              </div>
            )}
          </div>

          <p className="text-xs text-outline pt-2">
            Hiển thị 1 - {hotels.length} trên tổng số {hotels.length} khách sạn
          </p>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-destination-scrim/50 flex justify-end lg:hidden">
          <div className="w-full max-w-sm bg-surface-container-lowest h-full overflow-y-auto p-5">
            <div className="flex justify-end mb-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="text-sm font-bold text-outline hover:text-on-surface"
              >
                Đóng ✕
              </button>
            </div>
            {filterFormContent}
          </div>
        </div>
      )}
    </section>
  );
}
