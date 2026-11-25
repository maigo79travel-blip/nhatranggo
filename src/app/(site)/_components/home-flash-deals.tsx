import Link from "next/link";
import {
  CatalogCollection,
  ContentElement,
  ContentText,
  ProductValue,
} from "@/components/content";
import { CatalogCard, ProductField } from "@/components/catalog";
import { PriceStack } from "@/components/price-stack";
import { HomeHeading, HomeSectionLink } from "./home-heading";

const comboTemplates = [
  { id: "home-1", badge: "bg-promo-highlight text-on-surface" },
  { id: "home-2", badge: "bg-sale-badge text-on-sale" },
  { id: "home-3", badge: "bg-primary text-white" },
];

const offers = [
  {
    href: "/khach-san",
    image: "offer-hotel",
    title: "Khách sạn view biển đẹp",
    action: "Xem khách sạn",
  },
  {
    href: "/tour-hang-ngay",
    image: "offer-tour",
    title: "Tour đảo Hòn Mun – Làng Chài",
    action: "Xem tour đảo",
  },
];

export function HomeFlashDeals() {
  return (
    <section
      id="combo"
      className="site-container w-full bg-surface-muted pt-3 pb-10 lg:pb-12"
    >
      <Link
        href="/tra-cuu"
        className="mb-7 inline-flex min-h-11 flex-wrap items-center gap-x-2 gap-y-1 rounded-3xl bg-white px-4 py-2 text-sm text-on-surface-variant shadow-card hover:text-primary lg:mb-[42px] lg:rounded-full"
      >
        <span
          className="material-symbols-outlined text-[19px] text-primary"
          aria-hidden="true"
        >
          bolt
        </span>
        <span>Đã gửi yêu cầu đặt chỗ?</span>
        <strong className="text-primary">Tra cứu booking</strong>
      </Link>
      <HomeHeading contentKey="home.text-080">
        <HomeSectionLink
          contentKey="home.attributes-008"
          href="/tour-hang-ngay?type=combo"
        >
          Xem tất cả ưu đãi
        </HomeSectionLink>
      </HomeHeading>

      <div className="rounded-[28px] bg-gradient-to-b from-primary via-primary via-30% to-brand-light p-4 text-on-primary sm:p-6 lg:p-[30px]">
        <div className="flex flex-col justify-center lg:min-h-28">
          <h3 className="text-xl font-extrabold leading-snug text-white sm:text-2xl lg:text-[30px]">
            Khách sạn + tour + vé Vinpearl + vé máy bay
          </h3>
          <p className="mt-1 text-sm text-white">
            <ContentText contentKey="home.text-081" />
          </p>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:mt-[30px] lg:grid-cols-3 lg:gap-5">
          <CatalogCollection collectionId="home-collection-1">
            {comboTemplates.map(({ id, badge }) => (
              <CatalogCard
                key={id}
                productId={id}
                tag="article"
                className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted text-on-surface xl:min-h-[375px]"
              >
                <div className="relative aspect-[2.58] overflow-hidden">
                  <ProductField
                    contentKey="field-001"
                    id={id}
                    field="image"
                    tag="img"
                    alt=""
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                  />
                  <span
                    className={`absolute top-3 left-4 rounded-full px-4 py-2 text-xs font-extrabold ${badge}`}
                  >
                    <ContentText contentKey="field-003" />
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3 px-4 py-4 lg:px-5">
                  <div className="flex items-start justify-between gap-2">
                    <ProductField
                      id={id}
                      field="title"
                      tag="h3"
                      className="line-clamp-2 text-lg font-extrabold leading-snug"
                    />
                    <span
                      className="mt-1 shrink-0 text-xs font-extrabold text-sale-price"
                      aria-label="Đánh giá"
                    >
                      <span aria-hidden="true">★ </span>
                      <ProductValue id={id} field="rating" />
                    </span>
                  </div>
                  <div className="space-y-1 text-sm text-on-surface-variant">
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[16px] text-primary"
                        aria-hidden="true"
                      >
                        check
                      </span>
                      <span>
                        <ContentText contentKey="field-004" /> ·{" "}
                        <ContentText contentKey="field-005" />
                      </span>
                    </div>
                    <p className="line-clamp-2">
                      <ProductValue id={id} field="description" />
                    </p>
                  </div>
                  <div className="price-actions mt-auto flex flex-wrap items-end justify-between gap-2">
                    <PriceStack productId={id}>
                      <ProductField
                        id={id}
                        field="price"
                        tag="span"
                        className="text-[22px] font-extrabold leading-tight text-sale-price"
                      />
                    </PriceStack>
                    <ContentElement
                      contentKey="field-002"
                      tag="a"
                      className="home-booking-button"
                      data-action="details"
                    >
                      <ContentText contentKey="field-007" />
                    </ContentElement>
                  </div>
                </div>
              </CatalogCard>
            ))}
          </CatalogCollection>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {offers.map(({ href, image, title, action }) => (
          <Link
            key={href}
            href={href}
            className="group relative isolate flex min-h-[148px] flex-col items-start justify-between overflow-hidden rounded-[22px] bg-on-surface p-5 text-white sm:p-7 lg:min-h-[199px]"
          >
            <img
              src={`/images/figma/home/${image}.webp`}
              alt=""
              loading="lazy"
              className={`absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105 ${image === "offer-tour" ? "object-[center_20%]" : ""}`}
            />
            <span
              aria-hidden="true"
              className="absolute inset-0 -z-10 bg-gradient-to-r from-on-surface/95 via-on-surface/50 to-on-surface/5"
            />
            <h3 className="max-w-[17ch] text-xl font-extrabold leading-snug">
              {title}
            </h3>
            <span className="text-sm font-bold">{action}</span>
            <span
              className="absolute right-5 bottom-5 grid h-11 w-11 place-items-center rounded-full bg-white text-on-surface sm:right-7 sm:bottom-7"
              aria-hidden="true"
            >
              <span className="material-symbols-outlined text-[20px]">
                arrow_forward
              </span>
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
