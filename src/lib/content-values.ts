import brand from "@/config/brand.json";
import type { ContentEntry } from "./types";
import { isPublicImageUrl } from "./content-attributes";

export function contentImageUrl(value: unknown, fallback: string) {
  const source = (value as { src?: unknown } | null)?.src;
  return typeof source === "string" && isPublicImageUrl(source)
    ? source
    : fallback;
}

export function contactInfo(
  content: Record<string, ContentEntry>,
): Record<string, string> {
  const value = content["site.contact"]?.value;
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};
  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, string] => typeof entry[1] === "string",
    ),
  );
}

export function resolveContent(
  value: unknown,
  contact: Record<string, string>,
): unknown {
  if (typeof value === "string")
    return value.replace(
      /\{\{(contact|brand)\.([a-zA-Z]+)\}\}/g,
      (_, group, key) =>
        group === "contact"
          ? contact[key] || ""
          : brand[key as keyof typeof brand] || "",
    );
  if (Array.isArray(value))
    return value.map((entry) => resolveContent(entry, contact));
  if (value && typeof value === "object")
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [
        key,
        resolveContent(entry, contact),
      ]),
    );
  return value;
}
