"use client";

import { useEffect, useState, type FormEvent } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { money } from "@/lib/types";
import { vietnamToday } from "@/modules/travel/search";
import type {
  AdminTourDeparture,
  AdminTourOption,
} from "@/modules/travel/tour-departure-types";
import { api, dateLabel } from "../api";
import { Field } from "../editors";
import { Badge } from "../primitives/admin-badge";
import { Empty } from "../primitives/admin-empty";
import { Filter } from "../primitives/admin-filter";
import { Icon } from "../primitives/admin-icon";
import { AdminNotice, useAdminNotice } from "../primitives/admin-notice";
import { AdminPageHeading } from "../primitives/admin-page-heading";
import { EditorDrawer } from "../primitives/editor-drawer";

const formId = "admin-tour-departure-form";
const rangeOptions = [
  ["upcoming", "Sắp tới"],
  ["past", "Đã qua"],
  ["all", "Tất cả ngày"],
];
const statusOptions = [
  ["all", "Tất cả trạng thái"],
  ["open", "Còn nhận đặt"],
  ["full", "Hết chỗ"],
  ["closed", "Đóng bán"],
];

function departureStatus(row: AdminTourDeparture, today: string) {
  if (!row.active) return <Badge>Đóng bán</Badge>;
  if (row.date < today) return <Badge>Đã qua</Badge>;
  if (!row.product_active) return <Badge>Tour đang ẩn</Badge>;
  if (row.capacity !== null && row.booked_guests >= row.capacity)
    return <Badge tone="amber">Hết chỗ</Badge>;
  return <Badge tone="green">Đang mở bán</Badge>;
}

