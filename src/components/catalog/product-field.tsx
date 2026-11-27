"use client";
import { createElement, type ReactNode } from "react";
import { formatMoney } from "@/lib/i18n/format";
import { isPublicImageUrl } from "@/lib/content-attributes";
import { useProduct, useContentAttributes, useSiteData } from "@/components/content";

export function ProductField({
  id,
  field,
  tag,
  contentKey,
  ...props
}: {
  id: string;
  field: string;
  tag: string;
  contentKey?: string;
  [key: string]: unknown;
}) {
  const { locale } = useSiteData();
  const p = useProduct(id);
  const attributes = useContentAttributes(contentKey);
  props = { ...props, ...attributes };
  if (!p) return null;

  if (field === "image") {
    if (!isPublicImageUrl(p.image)) return null;
    return tag === "img"
      ? createElement("img", { ...props, src: p.image })
      : createElement(tag, {
          ...props,
          style: {
            ...(props.style as object),
            backgroundImage: `url(${JSON.stringify(p.image)})`,
          },
        });
  }

  return createElement(
    tag,
    { ...props, ...(field === "price" ? { "data-sale-price": true } : {}) },
    field === "price" ? (
      <>
        {formatMoney(p.price, locale)}
        {props.children as ReactNode}
      </>
    ) : (
      p.title
    ),
  );
}
