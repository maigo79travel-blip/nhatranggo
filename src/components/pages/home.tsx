import { HomeHero } from "./home/home-hero";
import { HomeFlashDeals } from "./home/home-flash-deals";
import { HomeHotels } from "./home/home-hotels";
import { HomeTours } from "./home/home-tours";
import { HomeTransfers } from "./home/home-transfers";
import { HomeReviews } from "./home/home-reviews";
import { HomeFaq } from "./home/home-faq";

export default function HomePage() {
  return (
    <main className="w-full pt-[76px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <HomeHero />
        <HomeFlashDeals />
        <HomeHotels />
        <HomeTours />
        <HomeTransfers />
        <HomeReviews />
        <HomeFaq />
      </div>
    </main>
  );
}
