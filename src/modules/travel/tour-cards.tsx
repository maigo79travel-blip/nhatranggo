"use client";

import { useCatalog } from "@/components/catalog/catalog-context";
import { SiteDataProvider } from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { PublicIcon } from "@/components/site/public-ui";
import { isPublicImageUrl } from "@/lib/content-attributes";
import { money, type Product } from "@/lib/types";
import type { BookingDraft } from "./search";

export function TourCards({
  products,
  draft,
}: {
  products: Product[];
  draft?: BookingDraft;
}) {
  const catalog = useCatalog();
  return (
    <SiteDataProvider data={{ products }}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
        {products.map((product) => (
          <article
            key={product.id}
            data-service-id={product.id}
            data-product-id={product.id}
            className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-border-subtle bg-surface shadow-card transition-shadow hover:shadow-card-hover"
          >
            <div className="flex aspect-[2.45] items-center justify-center overflow-hidden bg-surface-brand">
              {isPublicImageUrl(product.image) ? (
                <img
                  src={product.image}
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
              ) : (
                <PublicIcon
                  name="travel_explore"
                  className="text-4xl text-primary"
                />
              )}
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
              {(product.rating > 0 || product.location) && (
                <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  {product.rating > 0 && (
                    <span className="inline-flex shrink-0 items-center gap-1 font-extrabold text-sale-price">
                      <span
                        aria-hidden="true"
                        className="h-4 w-4 bg-current [mask:url('/images/figma/icons/star-filled.svg')_center/contain_no-repeat]"
                      />
                      <span className="sr-only">Điểm đánh giá </span>
                      {product.rating.toFixed(1)}
                    </span>
                  )}
                  {product.location && (
                    <span className="inline-flex min-w-0 items-center gap-1 text-on-surface-variant">
                      <PublicIcon
                        name="location_on"
                        className="shrink-0 text-base text-primary"
                      />
                      <span className="truncate" title={product.location}>
                        {product.location}
                      </span>
                    </span>
                  )}
                </div>
              )}
              <h3
                className="line-clamp-2 break-words text-lg font-extrabold leading-snug text-on-surface"
                title={product.title}
              >
                {product.title}
              </h3>
              <div className="mt-auto flex flex-wrap items-end justify-between gap-x-2 gap-y-3 border-t border-border-subtle pt-3">
                <PriceStack productId={product.id}>
                  <span
                    data-sale-price
                    className="text-xl font-extrabold leading-tight text-sale-price sm:text-[23px]"
                  >
                    {money(product.price)}
                  </span>
                  {product.type === "tour" && (
                    <span className="ml-1 text-xs text-on-surface-variant">
                      /khách
                    </span>
                  )}
                </PriceStack>
                <button
                  type="button"
                  className="public-primary-button rounded-xl px-4"
                  onClick={() => catalog.open(product, draft)}
                >
                  {product.type === "combo" ? "Đặt combo" : "Đặt tour"}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </SiteDataProvider>
  );
}
