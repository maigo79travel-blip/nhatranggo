import { CatalogScope } from "@/components/catalog/catalog-scope";
import { contentImageUrl } from "@/lib/content-values";
import { getSiteData } from "@/lib/catalog";
import "./home.css";
import { SitePageFrame } from "@/components/site/site-page-frame";
import { HomeHero } from "./_components/home-hero";
import { HomeFlashDeals } from "./_components/home-flash-deals";
import { HomeHotels } from "./_components/home-hotels";
import { HomeTours } from "./_components/home-tours";
import { HomeDestinations } from "./_components/home-destinations";
import { HomeArticles } from "./_components/home-articles";
import { HomeOfferBanner } from "./_components/home-offer-banner";

export default async function HomePage() {
  const data = await getSiteData("home");
  const heroImage = contentImageUrl(
    data.content["home.hero-image"]?.value,
    "/images/figma/hero-beach.png",
  );
  return (
    <CatalogScope data={data}>
      <SitePageFrame className="home-page">
        <HomeHero image={heroImage} />
        <HomeFlashDeals />
        <HomeHotels />
        <HomeTours />
        <HomeDestinations />
        <HomeArticles />
        <HomeOfferBanner />
      </SitePageFrame>
    </CatalogScope>
  );
}
