import { ContentText, ContentElement } from "@/components/content";

export function HomeFaq() {
  return (
    <section className="site-container py-10 w-full mb-8">
      <div className="rounded-3xl bg-gradient-to-r from-secondary via-primary to-ocean-deep p-8 md:p-12 shadow-xl text-on-primary grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-center gap-8 relative overflow-hidden">
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-3xl pointer-events-none"></div>
        <div className="text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md font-label-sm text-label-sm uppercase tracking-wider text-ocean-light mb-3">
            <span className="material-symbols-outlined text-[16px] text-gold-amber">
              {"handshake"}
            </span>
            <span>
              <ContentText contentKey="home.text-165" />
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">
            <ContentText contentKey="home.text-166" />
          </h2>
          <p className="font-body-lg text-body-lg text-ocean-light/95 mt-2 leading-relaxed">
            <ContentText contentKey="home.text-167" />
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
            <ContentElement
              contentKey="home.attributes-041"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary hover:bg-ocean-light font-title-md text-title-md shadow-lg hover:shadow-xl transition-all duration-200 flex items-center gap-2 transform hover:-translate-y-0.5 action-link"

              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="home.text-168" />
              </span>
            </ContentElement>
            <ContentElement
              contentKey="home.attributes-042"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 backdrop-blur-md text-on-primary font-title-md text-title-md transition-all flex items-center gap-2 action-link"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"call"}
              </span>
              <span>
                <ContentText contentKey="home.text-169" />
              </span>
            </ContentElement>
          </div>
        </div>

        <div className="bg-surface-container-lowest/15 backdrop-blur-xl p-6 rounded-2xl w-full min-w-0 relative z-10 text-on-primary">
          <div className="font-label-lg text-label-lg font-bold uppercase tracking-wider text-gold-amber mb-3 flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">
              {"verified"}
            </span>
            <ContentText contentKey="home.text-170" />
          </div>
          <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-ocean-light">
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-gold-amber shrink-0">
                {"check_circle"}
              </span>
              <span>
                <ContentText contentKey="home.text-171" />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-gold-amber shrink-0">
                {"check_circle"}
              </span>
              <span>
                <ContentText contentKey="home.text-172" />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-gold-amber shrink-0">
                {"check_circle"}
              </span>
              <span>
                <ContentText contentKey="home.text-173" />
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="material-symbols-outlined text-[18px] text-gold-amber shrink-0">
                {"check_circle"}
              </span>
              <span>
                <ContentText contentKey="home.text-174" />
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
