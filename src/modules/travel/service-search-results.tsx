import {
  serviceSearchHref,
  type ServiceSearchParams,
  type ServiceType,
} from "./service-routes";
import { getPublicDestinations, getPublicLocale } from "@/lib/catalog";
import { z } from "zod";
import Link from "next/link";
import {
  catalogSorts,
  hotelCategories,
  tourCategories,
} from "./search-options";
import { PublicPage } from "@/components/site/public-page";
import { PublicEmptyState, PublicIcon } from "@/components/site/public-ui";
import { CatalogProvider } from "@/components/catalog";
import { listPublicProducts } from "./public-products";
import { ServiceCards } from "./catalog-list";
import { ServiceFilters } from "./service-filters";
import { bookingDraft, vietnamToday } from "./search";
import { getMessages } from "@/lib/i18n";

export async function ServiceSearchResults({
  type,
  searchParams,
}: {
  type: ServiceType;
  searchParams: ServiceSearchParams;
}) {
  const params = Object.fromEntries(
    Object.entries(searchParams).map(([key, value]) => [
      key,
      typeof value === "string" ? value.trim().slice(0, 150) : "",
    ]),
  );
  const draft = bookingDraft(params);
  const locale = await getPublicLocale();
  const t = getMessages(locale);
  const categories =
    type === "tour" ? tourCategories : type === "hotel" ? hotelCategories : {};
  const categoryTerms = Object.hasOwn(categories, params.category)
    ? (categories as Record<string, readonly string[]>)[params.category]
    : undefined;
  const sort = z.enum(catalogSorts).safeParse(params.sort);
  const destination = z.uuid().safeParse(params.destination);
  const page =
    z.coerce.number().int().min(1).max(1000).safeParse(params.page).data ?? 1;
  const pageSize = 24;
  const [rows, destinations] = await Promise.all([
    listPublicProducts({
      locale,
      types: [type],
      query: params.q,
      categoryTerms,
      destination: destination.data,
      sort: sort.data,
      date: draft.date,
      guests: draft.guests,
      limit: pageSize + 1,
      offset: (page - 1) * pageSize,
    }),
    getPublicDestinations(),
  ]);
  const products = rows.slice(0, pageSize);
  function pageHref(next: number) {
    const query = new URLSearchParams(params);
    query.set("page", String(next));
    if (type === "combo") query.set("type", type);
    return serviceSearchHref(type).split("?")[0] + "?" + query;
  }
  return (
    <PublicPage title={t.serviceSearch.titles[type]}>
      <ServiceFilters
        key={JSON.stringify(params)}
        type={type}
        params={params}
        resetHref={serviceSearchHref(type)}
        draft={draft}
        destinations={destinations}
        today={vietnamToday()}
      />
      <p role="status" className="text-xl font-bold mt-8 mb-5">
        {page > 1 || rows.length > pageSize
          ? t.serviceSearch.paginatedSummaryTemplate
              .replace("{count}", String(products.length))
              .replace("{page}", String(page))
          : t.serviceSearch.totalSummaryTemplate.replace(
              "{count}",
              String(products.length),
            )}
      </p>
      {(draft.date || draft.guests) && (
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex items-start gap-2">
          <PublicIcon name="info" className="text-lg shrink-0 mt-0.5" />
          {t.serviceSearch.draftNote}
        </p>
      )}
      <CatalogProvider>
        <ServiceCards products={products} initialValues={draft} />
      </CatalogProvider>
      {(page > 1 || rows.length > pageSize) && (
        <nav
          className="mt-6 flex gap-4"
          aria-label={t.serviceSearch.paginationAria}
        >
          {page > 1 && (
            <Link href={pageHref(page - 1)}>{t.common.prevPage}</Link>
          )}
          {rows.length > pageSize && (
            <Link href={pageHref(page + 1)}>{t.common.nextPage}</Link>
          )}
        </nav>
      )}
      {!products.length && (
        <PublicEmptyState heading={t.common.emptySelect}>
          {t.serviceSearch.emptyHint}
        </PublicEmptyState>
      )}
    </PublicPage>
  );
}
