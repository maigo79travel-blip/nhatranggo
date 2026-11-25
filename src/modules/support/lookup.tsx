"use client";
import { useState } from "react";
import { DialogField } from "@/components/catalog/dialog-field";
import Link from "next/link";
import { PublicIcon } from "@/components/site/public-ui";
import { SupportGuide } from "./support-guide";
export function BookingLookup() {
  const [data, setData] = useState<Record<string, unknown> | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <div className="public-form-layout">
      <div className="space-y-6 min-w-0">
        <form
          className="public-form public-form-card"
          aria-busy={busy}
          onSubmit={async (e) => {
            e.preventDefault();
            setBusy(true);
            setError("");
            setData(null);
            try {
              const params = new URLSearchParams(
                new FormData(e.currentTarget) as unknown as Record<
                  string,
                  string
                >,
              );
              const result = await fetch("/api/bookings?" + params);
              const body = await result.json();
              if (!result.ok) throw Error(body.error);
              setData(body);
            } catch (err) {
              setError((err as Error).message);
            } finally {
              setBusy(false);
            }
          }}
        >
          <div className="public-form-heading">
            <div className="inline-flex p-3 rounded-xl bg-surface-brand text-primary mb-4">
              <PublicIcon name="manage_search" className="text-3xl" />
            </div>
            <h2 className="text-2xl font-bold">Thông tin đặt chỗ</h2>
          </div>
          <DialogField label="Mã booking" name="id" required />
          <DialogField
            label="Số điện thoại đã đặt"
            name="phone"
            type="tel"
            required
          />
          <button
            type="submit"
            className="public-primary-button w-full"
            disabled={busy}
          >
            {busy ? "Đang tra cứu…" : "Tra cứu booking"}
            <PublicIcon name="search" className="text-xl" />
          </button>
        </form>
        {error && (
          <p role="alert" className="public-feedback public-feedback-error">
            {error}
          </p>
        )}
        {data && (
          <div role="status" className="public-form-card space-y-4">
            <h2 className="font-bold text-headline-sm">{String(data.title)}</h2>
            <span
              className="public-booking-status"
              data-status={String(data.status)}
            >
              <span aria-hidden="true">●</span>
              {{
                confirmed: "Đã xác nhận",
                completed: "Hoàn tất",
                cancelled: "Đã hủy",
                pending: "Chờ xác nhận",
              }[String(data.status)] || String(data.status)}
            </span>
            <p>Ngày sử dụng: {String(data.departure_date)}</p>
            {!!data.return_date && (
              <p>Ngày trả phòng: {String(data.return_date)}</p>
            )}
            <p>Số khách: {String(data.guests)}</p>
            <Link
              className="inline-flex min-h-11 items-center text-primary font-bold underline underline-offset-4"
              href="/lien-he"
            >
              Gửi yêu cầu hỗ trợ
            </Link>
          </div>
        )}
      </div>
      <SupportGuide lookup />
    </div>
  );
}
