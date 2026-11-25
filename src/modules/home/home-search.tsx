"use client";
import { useState } from "react";
import { ContentText, useSiteData } from "@/components/content";
import { HomeLink } from "@/modules/home/home-link";
import { nextDate, vietnamToday } from "@/modules/travel/search";

const tabs = [
  { type: "hotel", icon: "hotel", key: "home.text-047" },
  { type: "tour", icon: "kayaking", key: "home.text-048" },
  { type: "combo", icon: "flight_takeoff", key: "home.text-049" },
  { type: "transfer", icon: "directions_car", key: "header.text-028" },
];

export function HomeSearch() {
  const [type, setType] = useState("hotel");
  const [query, setQuery] = useState("");
  const [date, setDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [category, setCategory] = useState("");
  const { content } = useSiteData();
  const attributes = content["home.attributes-002"]?.value as
    | { placeholder?: string; defaultValue?: string }
    | undefined;
  const hotel = type === "hotel";

  return (
    <div data-home-search className="flex flex-col">
      <div
        className="inline-flex items-center gap-2 bg-surface-container-lowest rounded-2xl shadow-card border border-border-light/70 px-3 py-2.5 mb-3 w-fit max-w-full overflow-x-auto"
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
            className={`search-tab-btn flex shrink-0 items-center gap-2 px-4 py-2 rounded-xl font-label-lg text-label-lg font-bold transition-colors ${
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

      <div className="w-full bg-surface-container-lowest rounded-2xl shadow-floating border border-border-light/80 p-4 md:p-5">
        <form
          action="/dich-vu"
          method="GET"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
        >
          <input type="hidden" name="type" value={type} />
          <label className="lg:col-span-3 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-2.5 flex items-center gap-3 focus-within:border-primary transition-colors cursor-text">
            <span
              className="w-10 h-10 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[20px]">
                location_on
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-label-sm text-outline mb-0.5">
                <ContentText contentKey="home.text-051" />
              </span>
              <input
                className="w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none"
                name="q"
                aria-label="Điểm đến hoặc tên dịch vụ"
                placeholder={
                  attributes?.placeholder || "Điểm đến hoặc tên dịch vụ"
                }
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </span>
          </label>

          <label
            className={`min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 focus-within:border-primary transition-colors ${
              hotel ? "lg:col-span-2" : "lg:col-span-3"
            }`}
          >
            <span
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[18px]">
                calendar_today
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-label-sm text-outline mb-0.5">
                {hotel ? "Ngày nhận phòng" : "Ngày sử dụng"}
              </span>
              <input
                className="w-full min-w-0 bg-transparent text-xs font-bold text-on-surface focus:outline-none"
                name="date"
                type="date"
                aria-label={hotel ? "Ngày nhận phòng" : "Ngày sử dụng"}
                min={vietnamToday()}
                value={date}
                onChange={(event) => {
                  const value = event.target.value;
                  setDate(value);
                  if (returnDate && returnDate <= value)
                    setReturnDate(nextDate(value));
                }}
              />
            </span>
          </label>

          {hotel && (
            <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 focus-within:border-primary transition-colors">
              <span
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
                aria-hidden="true"
              >
                <span className="material-symbols-outlined text-[18px]">
                  calendar_today
                </span>
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-label-sm text-outline mb-0.5">
                  Ngày trả phòng
                </span>
                <input
                  className="w-full min-w-0 bg-transparent text-xs font-bold text-on-surface focus:outline-none"
                  name="returnDate"
                  type="date"
                  aria-label="Ngày trả phòng"
                  min={date ? nextDate(date) : vietnamToday()}
                  value={returnDate}
                  required={Boolean(date)}
                  onChange={(event) => setReturnDate(event.target.value)}
                />
              </span>
            </label>
          )}

          <label
            className={`min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 focus-within:border-primary transition-colors ${
              hotel ? "lg:col-span-2" : "lg:col-span-2"
            }`}
          >
            <span
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[18px]">
                group
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-label-sm text-outline mb-0.5">
                Số khách
              </span>
              <input
                className="w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none"
                name="guests"
                type="number"
                aria-label="Số khách"
                min={1}
                max={100}
                defaultValue={2}
                required
              />
            </span>
          </label>

          <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-2.5 flex items-center gap-2.5 focus-within:border-primary transition-colors">
            <span
              className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center text-primary shrink-0"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[18px]">
                hotel_class
              </span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-label-sm text-outline mb-0.5">
                Loại hình/ Sao
              </span>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                aria-label="Loại hình hoặc hạng sao"
                className="w-full min-w-0 bg-transparent text-xs font-bold text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="">Tất cả khách sạn</option>
                <option value="5 sao">5 Sao Quốc Tế</option>
                <option value="resort">Resort nghỉ dưỡng</option>
                <option value="4 sao">4 Sao Cao Cấp</option>
              </select>
            </span>
          </label>

          <button
            className="lg:col-span-1 w-full min-h-[54px] px-3 rounded-full bg-primary hover:bg-ocean-deep text-on-primary text-sm font-bold flex items-center justify-center gap-1.5 shadow-sm transition-colors"
            type="submit"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              search
            </span>
            <ContentText contentKey="home.text-058" />
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-2 mt-3 pt-2.5 border-t border-border-light/60 text-xs text-outline">
          <span>
            <ContentText contentKey="home.text-059" />
          </span>
          <HomeLink
            contentKey="home.attributes-003"
            className="font-bold text-on-surface hover:text-primary transition-colors action-link"
            href="/dich-vu?type=hotel&q=B%C3%A3i%20D%C3%A0i"
          >
            <ContentText contentKey="home.text-060" />
          </HomeLink>
          <HomeLink
            contentKey="home.attributes-004"
            className="font-bold text-on-surface hover:text-primary transition-colors action-link"
            href="/dich-vu?type=tour&q=3%20%C4%90%E1%BA%A3o"
          >
            <ContentText contentKey="home.text-061" />
          </HomeLink>
          <HomeLink
            contentKey="home.attributes-005"
            className="font-bold text-on-surface hover:text-primary transition-colors action-link"
            href="/dich-vu?type=tour&q=VinWonders"
          >
            <ContentText contentKey="home.text-062" />
          </HomeLink>
          <HomeLink
            contentKey="home.attributes-006"
            className="font-bold text-on-surface hover:text-primary transition-colors action-link"
            href="/dich-vu?type=combo&q=Ph%C3%BA%20Qu%E1%BB%91c"
          >
            <ContentText contentKey="home.text-063" />
          </HomeLink>
        </div>
      </div>
    </div>
  );
}
