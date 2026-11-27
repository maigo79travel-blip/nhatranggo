"use client";
import { useCatalog } from "@/components/catalog/catalog-context";
import { useSiteData, useT } from "@/components/content";
import { formatMoney } from "@/lib/i18n/format";
import type { BookingDraft } from "./search";
import type { Product } from "@/lib/types";
import { PublicIcon } from "@/components/site/public-ui";
export function ServiceCards({
  products,
  initialValues,
}: {
  products: Product[];
  initialValues?: BookingDraft;
}) {
  const catalog = useCatalog();
  const { locale } = useSiteData();
  const t = useT();
  const typeLabels: Record<string, string> = t.serviceSearch.typeLabels;
  return (
    <div className="public-card-grid">
      {products.map((p) => (
        <article
          key={p.id}
          data-service-id={p.id}
          data-product-id={p.id}
          className="public-service-card"
        >
          <div className="public-card-image">
            {p.image ? (
              <img src={p.image} alt={p.title} loading="lazy" />
            ) : (
              <PublicIcon
                name={
                  p.type === "hotel"
                    ? "hotel"
                    : p.type === "transfer"
                      ? "airport_shuttle"
                      : "travel_explore"
                }
                className="text-primary text-5xl"
              />
            )}
            <span className="public-type-badge">
              {typeLabels[p.type] || t.serviceSearch.typeLabels.default}
            </span>
          </div>
          <div className="public-card-content">
            {p.rating > 0 && (
              <p className="flex items-center gap-1.5 text-sm text-on-surface-variant">
                <PublicIcon name="star" className="text-promo-ink text-lg" />
                <span className="font-bold">{p.rating}</span>
                <span>{t.serviceSearch.ratingLabel}</span>
              </p>
            )}
            <h2 className="text-xl font-bold leading-snug line-clamp-2">
              {p.title}
            </h2>
            <p className="flex gap-1.5 text-sm text-on-surface-variant leading-relaxed">
              <PublicIcon
                name="location_on"
                className="text-lg shrink-0 mt-0.5"
              />
              <span className="line-clamp-2">{p.location}</span>
            </p>
            <div className="public-card-bottom">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm text-on-surface-variant">
                  {t.serviceSearch.priceFrom}
                </span>
                <p className="text-primary font-extrabold text-xl">
                  {formatMoney(p.price, locale)}
                </p>
                {!!p.original_price && p.original_price > p.price && (
                  <del className="text-sm text-on-surface-variant">
                    {formatMoney(p.original_price, locale)}
                  </del>
                )}
              </div>
              <button
                className="public-primary-button w-full mt-4"
                type="button"
                onClick={() => catalog.open(p, initialValues)}
              >
                {t.serviceSearch.bookAction}
                <PublicIcon name="arrow_forward" className="text-lg" />
              </button>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
