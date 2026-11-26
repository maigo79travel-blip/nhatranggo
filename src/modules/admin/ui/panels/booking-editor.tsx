"use client";
import { useEffect, useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
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
            ? [
                [
                  row.return_time ? "Ngày đón lượt về" : "Ngày trả phòng",
                  dateLabel(row.return_date),
                ],
              ]
            : []),
          ...(row.departure_time
            ? [["Giờ đón", String(row.departure_time).slice(0, 5)]]
            : []),
          ...(row.room_title ? [["Loại phòng", row.room_title]] : []),
          ...(row.return_time
            ? [["Giờ đón lượt về", String(row.return_time).slice(0, 5)]]
            : []),
          ...(row.flight_number
            ? [["Số hiệu chuyến bay", row.flight_number]]
            : []),
          ...(row.return_unit_price != null
            ? [["Giá tham khảo lượt về", money(Number(row.return_unit_price))]]
            : []),
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
      <div className="ad-field">
        <span>Trạng thái</span>
        <CustomSelect
          name="status"
          ariaLabel="Trạng thái"
          defaultValue={String(row.status)}
          buttonClassName="ad-input cursor-pointer"
          options={[
            { value: "pending", label: "Chờ xác nhận" },
            { value: "confirmed", label: "Đã xác nhận" },
            { value: "completed", label: "Hoàn tất" },
            { value: "cancelled", label: "Đã hủy" },
          ]}
        />
      </div>
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
      <div className="ad-field">
        <span>Phân tài xế / Đối tác</span>
        <CustomSelect
          name="partner_id"
          ariaLabel="Phân tài xế / Đối tác"
          searchable
          searchPlaceholder="Tìm đối tác…"
          defaultValue={String(row.partner_id || "")}
          buttonClassName="ad-input cursor-pointer"
          options={[
            { value: "", label: "Chưa phân công" },
            ...partners
              .filter((p) => p.active || p.id === row.partner_id)
              .map((p) => ({
                value: String(p.id),
                label: `${String(p.name)} · ${
                  p.kind === "driver"
                    ? "Tài xế"
                    : p.kind === "hotel"
                      ? "Khách sạn"
                      : "Nhà tour"
                }${!p.active ? " (đã ẩn)" : ""}`,
              })),
          ]}
        />
      </div>
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
