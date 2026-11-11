const locales = ["vi", "en", "ru", "ko", "zh"] as const;
export type Locale = (typeof locales)[number];
export function parseLocale(value: unknown): Locale {
  return locales.includes(value as Locale) ? (value as Locale) : "vi";
}
