export const contentAttributeKeys = new Set([
  "href",
  "src",
  "alt",
  "title",
  "placeholder",
  "defaultValue",
  "value",
  "aria-label",
  "data-alt",
  "data-location",
  "backgroundImage",
]);

export function isPublicImageUrl(value: string) {
  if (!value || value !== value.trim() || /[\\\x00-\x1f\x7f]/.test(value))
    return false;
  if (value.startsWith("/")) return !value.startsWith("//");
  if (!/^https?:\/\//i.test(value)) return false;
  try {
    const url = new URL(value);
    return Boolean(url.hostname) && !url.username && !url.password;
  } catch {
    return false;
  }
}

export function isPublicLink(value: string) {
  return (
    isPublicImageUrl(value) ||
    /^(?:#[^\\\x00-\x1f\x7f]*|(?:tel|mailto):[^\s\\\x00-\x1f\x7f]+)$/i.test(
      value,
    )
  );
}

export function isPublicBackgroundImage(value: string) {
  const parts = /^url\((?:"([^"]+)"|'([^']+)'|([^'")\s]+))\)$/.exec(value);
  return parts ? isPublicImageUrl(parts[1] ?? parts[2] ?? parts[3]) : false;
}
