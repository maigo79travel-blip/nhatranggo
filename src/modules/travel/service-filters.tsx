"use client";

import Form from "next/form";
import Link from "next/link";
import { FilterField } from "@/components/site/filter-field";
import { PublicIcon } from "@/components/site/public-ui";
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
  destinations: { id: string; name: string }[];
  today: string;
}) {
  return (
    <Form
      action={serviceRoutes[type]}
      scroll={false}
      className="catalog-filters"
      aria-label="Lọc dịch vụ"
    >
      {type === "combo" && <input type="hidden" name="type" value="combo" />}

      <div className="catalog-search-bar">
        <FilterField
          label="Từ khóa"
          icon="search"
          className="catalog-keyword-field"
        >
          <input
            className="catalog-filter-control"
            type="search"
            name="q"
            defaultValue={params.q}
            placeholder="Bạn muốn đi đâu?"
          />
        </FilterField>
        <FilterField
          label="Địa phương"
          icon="location_on"
          className="catalog-destination-field"
        >
          <select
            className="catalog-filter-control"
            name="destination"
            defaultValue={params.destination || ""}
          >
            <option value="">Tất cả điểm đến</option>
            {destinations.map((destination) => (
              <option key={destination.id} value={destination.id}>
                {destination.name}
              </option>
            ))}
          </select>
        </FilterField>
        <button
          className="public-primary-button catalog-search-submit"
          type="submit"
          aria-label="Lọc dịch vụ"
        >
          <PublicIcon name="search" className="text-xl" />
          <span className="hidden sm:inline">Lọc dịch vụ</span>
        </button>
      </div>

      <div className="catalog-refinements">
        <FilterField
          label="Ngày sử dụng"
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
            label="Ngày trả phòng"
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
        {type === "hotel" && (
          <FilterField label="Loại hình / Sao" icon="hotel_class">
            <select
              name="category"
              className="catalog-filter-control"
              defaultValue={params.category || ""}
            >
              <option value="">Tất cả</option>
              <option value="5 sao">5 sao</option>
              <option value="4 sao">4 sao</option>
              <option value="resort">Resort</option>
            </select>
          </FilterField>
        )}
        <FilterField
          label="Số khách"
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
          Xóa bộ lọc
        </Link>
      </div>
    </Form>
  );
}
