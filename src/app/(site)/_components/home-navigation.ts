import "server-only";
import { getPublicLocale, getSiteContent } from "@/lib/catalog";
import { findHomeSearchTypes } from "@/modules/travel/public-products";
import { serviceSearchHref } from "@/modules/travel/service-routes";

const suggestions = [
  {
    contentKey: "home.attributes-003",
    title: "home.text-060",
    query: "Bãi Dài",
    type: "hotel",
  },
  {
    contentKey: "home.attributes-004",
    title: "home.text-061",
    query: "3 Đảo",
    type: "tour",
  },
  {
    contentKey: "home.attributes-005",
    title: "home.text-062",
    query: "VinWonders",
    type: "tour",
  },
  {
    contentKey: "home.attributes-006",
    title: "home.text-063",
    query: "Phú Quốc",
    type: "combo",
  },
] as const;

const destinationSlots = [
  {
    contentKey: "home.attributes-010",
    image: "home.attributes-011",
    title: "home.text-109",
    detail: "home.text-110",
  },
  {
    contentKey: "home.attributes-012",
    image: "home.attributes-013",
    title: "home.text-112",
    detail: "home.text-113",
  },
  {
    contentKey: "home.attributes-014",
    image: "home.attributes-015",
    title: "home.text-115",
    detail: "home.text-116",
  },
  {
    contentKey: "home.attributes-016",
    image: "home.attributes-017",
    title: "home.text-118",
    detail: "home.text-119",
  },
  {
    contentKey: "home.attributes-018",
    image: "home.attributes-019",
    title: "home.text-121",
    detail: "home.text-122",
  },
] as const;

const destinationPriority = ["hotel", "tour", "combo"] as const;

export type HomeSuggestion = {
  contentKey: string;
  title: string;
  href: string;
};
export type HomeDestination = HomeSuggestion & {
  image: string;
  detail: string;
};

function destinationHref(
  type: (typeof destinationPriority)[number],
  query: string,
) {
  const href = serviceSearchHref(type);
  return (
    href + (href.includes("?") ? "&" : "?") + new URLSearchParams({ q: query })
  );
}

export async function getHomeNavigation(): Promise<{
  suggestions: HomeSuggestion[];
  destinations: HomeDestination[];
}> {
  const [locale, content] = await Promise.all([
    getPublicLocale(),
    getSiteContent("home"),
  ]);
  const destinations = destinationSlots.flatMap((slot) => {
    const title = content[slot.title]?.value;
    const query = typeof title === "string" ? title.trim() : "";
    return query && query.length <= 150 ? [{ ...slot, query }] : [];
  });
  const queries = [
    ...new Set([
      ...suggestions.map((item) => item.query),
      ...destinations.map((item) => item.query),
    ]),
  ];
  const availability = await findHomeSearchTypes(locale, queries);
  return {
    suggestions: suggestions.flatMap(({ contentKey, title, query, type }) =>
      availability.get(query)?.includes(type)
        ? [{ contentKey, title, href: destinationHref(type, query) }]
        : [],
    ),
    destinations: destinations.flatMap(({ query, ...item }) => {
      const type = destinationPriority.find((candidate) =>
        availability.get(query)?.includes(candidate),
      );
      return type ? [{ ...item, href: destinationHref(type, query) }] : [];
    }),
  };
}
