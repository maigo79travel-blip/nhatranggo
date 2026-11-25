import { TransfersHero } from "./transfers/transfers-hero";
import { TransfersFareTable } from "./transfers/transfers-fare-table";

export default function TransfersPage() {
  return (
    <main className="w-full pt-[76px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <TransfersHero />
        <TransfersFareTable />
      </div>
    </main>
  );
}
