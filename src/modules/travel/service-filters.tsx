"use client";

import Form from "next/form";
import Link from "next/link";
import { FilterField } from "@/components/site/filter-field";
import { PublicIcon } from "@/components/site/public-ui";
import { useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { nextDate, type BookingDraft } from "./search";

import { serviceRoutes, type ServiceType } from "./service-routes";

export function ServiceFilters({
  type,
  params,
  resetHref,
  draft,
  destinations,
  today,
}: {
  type: ServiceType;
  params: Record<string, string>;
  resetHref: string;
  draft: BookingDraft;
  destinations: { id: string; name: string; code?: string }[];
  today: string;
}) {
  const t = useT();
  return (
    <Form
      action={serviceRoutes[type]}
      scroll={false}
      className="catalog-filters"
      aria-label={t.serviceFilters.filterAria}
    >
      {type === "combo" && <input type="hidden" name="type" value="combo" />}

      <div className="catalog-search-bar">
        <FilterField
          label={t.blog.keywordLabel}
          icon="search"
          className="catalog-keyword-field"
        >
          <input
            className="catalog-filter-control"
            type="search"
            name="q"
            maxLength={150}
            defaultValue={params.q}
            placeholder={t.serviceFilters.keywordPlaceholder}
          />
        </FilterField>
        <FilterField
          label={t.serviceFilters.destinationLabel}
          icon="location_on"
          className="catalog-destination-field"
        >
          <CustomSelect
            name="destination"
            ariaLabel={t.serviceFilters.destinationLabel}
            searchable
            searchPlaceholder={t.serviceFilters.searchDestination}
            defaultValue={params.destination || ""}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: t.serviceFilters.destinationAll },
              ...destinations.map((destination) => ({
                value: destination.id,
                label: destination.code
                  ? (t.destinations[destination.code] ?? destination.name)
                  : destination.name,
              })),
            ]}
          />
        </FilterField>
        <button
          className="public-primary-button catalog-search-submit"
          type="submit"
          aria-label={t.serviceFilters.submit}
        >
          <PublicIcon name="search" className="text-xl" />
          <span className="hidden sm:inline">{t.serviceFilters.submit}</span>
        </button>
      </div>

      <div className="catalog-refinements">
        <FilterField
          label={t.booking.useDate}
          icon="calendar_month"
          className="catalog-date-field"
        >
          <input
            className="catalog-filter-control"
            type="date"
            name="date"
            defaultValue={draft.date}
            min={today}
          />
        </FilterField>
        {type === "hotel" && (
          <FilterField
            label={t.booking.checkOut}
            icon="event_available"
            className="catalog-date-field"
          >
            <input
              className="catalog-filter-control"
              type="date"
              name="returnDate"
              defaultValue={draft.returnDate}
              min={draft.date ? nextDate(draft.date) : today}
            />
          </FilterField>
        )}
        {(type === "tour" || type === "hotel") && (
          <FilterField
            label={t.serviceFilters.categoryLabel}
            icon={type === "tour" ? "filter_list" : "hotel_class"}
          >
            <CustomSelect
              name="category"
              ariaLabel={
                type === "tour"
                  ? t.serviceFilters.tourCategoryAria
                  : t.serviceFilters.categoryLabel
              }
              defaultValue={params.category || ""}
              buttonClassName="catalog-filter-control cursor-pointer"
              options={
                type === "tour"
                  ? [
                      { value: "", label: t.serviceFilters.tourCategoryAll },
                      {
                        value: "dao-nha-trang",
                        label: t.serviceFilters.tourCategories.island,
                      },
                      {
                        value: "du-thuyen",
                        label: t.serviceFilters.tourCategories.cruise,
                      },
                      {
                        value: "lan-bien",
                        label: t.serviceFilters.tourCategories.diving,
                      },
                      {
                        value: "vinh-hy",
                        label: t.serviceFilters.tourCategories.vinhHy,
                      },
                      {
                        value: "city",
                        label: t.serviceFilters.tourCategories.city,
                      },
                      {
                        value: "da-lat",
                        label: t.serviceFilters.tourCategories.dalat,
                      },
                    ]
                  : [
                      { value: "", label: t.serviceFilters.categoryAll },
                      { value: "3 sao", label: t.hotels.category3Star },
                      { value: "4 sao", label: t.hotels.category4Star },
                      { value: "5 sao", label: t.hotels.category5Star },
                      { value: "resort", label: t.hotels.categoryResort },
                    ]
              }
            />
          </FilterField>
        )}
        <FilterField label={t.serviceFilters.sortLabel} icon="sort">
          <CustomSelect
            name="sort"
            ariaLabel={t.serviceFilters.sortLabel}
            defaultValue={params.sort || ""}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: t.serviceFilters.sortRecommended },
              { value: "price", label: t.tours.sort.priceAsc },
              { value: "price-desc", label: t.tours.sort.priceDesc },
              { value: "rating", label: t.tours.sort.rating },
            ]}
          />
        </FilterField>
        <FilterField
          label={t.booking.guests}
          icon="group"
          className="catalog-guests-field"
        >
          <input
            className="catalog-filter-control"
            type="number"
            name="guests"
            min={1}
            max={100}
            defaultValue={draft.guests ?? 2}
          />
        </FilterField>
        <Link className="catalog-reset" href={resetHref} scroll={false}>
          <PublicIcon name="restart_alt" className="text-xl" />
          {t.serviceFilters.resetFilters}
        </Link>
      </div>
    </Form>
  );
}
