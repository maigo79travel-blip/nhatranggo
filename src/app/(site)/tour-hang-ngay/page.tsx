import { CatalogProvider } from "@/components/catalog/catalog-provider";
import { SiteDataProvider } from "@/components/content";
import { PublicPage } from "@/components/site/public-page";
import { PublicEmptyState } from "@/components/site/public-ui";
import { getSiteData } from "@/lib/catalog";
import { getCurrentMessages } from "@/lib/i18n";
import { pageMetadata } from "@/lib/page-metadata";
import { vietnamToday } from "@/modules/travel/search";
import {
  hasServiceSearch,
  type ServiceSearchParams,
} from "@/modules/travel/service-routes";
import { ServiceSearchResults } from "@/modules/travel/service-search-results";
import { TourCards } from "@/modules/travel/tour-cards";
import { TourFilters, TourSortSelect } from "@/modules/travel/tour-filters";
import "@/modules/travel/tour-catalog.css";
import { ToursFaq } from "./_components/tours-faq";

export const generateMetadata = () => pageMetadata("tours");

const hero = { image: "/images/35b38682657b6ce8.jpg" };

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}) {
  const params = await searchParams;
  const type = params.type === "combo" ? "combo" : "tour";
  if (type === "combo" || hasServiceSearch(params)) {
    return (
      <ServiceSearchResults type={type} searchParams={params} hero={hero} />
    );
  }

  const [{ products, destinations, content, locale }, t] = await Promise.all([
    getSiteData("tours"),
    getCurrentMessages(),
  ]);
  const featured = products.slice(0, 3);
  const more = products.slice(3);
  const storedTitle = content["tours.text-012"]?.value;
  const customTitle = typeof storedTitle === "string" ? storedTitle.trim() : "";
  const title =
    customTitle &&
    (locale !== "vi" ||
      customTitle !== "Tour Ghép & Tour Riêng Khởi Hành Hàng Ngày -")
      ? customTitle
      : t.tours.catalogTitle;

  return (
    <PublicPage title={title} hero={hero}>
      <TourFilters destinations={destinations} today={vietnamToday()} />
      <CatalogProvider>
        <section
          className="pt-8 sm:pt-10"
          aria-labelledby="featured-tour-title"
        >
          <div className="mb-4 flex flex-wrap items-end justify-between gap-3 sm:mb-5">
            <h2
              id="featured-tour-title"
              className="text-2xl font-extrabold tracking-tight sm:text-headline-lg"
            >
              {t.tours.featuredTitle}
            </h2>
            <TourSortSelect />
          </div>
          {featured.length ? (
            <TourCards products={featured} />
          ) : (
            <PublicEmptyState heading={t.common.emptySelect}>
              {t.home.noToursAvailable}
            </PublicEmptyState>
          )}
        </section>
        {more.length > 0 && (
          <section className="pt-8 sm:pt-10" aria-labelledby="daily-tour-title">
            <h2
              id="daily-tour-title"
              className="mb-4 text-2xl font-extrabold tracking-tight sm:mb-5 sm:text-headline-lg"
            >
              {t.tours.listTitle}
            </h2>
            <TourCards products={more} />
          </section>
        )}
      </CatalogProvider>
      <SiteDataProvider data={{ content }}>
        <ToursFaq stepsTitle={t.tours.stepsTitle} />
      </SiteDataProvider>
    </PublicPage>
  );
}
