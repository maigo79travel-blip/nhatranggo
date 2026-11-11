"use client";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { SiteHeader } from "./site-header";
import { SiteFooter, ContactButtons } from "./site-footer";
import { CatalogProvider } from "./catalog";
import { useSiteData } from "./content";
export function WebsiteShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { products } = useSiteData();
  if (pathname.startsWith("/admin")) return <>{children}</>;
  return (
    <CatalogProvider products={products}>
      <SiteHeader />
      {children}
      <SiteFooter />
      <ContactButtons />
    </CatalogProvider>
  );
}
