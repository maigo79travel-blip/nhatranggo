import { TransfersHero } from "./transfers/transfers-hero";
import { TransfersFareTable } from "./transfers/transfers-fare-table";
import { TransfersFleet } from "./transfers/transfers-fleet";
import { TransfersBenefits } from "./transfers/transfers-benefits";
import { TransfersProcess } from "./transfers/transfers-process";

export default function TransfersPage() {
  return (
    <main className="w-full pt-[116px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <TransfersHero />
        <TransfersFareTable />
        <TransfersFleet />
        <TransfersBenefits />
        <TransfersProcess />
      </div>
    </main>
  );
}
