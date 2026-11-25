import "./home.css";
import { SitePageFrame } from "@/components/site/site-page-frame";
import { HomeHero } from "./_components/home-hero";
import { HomeFlashDeals } from "./_components/home-flash-deals";
import { HomeHotels } from "./_components/home-hotels";
import { HomeTours } from "./_components/home-tours";
import { HomeDestinations } from "./_components/home-destinations";
import { HomeArticles } from "./_components/home-articles";
import { HomeOfferBanner } from "./_components/home-offer-banner";

export default function HomePage() {
  return (
    <SitePageFrame className="home-page">
      <HomeHero />
      <HomeFlashDeals />
      <HomeHotels />
      <HomeTours />
      <HomeDestinations />
      <HomeArticles />
      <HomeOfferBanner />
    </SitePageFrame>
  );
}
