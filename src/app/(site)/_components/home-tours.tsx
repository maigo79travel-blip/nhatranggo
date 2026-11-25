"use client";
import { HomeLink } from "./home-link";
import { ContentText, useSiteData } from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";

export function HomeTours() {
  const tours = useSiteData()
    .products.filter((p) => p.type === "tour" && p.active)
    .slice(0, 3);

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
        {tours.map((tour) => {
          const badge =
            (typeof tour.content?.["field-003"]?.value === "string" &&
              tour.content["field-003"].value) ||
            "Bán chạy";
          const bookingsNote =
            (typeof tour.content?.["field-005"]?.value === "string" &&
              tour.content["field-005"].value) ||
            "Khởi hành hàng ngày";

          return (
            <CatalogCard
              key={tour.id}
              className="bg-surface-container-lowest rounded-2xl border border-border-light overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
              productId={tour.id}
              tag="div"
            >
              <div className="relative aspect-[16/10] w-full overflow-hidden">
                <ProductField
                  id={tour.id}
                  field="image"
                  tag="div"
                  className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3 flex items-center gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-gold-amber text-on-tertiary-fixed font-label-sm text-label-sm font-extrabold shadow-sm">
                    {badge}
                  </span>
                </div>
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-body-sm font-body-sm text-on-surface-variant mb-2">
                    <span className="flex items-center gap-1 font-label-md text-label-md font-bold text-rating-star">
                      <span
                        className="material-symbols-outlined text-[16px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"star"}
                      </span>
                      <span className="text-on-surface">{tour.rating}</span>
                    </span>
                    <span className="text-outline">•</span>
                    <span className="text-outline">{bookingsNote}</span>
                  </div>
                  <ProductField
                    id={tour.id}
                    field="title"
                    tag="h3"
                    className="font-title-md text-lg font-extrabold text-on-surface group-hover:text-primary transition-colors leading-snug line-clamp-2"
                  />
                </div>
                <div className="mt-5 flex items-end justify-between price-actions flex-wrap gap-3">
                  <PriceStack productId={tour.id}>
                    <ProductField
                      id={tour.id}
                      field="price"
                      tag="span"
                      className="font-headline-sm text-xl font-extrabold text-sale-crimson"
                    />
                  </PriceStack>
                  <a
                    href="#"
                    data-action="details"
                    className="px-5 py-2.5 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-label-lg text-label-lg font-bold shadow-sm transition-all action-link"
                  >
                    Đặt tour
                  </a>
                </div>
              </div>
            </CatalogCard>
          );
        })}
      </div>
    </section>
  );
}
