"use client";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { useContentAttributes, useSiteData } from "@/components/content";
import { resolveServiceHref } from "@/modules/travel/service-routes";
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
    <Link
      {...props}
      {...attributes}
      href={
        configured && configured !== "#"
          ? resolveServiceHref(configured, fallback)
          : fallback
      }
    >
      {children}
    </Link>
  );
}
