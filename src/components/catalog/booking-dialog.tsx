"use client";
import { useState, type FormEvent } from "react";
import type { Product } from "@/lib/types";
import { money } from "@/lib/types";
import { DialogField } from "./dialog-field";

export function BookingDialogContent({
  product,
  onError,
}: {
  product: Product;
  onError: (msg: string) => void;
}) {
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    try {
      const values = Object.fromEntries(new FormData(event.currentTarget));
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          productId: product.id,
        }),
      });
      const result = await res.json();
      if (!res.ok) throw Error(result.error);
      setSuccess(
        `${result.message}\nMã yêu cầu: ${result.id}\nHãy lưu mã này để tra cứu.`,
      );
    } catch (e) {
      onError((e as Error).message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <h3 className="text-title-md mb-2">{product.title}</h3>
      <p className="text-primary font-bold mb-3">
        Giá tham khảo: {money(product.price)} /{" "}
        {product.type === "hotel"
          ? "phòng/đêm"
          : product.type === "transfer"
            ? "chuyến"
            : "người"}
      </p>

      {success ? (
        <div
          role="status"
          className="bg-secondary/10 rounded-xl p-4 whitespace-pre-line"
        >
          {success}
        </div>
      ) : (
        <form className="space-y-3" onSubmit={handleSubmit}>
          <DialogField
            label="Họ và tên"
            name="name"
            autoComplete="name"
            required
            minLength={2}
          />
          <DialogField
            label="Số điện thoại"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            pattern="(0|\+84)[0-9]{9,10}"
          />
          <div className="grid grid-cols-2 gap-3">
            <DialogField
              label="Ngày sử dụng"
              name="date"
              type="date"
              required
              min={new Date().toLocaleDateString("sv-SE", {
                timeZone: "Asia/Ho_Chi_Minh",
              })}
            />
            <DialogField
              label="Số khách"
              name="guests"
              type="number"
              defaultValue="2"
              required
              min="1"
              max="100"
            />
          </div>
          <label className="block text-body-sm">
            Ghi chú (số phòng, điểm đón, giờ đón)
            <textarea
              name="notes"
              maxLength={2000}
              className="block w-full border border-outline-variant rounded-lg p-2 mt-1"
            />
          </label>
          <p className="text-body-sm text-outline">
            Đây là yêu cầu tư vấn. Nhân viên sẽ xác nhận chỗ trống và tổng giá
            trước khi thanh toán.
          </p>
          <button
            disabled={busy}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
          >
            {busy ? "Đang gửi…" : "Gửi yêu cầu đặt chỗ"}
          </button>
        </form>
      )}
    </>
  );
}
