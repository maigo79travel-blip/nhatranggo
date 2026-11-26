import type { Product } from "@/lib/types";

export type BookingDraft = {
  date?: string;
  departureTime?: string;
  returnTime?: string;
  flightNumber?: string;
  maxGuests?: number;
  returnPrice?: number;
  notes?: string;
  returnDate?: string;
  guests?: number;
};
export function normalizeSearch(value: string) {
  return value
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .replace(/\s+/g, " ")
    .trim();
}
export function productSearchBlob(product: Product) {
  return normalizeSearch(
    [
      product.title,
      product.location,
      product.description,
      ...Object.values(product.content || {})
        .filter((entry) => entry.kind === "text")
        .map((entry) => String(entry.value)),
    ].join(" "),
  );
}
export function matchesSearch(value: string, query: string) {
  const terms = query.split(/[,;]/).map(normalizeSearch).filter(Boolean);
  const text = normalizeSearch(value);
  return !terms.length || terms.some((term) => text.includes(term));
}
export function vietnamToday() {
  return new Date().toLocaleDateString("sv-SE", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
}
export function nextDate(value: string) {
  return new Date(new Date(value + "T00:00:00Z").getTime() + 86400000)
    .toISOString()
    .slice(0, 10);
}
export function bookingDraft(
  params: Record<string, string | undefined>,
): BookingDraft {
  const validDate = (date: string | undefined) =>
    Boolean(
      date &&
      /^\d{4}-\d{2}-\d{2}$/.test(date) &&
      !Number.isNaN(Date.parse(date)) &&
      new Date(date).toISOString().slice(0, 10) === date &&
      date >= vietnamToday(),
    );
  const draft: BookingDraft = {};
  if (validDate(params.date)) draft.date = params.date;
  if (
    validDate(params.returnDate) &&
    draft.date &&
    params.returnDate! > draft.date
  )
    draft.returnDate = params.returnDate;
  const guests = Number(params.guests);
  if (Number.isInteger(guests) && guests >= 1 && guests <= 100)
    draft.guests = guests;
  return draft;
}
