import { ContentText, ContentElement } from "@/components/content";

export function TransfersBenefits() {
  return (
    <section className="w-full py-20 bg-surface-subtle">
      <div className="site-container">
        <div className="text-center mx-auto mb-14">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-bold">
            <ContentText contentKey="transfers.text-146" />
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            <ContentText contentKey="transfers.text-147" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-2">
            <ContentText contentKey="transfers.text-148" />
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-border-light shadow-card flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-ocean-light text-primary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">
                {"flight_takeoff"}
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-149" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                <ContentText contentKey="transfers.text-150" />
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-border-light shadow-card flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-secondary/15 text-secondary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">
                {"event_busy"}
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-151" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                <ContentText contentKey="transfers.text-152" />
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-border-light shadow-card flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-tertiary-fixed text-tertiary flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">
                {"sentiment_satisfied"}
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-153" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                <ContentText contentKey="transfers.text-154" />
              </p>
            </div>
          </div>

          <div className="bg-surface-container-lowest p-6 rounded-2xl border border-border-light shadow-card flex flex-col gap-4">
            <div className="w-12 h-12 rounded-xl bg-error-container text-sale-crimson flex items-center justify-center">
              <span className="material-symbols-outlined text-[26px]">
                {"phone_in_talk"}
              </span>
            </div>
            <div>
              <h3 className="font-title-md text-title-md text-on-surface">
                <ContentText contentKey="transfers.text-155" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 leading-relaxed">
                <ContentText contentKey="transfers.text-156" />
                <strong>
                  <ContentText contentKey="transfers.text-157" />
                </strong>
                <ContentText contentKey="transfers.text-158" />
              </p>
            </div>
          </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden border border-border-light shadow-card min-h-[280px] flex items-end">
            <img
              src="/images/figma/transfers-hero.png"
              alt="Đón khách tại sân bay Cam Ranh"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-destination-scrim/85 via-destination-scrim/30 to-transparent"
            />
            <div className="relative z-10 p-6 text-white space-y-1.5">
              <span className="inline-block px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                Đón đúng giờ 100%
              </span>
              <h3 className="text-lg font-extrabold leading-snug">
                Tài xế cầm bảng tên sẵn sàng tại sảnh sân bay Cam Ranh
              </h3>
              <p className="text-xs text-white/85">
                Theo dõi mã chuyến bay trực tiếp, miễn phí thời gian chờ khi máy bay delay.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 bg-gradient-to-r from-primary via-ocean-deep to-secondary text-on-primary rounded-3xl p-8 shadow-xl flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="min-w-0">
            <h3 className="font-headline-md text-headline-md font-bold">
              <ContentText contentKey="transfers.text-159" />
            </h3>
            <p className="font-body-md text-body-md text-ocean-light mt-1">
              <ContentText contentKey="transfers.text-160" />
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 shrink-0 flex-wrap justify-center max-w-full">
            <ContentElement
              contentKey="transfers.attributes-023"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-sale-crimson hover:bg-sale-crimson/90 text-on-error font-label-lg text-label-lg shadow-lg flex items-center gap-2 transition-all action-link"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"call"}
              </span>
              <span>
                <ContentText contentKey="transfers.text-161" />
              </span>
            </ContentElement>
            <ContentElement
              contentKey="transfers.attributes-024"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-subtle font-label-lg text-label-lg shadow-lg flex items-center gap-2 transition-all action-link"

              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="transfers.text-162" />
              </span>
            </ContentElement>
          </div>
        </div>
      </div>
    </section>
  );
}
