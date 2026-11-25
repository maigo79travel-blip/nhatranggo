"use client";
import { useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
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
  { label: "Villa Hồ bơi riêng", query: "Hồ bơi" },
];

export function HotelsHero({
  search,
  onSearch,
}: {
  search: HotelSearchState;
  onSearch: (next: HotelSearchState) => void;
}) {
  const [draft, setDraft] = useState<HotelSearchState>(search);

  useEffect(() => {
    setDraft(search);
  }, [search]);

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    onSearch(draft);
  };

  const applyHotQuery = (q: string) => {
    const next = { ...draft, query: q };
    setDraft(next);
    onSearch(next);
  };

  return (
    <section className="relative w-full bg-background">
      {/* Desktop Hero */}
      <div className="hidden md:block">
        <div
          className="relative w-full min-h-[340px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('/images/figma/hotels-hero.png')" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-hero-overlay/95 via-hero-overlay/75 to-transparent"
          />
          <div className="relative site-container py-12 pb-20 w-full">
            <h1 className="font-display tracking-tight leading-[1.15] max-w-2xl">
              <span className="block text-3xl font-extrabold text-on-surface mb-1">
                Tìm &amp; Đặt Phòng
              </span>
              <span className="block text-4xl lg:text-[42px] font-extrabold text-primary uppercase">
                KHÁCH SẠN &amp; RESORT
                <br />
                GIÁ TỐT NHẤT
              </span>
            </h1>
          </div>
        </div>

        <div className="relative z-10 site-container -mt-14 pb-6">
          <div className="bg-surface-container-lowest rounded-3xl shadow-floating border border-border-light p-4 lg:p-5">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-1 lg:grid-cols-12 gap-3 items-center"
            >
              <label className="lg:col-span-3 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-4 py-3 flex items-center gap-3 focus-within:border-primary transition-colors cursor-text">
                <img
                  src="/images/figma/icons/pin.svg"
                  alt=""
                  className="w-6 h-6 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-outline">Điểm đến</span>
                  <input
                    type="text"
                    value={draft.query}
                    onChange={(e) =>
                      setDraft({ ...draft, query: e.target.value })
                    }
                    placeholder="Nha Trang, Khánh Hòa"
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none"
                  />
                </span>
              </label>

              <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-3 flex items-center gap-2.5 focus-within:border-primary transition-colors">
                <img
                  src="/images/figma/icons/calendar.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-outline">
                    Ngày nhận phòng
                  </span>
                  <input
                    type="date"
                    min={vietnamToday()}
                    value={draft.checkIn}
                    onChange={(e) => {
                      const val = e.target.value;
                      setDraft({
                        ...draft,
                        checkIn: val,
                        checkOut:
                          draft.checkOut && draft.checkOut <= val
                            ? nextDate(val)
                            : draft.checkOut,
                      });
                    }}
                    className="w-full min-w-0 bg-transparent text-xs font-bold text-on-surface focus:outline-none"
                  />
                </span>
              </label>

              <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-3 flex items-center gap-2.5 focus-within:border-primary transition-colors">
                <img
                  src="/images/figma/icons/calendar.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-outline">
                    Ngày trả phòng
                  </span>
                  <input
                    type="date"
                    min={draft.checkIn ? nextDate(draft.checkIn) : vietnamToday()}
                    value={draft.checkOut}
                    onChange={(e) =>
                      setDraft({ ...draft, checkOut: e.target.value })
                    }
                    className="w-full min-w-0 bg-transparent text-xs font-bold text-on-surface focus:outline-none"
                  />
                </span>
              </label>

              <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-3 flex items-center gap-2.5 focus-within:border-primary transition-colors">
                <img
                  src="/images/figma/icons/users.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-outline">Số khách</span>
                  <select
                    value={draft.guests}
                    onChange={(e) =>
                      setDraft({ ...draft, guests: e.target.value })
                    }
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="4">4 người</option>
                    <option value="6">6+ người</option>
                  </select>
                </span>
              </label>

              <label className="lg:col-span-2 min-w-0 bg-surface-container-low border border-border-light rounded-2xl px-3.5 py-3 flex items-center gap-2.5 focus-within:border-primary transition-colors">
                <img
                  src="/images/figma/icons/hotel-type.svg"
                  alt=""
                  className="w-5 h-5 shrink-0"
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-outline">
                    Loại hình/ Sao
                  </span>
                  <select
                    value={draft.category}
                    onChange={(e) =>
                      setDraft({ ...draft, category: e.target.value })
                    }
                    className="w-full min-w-0 bg-transparent text-sm font-bold text-on-surface focus:outline-none cursor-pointer"
                  >
                    <option value="all">Tất cả khách sạn</option>
                    <option value="5-star">5 Sao Quốc Tế</option>
                    <option value="resort">Resort nghỉ dưỡng</option>
                    <option value="4-star">4 Sao Cao Cấp</option>
                  </select>
                </span>
              </label>

              <div className="lg:col-span-1 flex justify-end">
                <button
                  type="submit"
                  className="w-full h-[54px] px-4 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-bold text-sm flex items-center justify-center gap-1.5 shadow-sm transition-colors"
                >
                  <img
                    src="/images/figma/icons/search.svg"
                    alt=""
                    className="w-4 h-4 brightness-0 invert shrink-0"
                  />
                  <span>Tìm kiếm</span>
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 text-xs text-outline">
              <span>Gợi ý tìm kiếm hot:</span>
              {hotSuggestions.map((item) => (
                <button
                  key={item.query}
                  type="button"
                  onClick={() => applyHotQuery(item.query)}
                  className="font-bold text-on-surface hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Hero */}
      <div className="md:hidden site-container pt-4 pb-4 space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-outline">
          <Link href="/" className="hover:text-primary">
            Trang chủ
          </Link>
          <span>›</span>
          <span className="text-on-surface font-semibold">
            Khách sạn &amp; Resort
          </span>
        </div>

        <h1 className="text-2xl font-extrabold text-on-surface leading-tight">
          Tìm &amp; Đặt Phòng Khách Sạn, Resort Giá Tốt Nhất
        </h1>

        <div className="rounded-2xl overflow-hidden h-40">
          <img
            src="/images/figma/hotels-hero.png"
            alt="Khách sạn & Resort Nha Trang"
            className="w-full h-full object-cover"
          />
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-surface-container-lowest rounded-2xl border border-border-light shadow-card p-2.5 flex items-center gap-2"
        >
          <input
            type="text"
            value={draft.query}
            onChange={(e) => setDraft({ ...draft, query: e.target.value })}
            placeholder="Nha Trang – Khánh Hòa"
            className="flex-1 min-w-0 px-3 py-2 text-sm font-bold text-on-surface bg-transparent focus:outline-none"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm shrink-0"
          >
            Tìm Kiếm
          </button>
        </form>
      </div>
    </section>
  );
}
