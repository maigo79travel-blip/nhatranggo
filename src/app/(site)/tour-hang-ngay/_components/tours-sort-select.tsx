"use client";

import { useState } from "react";
import { useSiteData } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { sortCatalogCards } from "@/components/catalog/sort-cards";

const sortOptions = [
  { value: "pop", label: "Phổ biến nhất" },
  { value: "price-asc", label: "Giá thấp nhất" },
  { value: "price-desc", label: "Giá cao nhất" },
  { value: "rating", label: "Đánh giá cao nhất" },
] as const;

export function ToursSortSelect() {
  const { products } = useSiteData();
  const [sort, setSort] = useState("pop");

  return (
    <CustomSelect
      ariaLabel="Sắp xếp tour"
      align="right"
      value={sort}
      buttonClassName="px-4 py-2.5 rounded-xl border border-brand-light bg-surface text-on-surface font-label-lg text-label-lg shadow-sm cursor-pointer"
      options={sortOptions}
      onChange={(nextSort) => {
        setSort(nextSort);
        const cards = Array.from(
          document.querySelectorAll<HTMLElement>("[data-product-id]"),
        );
        if (nextSort === "price-desc") {
          const sorted = [...cards].sort((a, b) => {
            const pa =
              products.find((p) => p.id === a.dataset.productId)?.price ?? 0;
            const pb =
              products.find((p) => p.id === b.dataset.productId)?.price ?? 0;
            return pb - pa;
          });
          const parent = cards[0]?.parentElement;
          if (parent) sorted.forEach((card) => parent.appendChild(card));
          return;
        }
        sortCatalogCards(
          cards,
          products,
          nextSort === "price-asc"
            ? "price"
            : nextSort === "rating"
              ? "rating"
              : "recommended",
        );
      }}
    />
  );
}
