"use client";

import { useEffect, useState } from "react";
import { api, type Row } from "../api";
import { Empty } from "../primitives/admin-empty";
import { Icon } from "../primitives/admin-icon";
import { ResourceTable } from "./resource-table";

type BookingPage = { data: Row[]; total: number; page: number; pages: number };

export function BookingsPanel({
  version,
  onEdit,
}: {
  version: number;
  onEdit: (row: Row) => void;
}) {
  const [filters, setFilters] = useState("");
  const [requestedPage, setRequestedPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<BookingPage>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams(filters);
    params.set("page", String(requestedPage));
    setLoading(true);
    setError("");
    void api(`bookings?${params}`, "GET", undefined, controller.signal)
      .then((result: BookingPage) => {
        if (!controller.signal.aborted) setData(result);
      })
      .catch((err: Error) => {
        if (controller.signal.aborted) return;
        setData(undefined);
        setError(err.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [filters, requestedPage, version, reload]);

  const exportParams = new URLSearchParams(filters);
  exportParams.set("format", "xlsx");
  const page = data?.page ?? 1;
  const pages = data?.pages ?? 1;

  return (
    <section className="ad-panel" aria-busy={loading}>
      <div className="ad-resource-heading">
        <h2>Yêu cầu đặt chỗ</h2>
        <div className="ad-heading-actions">
          <a
            className="ad-button"
            href={`/api/admin/booking-export?${exportParams}`}
          >
            <Icon name="download" /> Xuất Excel
          </a>
          <button
            type="button"
            className="ad-icon-button"
            aria-label="Tải lại dữ liệu"
            disabled={loading}
            onClick={() => setReload((value) => value + 1)}
          >
            <Icon name="refresh" />
          </button>
        </div>
      </div>
      <form
        className="ad-toolbar ad-booking-filters"
        onSubmit={(event) => {
          event.preventDefault();
          const params = new URLSearchParams();
          for (const [key, value] of new FormData(event.currentTarget)) {
            if (typeof value === "string" && value.trim())
              params.set(key, value.trim());
          }
          setRequestedPage(1);
          setFilters(params.toString());
        }}
        onReset={() => {
          setRequestedPage(1);
          setFilters("");
        }}
      >
        <label className="ad-field">
          Tìm dữ liệu
          <input
            className="ad-input"
            name="q"
            maxLength={120}
            placeholder="Mã đơn, khách, số điện thoại…"
          />
        </label>
        <label className="ad-field">
          Loại dịch vụ
          <select className="ad-input" name="type">
            <option value="">Tất cả loại</option>
            <option value="transfer">Xe đưa đón</option>
            <option value="hotel">Khách sạn</option>
            <option value="tour">Tour du lịch</option>
            <option value="combo">Combo</option>
          </select>
        </label>
        <label className="ad-field">
          Trạng thái đặt chỗ
          <select className="ad-input" name="status">
            <option value="">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="completed">Hoàn tất</option>
            <option value="cancelled">Đã hủy</option>
          </select>
        </label>
        <label className="ad-field">
          Ngày dùng từ
          <input className="ad-input" type="date" name="from" />
        </label>
        <label className="ad-field">
          Đến ngày
          <input className="ad-input" type="date" name="to" />
        </label>
        <div className="ad-booking-filter-actions">
          <button className="ad-button" type="submit">
            <Icon name="filter_list" /> Lọc đơn
          </button>
          <button className="ad-text-button" type="reset">
            Xóa bộ lọc
          </button>
        </div>
      </form>
      {error && (
        <p className="ad-module-message text-error" role="alert">
          {error}
        </p>
      )}
      <ResourceTable
        section="bookings"
        rows={data?.data ?? []}
        loading={loading}
        onEdit={onEdit}
      />
      {!loading && !error && !data?.total && (
        <Empty icon="confirmation_number" title="Không có đơn phù hợp" />
      )}
      {!!data?.total && (
        <div className="ad-pagination">
          <p>
            {data.total} đơn · Trang {page}/{pages}
          </p>
          <div>
            <button
              type="button"
              className="ad-page-button"
              aria-label="Trang trước"
              disabled={page === 1 || loading}
              onClick={() => setRequestedPage(page - 1)}
            >
              <Icon name="chevron_left" />
            </button>
            <button
              type="button"
              className="ad-page-button"
              aria-label="Trang sau"
              disabled={page === pages || loading}
              onClick={() => setRequestedPage(page + 1)}
            >
              <Icon name="chevron_right" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
