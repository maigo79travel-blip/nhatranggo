import { isPublicImageUrl } from "./content-attributes";
import type { Locale } from "./locale";
import type { Messages } from "./i18n/types";

export function localizedNavLabel(
  href: string,
  fallback: string,
  locale: Locale,
  nav: Messages["nav"],
) {
  if (locale === "vi") return fallback;
  const byHref: Record<string, string> = {
    "/": nav.home,
    "/xe-dua-don": nav.transfers,
    "/khach-san": nav.hotels,
    "/tour-hang-ngay": nav.tours,
    "/e-visa": nav.evisa,
    "/fast-track": nav.fastTrack,
    "/blog": nav.blog,
    "/tra-cuu": nav.lookup,
    "/lien-he": nav.contact,
  };
  return byHref[href] ?? fallback;
}

export function isNavigationHref(href: string) {
  return isPublicImageUrl(href) || /^#[^\s\\]*$/.test(href);
}

export function navigationItems(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value.filter(
    (item): item is { href: string; label: string } =>
      typeof item?.label === "string" &&
      typeof item?.href === "string" &&
      isNavigationHref(item.href),
  );
}

export function activeNavigationHref(
  items: { href: string }[],
  pathname: string,
  search: Pick<URLSearchParams, "getAll">,
) {
  let active: string | undefined;
  let specificity = -1;
  for (const { href } of items) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    const { pathname: path, searchParams } = new URL(
      href,
      "https://navigation.invalid",
    );
    if (path !== pathname) continue;
    const params = [...searchParams];
    if (params.length <= specificity) continue;
    if (params.every(([key, value]) => search.getAll(key).includes(value))) {
      active = href;
      specificity = params.length;
    }
  }
  return active;
}
