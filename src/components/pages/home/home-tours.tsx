import { HomeLink } from "@/modules/home/home-link";
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
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            <ContentText contentKey="home.text-103" />
          </h2>
          <div className="w-7 h-1 rounded-full bg-primary mt-2" />
        </div>
        <HomeLink
          contentKey="home.attributes-008"
          className="text-secondary hover:text-ocean-deep font-label-lg text-label-lg font-bold flex items-center gap-1.5 group"
          href="/tour-hang-ngay"
        >
          <span>
            <ContentText contentKey="home.text-104" />
          </span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            {"arrow_forward"}
          </span>
        </HomeLink>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <CatalogCollection collectionId="home-collection-3">
          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            productId="home-12"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-12"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                  <ContentText contentKey="field-003" />
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-[#F5B600]">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-12" field="rating" />
                  </span>
                  <span className="text-outline">•</span>
                  <span className="text-outline">
                    <ContentText contentKey="field-005" />
                  </span>
                </div>
                <ProductField
                  id="home-12"
                  field="title"
                  tag="h3"
                  className="font-title-md text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2"
                ></ProductField>
              </div>
              <div className="mt-5 flex items-end justify-between price-actions flex-wrap gap-3">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-010" />
                  </span>
                  <PriceStack productId="home-12">
                    <ProductField
                      id="home-12"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-xl font-extrabold text-sale-crimson"
                    ></ProductField>
                  </PriceStack>
                </div>
                <ContentElement
                  contentKey="field-002"
                  tag="a"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg font-bold shadow-sm transition-all action-link"
                  data-action="details"
                >
                  <ContentText contentKey="field-011" />
                </ContentElement>
              </div>
            </div>
          </CatalogCard>

          <CatalogCard
            className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
            productId="home-13"
            tag="div"
          >
            <div className="relative h-48 overflow-hidden">
              <ProductField
                contentKey="field-001"
                id="home-13"
                field="image"
                tag="div"
                className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              ></ProductField>
              <div className="absolute top-3 left-3 flex items-center gap-1.5">
                <span className="px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                  <ContentText contentKey="field-003" />
                </span>
              </div>
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-2">
                  <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-[#F5B600]">
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"star"}
                    </span>
                    <ProductValue id="home-13" field="rating" />
                  </span>
                  <span className="text-outline">•</span>
                  <span className="text-outline">
                    <ContentText contentKey="field-005" />
                  </span>
                </div>
                <ProductField
                  id="home-13"
                  field="title"
                  tag="h3"
                  className="font-title-md text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2"
                ></ProductField>
              </div>
              <div className="mt-5 flex items-end justify-between price-actions flex-wrap gap-3">
                <div>
                  <span className="block font-label-sm text-label-sm text-outline">
                    <ContentText contentKey="field-010" />
                  </span>
                  <PriceStack productId="home-13">
                    <ProductField
                      id="home-13"
                      field="price"
                      tag="span"
                      className="font-headline-sm text-xl font-extrabold text-sale-crimson"
                    ></ProductField>
                  </PriceStack>
                </div>
                <ContentElement
                  contentKey="field-002"
                  tag="a"
                  className="px-5 py-2.5 rounded-xl bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg font-bold shadow-sm transition-all action-link"
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
