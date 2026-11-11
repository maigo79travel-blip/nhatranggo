"use client";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter, ContactButtons } from "./site-footer";
import { CatalogProvider } from "./catalog";
import { useSiteData } from "./content";
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
      <ContactButtons />
    </CatalogProvider>
  );
}
