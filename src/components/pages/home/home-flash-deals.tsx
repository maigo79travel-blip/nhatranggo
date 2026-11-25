import Link from "next/link";
import { HomeLink } from "@/modules/home/home-link";
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
    <section id="combo" className="site-container py-12 w-full space-y-6">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold tracking-tight text-on-surface">
            <ContentText contentKey="home.text-080" />
          </h2>
          <div className="w-12 h-1 rounded-full bg-primary mt-2" />
        </div>
        <HomeLink
          contentKey="home.attributes-008"
          href="/dich-vu"
          className="text-secondary hover:text-ocean-deep font-label-lg text-label-lg font-bold flex items-center gap-1"
        >
          <span>Xem tất cả ưu đãi</span>
          <span className="material-symbols-outlined text-[18px]">
            arrow_forward
          </span>
        </HomeLink>
      </div>

      <div className="rounded-3xl bg-gradient-to-br from-primary via-secondary to-ocean-deep p-6 md:p-8 shadow-floating text-on-primary">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-7">
          <div className="min-w-0">
            <h3 className="font-headline-md text-xl sm:text-2xl font-extrabold text-white">
              Khách sạn + tour + vé Vinpearl + vé máy bay
            </h3>
            <p className="font-body-md text-sm text-white/90 mt-1">
              <ContentText contentKey="home.text-081" />
            </p>
          </div>

          <div
            className="flex items-center gap-2 text-center shrink-0"
            id="countdown-timer"
          >
            {[
              { id: "cd-days", val: "home.text-083", label: "home.text-084" },
              { id: "cd-hours", val: "home.text-086", label: "home.text-087" },
              { id: "cd-mins", val: "home.text-089", label: "home.text-090" },
              { id: "cd-secs", val: "home.text-092", label: "home.text-093" },
            ].map((item) => (
              <div
                key={item.id}
                className="bg-surface-container-lowest text-on-surface px-3 py-2 rounded-xl min-w-[54px] shadow-sm"
              >
                <span
                  className="text-lg font-extrabold text-primary block leading-tight"
                  id={item.id}
                >
                  <ContentText contentKey={item.val} />
                </span>
                <span className="text-[10px] text-outline uppercase font-bold">
                  <ContentText contentKey={item.label} />
                </span>
              </div>
            ))}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <HomeLink
          contentKey="home.attributes-007"
          href="/khach-san"
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-ocean-deep to-primary p-6 text-white flex items-center justify-between gap-4 shadow-card hover:shadow-card-hover transition-all group"
        >
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-amber text-on-tertiary-fixed text-[11px] font-extrabold mb-2">
              Giảm đến 30%
            </span>
            <h3 className="text-xl font-extrabold leading-snug">
              Khách sạn view biển đẹp
            </h3>
            <p className="text-sm text-white/90 mt-1">Chỉ từ 1.050.000đ/đêm</p>
          </div>
          <span className="w-10 h-10 rounded-full bg-white text-on-surface flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </span>
        </HomeLink>

        <Link
          href="/tour-hang-ngay"
          className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-secondary to-lagoon-cyan p-6 text-white flex items-center justify-between gap-4 shadow-card hover:shadow-card-hover transition-all group"
        >
          <div>
            <span className="inline-block px-2.5 py-0.5 rounded-full bg-surface-container-lowest text-on-surface text-[11px] font-extrabold mb-2">
              Tour nổi bật
            </span>
            <h3 className="text-xl font-extrabold leading-snug">
              Tour đảo Hòn Mun – Làng Chài
            </h3>
            <p className="text-sm text-white/90 mt-1">Chỉ từ 650.000đ</p>
          </div>
          <span className="w-10 h-10 rounded-full bg-white text-on-surface flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
          </span>
        </Link>
      </div>
    </section>
  );
}
