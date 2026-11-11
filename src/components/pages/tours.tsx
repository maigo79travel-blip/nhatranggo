import { ToursHero } from "./tours/tours-hero";
import { ToursFeatured } from "./tours/tours-featured";
import { ToursDaily } from "./tours/tours-daily";
import { ToursFaq } from "./tours/tours-faq";

export default function ToursPage() {
  return (
    <main className="w-full pt-[116px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <ToursHero />
        <ToursFeatured />
        <ToursDaily />
        <ToursFaq />
      </div>
    </main>
  );
}
