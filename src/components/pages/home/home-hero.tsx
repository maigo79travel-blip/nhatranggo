import { ContentText, ContentElement } from "@/components/content";

export function HomeHero() {
  return (
    <>
      <ContentElement
        contentKey="home.attributes-001"
        tag="section"
        className="relative w-full -mt-[116px] pt-[140px] pb-20 md:pb-28 bg-cover bg-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/30 to-background"></div>
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="absolute top-1/2 -right-32 w-96 h-96 rounded-full bg-gold-amber/15 blur-3xl pointer-events-none"></div>
        <div className="relative site-container flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest/90 backdrop-blur-md shadow-md text-primary font-label-md text-label-md mb-6 animate-pulse">
            <span className="w-2 h-2 rounded-full bg-secondary"></span>
            <span className="material-symbols-outlined text-[17px] text-secondary">
              {"verified"}
            </span>
            <span>
              <ContentText contentKey="home.text-043" />
            </span>
          </div>

          <h1 className="font-display text-display text-on-primary drop-shadow-sm max-w-4xl tracking-tight leading-tight">
            <ContentText contentKey="home.text-044" />
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-amber via-secondary-container to-gold-soft drop-shadow">
              <ContentText contentKey="home.text-045" />
            </span>
          </h1>
          <p className="font-body-lg text-body-lg text-ocean-light/90 max-w-2xl mt-4 mb-10 font-medium">
            <ContentText contentKey="home.text-046" />
          </p>

          <div className="w-full bg-surface-container-lowest/95 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 md:p-6 text-left">
            <div className="flex items-center gap-2 pb-4 overflow-x-auto">
              <button
                className="search-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-sm transition-all"
                data-target="hotel-tab"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {"hotel"}
                </span>
                <span>
                  <ContentText contentKey="home.text-047" />
                </span>
              </button>
              <button
                className="search-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
                data-target="tour-tab"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {"kayaking"}
                </span>
                <span>
                  <ContentText contentKey="home.text-048" />
                </span>
              </button>
              <button
                className="search-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
                data-target="combo-tab"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {"flight_takeoff"}
                </span>
                <span>
                  <ContentText contentKey="home.text-049" />
                </span>
              </button>
              <button
                className="search-tab-btn flex items-center gap-2 px-5 py-2.5 rounded-full bg-surface-container text-on-surface-variant hover:bg-surface-container-high font-label-lg text-label-lg transition-all"
                data-target="ticket-tab"
                type="button"
              >
                <span className="material-symbols-outlined text-[19px]">
                  {"confirmation_number"}
                </span>
                <span>
                  <ContentText contentKey="home.text-050" />
                </span>
              </button>
            </div>

            <form className="grid grid-cols-1 md:grid-cols-12 gap-3 pt-2 items-center">
              <div className="md:col-span-4 bg-surface-container-low hover:bg-surface-container rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-primary-fixed flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    {"location_on"}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <ContentText contentKey="home.text-051" />
                  </label>
                  <ContentElement
                    contentKey="home.attributes-002"
                    tag="input"
                    className="w-full bg-transparent font-title-md text-title-md text-on-surface focus:outline-none truncate"

                    type="text"
                  />
                </div>
              </div>

              <div className="md:col-span-4 bg-surface-container-low hover:bg-surface-container rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-secondary-fixed flex items-center justify-center text-secondary group-hover:scale-105 transition-transform shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    {"calendar_month"}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <ContentText contentKey="home.text-052" />
                  </label>
                  <div className="flex items-center gap-1.5 font-label-lg text-label-lg text-on-surface truncate">
                    <span>
                      <ContentText contentKey="home.text-053" />
                    </span>
                    <span className="text-outline text-label-sm font-label-sm bg-surface-container-high px-1.5 py-0.5 rounded-full">
                      <ContentText contentKey="home.text-054" />
                    </span>
                    <span>
                      <ContentText contentKey="home.text-055" />
                    </span>
                  </div>
                </div>
              </div>

              <div className="md:col-span-2 bg-surface-container-low hover:bg-surface-container rounded-xl p-3 flex items-center gap-3 transition-colors cursor-pointer group">
                <div className="w-10 h-10 rounded-lg bg-surface-variant flex items-center justify-center text-primary group-hover:scale-105 transition-transform shrink-0">
                  <span className="material-symbols-outlined text-[22px]">
                    {"group"}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <label className="block font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <ContentText contentKey="home.text-056" />
                  </label>
                  <div className="font-label-lg text-label-lg text-on-surface truncate">
                    <ContentText contentKey="home.text-057" />
                  </div>
                </div>
              </div>

              <div className="md:col-span-2">
                <button
                  className="w-full h-[58px] rounded-xl bg-gradient-to-r from-gold-amber to-tertiary-fixed-dim hover:from-gold-amber hover:to-gold-amber text-on-tertiary-fixed font-title-md text-title-md flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                  type="submit"
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {"search"}
                  </span>
                  <span>
                    <ContentText contentKey="home.text-058" />
                  </span>
                </button>
              </div>
            </form>

            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 text-body-sm font-body-sm text-on-surface-variant">
              <span className="font-label-sm text-label-sm text-outline uppercase">
                <ContentText contentKey="home.text-059" />
              </span>
              <ContentElement
                contentKey="home.attributes-003"
                tag="a"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"

                data-action="details"
              >
                <ContentText contentKey="home.text-060" />
              </ContentElement>
              <ContentElement
                contentKey="home.attributes-004"
                tag="a"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"

                data-action="details"
              >
                <ContentText contentKey="home.text-061" />
              </ContentElement>
              <ContentElement
                contentKey="home.attributes-005"
                tag="a"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"

                data-action="details"
              >
                <ContentText contentKey="home.text-062" />
              </ContentElement>
              <ContentElement
                contentKey="home.attributes-006"
                tag="a"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"

                data-action="details"
              >
                <ContentText contentKey="home.text-063" />
              </ContentElement>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full mt-10 pt-2">
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">
                  {"apartment"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  <ContentText contentKey="home.text-064" />
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-065" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined text-[24px]">
                  {"flight_takeoff"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  <ContentText contentKey="home.text-066" />
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-067" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-gold-soft flex items-center justify-center text-tertiary">
                <span className="material-symbols-outlined text-[24px]">
                  {"verified_user"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  <ContentText contentKey="home.text-068" />
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-069" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-3 rounded-2xl bg-surface-container-lowest/80 backdrop-blur-md shadow-sm">
              <div className="w-10 h-10 rounded-xl bg-surface-variant flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-[24px]">
                  {"support_agent"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-headline-sm font-bold text-on-surface">
                  <ContentText contentKey="home.text-070" />
                </div>
                <div className="font-label-sm text-label-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-071" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentElement>

      <div className="site-container w-full -mt-4 mb-4 z-10">
        <div className="inline-flex items-center gap-3 bg-surface-container-lowest px-4 py-2 rounded-full shadow-md text-on-surface text-body-sm font-body-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-secondary animate-ping"></span>
          <span className="material-symbols-outlined text-secondary text-[18px]">
            {"bolt"}
          </span>
          <span>
            <ContentText contentKey="home.text-072" />
            <strong>
              <ContentText contentKey="home.text-073" />
            </strong>
            <ContentText contentKey="home.text-074" />
            <strong className="text-primary">
              <ContentText contentKey="home.text-075" />
            </strong>
            <ContentText contentKey="home.text-076" />
            <strong>
              <ContentText contentKey="home.text-077" />
            </strong>
            <ContentText contentKey="home.text-078" />
          </span>
        </div>
      </div>
    </>
  );
}
