import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function ToursFeatured() {
  return (
    <section className="w-full py-16 bg-surface-container-low">
      <div className="site-container">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="flex items-center gap-2 text-sale-crimson font-label-lg text-label-lg uppercase tracking-wider">
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                {"local_fire_department"}
              </span>
              <span>
                <ContentText contentKey="tours.text-039" />
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg text-on-surface mt-1">
              <ContentText contentKey="tours.text-040" />
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant md:text-right">
            <ContentText contentKey="tours.text-041" />
          </p>
        </div>

        <div className="card-grid gap-8">
          <CatalogCollection collectionId="tours-collection-1">
            <CatalogCard
              className="bg-surface-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              productId="tours-1"
              tag="article"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-1"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-4 left-4 bg-sale-crimson text-on-error font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"local_fire_department"}
                  </span>
                  <span>
                    <ContentText contentKey="field-004" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-primary text-body-sm font-body-sm">
                  <span className="bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"schedule"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <span className="bg-primary/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
                    <ContentText contentKey="field-006" />
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {"pin_drop"}
                    </span>
                    <ContentText contentKey="field-007" />
                  </span>
                  <div className="flex items-center gap-1 text-tertiary font-bold text-label-md">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span>
                      <ProductValue id="tours-1" field="rating" />
                    </span>
                    <span className="text-outline font-normal">
                      <ContentText contentKey="field-008" />
                    </span>
                  </div>
                </div>
                <ProductField
                  id="tours-1"
                  field="title"
                  tag="h3"
                  className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2 mb-3"
                ></ProductField>

                <ul className="flex flex-wrap gap-2 mb-6">
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"bathtub"}
                    </span>
                    <ContentText contentKey="field-009" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {"scuba_diving"}
                    </span>
                    <ContentText contentKey="field-010" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">
                      {"restaurant"}
                    </span>
                    <ContentText contentKey="field-011" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"airport_shuttle"}
                    </span>
                    <ContentText contentKey="field-012" />
                  </li>
                </ul>
                <div className="mt-auto pt-4 border-t-0 bg-surface-subtle -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <PriceStack productId="tours-1">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="tours-1"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-bold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                    </PriceStack>
                    <span className="px-2 py-0.5 rounded text-sale-crimson bg-error-container font-label-sm text-label-sm">
                      <ContentText contentKey="field-014" />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"menu_book"}
                      </span>
                      <span>
                        <ContentText contentKey="field-015" />
                      </span>
                    </button>
                    <ContentElement
                      contentKey="field-003"
                      tag="a"
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"

                      rel="noopener"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"bolt"}
                      </span>
                      <span>
                        <ContentText contentKey="field-016" />
                      </span>
                    </ContentElement>
                  </div>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              productId="tours-2"
              tag="article"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-2"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"diamond"}
                  </span>
                  <span>
                    <ContentText contentKey="field-004" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-primary text-body-sm font-body-sm">
                  <span className="bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"wb_twilight"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <span className="bg-tertiary-container/90 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold text-on-tertiary-container">
                    <ContentText contentKey="field-006" />
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {"sailing"}
                    </span>
                    <ContentText contentKey="field-007" />
                  </span>
                  <div className="flex items-center gap-1 text-tertiary font-bold text-label-md">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span>
                      <ProductValue id="tours-2" field="rating" />
                    </span>
                    <span className="text-outline font-normal">
                      <ContentText contentKey="field-008" />
                    </span>
                  </div>
                </div>
                <ProductField
                  id="tours-2"
                  field="title"
                  tag="h3"
                  className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2 mb-3"
                ></ProductField>

                <ul className="flex flex-wrap gap-2 mb-6">
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"set_meal"}
                    </span>
                    <ContentText contentKey="field-009" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {"music_note"}
                    </span>
                    <ContentText contentKey="field-010" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">
                      {"wine_bar"}
                    </span>
                    <ContentText contentKey="field-011" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"photo_camera"}
                    </span>
                    <ContentText contentKey="field-012" />
                  </li>
                </ul>
                <div className="mt-auto pt-4 bg-surface-subtle -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <PriceStack productId="tours-2">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="tours-2"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-primary font-bold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                    </PriceStack>
                    <span className="px-2 py-0.5 rounded text-secondary bg-secondary-container font-label-sm text-label-sm font-semibold">
                      <ContentText contentKey="field-014" />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"menu_book"}
                      </span>
                      <span>
                        <ContentText contentKey="field-015" />
                      </span>
                    </button>
                    <ContentElement
                      contentKey="field-003"
                      tag="a"
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"

                      rel="noopener"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"bolt"}
                      </span>
                      <span>
                        <ContentText contentKey="field-016" />
                      </span>
                    </ContentElement>
                  </div>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface-card rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group"
              productId="tours-3"
              tag="article"
            >
              <div className="relative w-full h-64 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="tours-3"
                  field="image"
                  tag="img"

                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                ></ProductField>
                <div className="absolute top-4 left-4 bg-secondary text-on-secondary font-label-sm text-label-sm px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                  <span className="material-symbols-outlined text-[14px]">
                    {"explore"}
                  </span>
                  <span>
                    <ContentText contentKey="field-004" />
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-on-primary text-body-sm font-body-sm">
                  <span className="bg-inverse-surface/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">
                      {"schedule"}
                    </span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <span className="bg-secondary/80 backdrop-blur-md px-2.5 py-1 rounded-lg flex items-center gap-1 font-semibold">
                    <ContentText contentKey="field-006" />
                  </span>
                </div>
              </div>
              <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-secondary font-label-md text-label-md uppercase tracking-wider flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px]">
                      {"landscape"}
                    </span>
                    <ContentText contentKey="field-007" />
                  </span>
                  <div className="flex items-center gap-1 text-tertiary font-bold text-label-md">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <span>
                      <ProductValue id="tours-3" field="rating" />
                    </span>
                    <span className="text-outline font-normal">
                      <ContentText contentKey="field-008" />
                    </span>
                  </div>
                </div>
                <ProductField
                  id="tours-3"
                  field="title"
                  tag="h3"
                  className="font-headline-sm text-headline-sm text-on-surface font-bold group-hover:text-primary transition-colors line-clamp-2 mb-3"
                ></ProductField>

                <ul className="flex flex-wrap gap-2 mb-6">
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"water_drop"}
                    </span>
                    <ContentText contentKey="field-009" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-primary">
                      {"eco"}
                    </span>
                    <ContentText contentKey="field-010" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-tertiary">
                      {"cruelty_free"}
                    </span>
                    <ContentText contentKey="field-011" />
                  </li>
                  <li className="bg-surface-container px-2.5 py-1 rounded-md text-on-surface-variant font-label-sm text-label-sm flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px] text-secondary">
                      {"restaurant_menu"}
                    </span>
                    <ContentText contentKey="field-012" />
                  </li>
                </ul>
                <div className="mt-auto pt-4 bg-surface-subtle -mx-6 -mb-6 p-6 rounded-b-2xl flex flex-col gap-3">
                  <div className="flex items-baseline justify-between">
                    <PriceStack productId="tours-3">
                      <div className="flex items-baseline gap-1">
                        <ProductField
                          id="tours-3"
                          field="price"
                          tag="span"
                          className="font-headline-md text-headline-md text-sale-crimson font-bold"
                        ></ProductField>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          <ContentText contentKey="field-013" />
                        </span>
                      </div>
                    </PriceStack>
                    <span className="px-2 py-0.5 rounded text-sale-crimson bg-error-container font-label-sm text-label-sm">
                      <ContentText contentKey="field-014" />
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-1">
                    <button
                      className="w-full py-2.5 rounded-xl bg-surface-container hover:bg-surface-variant text-on-surface font-label-lg text-label-lg transition-colors flex items-center justify-center gap-1"
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"menu_book"}
                      </span>
                      <span>
                        <ContentText contentKey="field-015" />
                      </span>
                    </button>
                    <ContentElement
                      contentKey="field-003"
                      tag="a"
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-sm hover:shadow transition-all flex items-center justify-center gap-1"

                      rel="noopener"
                      target="_blank"
                    >
                      <span className="material-symbols-outlined text-[18px]">
                        {"bolt"}
                      </span>
                      <span>
                        <ContentText contentKey="field-016" />
                      </span>
                    </ContentElement>
                  </div>
                </div>
              </div>
            </CatalogCard>
          </CatalogCollection>
        </div>
      </div>
    </section>
  );
}
