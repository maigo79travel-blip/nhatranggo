"use client";

import Form from "next/form";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  ["all", "Tất cả"],
  ["dao-nha-trang", "Tour đảo"],
  ["du-thuyen", "Du thuyền"],
  ["lan-bien", "Lặn biển"],
  ["vinh-hy", "Vĩnh Hy"],
  ["city", "City tour"],
  ["da-lat", "Đà Lạt"],
] as const;

const sortOptions = [
  { value: "recommended", label: "Đề xuất" },
  { value: "price", label: "Giá thấp nhất" },
  { value: "price-desc", label: "Giá cao nhất" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

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
  return (
    <div className="min-w-0 sm:w-52">
      <CustomSelect
        ariaLabel="Sắp xếp tour"
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
  destinations: { id: string; name: string }[];
  today: string;
}) {
  const category = params.category || "all";
  const hasFilters = hasServiceSearch(params);
  return (
    <div className="relative z-10 -mt-16 rounded-[24px] border border-border-subtle bg-surface p-3 shadow-card sm:-mt-20 sm:p-4">
      <Form
        className="tour-search-form grid items-stretch gap-2 sm:gap-3"
        aria-label="Tìm tour"
        action={serviceRoutes[type]}
        scroll={false}
      >
        {type === "combo" && <input type="hidden" name="type" value="combo" />}
        {params.category && (
          <input type="hidden" name="category" value={params.category} />
        )}
        {params.sort && <input type="hidden" name="sort" value={params.sort} />}
        <FilterField
          label="Tên tour hoặc điểm đến"
          icon="search"
          className="tour-search-keyword"
        >
          <input
            type="search"
            name="q"
            className="catalog-filter-control"
            defaultValue={params.q}
            placeholder="Bạn muốn khám phá đâu?"
            maxLength={150}
          />
        </FilterField>
        <FilterField label="Địa phương" icon="location_on">
          <CustomSelect
            name="destination"
            ariaLabel="Địa phương"
            defaultValue={params.destination || ""}
            searchable={destinations.length > 5}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: "Tất cả" },
              ...destinations.map((place) => ({
                value: place.id,
                label: place.name,
              })),
            ]}
          />
        </FilterField>
        <FilterField label="Ngày khởi hành" icon="calendar_today">
          <input
            id="tour-departure-date"
            type="date"
            name="date"
            className="catalog-filter-control"
            defaultValue={draft.date}
            min={today}
          />
        </FilterField>
        <FilterField label="Số lượng khách" icon="group">
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
          {type === "combo" ? "Tìm combo" : "Tìm tour"}
        </button>
      </Form>
      {(type === "tour" || hasFilters) && (
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border-subtle pt-2.5">
          {type === "tour" && (
            <nav
              aria-label="Loại tour"
              className="grid w-full grid-cols-3 gap-1.5 min-[360px]:grid-cols-4 sm:flex sm:w-auto sm:flex-1 sm:flex-wrap"
            >
              {categories.map(([key, label]) => (
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
              Xóa bộ lọc
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
