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

export default function TransfersPage() {
  return (
    <SitePageFrame className="transfers-page">
      <TransfersVehicleSelection>
        <TransfersHero />
        <TransfersFareTable />
        <TransfersFleet />
        <TransfersBenefits />
        <TransfersProcess />
      </TransfersVehicleSelection>
    </SitePageFrame>
  );
}
