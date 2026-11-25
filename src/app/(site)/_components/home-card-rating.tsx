export function HomeCardRating({
  rating,
  variant,
}: {
  rating: number;
  variant: "hotel" | "tour";
}) {
  const style =
    variant === "hotel"
      ? "home-hotel-rating text-xl font-bold text-promo-highlight"
      : "text-[22px] font-extrabold text-sale-price";

  return (
    <span className={`shrink-0 whitespace-nowrap leading-[1.4] ${style}`}>
      <span className="sr-only">Điểm đánh giá </span>
      <span aria-hidden="true">★ </span>
      {rating.toFixed(1)}
    </span>
  );
}
