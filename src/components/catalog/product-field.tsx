"use client";
import { createElement, type ReactNode } from "react";
import { money } from "@/lib/types";
import { useProduct, useContentAttributes } from "@/components/content";

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
  const p = useProduct(id);
  const attributes = useContentAttributes(contentKey);
  props = { ...props, ...attributes };
  if (!p) return null;

  if (field === "image") {
    return tag === "img"
      ? createElement("img", { ...props, src: p.image })
      : createElement(tag, {
          ...props,
          style: {
            ...(props.style as object),
            backgroundImage: `url('${p.image}')`,
          },
        });
  }

  return createElement(
    tag,
    { ...props, ...(field === "price" ? { "data-sale-price": true } : {}) },
    field === "price" ? (
      <>
        {money(p.price)}
        {props.children as ReactNode}
      </>
    ) : (
      p.title
    ),
  );
}
