"use client";
import { useEffect, useId, useState } from "react";
import { api } from "../api";
import { BookingDialogContent } from "@/components/catalog/booking-dialog";
import type { Product } from "@/lib/types";
export function ManualBooking({ onSaved }: { onSaved: (id: string) => void }) {
  const serviceId = useId();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [id, setId] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    void api("products?bookable=1")
      .then((data) => {
        if (live) setProducts(data.data);
      })
      .catch((e) => {
        if (live) setError(e.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, []);
  const product = products.find((p) => p.id === id);
  return (
    <div className="space-y-4">
      <div>
        <label className="ad-field" htmlFor={serviceId}>
          Dịch vụ
        </label>
        <select
          id={serviceId}
          className="ad-input"
          disabled={loading || !products.length}
          value={id}
          onChange={(e) => setId(e.target.value)}
        >
          <option value="">
            {loading
              ? "Đang tải dịch vụ…"
              : products.length
                ? "Chọn dịch vụ"
                : "Không có dịch vụ đang mở"}
          </option>
          {products.map((p) => (
            <option value={p.id} key={p.id}>
              {p.title}
            </option>
          ))}
        </select>
      </div>
      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
      {product && (
        <BookingDialogContent
          key={id}
          product={product}
          onError={setError}
          submitBooking={async (values) => {
            setError("");
            const { data } = await api("bookings", "POST", values);
            onSaved(data.id);
            return data;
          }}
        />
      )}
    </div>
  );
}
