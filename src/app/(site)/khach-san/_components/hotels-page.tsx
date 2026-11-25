"use client";
import { SitePageFrame } from "@/components/site/site-page-frame";
import { useState } from "react";
import { HotelsHero, type HotelSearchState } from "./hotels-hero";
import { HotelsListing } from "./hotels-listing";
import { HotelsFaq } from "./hotels-faq";

const initialSearch: HotelSearchState = {
  query: "",
  checkIn: "",
  checkOut: "",
  guests: "2",
  category: "all",
};

export default function HotelsPage() {
  const [search, setSearch] = useState<HotelSearchState>(initialSearch);

  return (
    <SitePageFrame>
      <HotelsHero search={search} onSearch={setSearch} />
      <HotelsListing
        search={search}
        onResetSearch={() => setSearch(initialSearch)}
      />
      <HotelsFaq />
    </SitePageFrame>
  );
}
