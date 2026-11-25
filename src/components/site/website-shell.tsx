"use client";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter } from "./site-footer";
import { FloatingContacts } from "@/modules/support/floating-contacts";
import { CatalogProvider } from "@/components/catalog";
import { useSiteData } from "@/components/content";
export function WebsiteShell({
  children,
  informationLinks,
}: {
  children: ReactNode;
  informationLinks: ReactNode;
}) {
  const { products } = useSiteData();
  return (
    <CatalogProvider products={products}>
      <SiteHeader />
      {children}
      <SiteFooter informationLinks={informationLinks} />
      <FloatingContacts />
    </CatalogProvider>
  );
}
