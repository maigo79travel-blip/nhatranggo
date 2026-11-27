"use client";
import { useT } from "@/components/content";

export function HomeCardRating({
  rating,
  variant,
}: {
  rating: number;
  variant: "hotel" | "tour";
}) {
  const t = useT();
  if (rating <= 0) return null;
  const style =
    variant === "hotel"
      ? "home-hotel-rating text-xl font-bold text-promo-highlight"
      : "text-[22px] font-extrabold text-sale-price";

  return (
    <span className={`shrink-0 whitespace-nowrap leading-[1.4] ${style}`}>
      <span className="sr-only">{t.hotels.ratingAriaPrefix} </span>
      <span aria-hidden="true">★ </span>
      {rating.toFixed(1)}
    </span>
  );
}
