export const homeProductLimits = { hotel: 6, tour: 3, combo: 3 } as const;

export const homeHotelFilters = [
  "all",
  "near-beach",
  "family",
  "resort",
  "special-deal",
] as const;

export type HomeHotelFilter = (typeof homeHotelFilters)[number];

export const homeHotelTerms = {
  "near-beach": [
    "gần biển",
    "sát biển",
    "bãi biển",
    "bờ biển",
    "bãi dài",
    "trần phú",
    "beach",
  ],
  family: [
    "gia đình",
    "trẻ em",
    "cho bé",
    "dưới 12",
    "water park",
    "cinema",
    "căn hộ",
  ],
  resort: ["resort"],
} as const;
