"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import type { Product } from "@/lib/types";

// Enhances the original controls without replacing their source layouts.
export function ListingFilters({ products }: { products: Product[] }) {
  const pathname = usePathname();
  useEffect(() => {
    const aside = document.querySelector("aside");
    const cards = () =>
      Array.from(document.querySelectorAll<HTMLElement>("[data-product-id]"));
    const filter = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (!aside?.contains(input)) return;
      if (input.type === "range" || input.name === "price-range") {
        let min = 0,
          max = Infinity;
        if (input.type === "range") max = Number(input.value);
        else {
          const index = Array.from(
            aside.querySelectorAll("[name=price-range]"),
          ).indexOf(input);
          [min, max] = [
            [0, 1000000],
            [1000000, 2000000],
            [2000000, 4000000],
            [4000000, Infinity],
          ][index] || [0, Infinity];
        }
        for (const card of cards()) {
          const p = products.find((p) => p.id === card.dataset.productId);
          card.dataset.filterHidden = String(
            !p || p.price < min || p.price > max,
          );
        }
      } else if (input.name === "star-rating") {
        const checked = Array.from(
          aside.querySelectorAll<HTMLInputElement>(
            "[name=star-rating]:checked",
          ),
        ).map((el) => el.closest("label")?.textContent?.match(/[345]/)?.[0]);
        for (const card of cards())
          card.dataset.filterHidden = String(
            !checked.some((n) => card.textContent?.includes(`${n} Sao`)),
          );
      } else if (input.type === "checkbox") {
        // Optional amenities apply individually to the displayed catalog.
        const label = input.closest("label")?.textContent?.toLowerCase() || "";
        const terms = label.includes("trần phú")
          ? ["trần phú"]
          : label.includes("bãi dài")
            ? ["bãi dài", "cam ranh"]
            : label.includes("hồ bơi")
              ? ["hồ bơi", "bể bơi"]
              : label.includes("buffet")
                ? ["buffet", "bữa sáng"]
                : label.includes("spa")
                  ? ["spa"]
                  : label.includes("hủy")
                    ? ["hủy"]
                    : label.includes("biển")
                      ? ["biển"]
                      : [];
        for (const card of cards())
          card.dataset.filterHidden = String(
            input.checked &&
              terms.length > 0 &&
              !terms.some((t) => card.textContent?.toLowerCase().includes(t)),
          );
      }
    };
    const click = (event: MouseEvent) => {
      const button = (event.target as HTMLElement).closest("button");
      if (!button) return;
      if (/Đặt lại/.test(button.textContent || "")) {
        aside?.querySelectorAll<HTMLInputElement>("input").forEach((input) => {
          input.checked = input.defaultChecked;
          input.value = input.defaultValue;
        });
        cards().forEach((card) => (card.dataset.filterHidden = "false"));
      }
    };
    const change = (event: Event) => {
      const select = event.target as HTMLSelectElement;
      if (
        select.tagName !== "SELECT" ||
        !select.querySelector("option[value=pop]")
      )
        return;
      const list = cards().filter(
        (card) =>
          products.find((p) => p.id === card.dataset.productId)
            ?.collection_id === "tours-collection-2",
      );
      const parent = list[0]?.parentElement;
      if (!parent) return;
      list.sort((a, b) => {
        const x = products.find((p) => p.id === a.dataset.productId)!;
        const y = products.find((p) => p.id === b.dataset.productId)!;
        return select.value === "price-desc"
          ? y.price - x.price
          : /price|low|asc/.test(select.value)
            ? x.price - y.price
            : /rating/.test(select.value)
              ? y.rating - x.rating
              : products.indexOf(x) - products.indexOf(y);
      });
      list.forEach((card) => parent.appendChild(card));
    };
    const initialQuery = new URLSearchParams(window.location.search)
      .get("q")
      ?.trim()
      .toLowerCase();
    if (initialQuery && !initialQuery.includes("nha trang, cam ranh"))
      cards().forEach((card) => {
        const p = products.find((p) => p.id === card.dataset.productId);
        card.dataset.filterHidden = String(
          !`${p?.title} ${p?.location}`.toLowerCase().includes(initialQuery),
        );
      });
    document.addEventListener("input", filter);
    document.addEventListener("click", click);
    document.addEventListener("change", change);
    return () => {
      document.removeEventListener("input", filter);
      document.removeEventListener("click", click);
      document.removeEventListener("change", change);
    };
  }, [pathname, products]);
  return null;
}
