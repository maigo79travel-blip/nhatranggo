"use client";
import { useState } from "react";
import { HotelsHero, type HotelSearchState } from "./hotels/hotels-hero";
import { HotelsListing } from "./hotels/hotels-listing";
import { HotelsFaq } from "./hotels/hotels-faq";

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
    <main className="w-full pt-[76px] min-h-screen bg-background">
      <div className="flex flex-col w-full">
        <HotelsHero search={search} onSearch={setSearch} />
        <HotelsListing
          search={search}
          onResetSearch={() => setSearch(initialSearch)}
        />
        <HotelsFaq />
      </div>
    </main>
  );
}
