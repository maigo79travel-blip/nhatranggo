import { CatalogScope } from "@/components/catalog/catalog-scope";
import { getSiteData } from "@/lib/catalog";
import {
  hasServiceSearch,
  type ServiceSearchParams,
} from "@/modules/travel/service-routes";
import { ServiceSearchResults } from "@/modules/travel/service-search-results";
import { pageMetadata } from "@/lib/page-metadata";
import HotelsPage from "./_components/hotels-page";
import "./hotels.css";

export const generateMetadata = () => pageMetadata("hotels");
export default async function HotelRoute({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}) {
  const params = await searchParams;
  return hasServiceSearch(params) ? (
    <ServiceSearchResults type="hotel" searchParams={params} />
  ) : (
    <CatalogScope data={await getSiteData("hotels")}>
      <HotelsPage />
    </CatalogScope>
  );
}
