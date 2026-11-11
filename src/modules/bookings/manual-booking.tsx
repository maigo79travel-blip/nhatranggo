"use client";
import { useEffect, useState } from "react";
import { api } from "@/components/admin/api";
import { BookingDialogContent } from "@/components/catalog/booking-dialog";
import type { Product } from "@/lib/types";
export function ManualBooking() {
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    void api("products")
      .then((data) => {
        if (live) setProducts(data.data.filter((p: Product) => p.active));
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, []);
  const product = products.find((p) => p.id === id);
  return (
    <div className="space-y-4">
      <label className="block">
        Dịch vụ
        <select
          className="ad-input"
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          <option value="">Chọn dịch vụ</option>
          {products.map((p) => (
            <option value={p.id} key={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </label>
      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
      {product && (
        <BookingDialogContent key={id} product={product} onError={setError} />
      )}
    </div>
  );
}
