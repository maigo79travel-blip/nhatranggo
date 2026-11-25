"use client";
import { useEffect, useState, type FormEvent } from "react";
import type { BookingDraft } from "@/modules/travel/search";
import { nextDate } from "@/modules/travel/search";
import type { Product } from "@/lib/types";
import { money } from "@/lib/types";
import { DialogField } from "./dialog-field";

export function BookingDialogContent({
  product,
  onError,
  initialValues = {},
}: {
  product: Product;
  initialValues?: BookingDraft;
  onError: (msg: string) => void;
}) {
  const [date, setDate] = useState(initialValues.date || "");
  const [busy, setBusy] = useState(false);
  const [success, setSuccess] = useState("");
  const [details, setDetails] = useState<{
    rooms: {
      id: string;
      title: string;
      price: number;
      capacity: number;
      description: string;
      image: string;
    }[];
    departures: { date: string; notes: string }[];
  }>({ rooms: [], departures: [] });
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let live = true;
    setLoading(true);
    void fetch("/api/products/" + encodeURIComponent(product.id))
      .then(async (result) => {
        const body = await result.json();
        if (!result.ok) throw Error(body.error);
        if (live) setDetails(body);
      })
      .catch((error) => {
        if (live) onError(error.message);
      })
      .finally(() => {
        if (live) setLoading(false);
      });
    return () => {
      live = false;
    };
  }, [product.id, onError]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusy(true);
    try {
      const values = Object.fromEntries(
        [...new FormData(event.currentTarget)].filter(
          ([, value]) => value !== "",
        ),
      );
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
          {product.type === "hotel" && !!details.rooms.length && (
            <label className="block">
              Loại phòng
              <select
                name="roomId"
                required
                className="w-full border border-border-default rounded-lg p-2"
              >
                <option value="">Chọn loại phòng</option>
                {details.rooms.map((room) => (
                  <option value={room.id} key={room.id}>
                    {room.title} · {money(room.price)} / đêm · tối đa{" "}
                    {room.capacity} khách
                  </option>
                ))}
              </select>
            </label>
          )}
          {!!details.departures.length && (
            <p className="text-body-md">
              Lịch khởi hành: {details.departures.map((d) => d.date).join(", ")}
            </p>
          )}
          <div className="grid grid-cols-2 gap-3">
            <DialogField
              label={
                product.type === "hotel" ? "Ngày nhận phòng" : "Ngày sử dụng"
              }
              value={date}
              onChange={(e) => setDate(e.target.value)}
              name="date"
              type="date"
              required
              min={new Date().toLocaleDateString("sv-SE", {
                timeZone: "Asia/Ho_Chi_Minh",
              })}
            />
            {product.type === "hotel" && (
              <DialogField
                label="Ngày trả phòng"
                defaultValue={initialValues.returnDate}
                min={date ? nextDate(date) : undefined}
                name="returnDate"
                type="date"
                required
              />
            )}
            {product.type === "transfer" && (
              <DialogField
                label="Giờ đón"
                name="departureTime"
                defaultValue={initialValues.departureTime}
                type="time"
                required
              />
            )}
            <DialogField
              label="Số khách"
              name="guests"
              type="number"
              defaultValue={initialValues.guests ?? 2}
              required
              min="1"
              max="100"
            />
          </div>
          <label className="block text-body-sm">
            Ghi chú (số phòng, điểm đón, giờ đón)
            <textarea
              name="notes"
              defaultValue={initialValues.notes}
              maxLength={2000}
              className="block w-full border border-border-default rounded-lg p-2 mt-1"
            />
          </label>
          <p className="text-body-sm text-on-surface-variant">
            Đây là yêu cầu tư vấn. Nhân viên sẽ xác nhận chỗ trống và tổng giá
            trước khi thanh toán.
          </p>
          <button
            disabled={busy || loading}
            className="w-full py-3 rounded-xl bg-primary text-white font-bold disabled:opacity-50"
          >
            {busy ? "Đang gửi…" : "Gửi yêu cầu đặt chỗ"}
          </button>
        </form>
      )}
    </>
  );
}
