import "server-only";
import { cache } from "react";
import { cookies } from "next/headers";
import { parseLocale, type Locale } from "@/lib/locale";
import type { Messages } from "./types";
import { messagesVi } from "./messages-vi";
import { messagesEn } from "./messages-en";
import { messagesRu } from "./messages-ru";
import { messagesKo } from "./messages-ko";
import { messagesZh } from "./messages-zh";

export type { Messages } from "./types";

const catalog: Record<Locale, Messages> = {
  vi: messagesVi,
  en: messagesEn,
  ru: messagesRu,
  ko: messagesKo,
  zh: messagesZh,
};

export const getPublicLocale = cache(async (): Promise<Locale> =>
  parseLocale((await cookies()).get("site_locale")?.value),
);

export function getMessages(locale: Locale): Messages {
  return catalog[locale] ?? messagesVi;
}

export const getCurrentMessages = cache(async (): Promise<Messages> =>
  getMessages(await getPublicLocale()),
);
