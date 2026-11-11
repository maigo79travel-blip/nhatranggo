import { ContentText } from "@/components/content";

export function TransfersProcess() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="site-container">
        <div className="text-center mb-12">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            <ContentText contentKey="transfers.text-163" />
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            <ContentText contentKey="transfers.text-164" />
          </h2>
        </div>
        <div className="flex flex-col gap-4" id="faq-accordion">
          <div className="faq-item bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all">
            <button
              aria-expanded={true}
              className="faq-toggle whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4"
              type="button"
            >
              <span className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-165" />
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-200">
                {"expand_more"}
              </span>
            </button>
            <div className="faq-content px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-light/40 pt-4">
              <ContentText contentKey="transfers.text-166" />
              <strong>
                <ContentText contentKey="transfers.text-167" />
              </strong>
              <ContentText contentKey="transfers.text-168" />
            </div>
          </div>

          <div className="faq-item bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all">
            <button
              aria-expanded={true}
              className="faq-toggle whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4"
              type="button"
            >
              <span className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-169" />
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-200">
                {"expand_more"}
              </span>
            </button>
            <div className="faq-content px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-light/40 pt-4">
              <strong>
                <ContentText contentKey="transfers.text-170" />
              </strong>
              <ContentText contentKey="transfers.text-171" />
            </div>
          </div>

          <div className="faq-item bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all">
            <button
              aria-expanded={true}
              className="faq-toggle whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4"
              type="button"
            >
              <span className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-172" />
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-200">
                {"expand_more"}
              </span>
            </button>
            <div className="faq-content px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-light/40 pt-4">
              <ContentText contentKey="transfers.text-173" />
              <strong>
                <ContentText contentKey="transfers.text-174" />
              </strong>
              <ContentText contentKey="transfers.text-175" />
            </div>
          </div>

          <div className="faq-item bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all">
            <button
              aria-expanded={true}
              className="faq-toggle whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4"
              type="button"
            >
              <span className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-176" />
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-200">
                {"expand_more"}
              </span>
            </button>
            <div className="faq-content px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-light/40 pt-4">
              <ContentText contentKey="transfers.text-177" />
            </div>
          </div>

          <div className="faq-item bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden transition-all">
            <button
              aria-expanded={true}
              className="faq-toggle whitespace-normal w-full p-6 text-left flex items-center justify-between gap-4"
              type="button"
            >
              <span className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-178" />
              </span>
              <span className="material-symbols-outlined text-outline transition-transform duration-200">
                {"expand_more"}
              </span>
            </button>
            <div className="faq-content px-6 pb-6 text-on-surface-variant font-body-md text-body-md border-t border-border-light/40 pt-4">
              <ContentText contentKey="transfers.text-179" />
              <strong>
                <ContentText contentKey="transfers.text-180" />
              </strong>
              <ContentText contentKey="transfers.text-181" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
