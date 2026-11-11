import {
  ContentText,
  ContentElement,
  ContentOption,
} from "@/components/content";

export function HotelsHero() {
  return (
    <section className="relative bg-gradient-to-b from-ocean-deep/15 via-ocean-light/40 to-background pb-12 pt-6">
      <div className="site-container">
        <ContentElement
          contentKey="hotels.attributes-001"
          tag="nav"

          className="flex items-center gap-2 font-label-md text-label-md text-on-surface-variant mb-4"
        >
          <ContentElement
            contentKey="hotels.attributes-002"
            tag="a"
            className="hover:text-primary transition-colors flex items-center gap-1"
            data-path="trang-chu"
          >
            <span className="material-symbols-outlined text-[16px]">
              {"home"}
            </span>
            <span>
              <ContentText contentKey="hotels.text-043" />
            </span>
          </ContentElement>
          <span className="material-symbols-outlined text-[14px] text-outline-variant">
            {"chevron_right"}
          </span>
          <span className="text-primary font-semibold">
            <ContentText contentKey="hotels.text-044" />
          </span>
        </ContentElement>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-label-sm text-label-sm uppercase tracking-wide mb-2">
              <span className="material-symbols-outlined text-[14px]">
                {"hotel"}
              </span>
              <span>
                <ContentText contentKey="hotels.text-045" />
              </span>
            </div>
            <h1 className="font-display text-display text-on-surface tracking-tight">
              <ContentText contentKey="hotels.text-046" />
            </h1>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="flex items-center gap-2 bg-surface-container-lowest px-4 py-2 rounded-xl shadow-sm text-on-surface">
              <span
                className="material-symbols-outlined text-gold-amber text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {"verified"}
              </span>
              <div className="text-left leading-tight">
                <p className="font-label-sm text-label-sm text-outline">
                  <ContentText contentKey="hotels.text-048" />
                </p>
                <p className="font-title-md text-title-md text-primary">
                  <ContentText contentKey="hotels.text-049" />
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-4 lg:p-5 shadow-xl">
          <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-3 bg-surface-subtle p-3 rounded-xl hover:bg-surface-container-low transition-colors relative flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"location_on"}
                </span>
              </div>
              <div className="flex flex-col w-full min-w-0">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  <ContentText contentKey="hotels.text-050" />
                </label>
                <ContentElement
                  contentKey="hotels.attributes-003"
                  tag="select"
                  className="bg-transparent font-title-md text-title-md text-on-surface outline-none cursor-pointer w-full truncate"
                >
                  <option value="nhatrang">
                    <ContentText contentKey="hotels.text-051" />
                  </option>
                  <option value="camranh">
                    <ContentText contentKey="hotels.text-052" />
                  </option>
                  <option value="phuquoc">
                    <ContentText contentKey="hotels.text-053" />
                  </option>
                  <option value="danang">
                    <ContentText contentKey="hotels.text-054" />
                  </option>
                  <option value="dalat">
                    <ContentText contentKey="hotels.text-055" />
                  </option>
                  <option value="vungtau">
                    <ContentText contentKey="hotels.text-056" />
                  </option>
                  <option value="quynhon">
                    <ContentText contentKey="hotels.text-057" />
                  </option>
                </ContentElement>
              </div>
            </div>

            <div className="lg:col-span-3 bg-surface-subtle p-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"calendar_month"}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <div className="flex flex-col">
                  <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <ContentText contentKey="hotels.text-058" />
                  </label>
                  <ContentElement
                    contentKey="hotels.attributes-004"
                    tag="input"
                    className="bg-transparent font-label-lg text-label-lg text-on-surface outline-none cursor-pointer"
                    type="date"
                  />
                </div>
                <div className="flex flex-col border-l border-border-light pl-2">
                  <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                    <ContentText contentKey="hotels.text-059" />
                  </label>
                  <ContentElement
                    contentKey="hotels.attributes-005"
                    tag="input"
                    className="bg-transparent font-label-lg text-label-lg text-on-surface outline-none cursor-pointer"
                    type="date"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 bg-surface-subtle p-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"group"}
                </span>
              </div>
              <div className="flex flex-col w-full min-w-0">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  <ContentText contentKey="hotels.text-060" />
                </label>
                <ContentElement
                  contentKey="hotels.attributes-006"
                  tag="select"
                  className="bg-transparent font-title-md text-title-md text-on-surface outline-none cursor-pointer w-full truncate"
                >
                  <ContentOption contentKey="hotels.text-061" />
                  <ContentOption contentKey="hotels.text-062" />
                  <ContentOption contentKey="hotels.text-063" />
                  <ContentOption contentKey="hotels.text-064" />
                  <ContentOption contentKey="hotels.text-065" />
                </ContentElement>
              </div>
            </div>

            <div className="lg:col-span-2 bg-surface-subtle p-3 rounded-xl hover:bg-surface-container-low transition-colors flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gold-amber/20 flex items-center justify-center text-tertiary shrink-0">
                <span className="material-symbols-outlined text-[22px]">
                  {"apartment"}
                </span>
              </div>
              <div className="flex flex-col w-full min-w-0">
                <label className="font-label-sm text-label-sm text-outline uppercase tracking-wider">
                  <ContentText contentKey="hotels.text-066" />
                </label>
                <ContentElement
                  contentKey="hotels.attributes-007"
                  tag="select"
                  className="bg-transparent font-title-md text-title-md text-on-surface outline-none cursor-pointer w-full truncate"
                >
                  <ContentOption contentKey="hotels.text-067" />
                  <ContentOption contentKey="hotels.text-068" />
                  <ContentOption contentKey="hotels.text-069" />
                  <ContentOption contentKey="hotels.text-070" />
                  <ContentOption contentKey="hotels.text-071" />
                </ContentElement>
              </div>
            </div>

            <div className="lg:col-span-2 flex items-center">
              <button
                className="w-full h-full min-h-[52px] bg-gradient-to-r from-gold-amber to-tertiary-fixed-dim hover:from-gold-amber hover:to-tertiary-fixed-dim text-on-background font-title-md text-title-md rounded-xl flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                type="submit"
              >
                <span className="material-symbols-outlined text-[22px]">
                  {"search"}
                </span>
                <span>
                  <ContentText contentKey="hotels.text-072" />
                </span>
              </button>
            </div>
          </form>

          <div className="flex items-center flex-wrap gap-2 pt-4 mt-2">
            <span className="font-label-sm text-label-sm text-outline">
              <ContentText contentKey="hotels.text-073" />
            </span>
            <ContentElement
              contentKey="hotels.attributes-008"
              tag="a"
              className="px-3 py-1 rounded-full bg-surface-subtle hover:bg-primary hover:text-on-primary font-label-sm text-label-sm text-on-surface-variant transition-all action-link"

              data-action="details"
            >
              <ContentText contentKey="hotels.text-074" />
            </ContentElement>
            <ContentElement
              contentKey="hotels.attributes-009"
              tag="a"
              className="px-3 py-1 rounded-full bg-surface-subtle hover:bg-primary hover:text-on-primary font-label-sm text-label-sm text-on-surface-variant transition-all action-link"

              data-action="details"
            >
              <ContentText contentKey="hotels.text-075" />
            </ContentElement>
            <ContentElement
              contentKey="hotels.attributes-010"
              tag="a"
              className="px-3 py-1 rounded-full bg-surface-subtle hover:bg-primary hover:text-on-primary font-label-sm text-label-sm text-on-surface-variant transition-all action-link"

              data-action="details"
            >
              <ContentText contentKey="hotels.text-076" />
            </ContentElement>
            <ContentElement
              contentKey="hotels.attributes-011"
              tag="a"
              className="px-3 py-1 rounded-full bg-surface-subtle hover:bg-primary hover:text-on-primary font-label-sm text-label-sm text-on-surface-variant transition-all action-link"

              data-action="details"
            >
              <ContentText contentKey="hotels.text-077" />
            </ContentElement>
          </div>
        </div>
      </div>
    </section>
  );
}
