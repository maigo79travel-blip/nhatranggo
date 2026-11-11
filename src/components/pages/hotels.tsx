import { UntemplatedServices } from "@/modules/travel/untemplated-services";
import { HotelsHero } from "./hotels/hotels-hero";
import { HotelsListing } from "./hotels/hotels-listing";
import { HotelsFaq } from "./hotels/hotels-faq";

export default function HotelsPage() {
  return (
    <main className="w-full pt-[116px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <HotelsHero />
        <HotelsListing />
        <UntemplatedServices type="hotel" />
        <HotelsFaq />
      </div>
    </main>
  );
}
