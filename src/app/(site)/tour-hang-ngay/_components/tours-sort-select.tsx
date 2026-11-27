"use client";

import { useRouter } from "next/navigation";
import { useT } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import { serviceRoutes } from "@/modules/travel/service-routes";

export function ToursSortSelect() {
  const router = useRouter();
  const t = useT();
  const sortOptions = [
    { value: "recommended", label: t.tours.sort.pop },
    { value: "price", label: t.tours.sort.priceAsc },
    { value: "price-desc", label: t.tours.sort.priceDesc },
    { value: "rating", label: t.tours.sort.rating },
  ];
  return (
    <CustomSelect
      ariaLabel={t.tours.sortLabel}
      align="right"
      buttonClassName="px-4 py-2.5 rounded-xl border border-brand-light bg-surface text-on-surface font-label-lg text-label-lg shadow-sm cursor-pointer"
      defaultValue="recommended"
      options={sortOptions}
      onChange={(sort) =>
        router.push(`${serviceRoutes.tour}?sort=${encodeURIComponent(sort)}`)
      }
    />
  );
}
