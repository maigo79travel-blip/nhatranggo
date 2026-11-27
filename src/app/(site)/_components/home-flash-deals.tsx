import Link from "next/link";
import { getCurrentMessages } from "@/lib/i18n";
import { CatalogCard, ProductField } from "@/components/catalog";
import { PriceStack, ProductDiscount } from "@/components/price-stack";
import type { Product } from "@/lib/types";
import {
  serviceRoutes,
  serviceSearchHref,
} from "@/modules/travel/service-routes";
import { HomeHeading, HomeSectionLink } from "./home-heading";
import { HomeCardRating } from "./home-card-rating";

export async function HomeFlashDeals({ products }: { products: Product[] }) {
  const t = await getCurrentMessages();
  const combos = products.filter((product) => product.type === "combo");
  const offers = [
    {
      type: "hotel",
      title: t.home.offerHotelTitle,
      action: t.home.offerHotelAction,
    },
    {
      type: "tour",
      title: t.home.offerTourTitle,
      action: t.home.offerTourAction,
    },
  ] as const;

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
        <span>{t.home.lookupBannerPrefix}</span>
        <strong className="text-primary">{t.home.lookupBannerAction}</strong>
      </Link>

      {!!combos.length && (
        <>
          <HomeHeading contentKey="home.text-080">
            <HomeSectionLink href={serviceSearchHref("combo")}>
              {t.home.viewAllDeals}
            </HomeSectionLink>
          </HomeHeading>
          <div className="rounded-[28px] bg-gradient-to-b from-primary via-primary via-30% to-brand-light p-4 sm:p-6 lg:p-[30px]">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
              {combos.map((product) => (
                <CatalogCard
                  key={product.id}
                  productId={product.id}
                  tag="article"
                  className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface-muted text-on-surface"
                >
                  <div className="relative aspect-[2.58] overflow-hidden bg-surface-tinted">
                    <ProductField
                      id={product.id}
                      field="image"
                      tag="img"
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                    />
                    <ProductDiscount
                      productId={product.id}
                      className="absolute top-3 left-4 rounded-full bg-promo-highlight px-4 py-2 text-xs font-extrabold"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-4 lg:px-5">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="line-clamp-2 text-lg font-extrabold leading-snug">
                        {product.title}
                      </h3>
                      <HomeCardRating rating={product.rating} variant="tour" />
                    </div>
                    {product.description && (
                      <p className="line-clamp-2 text-sm text-on-surface-variant">
                        {product.description}
                      </p>
                    )}
                    <div className="price-actions mt-auto flex flex-wrap items-end justify-between gap-2">
                      <PriceStack productId={product.id}>
                        <ProductField
                          id={product.id}
                          field="price"
                          tag="span"
                          className="text-[22px] font-extrabold leading-tight text-sale-price"
                        />
                      </PriceStack>
                      <button type="button" className="home-booking-button">
                        {t.home.bookCombo}
                      </button>
                    </div>
                  </div>
                </CatalogCard>
              ))}
            </div>
          </div>
        </>
      )}

      <div className="mt-6 grid grid-cols-1 gap-3 md:grid-cols-2">
        {offers.map(({ type, title, action }) => {
          const product = products.find((item) => item.type === type);
          if (!product) return null;
          return (
            <Link
              key={type}
              href={serviceRoutes[type]}
              className="group relative isolate flex min-h-[148px] flex-col items-start justify-between overflow-hidden rounded-[22px] bg-on-surface p-5 text-white sm:p-7 lg:min-h-[199px]"
            >
              <ProductField
                id={product.id}
                field="image"
                tag="img"
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
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
          );
        })}
      </div>
    </section>
  );
}
