"use client";
import type { ReactNode } from "react";
import { useProduct, useSiteData, useT } from "./content";
import { formatMoney } from "@/lib/i18n/format";
export function PriceStack({
  productId,
  children,
  className = "",
}: {
  productId: string;
  children: ReactNode;
  className?: string;
}) {
  const { locale } = useSiteData();
  const product = useProduct(productId);
  return (
    <div
      className={`price-stack flex min-w-0 flex-col items-start gap-0.5 ${className}`}
    >
      {product?.original_price != null &&
        product.original_price > product.price && (
          <span
            data-original-price
            className="block whitespace-nowrap font-body-sm text-body-sm text-on-surface-variant line-through"
          >
            {formatMoney(product.original_price, locale)}
          </span>
        )}
      <div>{children}</div>
    </div>
  );
}

export function ProductDiscount({
  productId,
  className,
}: {
  productId: string;
  className?: string;
}) {
  const t = useT();
  const product = useProduct(productId);
  if (!product?.original_price || product.original_price <= product.price)
    return null;
  const percent = Math.round(
    (1 - product.price / product.original_price) * 100,
  );
  return percent > 0 ? (
    <span className={className}>
      {t.home.dealBadgePrefix} {percent}%
    </span>
  ) : null;
}
