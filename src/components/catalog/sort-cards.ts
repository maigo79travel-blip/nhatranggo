import type { Product } from "@/lib/types";

export function sortCatalogCards(
  cards: HTMLElement[],
  products: Product[],
  order: "recommended" | "price" | "price-desc" | "rating",
) {
  const groups = new Map<HTMLElement, HTMLElement[]>();
  const byId = new Map(products.map((product) => [product.id, product]));
  const positions = new Map(
    products.map((product, index) => [product.id, index]),
  );
  for (const card of cards) {
    if (!card.parentElement) continue;
    const group = groups.get(card.parentElement) || [];
    group.push(card);
    groups.set(card.parentElement, group);
  }
  for (const [parent, list] of groups) {
    list.sort((a, b) => {
      const x = byId.get(a.dataset.productId!)!;
      const y = byId.get(b.dataset.productId!)!;
      return order === "price-desc"
        ? y.price - x.price
        : order === "price"
          ? x.price - y.price
          : order === "rating"
            ? y.rating - x.rating
            : positions.get(x.id)! - positions.get(y.id)!;
    });
    list.forEach((card) => parent.appendChild(card));
  }
}
