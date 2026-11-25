import { CatalogScope } from "@/components/catalog/catalog-scope";
import { getSiteData } from "@/lib/catalog";
import {
  hasServiceSearch,
  type ServiceSearchParams,
} from "@/modules/travel/service-routes";
import { ServiceSearchResults } from "@/modules/travel/service-search-results";
import { SitePageFrame } from "@/components/site/site-page-frame";
import { pageMetadata } from "@/lib/page-metadata";
import { UntemplatedServices } from "@/modules/travel/untemplated-services";
import { ToursHero } from "./_components/tours-hero";
import { ToursFeatured } from "./_components/tours-featured";
import { ToursDaily } from "./_components/tours-daily";
import { ToursFaq } from "./_components/tours-faq";

export const generateMetadata = () => pageMetadata("tours");

export default async function ToursPage({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}) {
  const params = await searchParams;
  const type = params.type === "combo" ? "combo" : "tour";
  if (type === "combo" || hasServiceSearch(params))
    return <ServiceSearchResults type={type} searchParams={params} />;

  return (
    <CatalogScope data={await getSiteData("tours")}>
      <SitePageFrame>
        <ToursHero />
        <ToursFeatured />
        <ToursDaily />
        <UntemplatedServices type="tour" />
        <ToursFaq />
      </SitePageFrame>
    </CatalogScope>
  );
}
