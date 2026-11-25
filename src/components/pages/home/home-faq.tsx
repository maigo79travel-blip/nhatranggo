import { ContentText, ContentElement } from "@/components/content";

export function HomeFaq() {
  return (
    <section className="site-container py-10 w-full mb-8">
      <div
        className="rounded-3xl bg-cover bg-center p-8 md:p-12 shadow-floating text-on-primary grid lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] items-center gap-8 relative overflow-hidden"
        style={{ backgroundImage: "url('/images/figma/newsletter-bg.png')" }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-r from-ocean-deep/75 via-primary/65 to-ocean-deep/80"
        />
        <div className="text-center lg:text-left relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/20 backdrop-blur-md font-label-sm text-label-sm uppercase tracking-wider text-ocean-light mb-3">
            <span className="material-symbols-outlined text-[16px] text-gold-amber">
              {"handshake"}
            </span>
            <span>
              <ContentText contentKey="home.text-165" />
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-primary">
            <ContentText contentKey="home.text-166" />
          </h2>
          <p className="font-body-lg text-body-lg text-ocean-light/95 mt-2 leading-relaxed">
            <ContentText contentKey="home.text-167" />
          </p>
          <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6">
            <ContentElement
              contentKey="home.attributes-041"
              tag="a"
              className="px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-ocean-light font-title-md text-title-md font-bold shadow-lg transition-all duration-200 flex items-center gap-2 action-link"
              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px] text-primary">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="home.text-168" />
              </span>
            </ContentElement>
            <ContentElement
              contentKey="home.attributes-042"
              tag="a"
              className="px-6 py-3.5 rounded-xl bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 backdrop-blur-md text-on-primary font-title-md text-title-md font-bold transition-all flex items-center gap-2 action-link"
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
