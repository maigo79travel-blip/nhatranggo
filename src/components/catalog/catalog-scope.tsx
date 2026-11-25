import type { ReactNode } from "react";
import type { SiteData } from "@/lib/types";
import { SiteDataProvider } from "@/components/content";
import { CatalogProvider } from "./catalog-provider";

export function CatalogScope({
  data,
  children,
}: {
  data: SiteData;
  children: ReactNode;
}) {
  return (
    <SiteDataProvider data={data}>
      <CatalogProvider products={data.products}>{children}</CatalogProvider>
    </SiteDataProvider>
  );
}
