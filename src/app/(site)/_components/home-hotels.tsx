"use client";
import { useState } from "react";
import { HomeHeading, HomeSectionLink } from "./home-heading";
import { ContentText, useSiteData } from "@/components/content";
import { matchesHotelFilter, type HomeHotelFilter } from "./hotel-filter";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";
import { HomeCardRating } from "./home-card-rating";

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
    <section
      id="home-hotels"
      className="site-container w-full bg-white py-10 lg:py-[60px]"
    >
      <HomeHeading contentKey="home.text-095">
        <div className="flex max-w-full flex-wrap items-center gap-2">
          {filterOptions.map((value, index) => (
            <button
              key={value}
              type="button"
              data-hotel-filter={value}
              aria-pressed={filter === value}
              onClick={() => setFilter(value)}
              className={`hotel-filter shrink-0 min-h-11 rounded-full px-4 text-sm font-bold transition-colors ${
                filter === value
                  ? "bg-gradient-to-r from-primary to-brand-deep text-on-primary"
                  : "bg-surface-muted text-on-surface hover:bg-surface-tinted"
              }`}
            >
              <ContentText
                contentKey={"home.text-" + String(96 + index).padStart(3, "0")}
              />
            </button>
          ))}
          <HomeSectionLink contentKey="home.attributes-007" href="/khach-san">
            <ContentText contentKey="home.text-101" />
          </HomeSectionLink>
        </div>
      </HomeHeading>

      <p
        role="status"
        className={
          products.length ? "sr-only" : "text-body-md text-on-surface-variant mb-4"
        }
      >
        {products.length
          ? `${products.length} dịch vụ phù hợp`
          : "Chưa có khách sạn phù hợp với bộ lọc."}
      </p>

      <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-y-[30px]">
        {products.map((product) => {
          const discount = hotelDiscountLabel(
            product.price,
            product.original_price,
          );
          const amenities = ["field-010", "field-011"]
            .map((key) => product.content?.[key]?.value)
            .filter(
              (val): val is string => typeof val === "string" && val.length > 0,
            );
          const shortLocation =
            product.location.split(",")[0]?.trim() || product.location;

          return (
            <CatalogCard
              key={product.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-border-default bg-white shadow-card transition-shadow hover:shadow-card-hover xl:min-h-[476px]"
              productId={product.id}
              tag="div"
            >
              <div className="relative aspect-[1.98] w-full overflow-hidden">
                <ProductField
                  id={product.id}
                  field="image"
                  tag="img"
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
                {discount && (
                  <span className="absolute top-4 left-5 rounded-full bg-promo-highlight px-[18px] py-2 text-sm font-extrabold text-on-surface">
                    {discount}
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col justify-between p-5 lg:p-6">
                <div>
                  <div className="flex items-center justify-between text-body-sm font-body-sm mb-2 gap-2">
                    <HomeCardRating rating={product.rating} variant="hotel" />
                    <span className="inline-flex items-center gap-1 text-on-surface-variant font-label-sm text-label-sm truncate">
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

                  <div className="mt-3 flex flex-col gap-1.5 lg:min-h-[50px]">
                    {amenities.length > 0 ? (
                      amenities.map((item, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant"
                        >
                          <span className="material-symbols-outlined text-[16px] text-primary shrink-0">
                            {"check"}
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

                <div className="price-actions mt-4 flex flex-wrap items-end justify-between gap-2">
                  <PriceStack productId={product.id}>
                    <ProductField
                      id={product.id}
                      field="price"
                      tag="span"
                      className="text-[clamp(1.125rem,2.25vw,1.625rem)] font-extrabold leading-tight text-sale-price"
                    >
                      <span className="font-body-sm text-xs text-on-surface-variant font-normal ml-1">
                        /đêm
                      </span>
                    </ProductField>
                  </PriceStack>
                  <a
                    href="#"
                    data-action="details"
                    className="home-booking-button"
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
