import { SitePageFrame } from "@/components/site/site-page-frame";
import { HomeHero } from "./_components/home-hero";
import { HomeFlashDeals } from "./_components/home-flash-deals";
import { HomeHotels } from "./_components/home-hotels";
import { HomeTours } from "./_components/home-tours";
import { HomeTransfers } from "./_components/home-transfers";
import { HomeReviews } from "./_components/home-reviews";
import { HomeFaq } from "./_components/home-faq";

export default function HomePage() {
  return (
    <SitePageFrame>
      <HomeHero />
      <HomeFlashDeals />
      <HomeHotels />
      <HomeTours />
      <HomeTransfers />
      <HomeReviews />
      <HomeFaq />
    </SitePageFrame>
  );
}
