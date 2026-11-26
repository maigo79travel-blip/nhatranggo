"use client";

import Form from "next/form";
import Link from "next/link";
import { FilterField } from "@/components/site/filter-field";
import { PublicIcon } from "@/components/site/public-ui";
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
          <CustomSelect
            name="destination"
            ariaLabel="Địa phương"
            searchable
            searchPlaceholder="Tìm địa phương…"
            defaultValue={params.destination || ""}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: "Tất cả điểm đến" },
              ...destinations.map((destination) => ({
                value: destination.id,
                label: destination.name,
              })),
            ]}
          />
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
            <CustomSelect
              name="category"
              ariaLabel="Loại hình / Sao"
              defaultValue={params.category || ""}
              buttonClassName="catalog-filter-control cursor-pointer"
              options={[
                { value: "", label: "Tất cả" },
                { value: "5 sao", label: "5 sao" },
                { value: "4 sao", label: "4 sao" },
                { value: "resort", label: "Resort" },
              ]}
            />
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
