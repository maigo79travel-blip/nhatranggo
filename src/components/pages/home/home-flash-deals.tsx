import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function HomeFlashDeals() {
  return (
    <section className="site-container py-12 w-full">
      <div className="rounded-3xl bg-gradient-to-br from-primary via-ocean-deep to-primary-container p-6 md:p-10 shadow-xl text-on-primary relative overflow-hidden">
        <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-secondary-container/10 blur-2xl"></div>
        <div className="absolute -left-16 -bottom-16 w-80 h-80 rounded-full bg-gold-amber/10 blur-2xl"></div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 relative z-10 mb-8">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm uppercase font-bold tracking-wider mb-3">
              <span className="material-symbols-outlined text-[16px]">
                {"local_fire_department"}
              </span>
              <span>
                <ContentText contentKey="home.text-079" />
              </span>
            </div>
            <h2 className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-primary">
              <ContentText contentKey="home.text-080" />
            </h2>
            <p className="font-body-md text-body-md text-ocean-light/90 mt-2">
              <ContentText contentKey="home.text-081" />
            </p>
          </div>

          <div className="bg-surface-container-lowest/15 backdrop-blur-md rounded-2xl p-4 flex flex-col items-center sm:items-start shrink-0">
            <div className="flex items-center gap-1.5 font-label-sm text-label-sm uppercase tracking-wider text-gold-soft mb-2">
              <span className="material-symbols-outlined text-[16px] text-gold-amber">
                {"timer"}
              </span>
              <span>
                <ContentText contentKey="home.text-082" />
              </span>
            </div>
            <div
              className="flex items-center gap-2 text-center"
              id="countdown-timer"
            >
              <div className="bg-surface-container-lowest text-on-surface px-3 py-2 rounded-xl shadow">
                <span
                  className="font-headline-sm text-headline-sm font-extrabold text-primary block"
                  id="cd-days"
                >
                  <ContentText contentKey="home.text-083" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="home.text-084" />
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary">
                <ContentText contentKey="home.text-085" />
              </span>
              <div className="bg-surface-container-lowest text-on-surface px-3 py-2 rounded-xl shadow">
                <span
                  className="font-headline-sm text-headline-sm font-extrabold text-primary block"
                  id="cd-hours"
                >
                  <ContentText contentKey="home.text-086" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="home.text-087" />
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary">
                <ContentText contentKey="home.text-088" />
              </span>
              <div className="bg-surface-container-lowest text-on-surface px-3 py-2 rounded-xl shadow">
                <span
                  className="font-headline-sm text-headline-sm font-extrabold text-primary block"
                  id="cd-mins"
                >
                  <ContentText contentKey="home.text-089" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="home.text-090" />
                </span>
              </div>
              <span className="font-headline-sm text-headline-sm text-on-primary">
                <ContentText contentKey="home.text-091" />
              </span>
              <div className="bg-surface-container-lowest text-on-surface px-3 py-2 rounded-xl shadow">
                <span
                  className="font-headline-sm text-headline-sm font-extrabold text-sale-crimson block"
                  id="cd-secs"
                >
                  <ContentText contentKey="home.text-092" />
                </span>
                <span className="font-label-sm text-label-sm text-outline uppercase">
                  <ContentText contentKey="home.text-093" />
                </span>
              </div>
            </div>
          </div>
        </div>

        <div className="card-grid relative z-10">
          <CatalogCollection collectionId="home-collection-1">
            <CatalogCard
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-on-surface group"
              productId="home-1"
              tag="div"
            >
              <div className="relative h-52 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="home-1"
                  field="image"
                  tag="div"
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                ></ProductField>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-bold uppercase shadow-sm">
                    <ContentText contentKey="field-003" />
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <button
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-sale-crimson hover:bg-surface-container-lowest shadow-sm transition-transform hover:scale-110"
                  type="button"
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {"favorite"}
                  </span>
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        {"flight"}
                      </span>
                      <ContentText contentKey="field-005" />
                    </span>
                    <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary bg-gold-soft px-2 py-0.5 rounded-md">
                      <span
                        className="material-symbols-outlined text-[16px] text-gold-amber"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"star"}
                      </span>
                      <ProductValue id="home-1" field="rating" />
                    </span>
                  </div>
                  <ProductField
                    id="home-1"
                    field="title"
                    tag="h3"
                    className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                  ></ProductField>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    <ProductValue id="home-1" field="description" />
                  </p>
                </div>
                <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                  <div className="flex items-end justify-between price-actions flex-wrap gap-3">
                    <div>
                      <span className="block font-label-sm text-label-sm text-outline">
                        <ContentText contentKey="field-006" />
                      </span>
                      <PriceStack productId="home-1">
                        <ProductField
                          id="home-1"
                          field="price"
                          tag="span"
                          className="font-headline-sm text-headline-sm font-bold text-sale-crimson"
                        ></ProductField>
                      </PriceStack>
                    </div>
                    <ContentElement
                      contentKey="field-002"
                      tag="a"
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all duration-200 action-link"

                      data-action="details"
                    >
                      <ContentText contentKey="field-007" />
                    </ContentElement>
                  </div>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-on-surface group"
              productId="home-2"
              tag="div"
            >
              <div className="relative h-52 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="home-2"
                  field="image"
                  tag="div"
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                ></ProductField>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-sale-crimson text-on-error font-label-sm text-label-sm font-bold uppercase shadow-sm">
                    <ContentText contentKey="field-003" />
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <button
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-outline hover:text-sale-crimson shadow-sm transition-transform hover:scale-110"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {"favorite"}
                  </span>
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        {"flight"}
                      </span>
                      <ContentText contentKey="field-005" />
                    </span>
                    <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary bg-gold-soft px-2 py-0.5 rounded-md">
                      <span
                        className="material-symbols-outlined text-[16px] text-gold-amber"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"star"}
                      </span>
                      <ProductValue id="home-2" field="rating" />
                    </span>
                  </div>
                  <ProductField
                    id="home-2"
                    field="title"
                    tag="h3"
                    className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                  ></ProductField>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    <ProductValue id="home-2" field="description" />
                  </p>
                </div>
                <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                  <div className="flex items-end justify-between price-actions flex-wrap gap-3">
                    <div>
                      <span className="block font-label-sm text-label-sm text-outline">
                        <ContentText contentKey="field-006" />
                      </span>
                      <PriceStack productId="home-2">
                        <ProductField
                          id="home-2"
                          field="price"
                          tag="span"
                          className="font-headline-sm text-headline-sm font-bold text-sale-crimson"
                        ></ProductField>
                      </PriceStack>
                    </div>
                    <ContentElement
                      contentKey="field-002"
                      tag="a"
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all duration-200 action-link"

                      data-action="details"
                    >
                      <ContentText contentKey="field-007" />
                    </ContentElement>
                  </div>
                </div>
              </div>
            </CatalogCard>

            <CatalogCard
              className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col text-on-surface group"
              productId="home-3"
              tag="div"
            >
              <div className="relative h-52 overflow-hidden">
                <ProductField
                  contentKey="field-001"
                  id="home-3"
                  field="image"
                  tag="div"
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                ></ProductField>
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-2.5 py-1 rounded-lg bg-secondary text-on-secondary font-label-sm text-label-sm font-bold uppercase shadow-sm">
                    <ContentText contentKey="field-003" />
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-004" />
                  </span>
                </div>
                <button
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-surface-container-lowest/80 backdrop-blur-md flex items-center justify-center text-outline hover:text-sale-crimson shadow-sm transition-transform hover:scale-110"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {"favorite"}
                  </span>
                </button>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="font-label-sm text-label-sm text-outline flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] text-secondary">
                        {"flight"}
                      </span>
                      <ContentText contentKey="field-005" />
                    </span>
                    <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary bg-gold-soft px-2 py-0.5 rounded-md">
                      <span
                        className="material-symbols-outlined text-[16px] text-gold-amber"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"star"}
                      </span>
                      <ProductValue id="home-3" field="rating" />
                    </span>
                  </div>
                  <ProductField
                    id="home-3"
                    field="title"
                    tag="h3"
                    className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-1"
                  ></ProductField>
                  <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-2 mt-1">
                    <ProductValue id="home-3" field="description" />
                  </p>
                </div>
                <div className="mt-4 pt-4 bg-surface-container-low/50 rounded-xl p-3">
                  <div className="flex items-end justify-between price-actions flex-wrap gap-3">
                    <div>
                      <span className="block font-label-sm text-label-sm text-outline">
                        <ContentText contentKey="field-006" />
                      </span>
                      <PriceStack productId="home-3">
                        <ProductField
                          id="home-3"
                          field="price"
                          tag="span"
                          className="font-headline-sm text-headline-sm font-bold text-sale-crimson"
                        ></ProductField>
                      </PriceStack>
                    </div>
                    <ContentElement
                      contentKey="field-002"
                      tag="a"
                      className="px-4 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all duration-200 action-link"

                      data-action="details"
                    >
                      <ContentText contentKey="field-007" />
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
