"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { resources } from "../resources";
import { api, dateLabel, type Row } from "./api";
import { EditorDrawer } from "./primitives/editor-drawer";
import { Icon } from "./primitives/admin-icon";
import { Empty } from "./primitives/admin-empty";
import { Filter } from "./primitives/admin-filter";
import { ImageField } from "./primitives/admin-image";
import { MarkdownEditor } from "@/modules/blog/markdown-editor";
import type { FieldDefinition } from "../types";
function inputValue(field: FieldDefinition, value: unknown) {
  if (field.type === "json") return JSON.stringify(value ?? {}, null, 2);
  if (field.type === "datetime-local" && value)
    return new Date(String(value))
      .toLocaleString("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" })
      .replace(" ", "T")
      .slice(0, 16);
  if (field.type === "date" && value) return String(value).slice(0, 10);
  return String(value ?? "");
}
export function ModulePanel({ resource }: { resource: string }) {
  const definition = resources[resource];
  const router = useRouter();
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [options, setOptions] = useState<Record<string, Row[]>>({});
  const [query, setQuery] = useState("");
  const [stateFilter, setStateFilter] = useState("all");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [history, setHistory] = useState<Row[] | null>(null);
  const [loadingHistory, setLoadingHistory] = useState(false);
  useEffect(() => {
    let live = true;
    setLoading(true);
    setMessage("");
    setSelected(null);
    setQuery("");
    void (async () => {
      try {
        const refs = [
          ...new Set(
            definition.fields.flatMap((f) => (f.resource ? [f.resource] : [])),
          ),
        ];
        const result = await Promise.all([
          api(resource),
          ...refs.map((ref) => api(ref)),
        ]);
        if (!live) return;
        setRows(result[0].data);
        setOptions(
          Object.fromEntries(refs.map((ref, i) => [ref, result[i + 1].data])),
        );
      } catch (e) {
        if (live) setMessage((e as Error).message);
      } finally {
        if (live) setLoading(false);
      }
    })();
    return () => {
      live = false;
    };
  }, [resource, definition]);
  const displayCell = (column: string, value: unknown) => {
    if (typeof value === "boolean") return value ? "Hiển thị" : "Đã ẩn";
    if (column === "updated_at" || column === "created_at")
      return dateLabel(value);
    const field = definition.fields.find((field) => field.name === column);
    const option = field?.options?.find(
      (option) => option.value === String(value),
    );
    if (option) return option.label;
    const reference = field?.resource
      ? options[field.resource]?.find((row) => row.id === value)
      : undefined;
    return String(reference?.title ?? reference?.name ?? value ?? "—");
  };
  const statusField = definition.fields.find(
    (field) => field.name === "status" || field.name === "active",
  );
  const statusOptions: string[][] =
    statusField?.name === "active"
      ? [
          ["true", "Đang hoạt động"],
          ["false", "Đã ẩn"],
        ]
      : (statusField?.options ?? []).map(({ value, label }) => [value, label]);
  const search = query.trim().toLowerCase();
  const filtered = rows.filter(
    (row) =>
      (stateFilter === "all" ||
        String(row[statusField?.name ?? ""]) === stateFilter) &&
      (!search ||
        definition.columns.some((column) =>
          displayCell(column, row[column]).toLowerCase().includes(search),
        )),
  );
  const [page, setPage] = useState(1);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 15));
  const actualPage = Math.min(page, pageCount);
  return (
    <section className="ad-panel">
      <div className="ad-toolbar ad-module-toolbar">
        <label className="ad-search">
          <Icon name="search" />
          <input
            aria-label="Tìm dữ liệu"
            placeholder="Tìm trong danh sách…"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPage(1);
            }}
          />
        </label>
        {statusOptions.length > 0 && (
          <Filter
            label="Lọc theo trạng thái"
            value={stateFilter}
            onChange={(value) => {
              setStateFilter(value);
              setPage(1);
            }}
            options={[["all", "Tất cả trạng thái"], ...statusOptions]}
          />
        )}
        <button
          type="button"
          className="ad-button ad-button-primary"
          disabled={busy || loading}
          onClick={() => {
            setHistory(null);
            setSelected({});
            setMessage("");
          }}
        >
          <Icon name="add" />
          {resource === "articles" ? "Viết bài mới" : "Thêm mới"}
        </button>
      </div>
      {message && (
        <p role="status" className="ad-module-message text-error break-words">
          {message}
        </p>
      )}
      {loading ? (
        <p className="ad-module-message" role="status">
          Đang tải dữ liệu…
        </p>
      ) : (
        <>
          <div
            className="ad-table-scroll"
            role="region"
            aria-label={definition.label}
            tabIndex={0}
          >
            <table className="ad-table ad-table-module">
              <thead>
                <tr>
                  {definition.columns.map((column) => (
                    <th scope="col" key={column}>
                      {definition.fields.find((f) => f.name === column)
                        ?.label ||
                        (
                          {
                            updated_at: "Cập nhật",
                            created_at: "Ngày tạo",
                          } as Record<string, string>
                        )[column] ||
                        column}
                    </th>
                  ))}
                  <th scope="col">Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filtered
                  .slice((actualPage - 1) * 15, actualPage * 15)
                  .map((row) => (
                    <tr key={String(row.id)}>
                      {definition.columns.map((column) => (
                        <td key={column}>{displayCell(column, row[column])}</td>
                      ))}
                      <td>
                        <button
                          className="ad-text-button"
                          onClick={() => {
                            setSelected(row);
                            setHistory(null);
                            setMessage("");
                          }}
                        >
                          Sửa
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {!filtered.length && (
            <Empty icon="search_off" title="Chưa có bản ghi phù hợp" />
          )}
          <div className="ad-pagination">
            <p>{filtered.length} kết quả</p>
            <div>
              <button
                type="button"
                className="ad-page-button"
                aria-label="Trang trước"
                disabled={actualPage === 1}
                onClick={() => setPage(actualPage - 1)}
              >
                <Icon name="chevron_left" />
              </button>
              <span>
                {actualPage} / {pageCount}
              </span>
              <button
                type="button"
                className="ad-page-button"
                aria-label="Trang sau"
                disabled={actualPage >= pageCount}
                onClick={() => setPage(actualPage + 1)}
              >
                <Icon name="chevron_right" />
              </button>
            </div>
          </div>
        </>
      )}
      <EditorDrawer
        open={Boolean(selected)}
        title={definition.label}
        onClose={() => setSelected(null)}
      >
        {selected && (
          <form
            key={String(selected.id || "new")}
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setMessage("");
              try {
                const form = new FormData(e.currentTarget);
                const value: Row = {
                  ...(selected.id ? { id: selected.id } : {}),
                };
                for (const f of definition.fields) {
                  const raw = form.get(f.name);
                  if (f.type === "checkbox") value[f.name] = raw === "on";
                  else if (f.type === "json")
                    value[f.name] = JSON.parse(String(raw || "{}"));
                  else if (f.type === "datetime-local")
                    value[f.name] = new Date(
                      String(raw) + "+07:00",
                    ).toISOString();
                  else if (f.type === "select" && f.resource)
                    value[f.name] = raw || null;
                  else if (f.type === "password" && !raw) continue;
                  else value[f.name] = raw;
                }
                const { data } = await api(
                  resource,
                  selected.id ? "PATCH" : "POST",
                  value,
                );
                setRows((previous) =>
                  selected.id
                    ? previous.map((row) => (row.id === data.id ? data : row))
                    : [data, ...previous],
                );
                router.refresh();
                setSelected(null);
                setMessage("Đã lưu thay đổi");
              } catch (err) {
                setMessage((err as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {definition.fields.map((field) =>
              field.type === "markdown" ? (
                <MarkdownEditor
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  initialValue={String(selected[field.name] || "")}
                />
              ) : field.type === "image" ? (
                <ImageField
                  key={field.name}
                  name={field.name}
                  label={field.label}
                  initialValue={inputValue(field, selected[field.name])}
                />
              ) : (
                <label key={field.name} className="block text-body-md">
                  {field.label}
                  {field.type === "checkbox" ? (
                    <input
                      className="ml-3"
                      type="checkbox"
                      name={field.name}
                      defaultChecked={selected[field.name] !== false}
                    />
                  ) : field.type === "select" ? (
                    <select
                      className="ad-input"
                      name={field.name}
                      defaultValue={String(
                        selected[field.name] ?? field.options?.[0]?.value ?? "",
                      )}
                      required={field.required}
                    >
                      {field.resource && <option value="">Chọn…</option>}
                      {field.options?.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                      {(options[field.resource || ""] || [])
                        .filter(
                          (row) =>
                            !["rooms", "departures"].includes(resource) ||
                            field.name !== "product_id" ||
                            row.type ===
                              (resource === "rooms" ? "hotel" : "tour"),
                        )
                        .map((row) => (
                          <option key={String(row.id)} value={String(row.id)}>
                            {String(row.title || row.name || row.id)}
                          </option>
                        ))}
                    </select>
                  ) : ["textarea", "json"].includes(field.type || "") ? (
                    <textarea
                      className="ad-input min-h-28"
                      name={field.name}
                      required={field.required}
                      defaultValue={inputValue(field, selected[field.name])}
                    />
                  ) : (
                    <input
                      className="ad-input"
                      name={field.name}
                      type={field.type || "text"}
                      required={field.required}
                      min={field.type === "number" ? 0 : undefined}
                      step={field.step}
                      defaultValue={inputValue(field, selected[field.name])}
                    />
                  )}
                </label>
              ),
            )}
            {message && (
              <p role="alert" className="text-error">
                {message}
              </p>
            )}
            <button
              disabled={busy}
              className="ad-button ad-button-primary"
              type="submit"
            >
              {busy ? "Đang lưu…" : "Lưu thay đổi"}
            </button>
            {Boolean(selected.id) && (
              <>
                {resource !== "requests" && (
                  <button
                    type="button"
                    className="ad-button"
                    disabled={busy}
                    onClick={async () => {
                      if (
                        !window.confirm(
                          definition.archive
                            ? "Ẩn bản ghi này?"
                            : "Xóa bản ghi này?",
                        )
                      )
                        return;
                      setBusy(true);
                      try {
                        await api(resource, "DELETE", { id: selected.id });
                        setRows((previous) =>
                          definition.archive
                            ? previous.map((row) =>
                                row.id === selected.id
                                  ? { ...row, active: false }
                                  : row,
                              )
                            : previous.filter((row) => row.id !== selected.id),
                        );
                        router.refresh();
                        setSelected(null);
                        setMessage(
                          definition.archive
                            ? "Đã ngừng hiển thị bản ghi"
                            : "Đã xóa bản ghi",
                        );
                      } catch (e) {
                        setMessage((e as Error).message);
                      } finally {
                        setBusy(false);
                      }
                    }}
                  >
                    {definition.archive ? "Ẩn / Ngừng hoạt động" : "Xóa"}
                  </button>
                )}
                {resource === "customers" && (
                  <button
                    type="button"
                    className="ad-button"
                    disabled={loadingHistory}
                    onClick={async () => {
                      setLoadingHistory(true);
                      try {
                        const data = await api(
                          "bookings?phone=" +
                            encodeURIComponent(String(selected.phone)),
                        );
                        setHistory(data.data);
                      } catch (e) {
                        setMessage((e as Error).message);
                      } finally {
                        setLoadingHistory(false);
                      }
                    }}
                  >
                    {loadingHistory ? "Đang tải lịch sử…" : "Lịch sử booking"}
                  </button>
                )}
              </>
            )}
            {history?.length === 0 && (
              <p role="status">Khách hàng chưa có đơn đặt chỗ.</p>
            )}
            {!!history?.length && (
              <ul className="space-y-2">
                {history.map((row) => (
                  <li key={String(row.id)}>
                    {String(row.title)} ·{" "}
                    {String(row.departure_date).slice(0, 10)} ·{" "}
                    {String(row.status)}
                  </li>
                ))}
              </ul>
            )}
          </form>
        )}
      </EditorDrawer>
    </section>
  );
}
