import { ContentText, ContentElement, FareValue } from "@/components/content";

export function TransfersHero() {
  return (
    <section className="relative w-full bg-gradient-to-b from-ocean-light/50 via-surface to-background pb-16 pt-8 overflow-hidden">
      <div className="absolute -top-36 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-tr from-lagoon-cyan/20 to-primary/15 blur-3xl pointer-events-none rounded-full"></div>
      <div className="site-container relative z-10">
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary font-label-md text-label-md font-semibold">
            <span className="material-symbols-outlined text-[16px]">
              {"directions_car"}
            </span>
            <ContentText contentKey="transfers.text-025" />
          </span>
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-gold-soft text-tertiary font-label-md text-label-md font-semibold">
            <span className="material-symbols-outlined text-[16px]">
              {"verified_user"}
            </span>
            <ContentText contentKey="transfers.text-026" />
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-3xl">
            <h1 className="font-display text-display text-on-surface tracking-tight leading-tight">
              <ContentText contentKey="transfers.text-027" />
              <span className="text-primary">
                <ContentText contentKey="transfers.text-028" />
              </span>
              <ContentText contentKey="transfers.text-029" />
            </h1>
            <p className="font-body-lg text-body-lg text-on-surface-variant mt-4 leading-relaxed">
              <ContentText contentKey="transfers.text-030" />
            </p>
          </div>
          <div className="flex flex-col sm:flex-row lg:flex-col items-start sm:items-center lg:items-end gap-3 shrink-0">
            <ContentElement
              contentKey="transfers.attributes-001"
              tag="a"
              className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-surface-container-lowest shadow-md hover:shadow-lg transition-all"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center">
                <span className="material-symbols-outlined text-[22px]">
                  {"call"}
                </span>
              </div>
              <div>
                <div className="font-label-sm text-label-sm text-outline">
                  <ContentText contentKey="transfers.text-031" />
                </div>
                <div className="font-title-lg text-title-lg font-bold text-primary">
                  <ContentText contentKey="transfers.text-032" />
                </div>
              </div>
            </ContentElement>
            <ContentElement
              contentKey="transfers.attributes-009"
              tag="a"
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 text-secondary font-label-md text-label-md hover:underline"
            >
              <span className="material-symbols-outlined text-[18px]">
                {"chat"}
              </span>
              <ContentText contentKey="transfers.text-033" />
            </ContentElement>
          </div>
        </div>

        <div className="w-full bg-surface-container-lowest rounded-3xl shadow-2xl p-5 md:p-8 border border-border-light/50">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-border-light/40">
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                data-tab="tab-airport"
                className="tab-btn px-4 py-2 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm transition-all"
              >
                <ContentText contentKey="transfers.text-034" />
              </button>
              <button
                type="button"
                data-tab="tab-intercity"
                className="tab-btn px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
              >
                <ContentText contentKey="transfers.text-035" />
              </button>
              <button
                type="button"
                data-tab="tab-daily"
                className="tab-btn px-4 py-2 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
              >
                <ContentText contentKey="transfers.text-036" />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-5">
              <label className="inline-flex items-center gap-2 cursor-pointer font-label-lg text-label-lg text-on-surface">
                <ContentElement
                  contentKey="transfers.attributes-002"
                  tag="input"
                  type="radio"
                  name="trip_type"
                  defaultChecked={true}
                  className="accent-primary w-4 h-4"
                />
                <span>
                  <ContentText contentKey="transfers.text-037" />
                </span>
              </label>
              <label className="inline-flex items-center gap-2 cursor-pointer font-label-lg text-label-lg text-on-surface">
                <ContentElement
                  contentKey="transfers.attributes-003"
                  tag="input"
                  type="radio"
                  name="trip_type"
                  className="accent-primary w-4 h-4"
                />
                <span>
                  <ContentText contentKey="transfers.text-038" />
                </span>
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            <div className="bg-surface-subtle rounded-2xl p-3.5">
              <label
                htmlFor="pickup-select"
                className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5"
              >
                <ContentText contentKey="transfers.text-039" />
              </label>
              <ContentElement
                contentKey="transfers.attributes-004"
                tag="select"
                id="pickup-select"
                className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="CXR">
                  <ContentText contentKey="transfers.text-040" />
                </option>
                <option value="NT_CENTER">
                  <ContentText contentKey="transfers.text-041" />
                </option>
                <option value="BAI_DAI">
                  <ContentText contentKey="transfers.text-042" />
                </option>
                <option value="DALAT">
                  <ContentText contentKey="transfers.text-043" />
                </option>
                <option value="OTHER">
                  <ContentText contentKey="transfers.text-044" />
                </option>
              </ContentElement>
            </div>

            <div className="bg-surface-subtle rounded-2xl p-3.5">
              <label
                htmlFor="dropoff-select"
                className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5"
              >
                <ContentText contentKey="transfers.text-045" />
              </label>
              <ContentElement
                contentKey="transfers.attributes-005"
                tag="select"
                id="dropoff-select"
                className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none cursor-pointer"
              >
                <option value="NT_CENTER">
                  <ContentText contentKey="transfers.text-046" />
                </option>
                <option value="BAI_DAI">
                  <ContentText contentKey="transfers.text-047" />
                </option>
                <option value="CXR">
                  <ContentText contentKey="transfers.text-048" />
                </option>
                <option value="DOC_LET">
                  <ContentText contentKey="transfers.text-049" />
                </option>
                <option value="DALAT">
                  <ContentText contentKey="transfers.text-050" />
                </option>
                <option value="TUY_HOA">
                  <ContentText contentKey="transfers.text-051" />
                </option>
              </ContentElement>
            </div>

            <div className="bg-surface-subtle rounded-2xl p-3.5">
              <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5">
                <ContentText contentKey="transfers.text-052" />
              </span>
              <div className="grid grid-cols-2 gap-2">
                <ContentElement
                  contentKey="transfers.attributes-006"
                  tag="input"
                  type="date"
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none"
                />
                <ContentElement
                  contentKey="transfers.attributes-007"
                  tag="input"
                  type="time"
                  className="w-full bg-transparent font-body-md text-body-md text-on-surface focus:outline-none"
                />
              </div>
            </div>

            <div className="bg-surface-subtle rounded-2xl p-3.5">
              <span className="block font-label-sm text-label-sm text-outline uppercase tracking-wider mb-1.5">
                <ContentText contentKey="transfers.text-053" />
              </span>
              <ContentElement
                contentKey="transfers.attributes-008"
                tag="input"
                type="text"
                className="w-full bg-transparent font-body-md text-body-md text-on-surface placeholder:text-outline focus:outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-border-light/40">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="font-label-lg text-label-lg text-on-surface-variant">
                  <ContentText contentKey="transfers.text-054" />:
                </span>
                <span
                  id="selected-vehicle-label"
                  className="font-title-md text-title-md text-primary font-semibold"
                >
                  <ContentText contentKey="transfers.text-055" />
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  data-veh="4cho"
                  data-name="Xe 4 chỗ Sedan (Vios, Accent, City)"
                  className="vehicle-chip px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md transition-all"
                >
                  <ContentText contentKey="transfers.text-056" />
                </button>
                <button
                  type="button"
                  data-veh="7cho"
                  data-name="Xe 7 chỗ MPV/SUV (Xpander, Innova, Fortuner)"
                  className="vehicle-chip px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all"
                >
                  <ContentText contentKey="transfers.text-057" />
                </button>
                <button
                  type="button"
                  data-veh="16cho"
                  data-name="Xe 16 chỗ (Solati, Transit)"
                  className="vehicle-chip px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all"
                >
                  <ContentText contentKey="transfers.text-058" />
                </button>
                <button
                  type="button"
                  data-veh="limo9"
                  data-name="Limousine 9 chỗ VIP"
                  className="vehicle-chip px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-md text-label-md transition-all"
                >
                  <ContentText contentKey="transfers.text-059" />
                </button>
              </div>
            </div>

            <button
              id="btn-search-fare"
              type="button"
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-primary to-ocean-deep hover:shadow-lg text-on-primary font-label-lg text-label-lg font-bold shadow-md transition-all shrink-0"
            >
              <ContentText contentKey="transfers.text-060" />
            </button>
          </div>

          <div className="mt-6 flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-ocean-light/40 rounded-2xl p-5">
            <div>
              <div className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-061" />
                <strong id="route-text" className="text-primary">
                  <ContentText contentKey="transfers.text-062" />
                </strong>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                <ContentText contentKey="transfers.text-063" />
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4 shrink-0">
              <div className="text-left lg:text-right">
                <div className="font-label-sm text-label-sm text-outline">
                  <ContentText contentKey="transfers.text-064" />
                </div>
                <div
                  id="route-price"
                  className="font-headline-lg text-headline-lg font-bold text-primary"
                >
                  <FareValue route="CXR_NT_CENTER" vehicle="4cho" />
                </div>
              </div>
              <ContentElement
                contentKey="transfers.attributes-009"
                tag="a"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-secondary text-on-secondary font-label-lg text-label-lg font-bold shadow-sm hover:opacity-95 transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">
                  {"chat"}
                </span>
                <ContentText contentKey="transfers.text-066" />
              </ContentElement>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
          <div className="flex items-center gap-2.5 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-[20px]">
              {"flight_land"}
            </span>
            <ContentText contentKey="transfers.text-067" />
          </div>
          <div className="flex items-center gap-2.5 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-[20px]">
              {"badge"}
            </span>
            <ContentText contentKey="transfers.text-068" />
          </div>
          <div className="flex items-center gap-2.5 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-[20px]">
              {"event_available"}
            </span>
            <ContentText contentKey="transfers.text-069" />
          </div>
          <div className="flex items-center gap-2.5 text-on-surface-variant font-label-md text-label-md">
            <span className="material-symbols-outlined text-primary text-[20px]">
              {"nightlight_round"}
            </span>
            <ContentText contentKey="transfers.text-070" />
          </div>
        </div>
      </div>
    </section>
  );
}
