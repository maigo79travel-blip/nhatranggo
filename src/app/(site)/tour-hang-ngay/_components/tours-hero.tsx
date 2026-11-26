"use client";

import { useState, type FormEvent } from "react";
import { ContentText, ContentElement, useSiteData } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { vietnamToday } from "@/modules/travel/search";

import { useRouter } from "next/navigation";
import { serviceRoutes } from "@/modules/travel/service-routes";

export function ToursHero() {
  const router = useRouter();
  const { products, destinations } = useSiteData();
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const linkedDestinations = new Set(
    products.map((product) => product.destination_id),
  );
  const departureOptions = [
    { value: "", label: "Tất cả điểm đến" },
    ...destinations
      .filter((item) => linkedDestinations.has(item.id))
      .map((item) => ({ value: item.id, label: item.name })),
  ];
  const handleSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({ guests });
    if (destination) params.set("destination", destination);
    if (date) params.set("date", date);
    router.push(`${serviceRoutes.tour}?${params}`);
  };

  return (
    <section className="relative w-full overflow-x-clip bg-surface pb-12 pt-6">
      <div className="absolute -right-24 -top-24 h-96 w-96 rounded-full bg-surface-brand/50 blur-3xl pointer-events-none"></div>
      <div className="absolute -left-20 top-1/2 h-80 w-80 rounded-full bg-surface-tinted/30 blur-3xl pointer-events-none"></div>
      <div className="site-container relative z-10">
        <nav className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant mb-4">
          <ContentElement
            contentKey="tours.attributes-001"
            tag="a"
            className="hover:text-primary transition-colors flex items-center gap-1"
            data-path="trang-chu"
          >
            <span className="material-symbols-outlined text-[16px]">
              {"home"}
            </span>
            <ContentText contentKey="tours.text-008" />
          </ContentElement>
          <span className="text-border-default">
            <ContentText contentKey="tours.text-009" />
          </span>
          <span className="text-primary font-semibold">
            <ContentText contentKey="tours.text-010" />
          </span>
        </nav>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="min-w-0">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-brand text-primary font-label-sm text-label-sm mb-3">
              <span
                className="material-symbols-outlined text-[16px] text-primary"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {"verified"}
              </span>
              <span>
                <ContentText contentKey="tours.text-011" />
              </span>
            </div>
            <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
              <ContentText contentKey="tours.text-012" />
              <span className="text-primary">
                <ContentText contentKey="tours.text-013" />
              </span>
            </h1>
          </div>

          {products.length > 0 && (
            <p className="rounded-2xl bg-surface-muted px-4 py-3 text-sm font-semibold text-on-surface-variant">
              {products.length} tour đang nhận yêu cầu
            </p>
          )}
        </div>

        <div
          className="no-scrollbar flex flex-wrap items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2"
          id="categoryFilterBar"
        >
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-primary text-on-primary shadow-sm hover:shadow transition-all shrink-0"
            data-category="all"
            onClick={() => router.push(serviceRoutes.tour)}
            aria-pressed={true}
            type="button"
          >
            <ContentText contentKey="tours.text-017" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="dao-nha-trang"
            onClick={() =>
              router.push(serviceRoutes.tour + "?category=dao-nha-trang")
            }
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-018" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="du-thuyen"
            onClick={() =>
              router.push(serviceRoutes.tour + "?category=du-thuyen")
            }
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-019" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="lan-bien"
            onClick={() =>
              router.push(serviceRoutes.tour + "?category=lan-bien")
            }
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-020" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="vinh-hy"
            onClick={() =>
              router.push(serviceRoutes.tour + "?category=vinh-hy")
            }
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-021" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="city"
            onClick={() => router.push(serviceRoutes.tour + "?category=city")}
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-022" />
          </button>
          <button
            className="tour-cat-btn px-4 py-2.5 rounded-full font-label-lg text-label-lg bg-surface-tinted text-on-surface hover:bg-surface-brand hover:text-primary transition-all shrink-0"
            data-category="da-lat"
            onClick={() => router.push(serviceRoutes.tour + "?category=da-lat")}
            aria-pressed={false}
            type="button"
          >
            <ContentText contentKey="tours.text-023" />
          </button>
        </div>

        <div className="mt-4 bg-surface rounded-2xl shadow-xl p-4 lg:p-5">
          <form
            onSubmit={handleSearch}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
          >
            <div className="lg:col-span-3 bg-surface-muted p-3 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-brand flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"location_on"}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  Điểm đến
                </span>
                <CustomSelect
                  ariaLabel="Điểm đến"
                  value={destination}
                  onChange={setDestination}
                  options={departureOptions}
                  buttonClassName="bg-transparent font-title-md text-title-md text-on-surface outline-none cursor-pointer"
                />
              </div>
            </div>

            <div className="lg:col-span-3 bg-surface-muted p-3 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-surface-brand/40 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"calendar_today"}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <label
                  htmlFor="tour-departure-date"
                  className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider"
                >
                  <ContentText contentKey="tours.text-029" />
                </label>
                <input
                  id="tour-departure-date"
                  className="bg-transparent font-title-md text-title-md text-on-surface outline-none cursor-pointer w-full min-w-0"
                  type="date"
                  min={vietnamToday()}
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                />
              </div>
            </div>

            <div className="lg:col-span-3 bg-surface-muted p-3 rounded-xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-promo-surface flex items-center justify-center text-promo-ink shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"group"}
                </span>
              </div>
              <div className="flex flex-col flex-1 min-w-0">
                <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider">
                  <ContentText contentKey="tours.text-030" />
                </span>
                <input
                  aria-label="Số lượng khách"
                  type="number"
                  min={1}
                  max={100}
                  required
                  value={guests}
                  onChange={(event) => setGuests(event.target.value)}
                  className="min-w-0 w-full bg-transparent font-title-md text-title-md text-on-surface outline-none"
                />
              </div>
            </div>

            <div className="lg:col-span-3">
              <button
                className="w-full h-14 rounded-xl bg-gradient-to-r from-primary to-brand-deep hover:from-brand-deep hover:to-primary text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                type="submit"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {"search"}
                </span>
                <span>
                  <ContentText contentKey="tours.text-035" />
                </span>
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-3 px-1 font-body-sm text-body-sm text-on-surface-variant">
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <span className="material-symbols-outlined text-[16px]">
                {"check_circle"}
              </span>
              <ContentText contentKey="tours.text-036" />
            </span>
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <span className="material-symbols-outlined text-[16px]">
                {"directions_boat"}
              </span>
              <ContentText contentKey="tours.text-037" />
            </span>
            <span className="flex items-center gap-1.5 text-primary font-medium">
              <span className="material-symbols-outlined text-[16px]">
                {"shield"}
              </span>
              <ContentText contentKey="tours.text-038" />
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
