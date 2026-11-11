"use client";
import { createElement, type ReactNode } from "react";
import { useCatalog } from "./catalog-context";

export function CatalogCard({
  productId,
  tag,
  children,
  ...props
}: {
  productId: string;
  tag: string;
  children: ReactNode;
  [key: string]: unknown;
}) {
  const c = useCatalog();
  const p = c.products.find((item) => item.id === productId);
  if (!p) return null;

  return createElement(
    tag,
    {
      ...props,
      "data-product-id": productId,
      onClick: (event: React.MouseEvent) => {
        const target = event.target as HTMLElement;
        const action = target.closest("button,a");
        if (!action) return;
        if (
          action.tagName === "BUTTON" ||
          action.getAttribute("href") === "#"
        ) {
          event.preventDefault();
          c.open(p);
        }
      },
    },
    children,
  );
}
