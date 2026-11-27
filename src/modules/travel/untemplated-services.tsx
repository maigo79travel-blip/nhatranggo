"use client";
import { useSiteData, useT } from "@/components/content";
import { ServiceCards } from "./catalog-list";
export function UntemplatedServices({ type }: { type: string }) {
  const t = useT();
  const products = useSiteData().products.filter(
    (p) => p.type === type && !p.collection_id,
  );
  if (!products.length) return null;
  return (
    <section className="site-container py-8">
      <h2 className="text-headline-md font-bold mb-5">
        {t.serviceSearch.newServicesTitle}
      </h2>
      <ServiceCards products={products} />
    </section>
  );
}
