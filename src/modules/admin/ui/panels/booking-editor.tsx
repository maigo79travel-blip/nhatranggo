"use client";
import { useEffect, useState } from "react";
import { api } from "../api";
import { money } from "@/lib/types";
import { Status } from "../primitives/admin-badge";
import { dateLabel, typeLabels, type Row } from "../api";
import { Save } from "../editors";

export function BookingEditor({
  row,
  busy,
  onSave,
}: {
  row: Row;
  busy: boolean;
  onSave: (b: unknown) => Promise<void>;
}) {
  const [partners, setPartners] = useState<Row[]>([]);
  const [history, setHistory] = useState<Row[]>([]);
  const [error, setError] = useState("");
  useEffect(() => {
    let live = true;
    void Promise.all([api("partners"), api("bookings?history=" + row.id)])
      .then(([p, h]) => {
        if (live) {
          setPartners(p.data);
          setHistory(h.data);
        }
      })
      .catch((e) => {
        if (live) setError((e as Error).message);
      });
    return () => {
      live = false;
    };
  }, [row.id]);
  return (
    <form
      className="ad-editor"
      id="ad-record-form"
      onSubmit={(e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        void onSave({
          id: row.id,
          status: form.get("status"),
          partner_id: form.get("partner_id") || null,
          internal_notes: form.get("internal_notes"),
          confirmed_total: form.get("confirmed_total") || null,
          name: form.get("name"),
          phone: form.get("phone"),
        });
      }}
    >
      <div className="ad-booking-title">
        <Status value={row.status} />
        <h2>{String(row.title)}</h2>
        <small>Mã yêu cầu: {String(row.id)}</small>
      </div>
      <dl className="ad-detail-grid">
        {[
          ["Khách hàng", row.customer_name],
          ["Số điện thoại", row.phone],
          ["Loại dịch vụ", typeLabels[String(row.product_type)]],
          ["Ngày sử dụng", dateLabel(row.departure_date)],
          ...(row.return_date
            ? [["Ngày trả phòng", dateLabel(row.return_date)]]
            : []),
          ...(row.departure_time
            ? [["Giờ đón", String(row.departure_time).slice(0, 5)]]
            : []),
          ...(row.room_title ? [["Loại phòng", row.room_title]] : []),
          ["Số khách", row.guests],
          ["Giá tham khảo đã ghi nhận", money(Number(row.unit_price))],
          ["Ghi chú", row.notes],
        ].map(([label, value]) => (
          <div key={String(label)}>
            <dt>{String(label)}</dt>
            <dd>{String(value ?? "—")}</dd>
          </div>
        ))}
      </dl>
      <label className="ad-field">
        Trạng thái
        <select
          className="ad-input"
          name="status"
          defaultValue={String(row.status)}
        >
          <option value="pending">Chờ xác nhận</option>
          <option value="confirmed">Đã xác nhận</option>
          <option value="completed">Hoàn tất</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </label>
      <label className="ad-field">
        Họ tên
        <input
          name="name"
          className="ad-input"
          required
          defaultValue={String(row.customer_name)}
        />
      </label>
      <label className="ad-field">
        Điện thoại
        <input
          name="phone"
          className="ad-input"
          required
          defaultValue={String(row.phone)}
        />
      </label>
      <label className="ad-field">
        Phân tài xế / Đối tác
        <select
          name="partner_id"
          className="ad-input"
          defaultValue={String(row.partner_id || "")}
        >
          <option value="">Chưa phân công</option>
          {partners
            .filter((p) => p.active || p.id === row.partner_id)
            .map((p) => (
              <option key={String(p.id)} value={String(p.id)}>
                {String(p.name)} ·{" "}
                {p.kind === "driver"
                  ? "Tài xế"
                  : p.kind === "hotel"
                    ? "Khách sạn"
                    : "Nhà tour"}
                {!p.active ? " (đã ẩn)" : ""}
              </option>
            ))}
        </select>
      </label>
      <label className="ad-field">
        Tổng giá đã xác nhận (VND)
        <input
          name="confirmed_total"
          type="number"
          min={0}
          className="ad-input"
          defaultValue={String(row.confirmed_total ?? "")}
        />
      </label>
      <label className="ad-field">
        Ghi chú nội bộ
        <textarea
          className="ad-input"
          name="internal_notes"
          defaultValue={String(row.internal_notes || "")}
        />
      </label>
      {error && <p role="alert">{error}</p>}
      <h3>Lịch sử xử lý</h3>
      <ul>
        {history.map((h, i) => (
          <li key={i}>
            {dateLabel(h.created_at)} · {String(h.status)} ·{" "}
            {String(h.username || "Khách")} · {String(h.notes)}
          </li>
        ))}
      </ul>
      <Save busy={busy} />
    </form>
  );
}
