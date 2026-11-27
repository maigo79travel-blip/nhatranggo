"use client";

import Form from "next/form";
import { serviceRoutes } from "@/modules/travel/service-routes";
import { useState, type ReactNode } from "react";
import { ContentText, useSiteData, useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { nextDate, vietnamToday } from "@/modules/travel/search";
import type { HomeSuggestion } from "./home-navigation";
import { HomeLink } from "./home-link";

const tabs = [
  { type: "hotel", icon: "hotel", key: "home.text-047" },
  { type: "tour", icon: "map", key: "home.text-048" },
  { type: "combo", icon: "luggage", key: "home.text-049" },
  { type: "transfer", icon: "directions_car", key: "header.text-028" },
] as const;

const inputClass =
  "block w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none";

function SearchField({
  icon,
  label,
  children,
  wide = false,
}: {
  icon: string;
  label: ReactNode;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <label
      className={`flex min-h-[64px] min-w-0 items-center gap-2.5 rounded-2xl bg-surface-muted px-3 py-2.5 focus-within:ring-2 focus-within:ring-focus-ring xl:min-h-[73px] ${wide ? "min-[380px]:col-span-2 xl:col-span-1" : ""}`}
    >
      <span
        className={`material-symbols-outlined shrink-0 text-[25px] text-primary xl:text-[28px] ${wide ? "" : "min-[380px]:max-sm:hidden"}`}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="mb-0.5 block text-xs font-medium text-on-surface">
          {label}
        </span>
        {children}
      </span>
    </label>
  );
}

export function HomeSearch({ suggestions }: { suggestions: HomeSuggestion[] }) {
  const [type, setType] = useState<(typeof tabs)[number]["type"]>("hotel");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const { content, locale } = useSiteData();
  const t = useT();
  const attributes = content["home.attributes-002"]?.value as
    { placeholder?: string } | undefined;
  const hotel = type === "hotel";
  const departureLabel = hotel ? t.home.search.checkIn : t.home.search.useDate;
  const today = vietnamToday();

  return (
    <div
      data-home-search
      className="drop-shadow-[0_8px_14px_rgb(var(--color-shadow-brand)_/_0.12)]"
    >
      <div
        className="grid w-full max-w-full grid-cols-2 gap-2 rounded-t-[24px] bg-surface p-3 sm:flex sm:w-fit sm:flex-wrap sm:rounded-t-[30px] sm:px-5 sm:pt-5 sm:pb-4"
        role="group"
        aria-label="Loại dịch vụ tìm kiếm"
      >
        {tabs.map((tab) => (
          <button
            type="button"
            key={tab.type}
            data-service-type={tab.type}
            aria-pressed={type === tab.type}
            onClick={() => setType(tab.type)}
            className={`search-tab-btn flex min-h-11 min-w-0 items-center justify-center gap-1.5 rounded-full px-2.5 text-xs font-bold transition-colors sm:gap-2 sm:px-4 sm:text-sm lg:text-base ${
              type === tab.type
                ? "bg-gradient-to-r from-primary to-brand-deep text-on-primary"
                : "bg-surface-muted text-on-surface hover:bg-surface-tinted"
            }`}
          >
            <span
              className="material-symbols-outlined shrink-0 text-[21px] sm:text-[24px]"
              aria-hidden="true"
            >
              {tab.icon}
            </span>
            <ContentText contentKey={tab.key} />
          </button>
        ))}
      </div>

      <div className="w-full rounded-b-[24px] bg-surface p-3 sm:rounded-b-[30px] sm:rounded-tr-[30px] sm:px-5 sm:py-4">
        <Form
          action={serviceRoutes[type]}
          className={`grid grid-cols-1 items-center gap-3 min-[380px]:grid-cols-2 xl:gap-4 ${
            hotel
              ? "xl:grid-cols-[minmax(0,1.45fr)_repeat(3,minmax(0,1fr))_minmax(0,1.25fr)_auto]"
              : "xl:grid-cols-[minmax(0,1.6fr)_repeat(2,minmax(0,1fr))_auto]"
          }`}
        >
          <input type="hidden" name="type" value={type} />
          <SearchField
            icon="location_on"
            label={
              locale === "vi" ? (
                <ContentText contentKey="home.text-051" />
              ) : hotel ? (
                t.home.search.destinationHotel
              ) : (
                t.home.search.destinationService
              )
            }
            wide
          >
            <input
              className={inputClass}
              name="q"
              maxLength={150}
              aria-label={
                hotel
                  ? t.home.search.destinationHotel
                  : t.home.search.destinationService
              }
              placeholder={
                locale === "vi"
                  ? attributes?.placeholder || t.home.search.destinationHotel
                  : t.home.search.destinationPlaceholder
              }
            />
          </SearchField>

          <SearchField icon="calendar_today" label={departureLabel}>
            <input
              className={inputClass}
              name="date"
              type="date"
              aria-label={departureLabel}
              min={today}
              value={date}
              onChange={(event) => {
                const value = event.target.value;
                setDate(value);
                if (!value) setReturnDate("");
                else if (returnDate && returnDate <= value)
                  setReturnDate(nextDate(value));
              }}
            />
          </SearchField>

          {hotel && (
            <SearchField icon="calendar_today" label={t.home.search.checkOut}>
              <input
                className={inputClass}
                name="returnDate"
                type="date"
                aria-label={t.home.search.checkOut}
                min={date ? nextDate(date) : today}
                value={returnDate}
                required={Boolean(date)}
                onChange={(event) => setReturnDate(event.target.value)}
              />
            </SearchField>
          )}

          <SearchField icon="group" label={t.home.search.guests}>
            <input
              className={inputClass}
              name="guests"
              type="number"
              aria-label={t.home.search.guests}
              min={1}
              max={100}
              defaultValue={2}
              required
            />
          </SearchField>

          {hotel && (
            <SearchField icon="hotel_class" label={t.home.search.categoryLabel}>
              <CustomSelect
                name="category"
                defaultValue=""
                ariaLabel={t.home.search.categoryLabel}
                buttonClassName={`${inputClass} cursor-pointer`}
                options={[
                  { value: "", label: t.home.search.categoryAll },
                  { value: "5 sao", label: t.home.search.category5Star },
                  { value: "resort", label: t.home.search.categoryResort },
                  { value: "4 sao", label: t.home.search.category4Star },
                ]}
              />
            </SearchField>
          )}

          <button
            className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 text-sm font-bold text-on-primary transition-colors hover:bg-primary-hover min-[380px]:col-span-2 xl:col-span-1"
            type="submit"
          >
            <span
              className="material-symbols-outlined text-[18px]"
              aria-hidden="true"
            >
              search
            </span>
            {locale === "vi" ? (
              <ContentText contentKey="home.text-058" />
            ) : (
              t.home.search.submit
            )}
          </button>
        </Form>

        {!!suggestions.length && (
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 pt-2.5 text-xs text-on-surface-variant">
            <span>
              <ContentText contentKey="home.text-059" />
            </span>
            {suggestions.map(({ contentKey, href, title }) => (
              <HomeLink
                key={contentKey}
                contentKey={contentKey}
                href={href}
                className="font-bold text-brand-deep hover:underline transition-colors action-link"
              >
                <ContentText contentKey={title} />
              </HomeLink>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
