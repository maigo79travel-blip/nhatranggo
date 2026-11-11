import {
  ContentText,
  ContentElement,
  ProductValue,
  CatalogCollection,
} from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function HomeTours() {
  return (
    <section className="site-container py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm font-bold text-primary uppercase tracking-widest mb-1.5">
            <span className="w-6 h-0.5 bg-primary rounded-full"></span>
            <span>
              <ContentText contentKey="home.text-102" />
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            <ContentText contentKey="home.text-103" />
          </h2>
        </div>
        <ContentElement
          contentKey="home.attributes-008"
          tag="a"
          className="text-primary hover:text-ocean-deep font-label-lg text-label-lg flex items-center gap-1 group"

          data-action="details"
        >
          <span>
            <ContentText contentKey="home.text-104" />
          </span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            {"arrow_forward"}
          </span>
        </ContentElement>
      </div>

      <div className="card-grid-wide gap-8">
        <CatalogCollection collectionId="home-collection-3">
          <CatalogCard
            className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row group"
            productId="home-12"
            tag="div"
          >
            <div className="sm:w-5/12 relative h-64 sm:h-auto overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-12"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-bold shadow-md">
                  <ContentText contentKey="field-003" />
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
                  <ContentText contentKey="field-004" />
                </span>
              </div>
            </div>
            <div className="sm:w-7/12 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-12" field="rating" />
                  </span>
                  <span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-006" />
                  </span>
                  <span>
                    <ContentText contentKey="field-007" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-008" />
                  </span>
                </div>
                <ProductField
                  id="home-12"
                  field="title"
                  tag="h3"
                  className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug"
                ></ProductField>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-2">
                  <ProductValue id="home-12" field="description" />
                </p>
                <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-outline mt-3">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    {"directions_bus"}
                  </span>
                  <span>
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 bg-surface-container-low/60 rounded-2xl p-4 flex items-center justify-between price-actions flex-wrap gap-3">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-010" />
                  </span>
                  <PriceStack productId="home-12">
                    <ProductField
                      id="home-12"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm font-bold text-sale-crimson"
                    ></ProductField>
                  </PriceStack>
                </div>
                <ContentElement
                  contentKey="field-002"
                  tag="a"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all action-link"

                  data-action="details"
                >
                  <ContentText contentKey="field-011" />
                </ContentElement>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col sm:flex-row group"
            productId="home-13"
            tag="div"
          >
            <div className="sm:w-5/12 relative h-64 sm:h-auto overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-13"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                <span className="px-3 py-1 rounded-full bg-secondary text-on-secondary font-label-sm text-label-sm font-bold shadow-md">
                  <ContentText contentKey="field-003" />
                </span>
                <span className="px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm font-semibold">
                  <ContentText contentKey="field-004" />
                </span>
              </div>
            </div>
            <div className="sm:w-7/12 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 font-label-md text-label-md text-tertiary">
                    <span
                      className="material-symbols-outlined text-[16px] text-gold-amber"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-13" field="rating" />
                  </span>
                  <span>
                    <ContentText contentKey="field-005" />
                  </span>
                  <span className="font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-006" />
                  </span>
                  <span>
                    <ContentText contentKey="field-007" />
                  </span>
                  <span className="text-secondary font-label-sm text-label-sm font-semibold">
                    <ContentText contentKey="field-008" />
                  </span>
                </div>
                <ProductField
                  id="home-13"
                  field="title"
                  tag="h3"
                  className="font-headline-sm text-headline-sm font-bold text-on-surface group-hover:text-primary transition-colors leading-snug"
                ></ProductField>
                <p className="font-body-md text-body-md text-on-surface-variant mt-2 line-clamp-2">
                  <ProductValue id="home-13" field="description" />
                </p>
                <div className="flex items-center gap-1.5 text-body-sm font-body-sm text-outline mt-3">
                  <span className="material-symbols-outlined text-[16px] text-primary">
                    {"directions_bus"}
                  </span>
                  <span>
                    <ContentText contentKey="field-009" />
                  </span>
                </div>
              </div>
              <div className="mt-6 pt-4 bg-surface-container-low/60 rounded-2xl p-4 flex items-center justify-between price-actions flex-wrap gap-3">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-010" />
                  </span>
                  <PriceStack productId="home-13">
                    <ProductField
                      id="home-13"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-headline-sm font-bold text-sale-crimson"
                    ></ProductField>
                  </PriceStack>
                </div>
                <ContentElement
                  contentKey="field-002"
                  tag="a"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg shadow-md hover:shadow-lg transition-all action-link"

                  data-action="details"
                >
                  <ContentText contentKey="field-011" />
                </ContentElement>
              </div>
            </div>
          </CatalogCard>
        </CatalogCollection>
      </div>
    </section>
  );
}
