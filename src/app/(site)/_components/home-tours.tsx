"use client";
import { HomeHeading, HomeSectionLink } from "./home-heading";
import { ContentText, useSiteData } from "@/components/content";
import { PriceStack } from "@/components/price-stack";
import { CatalogCard, ProductField } from "@/components/catalog";
import { HomeCardRating } from "./home-card-rating";

export function HomeTours() {
  const tours = useSiteData()
    .products.filter((p) => p.type === "tour" && p.active)
    .slice(0, 3);

  return (
    <section className="site-container w-full py-10 lg:py-[60px]">
      <HomeHeading contentKey="home.text-103">
        <HomeSectionLink
          contentKey="home.attributes-008"
          href="/tour-hang-ngay"
        >
          <ContentText contentKey="home.text-104" />
        </HomeSectionLink>
      </HomeHeading>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
        {tours.map((tour) => {
          const bookingsNote =
            (typeof tour.content?.["field-005"]?.value === "string" &&
              tour.content["field-005"].value) ||
            "Khởi hành hàng ngày";

          return (
            <CatalogCard
              key={tour.id}
              className="group flex min-w-0 flex-col overflow-hidden rounded-[22px] border border-border-subtle bg-white shadow-card transition-shadow hover:shadow-card-hover"
              productId={tour.id}
              tag="div"
            >
              <div className="relative aspect-[2.66] w-full overflow-hidden">
                <ProductField
                  id={tour.id}
                  field="image"
                  tag="img"
                  alt=""
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                />
              </div>
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1">
                    <HomeCardRating rating={tour.rating} variant="tour" />
                    <span className="text-sm font-semibold leading-snug text-on-surface sm:text-base">
                      <span aria-hidden="true">• </span>
                      {bookingsNote}
                    </span>
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
                      className="text-[clamp(1.125rem,2.25vw,1.625rem)] font-extrabold leading-tight text-sale-price"
                    />
                  </PriceStack>
                  <a
                    href="#"
                    data-action="details"
                    className="home-booking-button"
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
