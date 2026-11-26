"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Product } from "@/lib/types";
import { normalizeSearch } from "@/modules/travel/search";
import { CustomSelect } from "@/components/ui/custom-select";
import type { ContentScope, ProductSection } from "../../routes";
import { api, rowKey, typeLabels, type Row } from "../api";
import { ContentEditor, Field, ProductEditor, Save } from "../editors";
import { AdminNotice, useAdminNotice } from "../primitives/admin-notice";
import { AdminPageHeading } from "../primitives/admin-page-heading";
import { Filter } from "../primitives/admin-filter";
import { Icon } from "../primitives/admin-icon";
import { Empty } from "../primitives/admin-empty";
import { EditorDrawer } from "../primitives/editor-drawer";
import { ResourceTable } from "./resource-table";
import { FareCreate } from "./fare-create";

type CatalogPage = {
  resource: "products" | "content" | "fares";
  title: string;
  description?: string;
  scope?: ContentScope;
  product?: ProductSection;
};

const pageSize = 12;
const labels = {
  products: {
    search: "Tìm tên, địa điểm hoặc mã dịch vụ…",
    edit: "Chỉnh sửa dịch vụ",
  },
  fares: { search: "Tìm tuyến xe hoặc giá…", edit: "Cập nhật giá xe" },
  content: {
    search: "Tìm tiêu đề, nội dung hoặc mã…",
    edit: "Chỉnh sửa nội dung",
  },
};
const vehicles = [
  ["4cho", "Xe 4 chỗ"],
  ["7cho", "Xe 7 chỗ"],
  ["16cho", "Xe 16 chỗ"],
];
const fareLabel = (route: unknown, row?: Row) =>
  String(row?.route_title || route);

