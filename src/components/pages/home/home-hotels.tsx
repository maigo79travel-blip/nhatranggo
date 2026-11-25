"use client";
import { useState } from "react";
import { HomeLink } from "@/modules/home/home-link";
import { ContentText, useSiteData } from "@/components/content";
import {
  matchesHotelFilter,
  type HomeHotelFilter,
} from "@/modules/home/hotel-filter";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

const filterOptions: HomeHotelFilter[] = [
  "all",
  "near-beach",
  "family",
  "resort",
  "special-deal",
];

function hotelDiscountLabel(price: number, originalPrice?: number | null) {
  if (!originalPrice || originalPrice <= price) return null;
  const pct = Math.round(((originalPrice - price) / originalPrice) * 100);
  return pct > 0 ? `Giảm ${pct}%` : null;
}

export function HomeHotels() {
  const [filter, setFilter] = useState<HomeHotelFilter>("all");
  const products = useSiteData()
    .products.filter(
      (p) => p.type === "hotel" && p.active && matchesHotelFilter(p, filter),
    )
    .slice(0, 6);

  return (
    <section id="home-hotels" className="site-container py-10 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            <ContentText contentKey="home.text-095" />
          </h2>
          <div className="w-12 h-1 rounded-full bg-primary mt-2" />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {filterOptions.map((value, index) => (
            <button
              key={value}
              type="button"
              data-hotel-filter={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`hotel-filter shrink-0 px-4 py-2 rounded-full font-label-md text-label-md font-bold transition-colors ${
                filter === value
                  ? "bg-primary text-on-primary shadow-sm"
                  : "bg-surface-container-lowest border border-border-light text-on-surface hover:border-primary/50"
              }`}
            >
              <ContentText
                contentKey={"home.text-" + String(96 + index).padStart(3, "0")}
              />
            </button>
          ))}
          <HomeLink
            contentKey="home.attributes-007"
            className="px-4 py-2 rounded-full text-secondary hover:text-ocean-deep font-label-md text-label-md font-bold flex items-center gap-1 whitespace-nowrap"
            href="/khach-san"
          >
            <span>
              <ContentText contentKey="home.text-101" />
            </span>
            <span className="material-symbols-outlined text-[16px]">
              {"arrow_forward"}
            </span>
          </HomeLink>
        </div>
      </div>

      <p
        role="status"
        className={products.length ? "sr-only" : "text-body-md text-outline mb-4"}
      >
        {products.length
          ? `${products.length} dịch vụ phù hợp`
          : "Chưa có khách sạn phù hợp với bộ lọc."}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => {
          const discount = hotelDiscountLabel(
            product.price,
            product.original_price,
          );
          const amenities = ["field-010", "field-011"]
            .map((key) => product.content?.[key]?.value)
            .filter((val): val is string => typeof val === "string" && val.length > 0);
          const shortLocation = product.location.split(",")[0]?.trim() || product.location;

          return (
            <CatalogCard
              key={product.id}
              className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 transform hover:-translate-y-1 flex flex-col"
              productId={product.id}
              tag="div"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ProductField
                  id={product.id}
                  field="image"
                  tag="div"
                  className="w-full h-full bg-cover bg-center hover:scale-105 transition-transform duration-500"
                />
                {discount && (
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                    {discount}
                  </span>
                )}
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm mb-2 gap-2">
                    <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-rating-star">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"star"}
                      </span>
                      <span className="text-on-surface">{product.rating}</span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-outline font-label-sm text-label-sm truncate">
                      <img
                        src="/images/figma/icons/pin.svg"
                        alt=""
                        className="w-3.5 h-3.5 shrink-0"
                      />
                      <span className="truncate">{shortLocation}</span>
                    </span>
                  </div>

                  <ProductField
                    id={product.id}
                    field="title"
                    tag="h3"
                    className="font-title-md text-lg font-extrabold text-on-surface line-clamp-1"
                  />

                  <div className="flex flex-col gap-1.5 mt-3">
                    {amenities.length > 0 ? (
                      amenities.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                            {"check_circle"}
                          </span>
                          <span className="truncate">{item}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-body-sm text-on-surface-variant line-clamp-2">
                        {product.description}
                      </p>
                    )}
                  </div>
                </div>

                <div className="mt-5 pt-2 flex items-end justify-between price-actions gap-3">
                  <PriceStack productId={product.id}>
                    <ProductField
                      id={product.id}
                      field="price"
                      tag="span"
                      className="font-title-md text-xl font-extrabold text-sale-crimson"
                    >
                      <span className="font-body-sm text-xs text-outline font-normal ml-1">
                        /đêm
                      </span>
                    </ProductField>
                  </PriceStack>
                  <a
                    href="#"
                    data-action="details"
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-label-md text-label-md font-bold shadow-sm transition-colors action-link shrink-0"
                  >
                    Đặt phòng
                  </a>
                </div>
              </div>
            </CatalogCard>
          );
        })}
      </div>
    </section>
  );
}
