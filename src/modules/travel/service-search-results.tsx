import {
  serviceSearchHref,
  type ServiceSearchParams,
  type ServiceType,
} from "./service-routes";
import { getPublicDestinations, getPublicLocale } from "@/lib/catalog";
import { getMessages } from "@/lib/i18n";
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
import { TourCards } from "./tour-cards";
import { TourFilters, TourSortSelect } from "./tour-filters";

export async function ServiceSearchResults({
  type,
  searchParams,
  hero,
}: {
  type: ServiceType;
  searchParams: ServiceSearchParams;
  hero?: { image: string };
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
  const isTourCatalog = type === "tour" || type === "combo";
  const filterKey = JSON.stringify(params);
  const filterProps = { params, draft, destinations, today: vietnamToday() };
  function pageHref(next: number) {
    const query = new URLSearchParams(params);
    query.set("page", String(next));
    if (type === "combo") query.set("type", type);
    return serviceSearchHref(type).split("?")[0] + "?" + query;
  }
  return (
    <PublicPage title={t.serviceSearch.titles[type]} hero={hero}>
      {isTourCatalog ? (
        <TourFilters key={filterKey} {...filterProps} type={type} />
      ) : (
        <ServiceFilters
          key={filterKey}
          {...filterProps}
          type={type}
          resetHref={serviceSearchHref(type)}
        />
      )}
      <div className="mb-5 mt-8 flex flex-wrap items-end justify-between gap-3">
        <div>
          {isTourCatalog && (
            <h2 className="text-2xl font-extrabold tracking-tight sm:text-headline-lg">
              {t.tours.resultsHeading}
            </h2>
          )}
          <p
            role="status"
            className={
              isTourCatalog
                ? "mt-1 text-sm text-on-surface-variant"
                : "text-xl font-bold"
            }
          >
            {page > 1 || rows.length > pageSize
              ? t.serviceSearch.paginatedSummaryTemplate
                  .replace("{count}", String(products.length))
                  .replace("{page}", String(page))
              : t.serviceSearch.totalSummaryTemplate.replace(
                  "{count}",
                  String(products.length),
                )}
          </p>
        </div>
        {isTourCatalog && <TourSortSelect type={type} params={params} />}
      </div>
      {(draft.date || draft.guests) && (
        <p className="text-sm text-on-surface-variant leading-relaxed mb-6 flex items-start gap-2">
          <PublicIcon name="info" className="text-lg shrink-0 mt-0.5" />
          {t.serviceSearch.draftNote}
        </p>
      )}
      <CatalogProvider>
        {isTourCatalog ? (
          <TourCards products={products} draft={draft} />
        ) : (
          <ServiceCards products={products} initialValues={draft} />
        )}
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
