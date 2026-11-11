"use client";

import Form from "next/form";
import Link from "next/link";
import { FilterField } from "@/modules/settings/filter-field";
import { PublicIcon } from "@/modules/settings/public-ui";
import type { BookingDraft } from "./search";

const serviceTypes = [
  { value: "", label: "Tất cả", icon: "grid_view" },
  { value: "hotel", label: "Khách sạn", icon: "hotel" },
  { value: "tour", label: "Tour", icon: "explore" },
  { value: "combo", label: "Combo", icon: "luggage" },
  { value: "transfer", label: "Xe đưa đón", icon: "airport_shuttle" },
];

export function ServiceFilters({
  params,
  draft,
  destinations,
  today,
}: {
  params: Record<string, string>;
  draft: BookingDraft;
  destinations: { id: string; name: string }[];
  today: string;
}) {
  const selectedType = serviceTypes.some((type) => type.value === params.type)
    ? params.type
    : "";
  return (
    <Form
      action="/dich-vu"
      scroll={false}
      className="catalog-filters"
      aria-label="Lọc dịch vụ"
    >
      <fieldset className="catalog-type-options">
        <legend className="sr-only">Loại dịch vụ</legend>
        {serviceTypes.map((type) => (
          <label key={type.value} className="catalog-type-option">
            <input
              className="sr-only"
              type="radio"
              name="type"
              value={type.value}
              defaultChecked={selectedType === type.value}
              onChange={(event) => event.currentTarget.form?.requestSubmit()}
            />
            <PublicIcon name={type.icon} className="text-xl" />
            {type.label}
          </label>
        ))}
      </fieldset>

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
          />
        </FilterField>
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
        <Link className="catalog-reset" href="/dich-vu" scroll={false}>
          <PublicIcon name="restart_alt" className="text-xl" />
          Xóa bộ lọc
        </Link>
      </div>
    </Form>
  );
}