export function CatalogAdminPanel({
  resource,
  title,
  description,
  scope,
  product,
}: CatalogPage) {
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [failure, setFailure] = useState("");
  const request = useRef<AbortController | null>(null);
  const { notice, notify, clearNotice } = useAdminNotice();

  const load = useCallback(async () => {
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    const params = new URLSearchParams();
    if (scope) params.set("scope", scope);
    if (product) params.set("type", product);
    setLoading(true);
    setFailure("");
    try {
      const result = await api(
        resource + (params.size ? "?" + params : ""),
        "GET",
        undefined,
        controller.signal,
      );
      if (!controller.signal.aborted) setRows(result.data);
    } catch (error) {
      if (!controller.signal.aborted) setFailure((error as Error).message);
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, [resource, scope, product]);

  useEffect(() => {
    void load();
    return () => request.current?.abort();
  }, [load]);

  async function save(body: unknown) {
    setSaving(true);
    clearNotice();
    try {
      const { data } = await api(resource, "PATCH", body);
      setRows((previous) =>
        previous.map((row) =>
          rowKey(row) === rowKey(data) ? { ...row, ...data } : row,
        ),
      );
      setSelected(null);
      notify("Đã lưu thay đổi.");
    } catch (error) {
      notify((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }

  const search = normalizeSearch(query);
  const filtered = rows.filter((row) => {
    if (filter !== "all") {
      if (
        resource === "products" &&
        Boolean(row.active) !== (filter === "active")
      )
        return false;
      if (resource === "fares" && row.vehicle !== filter) return false;
      if (resource === "content" && row.kind !== filter) return false;
    }
    const fields =
      resource === "products"
        ? [row.title, row.location, row.id]
        : resource === "fares"
          ? [row.route_title, row.route, row.vehicle, row.price]
          : [row.display_label, row.label, row.key, JSON.stringify(row.value)];
    return !search || normalizeSearch(fields.join(" ")).includes(search);
  });
  const pages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, pages);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const filterOptions =
    resource === "products"
      ? [
          ["all", "Tất cả trạng thái"],
          ["active", "Đang hiển thị"],
          ["hidden", "Đã ẩn / Bản nháp"],
        ]
      : resource === "fares"
        ? [["all", "Tất cả loại xe"], ...vehicles]
        : [
            ["all", "Tất cả nội dung"],
            ["text", "Văn bản"],
            ["attributes", "Ảnh và liên kết"],
            ["settings", "Cấu hình"],
          ];
  const createLabel =
    resource === "fares"
      ? "Thêm mức giá"
      : product === "hotel"
        ? "Thêm khách sạn"
        : product === "tour"
          ? "Thêm tour"
          : "Thêm combo";
  const drawerNotice = notice?.error && (selected || creating);
  const open = (row: Row) => {
    clearNotice();
    setSelected(row);
  };

  return (
    <>
      <AdminPageHeading title={title} description={description}>
        {resource !== "content" && (
          <button
            type="button"
            className="ad-button ad-button-primary"
            disabled={loading}
            onClick={() => {
              clearNotice();
              setCreating(true);
            }}
          >
            <Icon name="add" />
            {createLabel}
          </button>
        )}
      </AdminPageHeading>
      <section className="ad-panel" aria-busy={loading}>
        <div className="ad-toolbar">
          <label className="ad-search">
            <Icon name="search" />
            <input
              aria-label="Tìm dữ liệu"
              placeholder={labels[resource].search}
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setPage(1);
              }}
            />
          </label>
          <Filter
            label="Lọc danh sách"
            value={filter}
            options={filterOptions}
            onChange={(value) => {
              setFilter(value);
              setPage(1);
            }}
          />
          <button
            type="button"
            className="ad-icon-button"
            aria-label="Tải lại dữ liệu"
            title="Tải lại dữ liệu"
            disabled={loading}
            onClick={() => void load()}
          >
            <Icon name="refresh" />
          </button>
        </div>
        {failure ? (
          <Empty icon="error" title="Chưa tải được dữ liệu" text={failure}>
            <button
              type="button"
              className="ad-text-button"
              onClick={() => void load()}
            >
              Thử lại
            </button>
          </Empty>
        ) : (
          <>
            <ResourceTable
              section={resource}
              rows={visible}
              loading={loading}
              onEdit={open}
              routeLabel={fareLabel}
            />
            {!loading && !visible.length && (
              <Empty
                icon="search_off"
                title={
                  query || filter !== "all"
                    ? "Không tìm thấy kết quả phù hợp"
                    : "Danh sách đang trống"
                }
              >
                {(query || filter !== "all") && (
                  <button
                    type="button"
                    className="ad-text-button"
                    onClick={() => {
                      setQuery("");
                      setFilter("all");
                      setPage(1);
                    }}
                  >
                    Xóa bộ lọc
                  </button>
                )}
              </Empty>
            )}
            {!loading && visible.length > 0 && (
              <div className="ad-pagination">
                <p>{filtered.length} kết quả</p>
                {pages > 1 && (
                  <div>
                    <button
                      type="button"
                      className="ad-page-button"
                      aria-label="Trang trước"
                      disabled={currentPage === 1}
                      onClick={() => setPage(currentPage - 1)}
                    >
                      <Icon name="chevron_left" />
                    </button>
                    <span>
                      {currentPage} / {pages}
                    </span>
                    <button
                      type="button"
                      className="ad-page-button"
                      aria-label="Trang sau"
                      disabled={currentPage === pages}
                      onClick={() => setPage(currentPage + 1)}
                    >
                      <Icon name="chevron_right" />
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </section>
      <EditorDrawer
        open={Boolean(selected)}
        title={labels[resource].edit}
        onClose={() => setSelected(null)}
        saveForm="ad-record-form"
        busy={saving}
      >
        {drawerNotice && selected && (
          <p className="ad-form-error" role="alert">
            {notice.text}
          </p>
        )}
        {selected &&
          (resource === "products" ? (
            <ProductEditor
              key={rowKey(selected)}
              product={selected as unknown as Product}
              fixedType={product}
              busy={saving}
              onSave={save}
            />
          ) : resource === "content" ? (
            <ContentEditor
              key={rowKey(selected)}
              row={selected}
              busy={saving}
              onSave={save}
            />
          ) : (
            <form
              className="ad-editor space-y-4"
              id="ad-record-form"
              onSubmit={(event) => {
                event.preventDefault();
                void save({
                  ...selected,
                  price: Number(new FormData(event.currentTarget).get("price")),
                });
              }}
            >
              <p>
                {fareLabel(selected.route, selected)} ·{" "}
                {vehicles.find(([code]) => code === selected.vehicle)?.[1] ??
                  String(selected.vehicle)}
              </p>
              <Field
                label="Giá mỗi chuyến (VND)"
                name="price"
                type="number"
                min={0}
                required
                defaultValue={Number(selected.price)}
              />
              <p className="ad-form-note">
                <Icon name="sync" />
                Giá mới áp dụng cho các yêu cầu gửi sau khi lưu.
              </p>
              <Save busy={saving} />
              <button
                type="button"
                className="ad-button"
                disabled={saving}
                onClick={async () => {
                  if (
                    !window.confirm("Gỡ mức giá này khỏi bảng giá công khai?")
                  )
                    return;
                  setSaving(true);
                  clearNotice();
                  try {
                    await api("fares", "DELETE", {
                      route: selected.route,
                      vehicle: selected.vehicle,
                    });
                    setRows((previous) =>
                      previous.filter(
                        (row) => rowKey(row) !== rowKey(selected),
                      ),
                    );
                    setSelected(null);
                    notify("Đã gỡ mức giá xe.");
                  } catch (error) {
                    notify((error as Error).message, true);
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                Gỡ mức giá
              </button>
            </form>
          ))}
      </EditorDrawer>
      <EditorDrawer
        open={creating}
        title={createLabel}
        onClose={() => setCreating(false)}
        busy={saving}
      >
        {drawerNotice && creating && (
          <p className="ad-form-error" role="alert">
            {notice.text}
          </p>
        )}
        {creating && resource === "fares" && (
          <FareCreate
            onSaved={() => {
              setCreating(false);
              notify("Đã thêm mức giá xe.");
              void load();
            }}
          />
        )}
        {creating && product && (
          <form
            className="ad-editor space-y-4"
            onSubmit={async (event) => {
              event.preventDefault();
              const form = new FormData(event.currentTarget);
              setSaving(true);
              clearNotice();
              try {
                const { data } = await api("products", "POST", {
                  title: form.get("title"),
                  cloneId: form.get("cloneId") || undefined,
                  type: product,
                });
                setRows((previous) => [data, ...previous]);
                setCreating(false);
                setQuery("");
                setFilter("all");
                setPage(1);
                setSelected(data);
                notify(
                  "Đã tạo bản nháp. Bật hiển thị sau khi hoàn thiện thông tin.",
                );
              } catch (error) {
                notify((error as Error).message, true);
              } finally {
                setSaving(false);
              }
            }}
          >
            <Field
              label={`Tên ${typeLabels[product].toLowerCase()}`}
              name="title"
              required
              minLength={2}
              maxLength={300}
            />
            {rows.some((row) => row.template_id) && (
              <label className="ad-field">
                Sao chép từ dịch vụ có sẵn (tùy chọn)
                <CustomSelect
                  name="cloneId"
                  ariaLabel="Sao chép từ dịch vụ có sẵn"
                  searchable
                  defaultValue=""
                  buttonClassName="ad-input cursor-pointer"
                  options={[
                    { value: "", label: "Tạo mới" },
                    ...rows
                      .filter((row) => row.template_id)
                      .map((row) => ({
                        value: String(row.id),
                        label: String(row.title),
                      })),
                  ]}
                />
              </label>
            )}
            <button
              className="ad-button ad-button-primary"
              type="submit"
              disabled={saving}
            >
              {saving ? "Đang tạo…" : "Tạo bản nháp"}
            </button>
          </form>
        )}
      </EditorDrawer>
      {!drawerNotice && <AdminNotice notice={notice} dismiss={clearNotice} />}
    </>
  );
}
