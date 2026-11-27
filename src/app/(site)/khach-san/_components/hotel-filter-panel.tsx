import { useId } from "react";
import { ContentLink, useSiteData, useT } from "@/components/content";
import { formatMoney } from "@/lib/i18n/format";
import {
  filterGroups,
  MAX_SLIDER_PRICE,
  MIN_SLIDER_PRICE,
  type ArrayFilterKey,
  type FilterState,
} from "./hotel-filters";

export function HotelFilterPanel({
  filters,
  areaCounts,
  onToggle,
  onMaxPrice,
  onReset,
}: {
  filters: FilterState;
  areaCounts: Record<string, number>;
  onToggle: (group: ArrayFilterKey, value: string) => void;
  onMaxPrice: (value: number) => void;
  onReset: () => void;
}) {
  const priceId = useId();
  const { locale } = useSiteData();
  const t = useT();
  const groupTitles: Record<string, string> = {
    priceRanges: t.hotels.filterGroups.priceRanges,
    stars: t.hotels.filterGroups.stars,
    areas: t.hotels.filterGroups.areas,
    amenities: t.hotels.filterGroups.amenities,
    policies: t.hotels.filterGroups.policies,
  };
  const optionLabels: Record<string, string> = {
    "under-1m": t.hotels.priceOptions.under1m,
    "1m-2m": t.hotels.priceOptions["1m-2m"],
    "2m-4m": t.hotels.priceOptions["2m-4m"],
    "over-4m": t.hotels.priceOptions.over4m,
    "3": t.hotels.starOptions["3"],
    "4": t.hotels.starOptions["4"],
    "5": t.hotels.starOptions["5"],
    "tran-phu": t.hotels.areaOptions["tran-phu"],
    "bai-dai": t.hotels.areaOptions["bai-dai"],
    "hon-tre": t.hotels.areaOptions["hon-tre"],
    "pho-tay": t.hotels.areaOptions["pho-tay"],
    "an-vien": t.hotels.areaOptions["an-vien"],
    "infinity-pool": t.hotels.amenityOptions["infinity-pool"],
    "private-beach": t.hotels.amenityOptions["private-beach"],
    buffet: t.hotels.amenityOptions.buffet,
    "airport-shuttle": t.hotels.amenityOptions["airport-shuttle"],
    "water-park": t.hotels.amenityOptions["water-park"],
    spa: t.hotels.amenityOptions.spa,
    "kids-free": t.hotels.amenityOptions["kids-free"],
    "free-cancel": t.hotels.policyOptions["free-cancel"],
    "zero-deposit": t.hotels.policyOptions["zero-deposit"],
  };

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="flex items-center gap-2 text-lg font-extrabold">
          <span
            className="material-symbols-outlined text-xl text-primary"
            aria-hidden="true"
          >
            tune
          </span>
          {t.hotels.filterTitle}
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 shrink-0 rounded-xl bg-surface-muted px-2 text-sm font-bold text-on-surface hover:bg-surface-brand"
        >
          {t.common.reset}
        </button>
      </div>

      {filterGroups.map((group) => (
        <fieldset key={group.key} className="min-w-0">
          <legend className="mb-2 text-sm font-extrabold">
            {groupTitles[group.key] ?? group.title}
          </legend>
          <div
            className={
              group.key === "stars" ? "hotel-filter-stars" : "grid gap-1"
            }
          >
            {group.options.map((option) => {
              const checked = filters[group.key].includes(option.id);
              if (group.key === "stars") {
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={checked}
                    className="hotel-filter-star"
                    onClick={() => onToggle(group.key, option.id)}
                  >
                    <span
                      className="hotel-filter-star-icons"
                      aria-hidden="true"
                    >
                      {Array.from({ length: Number(option.id) }, (_, index) => (
                        <span key={index} className="hotel-filter-star-icon" />
                      ))}
                    </span>
                    {optionLabels[option.id] ?? option.label}
                  </button>
                );
              }
              return (
                <label key={option.id} className="hotel-filter-option">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggle(group.key, option.id)}
                  />
                  <span className="flex-1">
                    {optionLabels[option.id] ?? option.label}
                  </span>
                  {group.key === "areas" && (
                    <span className="text-xs">
                      ({areaCounts[option.id] ?? 0})
                    </span>
                  )}
                </label>
              );
            })}
          </div>
          {group.key === "priceRanges" && (
            <div className="mt-3 grid gap-1">
              <label htmlFor={priceId} className="sr-only">
                {t.hotels.maxPriceLabel}
              </label>
              <input
                id={priceId}
                type="range"
                className="w-full cursor-pointer accent-primary"
                min={MIN_SLIDER_PRICE}
                max={MAX_SLIDER_PRICE}
                step={250_000}
                value={filters.maxPrice}
                onChange={(event) => onMaxPrice(Number(event.target.value))}
                aria-valuetext={
                  filters.maxPrice === MAX_SLIDER_PRICE
                    ? t.hotels.unlimitedPrice
                    : formatMoney(filters.maxPrice, locale)
                }
              />
              <div className="flex items-center justify-between gap-1 text-xs font-bold text-primary">
                <span>500k</span>
                {filters.maxPrice < MAX_SLIDER_PRICE && (
                  <output htmlFor={priceId}>
                    {formatMoney(filters.maxPrice, locale)}
                  </output>
                )}
                <span>8.000k+</span>
              </div>
            </div>
          )}
        </fieldset>
      ))}

      <div className="grid gap-2 rounded-xl bg-surface-muted p-3">
        <h3 className="text-sm font-extrabold text-primary">
          {t.hotels.urgentGroupTitle}
        </h3>
        <p className="text-sm leading-snug text-on-surface-variant">
          {t.hotels.urgentGroupDesc}
        </p>
        <ContentLink
          contentKey="hotels.attributes-042"
          href="/lien-he"
          className="hotel-button mt-1"
          target="_blank"
          rel="noopener"
        >
          {t.hotels.chatZalo247}
        </ContentLink>
      </div>
    </div>
  );
}
