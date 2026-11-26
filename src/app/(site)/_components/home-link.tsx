"use client";
import type { AnchorHTMLAttributes } from "react";
import Link from "next/link";
import { useContentAttributes } from "@/components/content";
import { resolveServiceHref } from "@/modules/travel/service-routes";
export function HomeLink({
  contentKey,
  href,
  children,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  contentKey?: string;
  href: string;
}) {
  const attributes = useContentAttributes(contentKey);
  const configured = typeof attributes.href === "string" ? attributes.href : "";
  return (
    <Link
      {...props}
      {...attributes}
      href={
        configured && configured !== "#"
          ? resolveServiceHref(configured, href)
          : href
      }
    >
      {children}
    </Link>
  );
}
