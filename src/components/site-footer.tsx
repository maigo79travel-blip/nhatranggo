import { ContentText, ContentElement } from "@/components/content";
export function SiteFooter() {
  return (
    <footer
      className="w-full bg-surface-container-low text-on-surface pt-16 pb-10 shadow-footer"
      id="lien-he"
    >
      <div className="site-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12">
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center text-on-primary shadow-sm">
                <span className="material-symbols-outlined text-[24px]">
                  {"tsunami"}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm font-bold text-primary tracking-tight">
                  <ContentText contentKey="footer.text-023" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="footer.text-024" />
                </span>
              </div>
            </div>
            <div className="font-title-md text-title-md text-on-surface mt-1">
              <ContentText contentKey="footer.text-025" />
            </div>
            <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
              <span className="material-symbols-outlined text-[16px] text-primary align-middle mr-1.5">
                {"location_on"}
              </span>
              <ContentText contentKey="footer.text-026" />
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <ContentElement
                contentKey="footer.attributes-001"
                tag="a"
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {"call"}
                </span>
                <ContentText contentKey="footer.text-027" />
                <strong className="text-on-surface font-label-lg text-label-lg">
                  <ContentText contentKey="footer.text-028" />
                </strong>
              </ContentElement>
              <ContentElement
                contentKey="footer.attributes-002"
                tag="a"
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {"mail"}
                </span>
                <ContentText contentKey="footer.text-029" />
              </ContentElement>
              <ContentElement
                contentKey="footer.attributes-003"
                tag="a"
                className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[16px] text-primary">
                  {"public"}
                </span>
                <ContentText contentKey="footer.text-030" />
              </ContentElement>
            </div>
          </div>
          <div className="lg:col-span-2 flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-031" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface-variant">
              <li>
                <ContentElement
                  contentKey="footer.attributes-004"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="khach-san"
                >
                  <ContentText contentKey="footer.text-032" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-005"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="khach-san"
                >
                  <ContentText contentKey="footer.text-033" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-006"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="tour-hang-ngay"
                >
                  <ContentText contentKey="footer.text-034" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-007"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="combo-tron-goi"
                >
                  <ContentText contentKey="footer.text-035" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-008"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="dich-vu-ve"
                >
                  <ContentText contentKey="footer.text-036" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-009"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="dich-vu-ve"
                >
                  <ContentText contentKey="footer.text-037" />
                </ContentElement>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-038" />
            </h4>
            <ul className="flex flex-col gap-2.5 font-body-md text-body-md text-on-surface-variant">
              <li>
                <ContentElement
                  contentKey="footer.attributes-010"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="chinh-sach-thanh-toan"
                >
                  <ContentText contentKey="footer.text-039" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-011"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="chinh-sach-hoan-huy"
                >
                  <ContentText contentKey="footer.text-040" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-012"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="chinh-sach-bao-mat"
                >
                  <ContentText contentKey="footer.text-041" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-013"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="dieu-khoan-su-dung"
                >
                  <ContentText contentKey="footer.text-042" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-014"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="quy-dinh-chung"
                >
                  <ContentText contentKey="footer.text-043" />
                </ContentElement>
              </li>
              <li>
                <ContentElement
                  contentKey="footer.attributes-015"
                  tag="a"
                  className="hover:text-primary transition-colors"
                  data-path="giai-quyet-khieu-nai"
                >
                  <ContentText contentKey="footer.text-044" />
                </ContentElement>
              </li>
            </ul>
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <h4 className="font-title-md text-title-md text-on-surface">
              <ContentText contentKey="footer.text-045" />
            </h4>
            <div className="grid grid-cols-4 gap-2">
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-primary shadow-sm">
                <ContentText contentKey="footer.text-046" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-sale-crimson shadow-sm">
                <ContentText contentKey="footer.text-047" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-primary shadow-sm">
                <ContentText contentKey="footer.text-048" />
              </div>
              <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-center text-label-sm font-label-sm text-on-surface shadow-sm">
                <ContentText contentKey="footer.text-049" />
              </div>
            </div>
            <div className="mt-2">
              <h5 className="font-label-lg text-label-lg text-on-surface mb-2">
                <ContentText contentKey="footer.text-050" />
              </h5>
              <div className="flex items-center gap-2">
                <ContentElement
                  contentKey="footer.attributes-016"
                  tag="input"
                  className="w-full px-3 py-2 text-body-sm font-body-sm rounded-lg bg-surface-container-lowest text-on-surface outline-none focus:ring-2 focus:ring-primary shadow-sm"

                  type="email"
                />
                <button
                  className="px-4 py-2 bg-primary hover:bg-ocean-deep text-on-primary text-label-sm font-label-sm rounded-lg shadow-sm shrink-0 transition-colors"
                  type="button"
                >
                  <ContentText contentKey="footer.text-051" />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 font-body-sm text-body-sm text-on-surface-variant">
          <p>
            <ContentText contentKey="footer.text-052" />
          </p>
          <div className="flex items-center gap-4 text-body-sm font-body-sm">
            <ContentElement
              contentKey="footer.attributes-017"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="dieu-khoan-su-dung"
            >
              <ContentText contentKey="footer.text-053" />
            </ContentElement>
            <ContentElement
              contentKey="footer.attributes-018"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="chinh-sach-bao-mat"
            >
              <ContentText contentKey="footer.text-054" />
            </ContentElement>
            <ContentElement
              contentKey="footer.attributes-019"
              tag="a"
              className="hover:text-primary transition-colors"
              data-path="lien-he"
            >
              <ContentText contentKey="footer.text-055" />
            </ContentElement>
          </div>
        </div>
      </div>
    </footer>
  );
}
export function ContactButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      <ContentElement
        contentKey="footer.attributes-020"
        tag="a"
        className="w-12 h-12 rounded-full bg-primary text-on-primary shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"

        rel="noopener"
        target="_blank"
      >
        <span className="material-symbols-outlined text-[24px]">{"chat"}</span>
      </ContentElement>
      <ContentElement
        contentKey="footer.attributes-021"
        tag="a"
        className="w-12 h-12 rounded-full bg-sale-crimson text-on-error shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 animate-pulse"
      >
        <span className="material-symbols-outlined text-[24px]">{"call"}</span>
      </ContentElement>
      <ContentElement
        contentKey="footer.attributes-022"
        tag="a"
        className="w-12 h-12 rounded-full bg-secondary text-on-secondary shadow-xl hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110"
        data-path="lien-he"
      >
        <span className="material-symbols-outlined text-[24px]">
          {"mark_chat_unread"}
        </span>
      </ContentElement>
    </div>
  );
}
