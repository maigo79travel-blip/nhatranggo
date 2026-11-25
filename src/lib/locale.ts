import { z } from "zod";

export const localeSchema = z.enum(["vi", "en", "ru", "ko", "zh"]);
export type Locale = z.infer<typeof localeSchema>;

const labels: Record<Locale, string> = {
  vi: "Tiếng Việt",
  en: "English",
  ru: "Русский",
  ko: "한국어",
  zh: "中文",
};

export const localeOptions = localeSchema.options.map((value) => ({
  value,
  label: labels[value],
}));

export function parseLocale(value: unknown): Locale {
  return localeSchema.safeParse(value).data ?? "vi";
}
