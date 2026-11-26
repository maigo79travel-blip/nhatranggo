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
            maxLength={150}
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
        {(type === "tour" || type === "hotel") && (
          <FilterField label="Loại dịch vụ" icon="filter_list">
            <CustomSelect
              name="category"
              ariaLabel={type === "tour" ? "Loại tour" : "Loại hình / Sao"}
              defaultValue={params.category || ""}
              buttonClassName="catalog-filter-control cursor-pointer"
              options={
                type === "tour"
                  ? [
                      { value: "", label: "Tất cả tour" },
                      { value: "dao-nha-trang", label: "Đảo Nha Trang" },
                      { value: "du-thuyen", label: "Du thuyền" },
                      { value: "lan-bien", label: "Lặn biển" },
                      { value: "vinh-hy", label: "Vĩnh Hy" },
                      { value: "city", label: "City tour" },
                      { value: "da-lat", label: "Đà Lạt" },
                    ]
                  : [
                      { value: "", label: "Tất cả" },
                      { value: "3 sao", label: "3 sao" },
                      { value: "4 sao", label: "4 sao" },
                      { value: "5 sao", label: "5 sao" },
                      { value: "resort", label: "Resort" },
                    ]
              }
            />
          </FilterField>
        )}
        <FilterField label="Sắp xếp" icon="sort">
          <CustomSelect
            name="sort"
            ariaLabel="Sắp xếp dịch vụ"
            defaultValue={params.sort || ""}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: "Đề xuất" },
              { value: "price", label: "Giá thấp nhất" },
              { value: "price-desc", label: "Giá cao nhất" },
              { value: "rating", label: "Đánh giá cao nhất" },
            ]}
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
        <Link className="catalog-reset" href={resetHref} scroll={false}>
          <PublicIcon name="restart_alt" className="text-xl" />
          Xóa bộ lọc
        </Link>
      </div>
    </Form>
  );
}
