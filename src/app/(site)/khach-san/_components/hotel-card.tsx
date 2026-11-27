"use client";

import type { Product } from "@/lib/types";
import { ProductField } from "@/components/catalog";
import { useCatalog } from "@/components/catalog/catalog-context";
import { useT } from "@/components/content";
import { PriceStack, ProductDiscount } from "@/components/price-stack";
import { bookingDraft } from "@/modules/travel/search";
import type { HotelSearchState } from "./hotels-hero";

export function HotelCard({
  product,
  search,
}: {
  product: Product;
  search: HotelSearchState;
}) {
  const t = useT();
  const catalog = useCatalog();
  const contentValue = (index: number) => {
    const key = `field-${String(index).padStart(3, "0")}`;
    const value = product.content?.[key]?.value;
    return typeof value === "string" ? value.trim() : "";
  };
  const homeCard = product.collection_id === "home-collection-2";
  // Some hotel templates have a second promo field before the photo caption.
  const secondBadge = product.content?.["field-016"]?.kind === "text";
  const shift = secondBadge ? 1 : 0;
  const tags = (homeCard ? [3, 4] : secondBadge ? [4, 5] : [4])
    .map(contentValue)
    .filter((tag) => tag && !tag.includes("%"));
  const starLabel = homeCard ? "" : contentValue(6 + shift);
  const stars = Number(starLabel.match(/^([1-5])\b/)?.[1]);
  const amenities = (homeCard ? [5, 6, 7] : [9 + shift, 10 + shift, 11 + shift])
    .map(contentValue)
    .filter(Boolean);
  const policy = homeCard ? "" : contentValue(12 + shift);
  const mealNote = homeCard ? "" : contentValue(14 + shift);
  const unit = contentValue(homeCard ? 10 : 13 + shift) || t.hotels.perNight;
  const cta =
    contentValue(homeCard ? 11 : 15 + shift) || t.hotels.viewRoomsBook;
  const sale =
    product.original_price != null && product.original_price > product.price;

  return (
    <article data-product-id={product.id} className="hotel-card">
      <div className="hotel-card-picture">
        <ProductField
          id={product.id}
          field="image"
          tag="img"
          alt={product.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        {(tags.length > 0 || sale) && (
          <div className="absolute inset-x-4 top-4 flex flex-wrap gap-1.5">
            <ProductDiscount
              productId={product.id}
              className="hotel-photo-tag bg-promo-highlight text-on-surface"
            />
            {tags.map((tag, index) => (
              <span
                key={tag}
                className={`hotel-photo-tag ${index === 0 ? "bg-surface text-on-surface" : "bg-promo-highlight text-on-surface"}`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="hotel-card-body">
        <div className="flex flex-wrap items-start justify-between gap-2">
          {starLabel && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-on-surface-variant sm:text-sm">
              {Boolean(stars) && (
                <span className="text-promo-highlight" aria-hidden="true">
                  {"★".repeat(stars)}
                </span>
              )}
              {starLabel}
            </div>
          )}
          <div className="ml-auto flex items-center gap-2 text-right">
            <span
              className="grid min-h-10 min-w-10 place-items-center rounded-xl bg-primary px-1.5 text-base font-extrabold text-on-primary"
              aria-label={`${t.hotels.ratingAriaPrefix} ${product.rating.toFixed(1)} ${t.hotels.ratingAriaOutOf}`}
            >
              {product.rating.toFixed(1)}
            </span>
          </div>
        </div>

        <ProductField
          id={product.id}
          field="title"
          tag="h3"
          className="text-xl font-extrabold leading-snug sm:text-2xl"
        />
        <p className="flex items-start gap-1.5 text-sm leading-relaxed text-on-surface-variant">
          <span
            aria-hidden="true"
            className="material-symbols-outlined mt-0.5 shrink-0 text-base text-primary"
          >
            location_on
          </span>
          {product.location}
        </p>
        {amenities.length > 0 ? (
          <ul className="grid justify-items-start gap-1.5 text-xs sm:text-sm">
            {amenities.map((amenity) => (
              <li
                key={amenity}
                className="inline-flex items-start gap-1 rounded-md bg-surface-muted px-2 py-1 font-bold"
              >
                <span
                  aria-hidden="true"
                  className="material-symbols-outlined shrink-0 text-base text-primary"
                >
                  check
                </span>
                {amenity}
              </li>
            ))}
          </ul>
        ) : product.description ? (
          <p className="line-clamp-2 text-sm text-on-surface-variant">
            {product.description}
          </p>
        ) : null}
        {policy && <p className="text-sm text-on-surface-variant">{policy}</p>}

        <div className="mt-auto grid justify-items-start gap-1.5 pt-1">
          <PriceStack productId={product.id} className="hotel-card-price">
            <ProductField
              id={product.id}
              field="price"
              tag="span"
              className={`text-[1.6rem] font-extrabold ${sale ? "text-sale-price" : "text-primary"}`}
            >
              <span className="ml-1 text-sm font-normal text-on-surface-variant">
                {unit}
              </span>
            </ProductField>
          </PriceStack>
          {mealNote && (
            <p className="text-sm text-on-surface-variant">{mealNote}</p>
          )}
          <button
            type="button"
            className="hotel-button"
            onClick={() =>
              catalog.open(
                product,
                bookingDraft({
                  date: search.checkIn,
                  returnDate: search.checkOut,
                  guests: search.guests,
                }),
              )
            }
          >
            {cta}
          </button>
        </div>
      </div>
    </article>
  );
}
