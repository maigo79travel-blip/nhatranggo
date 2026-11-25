import { SitePageFrame } from "@/components/site/site-page-frame";
import { pageMetadata } from "@/lib/page-metadata";
import { UntemplatedServices } from "@/modules/travel/untemplated-services";
import { ToursHero } from "./_components/tours-hero";
import { ToursFeatured } from "./_components/tours-featured";
import { ToursDaily } from "./_components/tours-daily";
import { ToursFaq } from "./_components/tours-faq";

export const generateMetadata = () => pageMetadata("tours");

export default function ToursPage() {
  return (
    <SitePageFrame>
      <ToursHero />
      <ToursFeatured />
      <ToursDaily />
      <UntemplatedServices type="tour" />
      <ToursFaq />
    </SitePageFrame>
  );
}
