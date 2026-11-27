"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSiteData, useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { productSearchBlob } from "@/modules/travel/search";
import { HotelCard } from "./hotel-card";
import { HotelFilterPanel } from "./hotel-filter-panel";
import {
  areaKeywords,
  emptyFilters,
  matchesFilters,
  sortOptions,
  type ArrayFilterKey,
  type FilterState,
  type SortMode,
} from "./hotel-filters";
import type { HotelSearchState } from "./hotels-hero";

const PAGE_SIZE = 6;

function discount(price: number, originalPrice?: number | null) {
  return originalPrice && originalPrice > price
    ? (originalPrice - price) / originalPrice
    : 0;
}

export function HotelsListing({
  search,
  onResetSearch,
}: {
  search: HotelSearchState;
  onResetSearch: () => void;
}) {
  const { products, hotelCapacities } = useSiteData();
  const t = useT();
  const sortLabelMap: Record<SortMode, string> = {
    recommended: t.hotels.sort.recommended,
    deals: t.hotels.sort.deals,
    "price-asc": t.hotels.sort.priceAsc,
    "rating-desc": t.hotels.sort.ratingDesc,
    beach: t.hotels.sort.beach,
  };
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [sort, setSort] = useState<SortMode>("recommended");
  const [page, setPage] = useState(1);
  const drawer = useRef<HTMLDialogElement>(null);

  const activeHotels = useMemo(
    () =>
      products.filter(
        (product) => product.type === "hotel" && product.active !== false,
      ),
    [products],
  );
  const areaCounts = useMemo(() => {
    const hotelTexts = activeHotels.map(productSearchBlob);
    return Object.fromEntries(
      Object.entries(areaKeywords).map(([id, keywords]) => [
        id,
        hotelTexts.filter((text) =>
          keywords.some((keyword) => text.includes(keyword)),
        ).length,
      ]),
    );
  }, [activeHotels]);

  const hotels = useMemo(() => {
    const guests = Number(search.guests);
    const filtered = activeHotels.filter(
      (product) =>
        (hotelCapacities[product.id] ?? Infinity) >= guests &&
        matchesFilters(product, filters, search),
    );
    if (sort === "price-asc") return filtered.sort((a, b) => a.price - b.price);
    if (sort === "rating-desc")
      return filtered.sort((a, b) => b.rating - a.rating);
    if (sort === "beach") {
      const nearBeach = (product: (typeof filtered)[number]) =>
        Number(productSearchBlob(product).includes("bien"));
      return filtered.sort(
        (a, b) => nearBeach(b) - nearBeach(a) || b.rating - a.rating,
      );
    }
    if (sort === "deals")
      return filtered.sort(
        (a, b) =>
          discount(b.price, b.original_price) -
          discount(a.price, a.original_price),
      );
    return filtered;
  }, [activeHotels, hotelCapacities, filters, search, sort]);

  useEffect(() => setPage(1), [search]);

  const pageCount = Math.max(1, Math.ceil(hotels.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const start = (currentPage - 1) * PAGE_SIZE;
  const visibleHotels = hotels.slice(start, start + PAGE_SIZE);

  function toggleFilter(group: ArrayFilterKey, id: string) {
    setFilters((previous) => ({
      ...previous,
      [group]: previous[group].includes(id)
        ? previous[group].filter((item) => item !== id)
        : [...previous[group], id],
    }));
    setPage(1);
  }

  function resetFilters() {
    setFilters(emptyFilters);
    setPage(1);
    onResetSearch();
  }

  function changePage(next: number) {
    setPage(next);
    document
      .getElementById("ket-qua-khach-san")
      ?.scrollIntoView({ block: "start" });
  }

  const filterProps = {
    filters,
    areaCounts,
    onToggle: toggleFilter,
    onMaxPrice: (maxPrice: number) => {
      setFilters((previous) => ({ ...previous, maxPrice }));
      setPage(1);
    },
    onReset: resetFilters,
  };

  return (
    <section
      className="site-container hotel-listing"
      aria-label={t.hotels.listingAria}
    >
      <aside
        className="hotel-sidebar hidden lg:block"
        aria-label={t.hotels.filterAria}
      >
        <HotelFilterPanel {...filterProps} />
      </aside>
      <div className="min-w-0">
        <div className="mb-5 flex flex-wrap items-start justify-between gap-3 sm:mb-6">
          <div>
            <h2
              id="ket-qua-khach-san"
              tabIndex={-1}
              aria-live="polite"
              className="text-xl font-extrabold sm:text-2xl"
            >
              {hotels.length} {t.hotels.resultsSuffix}
            </h2>
            <p className="mt-2 text-sm text-on-surface-variant">
              {t.hotels.resultsRegion}
            </p>
          </div>
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            <button
              type="button"
              className="hotel-button hotel-button-secondary hotel-mobile-filter"
              onClick={() => drawer.current?.showModal()}
            >
              <span
                className="material-symbols-outlined text-lg"
                aria-hidden="true"
              >
                tune
              </span>
              {t.hotels.filterMobileBtn}
            </button>
            <CustomSelect
              ariaLabel={t.hotels.sortLabel}
              align="right"
              buttonClassName="hotel-sort cursor-pointer"
              value={sort}
              onChange={(nextSort) => {
                setSort(nextSort as SortMode);
                setPage(1);
              }}
              options={sortOptions.map((item) => ({
                value: item.id,
                label: sortLabelMap[item.id] ?? item.label,
              }))}
            />
          </div>
        </div>

        <div className="grid gap-4">
          {visibleHotels.map((product) => (
            <HotelCard key={product.id} product={product} search={search} />
          ))}
          {visibleHotels.length === 0 && (
            <div className="grid justify-items-center gap-4 rounded-[18px] border border-brand-light bg-surface p-8 text-center">
              <p className="font-semibold">{t.hotels.noMatchingHotels}</p>
              <button
                type="button"
                onClick={resetFilters}
                className="hotel-button"
              >
                {t.hotels.resetFiltersBtn}
              </button>
            </div>
          )}
        </div>

        {hotels.length > 0 && (
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-on-surface-variant">
              {t.hotels.showingPrefix} {start + 1}–{start + visibleHotels.length}{" "}
              {t.hotels.ofTotal} {hotels.length} {t.hotels.hotelsNoun}
            </p>
            {pageCount > 1 && (
              <nav
                className="flex items-center gap-2"
                aria-label={t.hotels.paginationAria}
              >
                <button
                  type="button"
                  className="hotel-button hotel-button-secondary"
                  aria-label={t.common.prevPage}
                  disabled={currentPage === 1}
                  onClick={() => changePage(currentPage - 1)}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    aria-hidden="true"
                  >
                    chevron_left
                  </span>
                </button>
                <span className="text-sm font-bold">
                  {currentPage} / {pageCount}
                </span>
                <button
                  type="button"
                  className="hotel-button hotel-button-secondary"
                  aria-label={t.common.nextPage}
                  disabled={currentPage === pageCount}
                  onClick={() => changePage(currentPage + 1)}
                >
                  <span
                    className="material-symbols-outlined text-lg"
                    aria-hidden="true"
                  >
                    chevron_right
                  </span>
                </button>
              </nav>
            )}
          </div>
        )}
      </div>

      <dialog
        ref={drawer}
        aria-label={t.hotels.filterAria}
        className="hotel-filter-drawer lg:hidden"
      >
        <form method="dialog" className="mb-3 flex justify-end">
          <button type="submit" className="hotel-button hotel-button-secondary">
            {t.common.close}
          </button>
        </form>
        <HotelFilterPanel {...filterProps} />
        <form method="dialog" className="sticky bottom-0 mt-4 bg-surface py-3">
          <button className="hotel-button w-full" type="submit">
            {t.hotels.viewResultsTemplate.replace(
              "{count}",
              String(hotels.length),
            )}
          </button>
        </form>
      </dialog>
    </section>
  );
}
