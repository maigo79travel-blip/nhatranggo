import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function HotelsListing() {
  return (
    <section className="site-container py-8 w-full">
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 items-start">
        <aside className="space-y-6">
          <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm space-y-6">
            <div className="flex items-center justify-between pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-primary text-[20px]">
                  {"tune"}
                </span>
                <h2 className="font-title-md text-title-md text-on-surface">
                  <ContentText contentKey="hotels.text-078" />
                </h2>
              </div>
              <button
                className="font-label-sm text-label-sm text-primary hover:underline"
                id="reset-filter-btn"
                type="button"
              >
                <ContentText contentKey="hotels.text-079" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="font-label-lg text-label-lg text-on-surface flex items-center justify-between">
                <span>
                  <ContentText contentKey="hotels.text-080" />
                </span>
                <span className="font-label-sm text-label-sm text-outline">
                  <ContentText contentKey="hotels.text-081" />
                </span>
              </h3>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-subtle cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-012"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      name="price-range"
                      type="radio"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-082" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-083" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg bg-surface-subtle font-medium text-on-surface cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-013"
                      tag="input"
                      defaultChecked={true}
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      name="price-range"
                      type="radio"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-084" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-primary font-bold">
                    <ContentText contentKey="hotels.text-085" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-subtle cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-014"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      name="price-range"
                      type="radio"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-086" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-087" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-2 rounded-lg hover:bg-surface-subtle cursor-pointer transition-colors">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-015"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      name="price-range"
                      type="radio"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-088" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-089" />
                  </span>
                </label>
              </div>
              <div className="pt-2">
                <ContentElement
                  contentKey="hotels.attributes-016"
                  tag="input"
                  className="w-full accent-primary cursor-pointer"
                  max="8000000"
                  min="500000"
                  step="100000"
                  type="range"
                />
                <div className="flex items-center justify-between font-label-sm text-label-sm text-outline pt-1">
                  <span>
                    <ContentText contentKey="hotels.text-090" />
                  </span>
                  <span className="text-primary font-semibold">
                    <ContentText contentKey="hotels.text-091" />
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-092" />
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-label-lg text-label-lg text-on-surface">
                <ContentText contentKey="hotels.text-093" />
              </h3>
              <div className="grid grid-cols-3 gap-2">
                <label className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-subtle hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-fixed has-[:checked]:text-on-primary-fixed">
                  <ContentElement
                    contentKey="hotels.attributes-017"
                    tag="input"
                    className="sr-only"
                    name="star-rating"
                    type="checkbox"
                  />
                  <div className="flex text-gold-amber text-[14px]">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm mt-1">
                    <ContentText contentKey="hotels.text-094" />
                  </span>
                </label>
                <label className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-subtle hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-fixed has-[:checked]:text-on-primary-fixed">
                  <ContentElement
                    contentKey="hotels.attributes-018"
                    tag="input"
                    defaultChecked={true}
                    className="sr-only"
                    name="star-rating"
                    type="checkbox"
                  />
                  <div className="flex text-gold-amber text-[14px]">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm mt-1">
                    <ContentText contentKey="hotels.text-095" />
                  </span>
                </label>
                <label className="flex flex-col items-center justify-center p-2 rounded-xl bg-surface-subtle hover:bg-surface-container-low cursor-pointer transition-all has-[:checked]:bg-primary-fixed has-[:checked]:text-on-primary-fixed ring-2 ring-primary">
                  <ContentElement
                    contentKey="hotels.attributes-019"
                    tag="input"
                    defaultChecked={true}
                    className="sr-only"
                    name="star-rating"
                    type="checkbox"
                  />
                  <div className="flex text-gold-amber text-[14px]">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm mt-1 font-bold">
                    <ContentText contentKey="hotels.text-096" />
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-label-lg text-label-lg text-on-surface">
                <ContentText contentKey="hotels.text-097" />
              </h3>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-subtle cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-020"
                      tag="input"
                      defaultChecked={true}
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-098" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-099" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-subtle cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-021"
                      tag="input"
                      defaultChecked={true}
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-100" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-101" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-subtle cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-022"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-102" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-103" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-subtle cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-023"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-104" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-105" />
                  </span>
                </label>
                <label className="flex items-center justify-between p-1.5 rounded-lg hover:bg-surface-subtle cursor-pointer">
                  <div className="flex items-center gap-2">
                    <ContentElement
                      contentKey="hotels.attributes-024"
                      tag="input"
                      className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                      type="checkbox"
                    />
                    <span>
                      <ContentText contentKey="hotels.text-106" />
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="hotels.text-107" />
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-label-lg text-label-lg text-on-surface">
                <ContentText contentKey="hotels.text-108" />
              </h3>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-025"
                    tag="input"
                    defaultChecked={true}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {"pool"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-109" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-026"
                    tag="input"
                    defaultChecked={true}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    {"beach_access"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-110" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-027"
                    tag="input"
                    defaultChecked={true}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-tertiary">
                    {"restaurant"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-111" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-028"
                    tag="input"
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {"airport_shuttle"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-112" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-029"
                    tag="input"
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-lagoon-cyan">
                    {"water_full"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-113" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-030"
                    tag="input"
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    {"spa"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-114" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-031"
                    tag="input"
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-gold-amber">
                    {"child_care"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-115" />
                  </span>
                </label>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="font-label-lg text-label-lg text-on-surface">
                <ContentText contentKey="hotels.text-116" />
              </h3>
              <div className="space-y-2 font-body-sm text-body-sm text-on-surface-variant">
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-032"
                    tag="input"
                    defaultChecked={true}
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-secondary">
                    {"event_available"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-117" />
                  </span>
                </label>
                <label className="flex items-center gap-2.5 p-1 rounded hover:bg-surface-subtle cursor-pointer">
                  <ContentElement
                    contentKey="hotels.attributes-033"
                    tag="input"
                    className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                    type="checkbox"
                  />
                  <span className="material-symbols-outlined text-[18px] text-primary">
                    {"credit_score"}
                  </span>
                  <span>
                    <ContentText contentKey="hotels.text-118" />
                  </span>
                </label>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-ocean-light/50 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary font-title-md text-title-md">
                <span className="material-symbols-outlined text-[20px]">
                  {"support_agent"}
                </span>
                <span>
                  <ContentText contentKey="hotels.text-119" />
                </span>
              </div>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                <ContentText contentKey="hotels.text-120" />
              </p>
              <ContentElement
                contentKey="hotels.attributes-034"
                tag="a"
                className="mt-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary text-on-primary font-label-md text-label-md hover:bg-ocean-deep transition-all shadow-sm action-link"

                rel="noopener"
                target="_blank"
              >
                <span className="material-symbols-outlined text-[16px]">
                  {"chat"}
                </span>
                <span>
                  <ContentText contentKey="hotels.text-121" />
                </span>
              </ContentElement>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-2xl p-3 shadow-sm overflow-hidden flex flex-col gap-2">
            <ContentElement
              contentKey="hotels.attributes-035"
              tag="div"
              className="relative w-full h-40 rounded-xl overflow-hidden"
            >
              <div className="absolute inset-0 bg-primary/20 backdrop-blur-[1px] flex flex-col items-center justify-center text-center p-3">
                <div className="w-10 h-10 rounded-full bg-surface-container-lowest text-primary flex items-center justify-center shadow-lg mb-1">
                  <span className="material-symbols-outlined text-[24px]">
                    {"pin_drop"}
                  </span>
                </div>
                <span className="font-title-md text-title-md text-on-primary bg-on-background/70 px-3 py-1 rounded-full backdrop-blur-md">
                  <ContentText contentKey="hotels.text-122" />
                </span>
              </div>
            </ContentElement>
            <p className="font-body-sm text-body-sm text-outline text-center">
              <ContentText contentKey="hotels.text-123" />
            </p>
          </div>
        </aside>

        <div className="flex flex-col gap-6">
          <div className="bg-surface-container-lowest p-4 rounded-2xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface">
                <ContentText contentKey="hotels.text-124" />
              </span>
              <span className="font-body-md text-body-md text-outline">
                <ContentText contentKey="hotels.text-125" />
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-label-sm text-label-sm text-outline uppercase hidden sm:inline">
                <ContentText contentKey="hotels.text-126" />
              </span>
              <button
                className="px-3.5 py-1.5 rounded-full bg-primary text-on-primary font-label-md text-label-md shadow-sm transition-all"
                type="button"
              >
                <ContentText contentKey="hotels.text-127" />
              </button>
              <button
                className="px-3.5 py-1.5 rounded-full bg-surface-subtle hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-all"
                type="button"
              >
                <ContentText contentKey="hotels.text-128" />
              </button>
              <button
                className="px-3.5 py-1.5 rounded-full bg-surface-subtle hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-all"
                type="button"
              >
                <ContentText contentKey="hotels.text-129" />
              </button>
              <button
                className="px-3.5 py-1.5 rounded-full bg-surface-subtle hover:bg-surface-container text-on-surface-variant font-label-md text-label-md transition-all"
                type="button"
              >
                <ContentText contentKey="hotels.text-130" />
              </button>
              <div className="ml-auto flex items-center gap-1 bg-surface-subtle p-1 rounded-xl">
                <ContentElement
                  contentKey="hotels.attributes-036"
                  tag="button"

                  className="p-1.5 rounded-lg bg-surface-container-lowest text-primary shadow-sm"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {"view_list"}
                  </span>
                </ContentElement>
                <ContentElement
                  contentKey="hotels.attributes-037"
                  tag="button"

                  className="p-1.5 rounded-lg text-outline hover:text-on-surface"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {"grid_view"}
                  </span>
                </ContentElement>
              </div>
            </div>
          </div>

          <div className="card-grid-wide">
            <CatalogCollection collectionId="hotels-collection-1">
              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-1"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-1"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-sale-crimson text-on-error font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-gold-amber text-on-background font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                </div>

                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-007" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-primary font-bold">
                            <ContentText contentKey="field-008" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-009" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-1" field="rating" />
                        </span>
                      </div>
                    </div>

                    <ProductField
                      id="hotels-1"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-1" field="location" />
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"pool"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {"visibility"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-secondary/10 text-secondary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {"restaurant"}
                        </span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>

                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"check_circle"}
                      </span>
                      <span>
                        <ContentText contentKey="field-013" />
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-1">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-1"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-014" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-015" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-016" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>

              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl border-2 border-primary/20 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-2"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-2"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-secondary text-on-secondary font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-sale-crimson text-on-error font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-006" />
                    </span>
                  </div>
                </div>

                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-007" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-secondary font-bold">
                            <ContentText contentKey="field-008" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-009" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-secondary text-on-secondary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-2" field="rating" />
                        </span>
                      </div>
                    </div>

                    <ProductField
                      id="hotels-2"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-2" field="location" />
                      </span>
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-gold-soft text-tertiary font-label-sm text-label-sm font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {"cookie"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-lagoon-cyan">
                          {"qr_code_2"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"beach_access"}
                        </span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>

                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"child_friendly"}
                      </span>
                      <span>
                        <ContentText contentKey="field-013" />
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-2">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-2"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-014" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-015" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-016" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>

              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-3"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-3"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-primary text-on-primary font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                </div>
                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-006" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-secondary font-bold">
                            <ContentText contentKey="field-007" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-008" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-secondary text-on-secondary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-3" field="rating" />
                        </span>
                      </div>
                    </div>
                    <ProductField
                      id="hotels-3"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-3" field="location" />
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"pool"}
                        </span>
                        <ContentText contentKey="field-009" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-lagoon-cyan">
                          {"theaters"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {"museum"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                    </div>
                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"check_circle"}
                      </span>
                      <span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-3">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-3"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-014" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-015" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>

              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-4"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-4"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-tertiary-container text-on-tertiary-container font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                </div>
                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-006" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-primary font-bold">
                            <ContentText contentKey="field-007" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-008" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-4" field="rating" />
                        </span>
                      </div>
                    </div>
                    <ProductField
                      id="hotels-4"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-4" field="location" />
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-secondary-container text-on-secondary-container font-label-sm text-label-sm font-semibold flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px]">
                          {"spa"}
                        </span>
                        <ContentText contentKey="field-009" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"breakfast_dining"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-lagoon-cyan">
                          {"deck"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                    </div>
                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"check_circle"}
                      </span>
                      <span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-4">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-4"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-014" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-015" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>

              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-5"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-5"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-primary-container text-on-primary-container font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                </div>
                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-006" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-primary font-bold">
                            <ContentText contentKey="field-007" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-008" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-5" field="rating" />
                        </span>
                      </div>
                    </div>
                    <ProductField
                      id="hotels-5"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-5" field="location" />
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"beach_access"}
                        </span>
                        <ContentText contentKey="field-009" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {"shopping_bag"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          {"restaurant"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                    </div>
                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"check_circle"}
                      </span>
                      <span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-5">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-5"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-014" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-015" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>

              <CatalogCard
                className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col md:flex-row group"
                productId="hotels-6"
                tag="article"
              >
                <div className="md:w-5/12 relative h-64 md:h-auto overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id="hotels-6"
                    field="image"
                    tag="img"

                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  ></ProductField>
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                    <span className="px-2.5 py-1 rounded-md bg-gold-amber text-on-background font-label-sm text-label-sm font-bold shadow-sm">
                      <ContentText contentKey="field-004" />
                    </span>
                  </div>

                  <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2.5 py-1 rounded-lg font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"photo_camera"}
                    </span>
                    <span>
                      <ContentText contentKey="field-005" />
                    </span>
                  </div>
                </div>
                <div className="md:w-7/12 p-5 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <div className="flex items-center gap-1 text-gold-amber">
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[16px]"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span className="font-label-sm text-label-sm text-outline ml-1 font-semibold">
                          <ContentText contentKey="field-006" />
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="font-label-md text-label-md text-primary font-bold">
                            <ContentText contentKey="field-007" />
                          </p>
                          <p className="font-label-sm text-label-sm text-outline">
                            <ContentText contentKey="field-008" />
                          </p>
                        </div>
                        <span className="w-9 h-9 rounded-xl bg-primary text-on-primary font-title-md text-title-md flex items-center justify-center font-bold">
                          <ProductValue id="hotels-6" field="rating" />
                        </span>
                      </div>
                    </div>
                    <ProductField
                      id="hotels-6"
                      field="title"
                      tag="h3"
                      className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors"
                    ></ProductField>
                    <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 mt-1">
                      <span className="material-symbols-outlined text-[16px] text-primary">
                        {"location_on"}
                      </span>
                      <span>
                        <ProductValue id="hotels-6" field="location" />
                      </span>
                    </p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-primary">
                          {"restaurant_menu"}
                        </span>
                        <ContentText contentKey="field-009" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-secondary">
                          {"pool"}
                        </span>
                        <ContentText contentKey="field-010" />
                      </span>
                      <span className="px-2.5 py-1 rounded-md bg-surface-subtle font-label-sm text-label-sm text-on-surface-variant flex items-center gap-1">
                        <span className="material-symbols-outlined text-[14px] text-tertiary">
                          {"airport_shuttle"}
                        </span>
                        <ContentText contentKey="field-011" />
                      </span>
                    </div>
                    <div className="mt-3 text-secondary font-label-sm text-label-sm flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px]">
                        {"check_circle"}
                      </span>
                      <span>
                        <ContentText contentKey="field-012" />
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 mt-3 flex items-end justify-between price-actions flex-wrap gap-3">
                    <PriceStack productId="hotels-6">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="hotels-6"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-extrabold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-outline">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                      <span className="font-label-sm text-label-sm text-outline block">
                        <ContentText contentKey="field-014" />
                      </span>
                    </PriceStack>
                    <div className="flex items-center gap-2">
                      <ContentElement
                        contentKey="field-003"
                        tag="a"
                        className="px-3 py-2.5 rounded-xl bg-surface-subtle hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors action-link"

                        rel="noopener"
                        target="_blank"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"chat"}
                        </span>
                      </ContentElement>
                      <button
                        className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-title-md text-title-md shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
                        type="button"
                      >
                        <ContentText contentKey="field-015" />
                      </button>
                    </div>
                  </div>
                </div>
              </CatalogCard>
            </CatalogCollection>
          </div>

          <ContentElement
            contentKey="hotels.attributes-038"
            tag="nav"

            className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 pb-2"
          >
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <ContentText contentKey="hotels.text-131" />
              <span className="font-semibold text-on-surface">
                <ContentText contentKey="hotels.text-132" />
              </span>
              <ContentText contentKey="hotels.text-133" />
              <span className="font-semibold text-on-surface">
                <ContentText contentKey="hotels.text-134" />
              </span>
              <ContentText contentKey="hotels.text-135" />
            </p>
            <div className="flex items-center gap-1">
              <ContentElement
                contentKey="hotels.attributes-039"
                tag="button"

                className="w-10 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container flex items-center justify-center text-outline hover:text-on-surface disabled:opacity-40 transition-colors"
                disabled={true}
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {"chevron_left"}
                </span>
              </ContentElement>
              <button
                className="w-10 h-10 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-bold shadow-sm"
                type="button"
              >
                <ContentText contentKey="hotels.text-136" />
              </button>
              <button
                className="w-10 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                type="button"
              >
                <ContentText contentKey="hotels.text-137" />
              </button>
              <button
                className="w-10 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                type="button"
              >
                <ContentText contentKey="hotels.text-138" />
              </button>
              <span className="px-2 text-outline font-label-md">
                <ContentText contentKey="hotels.text-139" />
              </span>
              <button
                className="w-10 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container text-on-surface font-label-md text-label-md transition-colors"
                type="button"
              >
                <ContentText contentKey="hotels.text-140" />
              </button>
              <ContentElement
                contentKey="hotels.attributes-040"
                tag="button"

                className="w-10 h-10 rounded-xl bg-surface-container-lowest hover:bg-surface-container flex items-center justify-center text-on-surface hover:text-primary transition-colors"
                type="button"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {"chevron_right"}
                </span>
              </ContentElement>
            </div>
          </ContentElement>
        </div>
      </div>
    </section>
  );
}
