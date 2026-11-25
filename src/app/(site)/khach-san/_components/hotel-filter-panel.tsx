import { useId } from "react";
import { ContentLink } from "@/components/content";
import { money } from "@/lib/types";
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
          Bộ lọc tìm kiếm
        </h2>
        <button
          type="button"
          onClick={onReset}
          className="min-h-11 shrink-0 rounded-xl bg-surface-muted px-2 text-sm font-bold text-on-surface hover:bg-surface-brand"
        >
          Đặt lại
        </button>
      </div>

      {filterGroups.map((group) => (
        <fieldset key={group.key} className="min-w-0">
          <legend className="mb-2 text-sm font-extrabold">{group.title}</legend>
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
                    {option.label}
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
                  <span className="flex-1">{option.label}</span>
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
                Mức giá tối đa mỗi đêm
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
                    ? "Không giới hạn"
                    : money(filters.maxPrice)
                }
              />
              <div className="flex items-center justify-between gap-1 text-xs font-bold text-primary">
                <span>500k</span>
                {filters.maxPrice < MAX_SLIDER_PRICE && (
                  <output htmlFor={priceId}>{money(filters.maxPrice)}</output>
                )}
                <span>8.000k+</span>
              </div>
            </div>
          )}
        </fieldset>
      ))}

      <div className="grid gap-2 rounded-xl bg-surface-muted p-3">
        <h3 className="text-sm font-extrabold text-primary">
          Cần phòng gấp giá đoàn?
        </h3>
        <p className="text-sm leading-snug text-on-surface-variant">
          Liên hệ để được tư vấn giữ phòng và báo giá cho nhóm, gia đình.
        </p>
        <ContentLink
          contentKey="hotels.attributes-042"
          href="/lien-he"
          className="hotel-button mt-1"
          target="_blank"
          rel="noopener"
        >
          Chat Zalo ngay (24/7)
        </ContentLink>
      </div>
    </div>
  );
}