export function TourDeparturesPanel({
  initialTour,
  title,
  description,
}: {
  initialTour: string;
  title: string;
  description?: string;
}) {
  const [tour, setTour] = useState(initialTour);
  const [range, setRange] = useState("upcoming");
  const [status, setStatus] = useState("all");
  const [page, setPage] = useState(1);
  const [rows, setRows] = useState<AdminTourDeparture[]>([]);
  const [hasNext, setHasNext] = useState(false);
  const [tours, setTours] = useState<AdminTourOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [listError, setListError] = useState("");
  const [optionsError, setOptionsError] = useState("");
  const [reload, setReload] = useState(0);
  const [reloadOptions, setReloadOptions] = useState(0);
  const [editor, setEditor] = useState<{ row?: AdminTourDeparture } | null>(
    null,
  );
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState("");
  const { notice, notify, clearNotice } = useAdminNotice();

  useEffect(() => {
    const controller = new AbortController();
    setOptionsError("");
    void api("departures?options=1", "GET", undefined, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted) setTours(data);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setOptionsError(error.message);
      });
    return () => controller.abort();
  }, [reloadOptions]);

  useEffect(() => {
    const controller = new AbortController();
    const params = new URLSearchParams({ range, status, page: String(page) });
    if (tour) params.set("tour", tour);
    setLoading(true);
    setListError("");
    void api("departures?" + params, "GET", undefined, controller.signal)
      .then(({ data, hasNext }) => {
        if (controller.signal.aborted) return;
        if (!data.length && page > 1) {
          setPage(page - 1);
          return;
        }
        setRows(data);
        setHasNext(hasNext);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setListError(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [tour, range, status, page, reload]);

  const tourOptions = tours.map(({ id, title, active }) => ({
    value: id,
    label: active ? title : `${title} (tour đang ẩn)`,
  }));
  const today = vietnamToday();

  function refresh() {
    setReload((value) => value + 1);
    setReloadOptions((value) => value + 1);
  }

  function open(row?: AdminTourDeparture) {
    clearNotice();
    setFormError("");
    setEditor({ row });
  }

  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!editor || saving) return;
    const { row } = editor;
    const form = new FormData(event.currentTarget);
    const capacity = form.get("capacity");
    const price = form.get("price_override");
    const endDate = form.get("end_date");
    setSaving(true);
    setFormError("");
    try {
      const result = await api("departures", row ? "PATCH" : "POST", {
        id: row?.id,
        revision: row?.revision,
        product_id: row?.product_id ?? form.get("product_id"),
        date: form.get("date"),
        end_date: endDate || undefined,
        active: form.get("active") === "on",
        notes: form.get("notes"),
        capacity: capacity === "" ? null : Number(capacity),
        price_override: price === "" ? null : Number(price),
      });
      setEditor(null);
      if (!row) {
        setTour(String(form.get("product_id")));
        setRange("upcoming");
        setStatus("all");
        setPage(1);
      }
      setReload((value) => value + 1);
      notify(
        row
          ? "Đã cập nhật lịch khởi hành."
          : `Đã thêm ${result.saved} ngày khởi hành.${result.skipped ? ` Giữ nguyên ${result.skipped} ngày đã có lịch.` : ""}`,
      );
    } catch (error) {
      setFormError((error as Error).message);
    } finally {
      setSaving(false);
    }
  }

  const selected = editor?.row;
  return (
    <>
      <AdminPageHeading title={title} description={description}>
        <button
          type="button"
          className="ad-button ad-button-primary"
          disabled={!tours.length || saving}
          onClick={() => open()}
        >
          <Icon name="add" />
          Thêm lịch
        </button>
      </AdminPageHeading>
      <section className="ad-panel" aria-busy={loading}>
        <div className="ad-toolbar ad-module-toolbar ad-departure-toolbar">
          <div className="ad-departure-tour">
            <CustomSelect
              ariaLabel="Lọc theo tour"
              value={tour}
              searchable
              searchPlaceholder="Tìm tên tour…"
              buttonClassName="ad-input cursor-pointer"
              options={[{ value: "", label: "Tất cả tour" }, ...tourOptions]}
              onChange={(value) => {
                setTour(value);
                setPage(1);
              }}
            />
          </div>
          <Filter
            label="Khoảng lịch"
            value={range}
            options={rangeOptions}
            onChange={(value) => {
              setRange(value);
              setPage(1);
            }}
          />
          <Filter
            label="Trạng thái lịch"
            value={status}
            options={statusOptions}
            onChange={(value) => {
              setStatus(value);
              setPage(1);
            }}
          />
          <button
            type="button"
            className="ad-icon-button"
            aria-label="Tải lại lịch"
            title="Tải lại lịch"
            disabled={loading}
            onClick={refresh}
          >
            <Icon name="refresh" />
          </button>
        </div>
        {optionsError && (
          <p role="alert" className="ad-module-message text-error">
            {optionsError}
          </p>
        )}
        {listError ? (
          <Empty icon="error" title="Chưa tải được lịch" text={listError}>
            <button type="button" className="ad-text-button" onClick={refresh}>
              Thử lại
            </button>
          </Empty>
        ) : loading ? (
          <p role="status" className="ad-module-message">
            Đang tải lịch khởi hành…
          </p>
        ) : rows.length ? (
          <>
            <div
              className="ad-table-scroll"
              role="region"
              aria-label={title}
              tabIndex={0}
            >
              <table className="ad-table ad-table-departures">
                <thead>
                  <tr>
                    {[
                      "Ngày khởi hành",
                      "Tour",
                      "Giá / khách",
                      "Chỗ đã giữ",
                      "Trạng thái",
                      "Thao tác",
                    ].map((heading) => (
                      <th key={heading} scope="col">
                        {heading}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row.id}>
                      <td>
                        <strong>{dateLabel(row.date)}</strong>
                      </td>
                      <td className="ad-departure-title">{row.title}</td>
                      <td>
                        <strong>
                          {money(row.price_override ?? row.base_price)}
                        </strong>
                        <small>
                          {row.price_override === null
                            ? "Giá chung"
                            : "Giá riêng"}
                        </small>
                      </td>
                      <td>
                        <strong>
                          {row.booked_guests}
                          {row.capacity !== null ? ` / ${row.capacity}` : ""}
                        </strong>
                        {row.capacity === null ? (
                          <small>Không giới hạn</small>
                        ) : (
                          row.active &&
                          row.product_active &&
                          row.date >= today && (
                            <small>
                              Còn{" "}
                              {Math.max(row.capacity - row.booked_guests, 0)}{" "}
                              chỗ
                            </small>
                          )
                        )}
                      </td>
                      <td>{departureStatus(row, today)}</td>
                      <td>
                        <button
                          type="button"
                          className="ad-text-button"
                          aria-label={`Sửa lịch ${row.title} ngày ${dateLabel(row.date)}`}
                          onClick={() => open(row)}
                        >
                          Sửa lịch
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {(page > 1 || hasNext) && (
              <div className="ad-pagination">
                <p>Trang {page}</p>
                <div>
                  <button
                    type="button"
                    className="ad-page-button"
                    aria-label="Trang trước"
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    <Icon name="chevron_left" />
                  </button>
                  <button
                    type="button"
                    className="ad-page-button"
                    aria-label="Trang sau"
                    disabled={!hasNext || page >= 1000}
                    onClick={() => setPage(page + 1)}
                  >
                    <Icon name="chevron_right" />
                  </button>
                </div>
              </div>
            )}
          </>
        ) : (
          <Empty icon="calendar_month" title="Chưa có lịch khởi hành phù hợp" />
        )}
      </section>
      <EditorDrawer
        open={Boolean(editor)}
        title={selected ? "Chỉnh sửa lịch khởi hành" : "Thêm lịch khởi hành"}
        onClose={() => setEditor(null)}
        saveForm={formId}
        busy={saving}
      >
        {editor && (
          <form id={formId} className="ad-editor space-y-4" onSubmit={save}>
            {formError && (
              <p className="ad-form-error" role="alert">
                {formError}
              </p>
            )}
            {selected ? (
              <p className="ad-field">
                <strong>{selected.title}</strong>
              </p>
            ) : (
              <div className="ad-field">
                <span>Tour</span>
                <CustomSelect
                  name="product_id"
                  ariaLabel="Tour"
                  required
                  searchable
                  searchPlaceholder="Tìm tên tour…"
                  defaultValue={
                    tours.some((entry) => entry.id === tour) ? tour : ""
                  }
                  buttonClassName="ad-input cursor-pointer"
                  options={[{ value: "", label: "Chọn tour" }, ...tourOptions]}
                />
              </div>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Ngày khởi hành"
                name="date"
                type="date"
                min={selected && selected.date < today ? undefined : today}
                defaultValue={selected?.date ?? today}
                required
              />
              {!selected && (
                <Field
                  label="Đến ngày (tùy chọn)"
                  name="end_date"
                  type="date"
                  min={today}
                />
              )}
            </div>
            {!selected && (
              <p className="ad-form-note">
                <Icon name="info" />
                Bỏ trống ngày kết thúc để tạo một lịch. Tạo tối đa 60 ngày mỗi
                lần và giữ nguyên lịch đã có.
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <Field
                label="Sức chứa (chỗ)"
                name="capacity"
                type="number"
                min={1}
                max={10000}
                defaultValue={selected?.capacity ?? ""}
                placeholder="Không giới hạn"
              />
              <Field
                label="Giá riêng / khách (VND)"
                name="price_override"
                type="number"
                min={0}
                max={2000000000}
                defaultValue={selected?.price_override ?? ""}
                placeholder="Dùng giá chung"
              />
            </div>
            {selected && selected.booked_guests > 0 && (
              <p className="ad-form-note">
                <Icon name="confirmation_number" /> Đã giữ{" "}
                {selected.booked_guests} chỗ cho các đơn hiện có.
              </p>
            )}
            <label className="ad-field">
              Ghi chú nội bộ
              <textarea
                className="ad-input min-h-24"
                name="notes"
                maxLength={20000}
                defaultValue={selected?.notes ?? ""}
              />
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="active"
                defaultChecked={selected?.active ?? true}
              />
              Mở bán lịch này
            </label>
            <p className="ad-form-note">
              <Icon name="lock" />
              {selected
                ? "Đóng bán để dừng nhận đơn mới. Các đơn đã đặt vẫn được giữ."
                : "Sau khi tour có lịch, khách chỉ đặt được các ngày đang mở bán và còn chỗ."}
            </p>
          </form>
        )}
      </EditorDrawer>
      <AdminNotice notice={notice} dismiss={clearNotice} />
    </>
  );
}
