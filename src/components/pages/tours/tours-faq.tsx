import { ContentText } from "@/components/content";

export function ToursFaq() {
  return (
    <section className="w-full py-16 bg-surface-container-lowest">
      <div className="site-container">
        <div className="text-center mx-auto mb-14">
          <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider">
            <ContentText contentKey="tours.text-053" />
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            <ContentText contentKey="tours.text-054" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            <ContentText contentKey="tours.text-055" />
          </p>
        </div>

        <div className="card-grid-compact relative mb-16">
          <div className="bg-surface-subtle p-6 rounded-2xl flex flex-col relative group hover:bg-ocean-light/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center font-display text-headline-sm mb-4 shadow-sm">
              <ContentText contentKey="tours.text-056" />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">
              <ContentText contentKey="tours.text-057" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <ContentText contentKey="tours.text-058" />
            </p>
          </div>

          <div className="bg-surface-subtle p-6 rounded-2xl flex flex-col relative group hover:bg-ocean-light/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center font-display text-headline-sm mb-4 shadow-sm">
              <ContentText contentKey="tours.text-059" />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">
              <ContentText contentKey="tours.text-060" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <ContentText contentKey="tours.text-061" />
            </p>
          </div>

          <div className="bg-surface-subtle p-6 rounded-2xl flex flex-col relative group hover:bg-ocean-light/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-display text-headline-sm mb-4 shadow-sm">
              <ContentText contentKey="tours.text-062" />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">
              <ContentText contentKey="tours.text-063" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <ContentText contentKey="tours.text-064" />
            </p>
          </div>

          <div className="bg-surface-subtle p-6 rounded-2xl flex flex-col relative group hover:bg-ocean-light/30 transition-colors">
            <div className="w-12 h-12 rounded-xl bg-sale-crimson text-on-error flex items-center justify-center font-display text-headline-sm mb-4 shadow-sm">
              <ContentText contentKey="tours.text-065" />
            </div>
            <h3 className="font-title-md text-title-md text-on-surface mb-2">
              <ContentText contentKey="tours.text-066" />
            </h3>
            <p className="font-body-md text-body-md text-on-surface-variant">
              <ContentText contentKey="tours.text-067" />
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
          <div className="p-6 rounded-2xl bg-surface-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                {"sentiment_very_satisfied"}
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-title-md text-on-surface mb-1">
                <ContentText contentKey="tours.text-068" />
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <ContentText contentKey="tours.text-069" />
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary text-on-secondary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                {"verified_user"}
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-title-md text-on-surface mb-1">
                <ContentText contentKey="tours.text-070" />
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <ContentText contentKey="tours.text-071" />
              </p>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-surface-container flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary text-on-tertiary flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[24px]">
                {"free_cancellation"}
              </span>
            </div>
            <div>
              <h4 className="font-title-md text-title-md text-on-surface mb-1">
                <ContentText contentKey="tours.text-072" />
              </h4>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <ContentText contentKey="tours.text-073" />
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 w-full">
          <h3 className="font-headline-sm text-headline-sm text-on-surface text-center mb-6">
            <ContentText contentKey="tours.text-074" />
          </h3>
          <div className="flex flex-col gap-3">
            <details
              className="bg-surface-subtle p-4 rounded-xl group"
              open={true}
            >
              <summary className="font-title-md text-title-md text-on-surface cursor-pointer flex items-center justify-between list-none">
                <span>
                  <ContentText contentKey="tours.text-075" />
                </span>
                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">
                  {"expand_more"}
                </span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 pt-3">
                <ContentText contentKey="tours.text-076" />
              </p>
            </details>
            <details className="bg-surface-subtle p-4 rounded-xl group">
              <summary className="font-title-md text-title-md text-on-surface cursor-pointer flex items-center justify-between list-none">
                <span>
                  <ContentText contentKey="tours.text-077" />
                </span>
                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">
                  {"expand_more"}
                </span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 pt-3">
                <ContentText contentKey="tours.text-078" />
              </p>
            </details>
            <details className="bg-surface-subtle p-4 rounded-xl group">
              <summary className="font-title-md text-title-md text-on-surface cursor-pointer flex items-center justify-between list-none">
                <span>
                  <ContentText contentKey="tours.text-079" />
                </span>
                <span className="material-symbols-outlined text-outline group-open:rotate-180 transition-transform">
                  {"expand_more"}
                </span>
              </summary>
              <p className="font-body-md text-body-md text-on-surface-variant mt-3 pt-3">
                <ContentText contentKey="tours.text-080" />
              </p>
            </details>
          </div>
        </div>
      </div>
    </section>
  );
}
