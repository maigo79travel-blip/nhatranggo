"use client";
import type { Product } from "@/lib/types";
import { money } from "@/lib/types";

export function FavoritesDialogContent({
  products,
  favorites,
  favoritesReady,
  onSelectProduct,
}: {
  products: Product[];
  favorites: string[];
  favoritesReady: boolean;
  onSelectProduct: (p: Product) => void;
}) {
  const favoriteProducts = products.filter((p) => favorites.includes(p.id));

  return (
    <div className="space-y-3">
      {!favoritesReady && <p>Đang tải danh sách yêu thích…</p>}
      {favoritesReady && !favoriteProducts.length && (
        <p>
          Bạn chưa lưu dịch vụ nào. Nhấn biểu tượng trái tim trên thẻ để lưu.
        </p>
      )}
      {favoriteProducts.map((p) => (
        <button
          key={p.id}
          className="w-full text-left rounded-xl p-3 bg-surface-container-low"
          onClick={() => onSelectProduct(p)}
        >
          {p.title}
          <span className="block text-primary">{money(p.price)}</span>
        </button>
      ))}
    </div>
  );
}
