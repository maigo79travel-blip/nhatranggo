import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { CatalogCard, ProductField } from "@/components/catalog";

export function ToursDaily() {
  return (
    <section className="w-full py-16 bg-surface">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <span className="font-label-lg text-label-lg text-primary uppercase tracking-wider">
              <ContentText contentKey="tours.text-042" />
            </span>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              <ContentText contentKey="tours.text-043" />
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <span className="font-body-sm text-body-sm text-on-surface-variant hidden sm:inline">
              <ContentText contentKey="tours.text-044" />
            </span>
            <ContentElement
              contentKey="tours.attributes-005"
              tag="select"
              className="px-4 py-2.5 rounded-xl bg-surface text-on-surface font-label-lg text-label-lg shadow-sm outline-none cursor-pointer"
            >
              <option value="pop">
                <ContentText contentKey="tours.text-045" />
              </option>
              <option value="price-asc">
                <ContentText contentKey="tours.text-046" />
              </option>
              <option value="price-desc">
                <ContentText contentKey="tours.text-047" />
              </option>
              <option value="rating">
                <ContentText contentKey="tours.text-048" />
              </option>
            </ContentElement>
          </div>
        </div>

        <div className="card-grid">
          <CatalogCollection collectionId="tours-collection-2">
            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-4"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-4"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-primary text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm">
                  <ContentText contentKey="field-003" />
                </div>
                <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md px-2 py-0.5 rounded text-on-primary text-body-sm font-body-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"photo_camera"}
                  </span>
                  <ContentText contentKey="field-004" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"scuba_diving"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-006" />
                  </div>
                </div>
                <ProductField
                  id="tours-4"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-4" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-007" />
                    </span>
                    <ProductField
                      id="tours-4"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-primary font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-008" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-5"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-5"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-secondary text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm">
                  <ContentText contentKey="field-003" />
                </div>
                <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md px-2 py-0.5 rounded text-on-primary text-body-sm font-body-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"groups"}
                  </span>
                  <ContentText contentKey="field-004" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"temple_buddhist"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-006" />
                  </div>
                </div>
                <ProductField
                  id="tours-5"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-5" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-007" />
                    </span>
                    <ProductField
                      id="tours-5"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-sale-price font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-008" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-6"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-6"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-brand-deep text-on-primary font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm">
                  <ContentText contentKey="field-003" />
                </div>
                <div className="absolute bottom-3 left-3 bg-inverse-surface/80 backdrop-blur-md px-2 py-0.5 rounded text-on-primary text-body-sm font-body-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"cloud"}
                  </span>
                  <ContentText contentKey="field-004" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"filter_drama"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-006" />
                  </div>
                </div>
                <ProductField
                  id="tours-6"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-6" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-007" />
                    </span>
                    <ProductField
                      id="tours-6"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-primary font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-008" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-7"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-7"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-secondary text-on-secondary font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm">
                  <ContentText contentKey="field-003" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"waves"}
                    </span>
                    <ContentText contentKey="field-004" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </div>
                </div>
                <ProductField
                  id="tours-7"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-7" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-006" />
                    </span>
                    <ProductField
                      id="tours-7"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-primary font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-007" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-8"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-8"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-surface-brand text-on-surface-brand font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm font-semibold">
                  <ContentText contentKey="field-003" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"park"}
                    </span>
                    <ContentText contentKey="field-004" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </div>
                </div>
                <ProductField
                  id="tours-8"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-8" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-006" />
                    </span>
                    <ProductField
                      id="tours-8"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-primary font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-007" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group"
              productId="tours-9"
              tag="article"
            >
              <div className="relative w-full h-56 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-9"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-3 left-3 bg-sale-badge text-on-sale font-label-sm text-label-sm px-2.5 py-1 rounded-md shadow-sm">
                  <ContentText contentKey="field-003" />
                </div>
              </div>
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center justify-between text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 text-primary font-medium">
                    <span className="material-symbols-outlined text-[16px]">
                      {"sports_bar"}
                    </span>
                    <ContentText contentKey="field-004" />
                  </span>
                  <div className="flex items-center gap-1 text-promo-ink font-bold">
                    <span
                      className="material-symbols-outlined text-[15px] text-promo-highlight"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </div>
                </div>
                <ProductField
                  id="tours-9"
                  field="title"
                  tag="h3"
                  className="font-title-md text-title-md text-on-surface group-hover:text-primary transition-colors line-clamp-2 mb-2"
                ></ProductField>
                <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mb-4">
                  <ProductValue id="tours-9" field="description" />
                </p>
                <div className="mt-auto pt-3 bg-surface-muted -mx-5 -mb-5 p-5 rounded-b-2xl flex items-center justify-between">
                  <div>
                    <span className="font-body-sm text-body-sm text-on-surface-variant block">
                      <ContentText contentKey="field-006" />
                    </span>
                    <ProductField
                      id="tours-9"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm text-sale-price font-bold"
                    ></ProductField>
                  </div>
                  <ContentElement
                    contentKey="field-002"
                    tag="a"
                    className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-hover text-on-primary font-label-md text-label-md shadow-sm transition-colors flex items-center gap-1 action-link"

                    rel="noopener"
                    target="_blank"
                  >
                    <span>
                      <ContentText contentKey="field-007" />
                    </span>
                    <span className="material-symbols-outlined text-[16px]">
                      {"arrow_forward"}
                    </span>
                  </ContentElement>
                </div>
              </div>
            </CatalogCard>
          </CatalogCollection>
        </div>

        <div className="mt-12 p-8 rounded-2xl bg-gradient-to-r from-brand-deep to-primary text-on-primary flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-on-primary/10 backdrop-blur-md flex items-center justify-center shrink-0">
              <span className="material-symbols-outlined text-[36px] text-promo-highlight">
                {"directions_boat"}
              </span>
            </div>
            <div>
              <h4 className="font-headline-md text-headline-md font-bold">
                <ContentText contentKey="tours.text-049" />
              </h4>
              <p className="font-body-md text-body-md text-surface-brand mt-1">
                <ContentText contentKey="tours.text-050" />
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0 flex-wrap justify-center max-w-full">
            <ContentElement
              contentKey="tours.attributes-006"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-promo-highlight hover:bg-promo-highlight/90 text-dialog-scrim font-label-lg text-label-lg shadow-md transition-all flex items-center gap-2 action-link"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"call"}
              </span>
              <span>
                <ContentText contentKey="tours.text-051" />
              </span>
            </ContentElement>
            <ContentElement
              contentKey="tours.attributes-007"
              tag="a"
              className="px-6 py-3.5 rounded-full bg-on-primary/20 hover:bg-on-primary/30 backdrop-blur-md text-on-primary font-label-lg text-label-lg transition-all flex items-center gap-2 action-link"

              rel="noopener"
              target="_blank"
            >
              <span className="material-symbols-outlined text-[20px]">
                {"chat"}
              </span>
              <span>
                <ContentText contentKey="tours.text-052" />
              </span>
            </ContentElement>
          </div>
        </div>
      </div>
    </section>
  );
}
