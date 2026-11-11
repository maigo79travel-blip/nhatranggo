import { ContentText, ContentElement } from "@/components/content";

export function TransfersFleet() {
  return (
    <section className="w-full py-20 bg-background">
      <div className="site-container">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-bold">
            <ContentText contentKey="transfers.text-103" />
          </span>
          <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
            <ContentText contentKey="transfers.text-104" />
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant mt-3">
            <ContentText contentKey="transfers.text-105" />
          </p>
        </div>

        <div className="card-grid-compact">
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative w-full h-48 overflow-hidden bg-surface-container">
              <ContentElement
                contentKey="transfers.attributes-015"
                tag="img"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-primary font-bold shadow-sm">
                <ContentText contentKey="transfers.text-106" />
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  <ContentText contentKey="transfers.text-107" />
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  <ContentText contentKey="transfers.text-108" />
                </p>
                <div className="grid grid-cols-2 gap-2 my-4 pt-2 border-t border-border-light/60 font-label-md text-label-md text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"group"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-109" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"luggage"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-110" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"ac_unit"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-111" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"airline_seat_recline_normal"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-112" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-outline block">
                    <ContentText contentKey="transfers.text-113" />
                  </span>
                  <span className="font-title-md text-title-md text-primary font-extrabold">
                    <ContentText contentKey="transfers.text-114" />
                  </span>
                </div>
                <ContentElement
                  contentKey="transfers.attributes-016"
                  tag="a"
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary font-label-md text-label-md text-on-surface transition-all action-link"

                  rel="noopener"
                  target="_blank"
                >
                  <ContentText contentKey="transfers.text-115" />
                </ContentElement>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative w-full h-48 overflow-hidden bg-surface-container">
              <ContentElement
                contentKey="transfers.attributes-017"
                tag="img"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold shadow-sm">
                <ContentText contentKey="transfers.text-116" />
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  <ContentText contentKey="transfers.text-117" />
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  <ContentText contentKey="transfers.text-118" />
                </p>
                <div className="grid grid-cols-2 gap-2 my-4 pt-2 border-t border-border-light/60 font-label-md text-label-md text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"group"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-119" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"luggage"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-120" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"height"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-121" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"charging_station"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-122" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-outline block">
                    <ContentText contentKey="transfers.text-123" />
                  </span>
                  <span className="font-title-md text-title-md text-primary font-extrabold">
                    <ContentText contentKey="transfers.text-124" />
                  </span>
                </div>
                <ContentElement
                  contentKey="transfers.attributes-018"
                  tag="a"
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary font-label-md text-label-md text-on-surface transition-all action-link"

                  rel="noopener"
                  target="_blank"
                >
                  <ContentText contentKey="transfers.text-125" />
                </ContentElement>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden flex flex-col group relative ring-2 ring-gold-amber/40">
            <div className="relative w-full h-48 overflow-hidden bg-surface-container">
              <ContentElement
                contentKey="transfers.attributes-019"
                tag="img"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-gold-amber text-on-surface font-label-sm text-label-sm font-bold shadow-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">
                  {"star"}
                </span>
                <ContentText contentKey="transfers.text-126" />
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  <ContentText contentKey="transfers.text-127" />
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  <ContentText contentKey="transfers.text-128" />
                </p>
                <div className="grid grid-cols-2 gap-2 my-4 pt-2 border-t border-border-light/60 font-label-md text-label-md text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      {"airline_seat_recline_extra"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-129" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      {"tv"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-130" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      {"local_drink"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-131" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-tertiary">
                      {"luggage"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-132" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-outline block">
                    <ContentText contentKey="transfers.text-133" />
                  </span>
                  <span className="font-title-md text-title-md text-sale-crimson font-extrabold">
                    <ContentText contentKey="transfers.text-134" />
                  </span>
                </div>
                <ContentElement
                  contentKey="transfers.attributes-020"
                  tag="a"
                  className="px-4 py-2 rounded-xl bg-gold-amber hover:bg-gold-amber/90 text-on-surface font-label-md text-label-md font-bold transition-all shadow-sm action-link"

                  rel="noopener"
                  target="_blank"
                >
                  <ContentText contentKey="transfers.text-135" />
                </ContentElement>
              </div>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
            <div className="relative w-full h-48 overflow-hidden bg-surface-container">
              <ContentElement
                contentKey="transfers.attributes-021"
                tag="img"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"

                loading="lazy"
              />
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-bold shadow-sm">
                <ContentText contentKey="transfers.text-136" />
              </span>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-title-md text-title-md text-on-surface font-bold">
                  <ContentText contentKey="transfers.text-137" />
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                  <ContentText contentKey="transfers.text-138" />
                </p>
                <div className="grid grid-cols-2 gap-2 my-4 pt-2 border-t border-border-light/60 font-label-md text-label-md text-on-surface">
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"group"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-139" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"luggage"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-140" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"mic"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-141" />
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[16px] text-secondary">
                      {"security"}
                    </span>
                    <span>
                      <ContentText contentKey="transfers.text-142" />
                    </span>
                  </div>
                </div>
              </div>
              <div className="pt-3 border-t border-border-light/60 flex items-center justify-between">
                <div>
                  <span className="font-body-sm text-body-sm text-outline block">
                    <ContentText contentKey="transfers.text-143" />
                  </span>
                  <span className="font-title-md text-title-md text-primary font-extrabold">
                    <ContentText contentKey="transfers.text-144" />
                  </span>
                </div>
                <ContentElement
                  contentKey="transfers.attributes-022"
                  tag="a"
                  className="px-4 py-2 rounded-xl bg-surface-container hover:bg-primary hover:text-on-primary font-label-md text-label-md text-on-surface transition-all action-link"

                  rel="noopener"
                  target="_blank"
                >
                  <ContentText contentKey="transfers.text-145" />
                </ContentElement>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
