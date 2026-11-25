"use client";
import { useState } from "react";
import { ContentText, useSiteData } from "@/components/content";
import { nextDate, vietnamToday } from "@/modules/travel/search";
const tabs = [
  { type: "hotel", icon: "hotel", key: "home.text-047" },
  { type: "tour", icon: "kayaking", key: "home.text-048" },
  { type: "combo", icon: "flight_takeoff", key: "home.text-049" },
  { type: "transfer", icon: "directions_car", key: "header.text-028" },
];
export function HomeSearch() {
  const [type, setType] = useState("hotel");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const { content } = useSiteData();
  const attributes = content["home.attributes-002"]?.value as
    { placeholder?: string; defaultValue?: string } | undefined;
  const hotel = type === "hotel";
  return (
    <div data-home-search>
      <div
        className="flex items-center gap-2 pb-4 overflow-x-auto"
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
            className={`search-tab-btn flex shrink-0 items-center gap-2 px-4 py-2.5 rounded-xl font-label-lg text-label-lg font-bold transition-colors ${
              type === tab.type
                ? "bg-primary text-on-primary shadow-sm"
                : "bg-surface-container-low text-on-surface hover:bg-surface-container"
            }`}
          >
            <span
              className="material-symbols-outlined text-[19px]"
              aria-hidden="true"
            >
              {tab.icon}
            </span>
            <ContentText contentKey={tab.key} />
          </button>
        ))}
      </div>
      <form
        action="/dich-vu"
        method="GET"
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 pt-2 items-center"
      >
        <input type="hidden" name="type" value={type} />
        <label className="lg:col-span-4 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-4 py-3 block focus-within:border-primary transition-colors">
          <span className="block text-label-sm text-outline mb-0.5">
            <ContentText contentKey="home.text-051" />
          </span>
          <input
            className="w-full min-w-0 bg-transparent text-title-md font-bold text-on-surface focus:outline-none"
            name="q"
            aria-label="Điểm đến hoặc tên dịch vụ"
            placeholder={attributes?.placeholder || "Điểm đến hoặc tên dịch vụ"}
            defaultValue={attributes?.defaultValue || ""}
          />
        </label>
        <label
          className={`min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-4 py-3 block focus-within:border-primary transition-colors ${hotel ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
          <span className="block text-label-sm text-outline mb-0.5">
            {hotel ? "Ngày nhận phòng" : "Ngày sử dụng"}
          </span>
          <input
            className="w-full min-w-0 bg-transparent text-body-md font-bold text-on-surface focus:outline-none"
            name="date"
            type="date"
            min={vietnamToday()}
            value={date}
            onChange={(event) => {
              const value = event.target.value;
              setDate(value);
              if (returnDate && returnDate <= value)
                setReturnDate(nextDate(value));
            }}
          />
        </label>
        {hotel && (
          <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-4 py-3 block focus-within:border-primary transition-colors">
            <span className="block text-label-sm text-outline mb-0.5">
              Ngày trả phòng
            </span>
            <input
              className="w-full min-w-0 bg-transparent text-body-md font-bold text-on-surface focus:outline-none"
              name="returnDate"
              type="date"
              min={date ? nextDate(date) : vietnamToday()}
              value={returnDate}
              required={Boolean(date)}
              onChange={(event) => setReturnDate(event.target.value)}
            />
          </label>
        )}
        <label
          className={`min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-4 py-3 block focus-within:border-primary transition-colors ${hotel ? "lg:col-span-2" : "lg:col-span-3"}`}
        >
          <span className="block text-label-sm text-outline mb-0.5">
            Số khách
          </span>
          <input
            className="w-full min-w-0 bg-transparent text-title-md font-bold text-on-surface focus:outline-none"
            name="guests"
            type="number"
            min={1}
            max={100}
            defaultValue={2}
            required
          />
        </label>
        <button
          className="lg:col-span-2 w-full min-h-[54px] rounded-xl bg-primary hover:bg-ocean-deep text-on-primary text-title-md font-bold flex items-center justify-center gap-2 shadow-sm transition-colors"
          type="submit"
        >
          <span className="material-symbols-outlined" aria-hidden="true">
            search
          </span>
          <ContentText contentKey="home.text-058" />
        </button>
      </form>
    </div>
  );
}
