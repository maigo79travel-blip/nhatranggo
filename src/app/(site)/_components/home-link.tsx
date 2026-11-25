"use client";
import type { AnchorHTMLAttributes } from "react";
import { useContentAttributes, useSiteData } from "@/components/content";
export function HomeLink({
  contentKey,
  href,
  queryKey,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  contentKey: string;
  href: string;
  queryKey?: string;
}) {
  const attributes = useContentAttributes(contentKey);
  const { content } = useSiteData();
  const configured = typeof attributes.href === "string" ? attributes.href : "";
  const query = queryKey ? String(content[queryKey]?.value || "") : "";
  const fallback =
    href +
    (query
      ? (href.includes("?") ? "&" : "?") + "q=" + encodeURIComponent(query)
      : "");
  return (
    <a
      {...props}
      {...attributes}
      href={configured && configured !== "#" ? configured : fallback}
    >
      {children}
    </a>
  );
}
