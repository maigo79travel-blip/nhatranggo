import { HomeSearch } from "@/modules/home/home-search";
import { ContentText } from "@/components/content";

export function HomeHero() {
  return (
    <>
      <section className="relative w-full overflow-hidden bg-background">
        <div
          className="relative w-full min-h-[400px] md:min-h-[440px] bg-cover bg-center flex items-center"
          style={{ backgroundImage: "url('/images/figma/hero-beach.png')" }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-r from-[#E3F7FF]/90 via-[#E3F7FF]/55 to-transparent"
          />
          <div className="relative site-container py-10 md:py-14 pb-24 md:pb-28 w-full">
            <div className="max-w-2xl">
              <img
                src="/images/figma/hero-kham-pha.png"
                alt="Khám phá"
                className="h-14 sm:h-16 md:h-20 w-auto object-contain -mb-2 select-none"
              />
              <h1 className="font-display text-[48px] sm:text-[68px] lg:text-[84px] font-extrabold text-secondary tracking-tight leading-[1.05]">
                <ContentText contentKey="home.text-044" />{" "}
                <ContentText contentKey="home.text-045" />
              </h1>
              <p className="mt-3 text-base sm:text-lg font-medium text-on-surface">
                <ContentText contentKey="home.text-043" />
              </p>
            </div>
          </div>
        </div>

        <div className="relative z-10 site-container -mt-20 md:-mt-24 pb-6">
          <HomeSearch />
        </div>
      </section>

      <section className="w-full bg-surface-container-lowest py-8">
        <div className="site-container">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0 lg:divide-x lg:divide-border-light">
            <div className="flex items-center justify-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">
                  {"apartment"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-2xl font-extrabold text-on-surface leading-tight">
                  <ContentText contentKey="home.text-064" />
                </div>
                <div className="font-body-sm text-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-065" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">
                  {"sell"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-2xl font-extrabold text-on-surface leading-tight">
                  <ContentText contentKey="home.text-066" />
                </div>
                <div className="font-body-sm text-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-067" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">
                  {"support_agent"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-2xl font-extrabold text-on-surface leading-tight">
                  <ContentText contentKey="home.text-068" />
                </div>
                <div className="font-body-sm text-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-069" />
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 lg:px-6">
              <div className="w-12 h-12 rounded-2xl bg-surface-container flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[28px]">
                  {"verified_user"}
                </span>
              </div>
              <div className="text-left">
                <div className="font-headline-sm text-2xl font-extrabold text-on-surface leading-tight">
                  <ContentText contentKey="home.text-070" />
                </div>
                <div className="font-body-sm text-sm text-on-surface-variant">
                  <ContentText contentKey="home.text-071" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
