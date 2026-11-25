export const serviceRoutes = {
  hotel: "/khach-san",
  tour: "/tour-hang-ngay",
  combo: "/tour-hang-ngay",
  transfer: "/xe-dua-don",
} as const;

export type ServiceType = keyof typeof serviceRoutes;
export type ServiceSearchParams = Record<string, string | string[] | undefined>;

export function serviceSearchHref(type: ServiceType) {
  return type === "combo"
    ? `${serviceRoutes.combo}?type=combo`
    : serviceRoutes[type];
}

export function isLegacyServiceHref(href: string) {
  return /^\/dich-vu\/?(?:[?#]|$)/.test(href);
}

export function resolveServiceHref(href: string, fallback: string) {
  if (!isLegacyServiceHref(href)) return href;

  const origin = "https://local.invalid";
  const old = new URL(href, origin);
  const selected = old.searchParams.get("type");
  const route =
    selected && Object.hasOwn(serviceRoutes, selected)
      ? serviceSearchHref(selected as ServiceType)
      : fallback;
  const destination = new URL(route, origin);
  old.searchParams.forEach((value, key) =>
    destination.searchParams.set(key, value),
  );
  return (
    destination.pathname + destination.search + (old.hash || destination.hash)
  );
}

export function hasServiceSearch(params: ServiceSearchParams) {
  return ["q", "destination", "date", "returnDate", "guests", "category"].some(
    (key) => typeof params[key] === "string" && params[key].trim() !== "",
  );
}
