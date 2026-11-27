import "server-only";

import { getSiteContent } from "./catalog";

export async function getPublicPageCopy(
  scope: "fast-track" | "contact" | "lookup" | "blog",
  title: string,
) {
  const copy = await getSiteContent(scope);
  const savedTitle = copy[`${scope}.title`]?.value;
  const intro = copy[`${scope}.intro`]?.value;
  return {
    title:
      typeof savedTitle === "string" && savedTitle.trim() ? savedTitle : title,
    intro: typeof intro === "string" ? intro : "",
  };
}
