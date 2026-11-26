"use client";

import { useRouter } from "next/navigation";
import { CustomSelect } from "@/components/ui/custom-select";
import { serviceRoutes } from "@/modules/travel/service-routes";

const sortOptions = [
  { value: "recommended", label: "Phổ biến nhất" },
  { value: "price", label: "Giá thấp nhất" },
  { value: "price-desc", label: "Giá cao nhất" },
  { value: "rating", label: "Đánh giá cao nhất" },
];

export function ToursSortSelect() {
  const router = useRouter();
  return (
    <CustomSelect
      ariaLabel="Sắp xếp tour"
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
