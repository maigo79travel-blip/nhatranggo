import { ContentText, ContentElement } from "@/components/content";

export function HotelsFaq() {
  return (
    <section className="site-container py-10 w-full">
      <div className="bg-surface-container-lowest rounded-3xl p-8 lg:p-10 shadow-sm">
        <div className="text-center mx-auto mb-10">
          <span className="px-3.5 py-1 rounded-full bg-secondary/10 text-secondary font-label-sm text-label-sm uppercase font-bold tracking-wider">
            <ContentText contentKey="hotels.text-141" />
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold mt-3">
            <ContentText contentKey="hotels.text-142" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            <ContentText contentKey="hotels.text-143" />
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-subtle hover:bg-ocean-light/30 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-primary to-ocean-deep text-on-primary flex items-center justify-center shadow-lg mb-4">
              <span className="material-symbols-outlined text-[32px]">
                {"price_check"}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
              <ContentText contentKey="hotels.text-144" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <ContentText contentKey="hotels.text-145" />
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-subtle hover:bg-ocean-light/30 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-secondary to-on-secondary-fixed-variant text-on-secondary flex items-center justify-center shadow-lg mb-4">
              <span className="material-symbols-outlined text-[32px]">
                {"support_agent"}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
              <ContentText contentKey="hotels.text-146" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <ContentText contentKey="hotels.text-147" />
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-surface-subtle hover:bg-ocean-light/30 transition-all duration-300">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-gold-amber to-tertiary-container text-on-background flex items-center justify-center shadow-lg mb-4">
              <span className="material-symbols-outlined text-[32px]">
                {"published_with_changes"}
              </span>
            </div>
            <h3 className="font-headline-sm text-headline-sm text-on-surface mb-2 font-bold">
              <ContentText contentKey="hotels.text-148" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <ContentText contentKey="hotels.text-149" />
            </p>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-border-light flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center gap-6 text-on-surface-variant font-label-md text-label-md">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[22px]">
                {"verified_user"}
              </span>
              <span>
                <ContentText contentKey="hotels.text-150" />
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-[22px]">
                {"lock"}
              </span>
              <span>
                <ContentText contentKey="hotels.text-151" />
              </span>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="text-center sm:text-right">
              <span className="font-body-sm text-body-sm text-outline block">
                <ContentText contentKey="hotels.text-152" />
              </span>
              <ContentElement
                contentKey="hotels.attributes-041"
                tag="a"
                className="font-headline-sm text-headline-sm text-primary font-extrabold hover:text-ocean-deep transition-colors"
              >
                <ContentText contentKey="hotels.text-153" />
              </ContentElement>
            </div>
            <ContentElement
              contentKey="hotels.attributes-042"
              tag="a"
              className="px-5 py-3 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all flex items-center gap-2 action-link"

              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="hotels.text-154" />
              </span>
            </ContentElement>
          </div>
        </div>
      </div>
    </section>
  );
}
