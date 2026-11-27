import type { Locale } from "@/lib/locale";

const intlLocaleBySiteLocale: Record<Locale, string> = {
  vi: "vi-VN",
  en: "en-US",
  ru: "ru-RU",
  ko: "ko-KR",
  zh: "zh-CN",
};

export function intlLocaleFor(locale: Locale = "vi"): string {
  return intlLocaleBySiteLocale[locale];
}

export function formatMoney(value: number, locale: Locale = "vi"): string {
  const formatted = new Intl.NumberFormat(intlLocaleFor(locale)).format(
    value,
  );
  return locale === "vi" ? `${formatted}đ` : `${formatted} VND`;
}
