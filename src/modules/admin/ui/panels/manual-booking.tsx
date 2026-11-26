"use client";
import { useEffect, useId, useState } from "react";
import { api } from "../api";
import { BookingDialogContent } from "@/components/catalog/booking-dialog";
import { CustomSelect } from "@/components/ui/custom-select";
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
        <span className="ad-field">Dịch vụ</span>
        <CustomSelect
          id={serviceId}
          ariaLabel="Dịch vụ"
          searchable
          searchPlaceholder="Tìm dịch vụ…"
          disabled={loading || !products.length}
          value={id}
          onChange={setId}
          buttonClassName="ad-input cursor-pointer"
          options={[
            {
              value: "",
              label: loading
                ? "Đang tải dịch vụ…"
                : products.length
                  ? "Chọn dịch vụ"
                  : "Không có dịch vụ đang mở",
            },
            ...products.map((p) => ({
              value: p.id,
              label: p.title,
            })),
          ]}
        />
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
