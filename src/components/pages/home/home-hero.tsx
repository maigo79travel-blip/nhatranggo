import { HomeLink } from "@/modules/home/home-link";
import { HomeSearch } from "@/modules/home/home-search";
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

          <h1 className="font-display text-display text-on-primary drop-shadow-sm tracking-tight leading-tight">
            <ContentText contentKey="home.text-044" />
            <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-amber via-secondary-container to-gold-soft drop-shadow">
              <ContentText contentKey="home.text-045" />
            </span>
          </h1>
          <div className="w-full bg-surface-container-lowest/95 backdrop-blur-2xl rounded-2xl shadow-2xl p-4 md:p-6 mt-8 text-left">
            <HomeSearch />

            <div className="flex flex-wrap items-center gap-2 mt-4 pt-3 text-body-sm font-body-sm text-on-surface-variant">
              <span className="font-label-sm text-label-sm text-outline uppercase">
                <ContentText contentKey="home.text-059" />
              </span>
              <HomeLink
                contentKey="home.attributes-003"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"
                href="/dich-vu?type=hotel&q=B%C3%A3i%20D%C3%A0i"
              >
                <ContentText contentKey="home.text-060" />
              </HomeLink>
              <HomeLink
                contentKey="home.attributes-004"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"
                href="/dich-vu?type=tour&q=3%20%C4%90%E1%BA%A3o"
              >
                <ContentText contentKey="home.text-061" />
              </HomeLink>
              <HomeLink
                contentKey="home.attributes-005"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"
                href="/dich-vu?type=tour&q=VinWonders"
              >
                <ContentText contentKey="home.text-062" />
              </HomeLink>
              <HomeLink
                contentKey="home.attributes-006"
                className="px-2.5 py-1 rounded-md bg-surface-container hover:bg-primary-fixed hover:text-primary transition-colors action-link"
                href="/dich-vu?type=combo&q=Ph%C3%BA%20Qu%E1%BB%91c"
              >
                <ContentText contentKey="home.text-063" />
              </HomeLink>
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
