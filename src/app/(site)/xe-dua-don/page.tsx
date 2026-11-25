import { CatalogScope } from "@/components/catalog/catalog-scope";
import { getSiteData } from "@/lib/catalog";
import {
  hasServiceSearch,
  type ServiceSearchParams,
} from "@/modules/travel/service-routes";
import { ServiceSearchResults } from "@/modules/travel/service-search-results";
import { SitePageFrame } from "@/components/site/site-page-frame";
import { pageMetadata } from "@/lib/page-metadata";
import { TransfersHero } from "./_components/transfers-hero";
import { TransfersFareTable } from "./_components/transfers-fare-table";
import { TransfersFleet } from "./_components/transfers-fleet";
import { TransfersBenefits } from "./_components/transfers-benefits";
import { TransfersProcess } from "./_components/transfers-process";

import { TransfersVehicleSelection } from "./_components/transfers-vehicle-selection";
import "./transfers.css";

export const generateMetadata = () => pageMetadata("transfers");

export default async function TransfersPage({
  searchParams,
}: {
  searchParams: Promise<ServiceSearchParams>;
}) {
  const params = await searchParams;
  if (hasServiceSearch(params))
    return <ServiceSearchResults type="transfer" searchParams={params} />;

  return (
    <CatalogScope data={await getSiteData("transfers")}>
      <SitePageFrame className="transfers-page">
        <TransfersVehicleSelection>
          <TransfersHero />
          <TransfersFareTable />
          <TransfersFleet />
          <TransfersBenefits />
          <TransfersProcess />
        </TransfersVehicleSelection>
      </SitePageFrame>
    </CatalogScope>
  );
}
