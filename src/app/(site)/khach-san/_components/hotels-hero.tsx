"use client";

import { useEffect, useState, type FormEvent, type ReactNode } from "react";
import { useContent, useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { nextDate, vietnamToday } from "@/modules/travel/search";

export interface HotelSearchState {
  query: string;
  checkIn: string;
  checkOut: string;
  guests: string;
  category: string;
}

const hotSuggestions = [
  { label: "Bãi Dài Cam Ranh All-inclusive", query: "Bãi Dài" },
  { label: "Đường Trần Phú có bãi tắm", query: "Trần Phú" },
  { label: "Villa hồ bơi riêng", query: "Hồ bơi" },
];

function SearchField({
  icon,
  label,
  children,
  className = "",
}: {
  icon: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <label className={`hotel-search-field ${className}`}>
      <img
        src={`/images/figma/icons/${icon}.svg`}
        alt=""
        width={28}
        height={28}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-xs text-on-surface-variant sm:text-[13px]">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

export function HotelsHero({
  search,
  onSearch,
}: {
  search: HotelSearchState;
  onSearch: (next: HotelSearchState) => void;
}) {
  const [draft, setDraft] = useState(search);
  const t = useT();
  const storedTitle = useContent("hotels.text-046");
  const heroTitle = typeof storedTitle === "string" ? storedTitle.trim() : "";
  const customTitle =
    heroTitle && heroTitle !== "Tìm & Đặt Phòng Khách Sạn, Resort Giá Tốt Nhất";

  useEffect(() => {
    setDraft(search);
  }, [search]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(draft);
  }

  return (
    <section className="hotel-hero relative" aria-labelledby="hotel-title">
      <div className="hotel-hero-picture" aria-hidden="true" />
      <div className="site-container relative">
        <h1
          id="hotel-title"
          className="hotel-hero-title font-extrabold tracking-tight"
        >
          {customTitle ? (
            heroTitle
          ) : (
            <>
              {t.hotels.heroTitleLine1}
              <span className="hotel-hero-accent mt-3 block uppercase">
                {t.hotels.heroTitleAccent1}
                <br />
                {t.hotels.heroTitleAccent2}
              </span>
            </>
          )}
        </h1>

        <form
          className="hotel-search"
          aria-label={t.hotels.searchAria}
          onSubmit={handleSubmit}
        >
          <div className="hotel-search-fields">
            <SearchField
              icon="pin"
              label={t.hotels.destination}
              className="col-span-full xl:col-span-1"
            >
              <input
                className="hotel-search-control"
                type="search"
                value={draft.query}
                onChange={(event) =>
                  setDraft({ ...draft, query: event.target.value })
                }
                placeholder={t.hotels.destinationPlaceholder}
              />
            </SearchField>
            <SearchField icon="calendar" label={t.hotels.checkIn}>
              <input
                className="hotel-search-control"
                type="date"
                min={vietnamToday()}
                value={draft.checkIn}
                onChange={(event) => {
                  const checkIn = event.target.value;
                  setDraft({
                    ...draft,
                    checkIn,
                    checkOut: draft.checkOut > checkIn ? draft.checkOut : "",
                  });
                }}
              />
            </SearchField>
            <SearchField icon="calendar" label={t.hotels.checkOut}>
              <input
                className="hotel-search-control"
                type="date"
                min={nextDate(draft.checkIn || vietnamToday())}
                value={draft.checkOut}
                onChange={(event) =>
                  setDraft({ ...draft, checkOut: event.target.value })
                }
              />
            </SearchField>
            <SearchField icon="users" label={t.hotels.guests}>
              <CustomSelect
                ariaLabel={t.hotels.guests}
                buttonClassName="hotel-search-control cursor-pointer"
                value={draft.guests}
                onChange={(guests) => setDraft({ ...draft, guests })}
                options={[
                  ...Array.from({ length: 6 }, (_, index) => ({
                    value: String(index + 1),
                    label: `${index + 1} ${t.hotels.guestUnit}`,
                  })),
                  { value: "7", label: t.hotels.guest7Plus },
                ]}
              />
            </SearchField>
            <SearchField icon="hotel-type" label={t.hotels.category}>
              <CustomSelect
                ariaLabel={t.hotels.category}
                buttonClassName="hotel-search-control cursor-pointer"
                value={draft.category}
                onChange={(category) => setDraft({ ...draft, category })}
                options={[
                  { value: "all", label: t.hotels.categoryAll },
                  { value: "5-star", label: t.hotels.category5Star },
                  { value: "4-star", label: t.hotels.category4Star },
                  { value: "3-star", label: t.hotels.category3Star },
                  { value: "resort", label: t.hotels.categoryResort },
                ]}
              />
            </SearchField>
            <button
              type="submit"
              className="hotel-button col-span-full xl:col-span-1 xl:self-center"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-lg"
              >
                search
              </span>
              {t.hotels.submit}
            </button>
          </div>
          <div className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-on-surface-variant sm:text-sm">
            <span>{t.hotels.hotSuggestions}</span>
            {hotSuggestions.map((item, index) => (
              <button
                key={item.query}
                className="min-h-8 whitespace-normal text-left font-bold text-primary hover:underline"
                type="button"
                onClick={(event) => {
                  const form = event.currentTarget.form;
                  if (!form?.reportValidity()) return;
                  const next = { ...draft, query: item.query };
                  setDraft(next);
                  onSearch(next);
                }}
              >
                {t.hotels.hotSuggestionLabels[index] ?? item.label}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}
