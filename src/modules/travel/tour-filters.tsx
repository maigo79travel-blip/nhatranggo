"use client";

import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useT } from "@/components/content";
import { FilterField } from "@/components/site/filter-field";
import { PublicIcon } from "@/components/site/public-ui";
import { CustomSelect } from "@/components/ui/custom-select";
import { type BookingDraft } from "./search";
import {
  hasServiceSearch,
  serviceRoutes,
  serviceSearchHref,
} from "./service-routes";

type TourType = "tour" | "combo";

const categories = [
  ["dao-nha-trang", "island"],
  ["du-thuyen", "cruise"],
  ["lan-bien", "diving"],
  ["vinh-hy", "vinhHy"],
  ["city", "city"],
  ["da-lat", "dalat"],
] as const;

function filterHref(
  type: TourType,
  params: Record<string, string>,
  key: "category" | "sort",
  value: string,
) {
  const query = new URLSearchParams();
  for (const name of [
    "q",
    "destination",
    "date",
    "guests",
    "category",
    "sort",
  ]) {
    if (params[name] && name !== key) query.set(name, params[name]);
  }
  if (value) query.set(key, value);
  if (type === "combo") query.set("type", type);
  return serviceRoutes[type] + (query.size ? "?" + query : "");
}

export function TourSortSelect({
  type = "tour",
  params = {},
}: {
  type?: TourType;
  params?: Record<string, string>;
}) {
  const router = useRouter();
  const t = useT();
  const sortOptions = [
    { value: "recommended", label: t.serviceFilters.sortRecommended },
    { value: "price", label: t.tours.sort.priceAsc },
    { value: "price-desc", label: t.tours.sort.priceDesc },
    { value: "rating", label: t.tours.sort.rating },
  ];
  return (
    <div className="min-w-0 sm:w-52">
      <CustomSelect
        ariaLabel={t.tours.sortLabel}
        align="right"
        buttonClassName="min-h-11 cursor-pointer rounded-xl border border-border-default bg-surface px-3 text-sm font-bold"
        value={params.sort || "recommended"}
        options={sortOptions}
        onChange={(sort) =>
          router.push(
            filterHref(
              type,
              params,
              "sort",
              sort === "recommended" ? "" : sort,
            ),
            { scroll: false },
          )
        }
      />
    </div>
  );
}

export function TourFilters({
  type = "tour",
  params = {},
  draft = {},
  destinations,
  today,
}: {
  type?: TourType;
  params?: Record<string, string>;
  draft?: BookingDraft;
  destinations: { id: string; name: string; code?: string }[];
  today: string;
}) {
  const category = params.category || "all";
  const hasFilters = hasServiceSearch(params);
  const t = useT();
  const formLabel =
    type === "combo" ? t.tours.comboSubmit : t.tours.searchSubmit;
  const categoryOptions = [
    { key: "all", label: t.serviceFilters.categoryAll },
    ...categories.map(([key, label]) => ({
      key,
      label: t.serviceFilters.tourCategories[label],
    })),
  ];
  return (
    <div className="relative z-10 -mt-16 rounded-[24px] border border-border-subtle bg-surface p-3 shadow-card sm:-mt-20 sm:p-4">
      <Form
        className="tour-search-form grid items-stretch gap-2 sm:gap-3"
        aria-label={formLabel}
        action={serviceRoutes[type]}
        scroll={false}
      >
        {type === "combo" && <input type="hidden" name="type" value="combo" />}
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.sort && <input type="hidden" name="sort" value={params.sort} />}
        <FilterField
          label={t.home.search.destinationService}
          icon="search"
          className="tour-search-keyword"
        >
          <input
            type="search"
            name="q"
            className="catalog-filter-control"
            defaultValue={params.q}
            placeholder={t.serviceFilters.keywordPlaceholder}
            maxLength={150}
          />
        </FilterField>
        <FilterField
          label={t.serviceFilters.destinationLabel}
          icon="location_on"
        >
          <CustomSelect
            name="destination"
            ariaLabel={t.serviceFilters.destinationLabel}
            defaultValue={params.destination || ""}
            searchable={destinations.length > 5}
            searchPlaceholder={t.serviceFilters.searchDestination}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: t.serviceFilters.destinationAll },
              ...destinations.map((place) => ({
                value: place.id,
                label: place.code
                  ? (t.destinations[place.code] ?? place.name)
                  : place.name,
              })),
            ]}
          />
        </FilterField>
        <FilterField label={t.tours.departureDate} icon="calendar_today">
          <input
            id="tour-departure-date"
            type="date"
            name="date"
            className="catalog-filter-control"
            defaultValue={draft.date}
            min={today}
          />
        </FilterField>
        <FilterField label={t.tours.guestLabel} icon="group">
          <input
            type="number"
            name="guests"
            className="catalog-filter-control"
            defaultValue={draft.guests ?? 2}
            min={1}
            max={100}
            required
          />
        </FilterField>
        <button
          type="submit"
          className="tour-search-submit public-primary-button rounded-xl"
        >
          <PublicIcon name="search" className="text-xl" />
          {formLabel}
        </button>
      </Form>
      {(type === "tour" || hasFilters) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border-subtle pt-2.5">
          {type === "tour" && (
            <nav
              aria-label={t.serviceFilters.tourCategoryAria}
              className="grid w-full grid-cols-3 gap-1.5 min-[360px]:grid-cols-4 sm:flex sm:w-auto sm:flex-1 sm:flex-wrap"
            >
              {categoryOptions.map(({ key, label }) => (
                <Link
                  key={key}
                  className={`tour-cat-btn inline-flex min-h-11 items-center justify-center rounded-full px-2 text-center text-xs font-bold transition-colors sm:px-3.5 sm:text-sm ${category === key ? "bg-primary text-on-primary" : "bg-surface-muted text-on-surface hover:bg-surface-brand hover:text-primary"}`}
                  data-category={key}
                  aria-current={category === key ? "page" : undefined}
                  href={filterHref(
                    type,
                    params,
                    "category",
                    key === "all" ? "" : key,
                  )}
                  scroll={false}
                >
                  {label}
                </Link>
              ))}
            </nav>
          )}
          {hasFilters && (
            <Link
              href={serviceSearchHref(type)}
              className="catalog-reset"
              scroll={false}
            >
              <PublicIcon name="restart_alt" className="text-xl" />
              {t.serviceFilters.resetFilters}
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
