"use client";
import { money } from "@/lib/types";
import { Status } from "../ui/admin-badge";
import { dateLabel, type Row } from "../api";
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
  return (
    <form
      className="ad-editor"
      id="ad-record-form"
      onSubmit={(e) => {
        e.preventDefault();
        void onSave({
          id: row.id,
          status: new FormData(e.currentTarget).get("status"),
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
          ["Ngày sử dụng", dateLabel(row.departure_date)],
          ["Số khách", row.guests],
          ["Giá tham khảo đã ghi nhận", money(Number(row.unit_price))],
          ["Ghi chú", row.notes],
        ].map(([label, value]) => (
          <div key={String(label)}>
            <dt>{String(label)}</dt>
            <dd>{String(value || "—")}</dd>
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
          <option value="cancelled">Đã hủy</option>
        </select>
      </label>
      <Save busy={busy} />
    </form>
  );
}
