import { isPublicImageUrl } from "./content-attributes";

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
