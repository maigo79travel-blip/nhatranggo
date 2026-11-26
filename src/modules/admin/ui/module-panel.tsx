"use client";
import { useEffect, useState } from "react";
import { normalizeSearch } from "@/modules/travel/search";
import { resources } from "../resources";
import { api, dateLabel, type Row } from "./api";
import { EditorDrawer } from "./primitives/editor-drawer";
import { Icon } from "./primitives/admin-icon";
import { Empty } from "./primitives/admin-empty";
import { Filter } from "./primitives/admin-filter";
import { ImageField } from "./primitives/admin-image";
import { MarkdownEditor } from "@/modules/blog/markdown-editor";
import { CustomSelect } from "@/components/ui/custom-select";
import type { FieldDefinition } from "../types";
import type { RequestSection } from "../routes";
import { TranslationFields } from "./panels/translation-fields";
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
export function ModulePanel({
  resource,
  request,
}: {
  resource: string;
  request?: RequestSection;
}) {
  const definition = resources[resource];
  const fields = definition.fields.filter(
    (field) => !request || field.name !== "kind",
  );
  const columns = definition.columns.filter(
    (column) => !request || column !== "kind",
  );
  const moduleLabel =
    request === "evisa"
      ? "yêu cầu E-Visa"
      : request === "fast-track"
        ? "yêu cầu Fast-track"
        : definition.label;
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
  const [revision, setRevision] = useState(0);
  const [failed, setFailed] = useState(false);
  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFailed(false);
    setMessage("");
    void (async () => {
      try {
        const refs = [
          ...new Set(
            definition.fields.flatMap((f) => (f.resource ? [f.resource] : [])),
          ),
        ];
        const result = await Promise.all([
          api(
            resource + (request ? "?kind=" + request : ""),
            "GET",
            undefined,
            controller.signal,
          ),
          ...refs.map((ref) => api(ref, "GET", undefined, controller.signal)),
        ]);
        if (controller.signal.aborted) return;
        setRows(result[0].data);
        setOptions(
          Object.fromEntries(refs.map((ref, i) => [ref, result[i + 1].data])),
        );
      } catch (e) {
        if (!controller.signal.aborted) {
          setFailed(true);
          setMessage((e as Error).message);
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    })();
    return () => controller.abort();
  }, [resource, definition, request, revision]);
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
  const search = normalizeSearch(query);
  const filtered = rows.filter(
    (row) =>
      (stateFilter === "all" ||
        String(row[statusField?.name ?? ""]) === stateFilter) &&
      (!search ||
        [...columns, "id", "phone", "email"].some((column) =>
          normalizeSearch(displayCell(column, row[column])).includes(search),
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
          className="ad-icon-button"
          aria-label="Tải lại dữ liệu"
          title="Tải lại dữ liệu"
          disabled={loading || busy}
          onClick={() => setRevision((value) => value + 1)}
        >
          <Icon name="refresh" />
        </button>
        {resource !== "contacts" && (
          <button
            type="button"
            className="ad-button ad-button-primary"
            disabled={busy || loading || failed}
            onClick={() => {
              setHistory(null);
              setSelected({});
              setMessage("");
            }}
          >
            <Icon name="add" />
            {resource === "articles" ? "Viết bài mới" : "Thêm mới"}
          </button>
        )}
      </div>
      {message && !selected && (
        <p
          role={failed ? "alert" : "status"}
          className={`ad-module-message break-words ${failed ? "text-error" : ""}`}
        >
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
                  {columns.map((column) => (
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
                      {columns.map((column) => (
                        <td key={column}>{displayCell(column, row[column])}</td>
                      ))}
                      <td>
                        <button
                          type="button"
                          className="ad-text-button"
                          onClick={() => {
                            setSelected(row);
                            setHistory(null);
                            setMessage("");
                          }}
                        >
                          {request || resource === "contacts" ? "Xử lý" : "Sửa"}
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
        title={
          selected?.id ? `Chỉnh sửa ${moduleLabel}` : `Thêm ${moduleLabel}`
        }
        onClose={() => setSelected(null)}
        saveForm="admin-module-form"
        busy={busy}
      >
        {selected && (
          <form
            key={String(selected.id || "new")}
            id="admin-module-form"
            className="ad-editor space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setMessage("");
              try {
                const form = new FormData(e.currentTarget);
                const value: Row = {
                  ...(selected.id ? { id: selected.id } : {}),
                  ...(request ? { kind: request } : {}),
                };
                for (const f of fields) {
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
                setSelected(null);
                setMessage("Đã lưu thay đổi");
              } catch (err) {
                setMessage((err as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            {resource === "translations" ? (
              <TranslationFields row={selected} />
            ) : (
              fields.map((field) =>
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
                  <div key={field.name} className="ad-field">
                    {field.type === "select" ? (
                      <span>{field.label}</span>
                    ) : (
                      <label htmlFor={`ad-module-${field.name}`}>
                        {field.label}
                      </label>
                    )}
                    {field.type === "checkbox" ? (
                      <input
                        className="ml-3"
                        id={`ad-module-${field.name}`}
                        type="checkbox"
                        name={field.name}
                        defaultChecked={selected[field.name] !== false}
                      />
                    ) : field.type === "select" ? (
                      <CustomSelect
                        id={`ad-module-${field.name}`}
                        name={field.name}
                        ariaLabel={field.label}
                        searchable={Boolean(field.resource)}
                        searchPlaceholder={`Tìm ${field.label.toLowerCase()}…`}
                        required={field.required}
                        defaultValue={String(
                          selected[field.name] ??
                            field.options?.[0]?.value ??
                            "",
                        )}
                        buttonClassName="ad-input cursor-pointer"
                        options={[
                          ...(field.resource
                            ? [{ value: "", label: "Chọn…" }]
                            : []),
                          ...(field.options ?? []).map((option) => ({
                            value: String(option.value),
                            label: option.label,
                          })),
                          ...(options[field.resource || ""] || [])
                            .filter(
                              (row) =>
                                !["rooms", "departures"].includes(resource) ||
                                field.name !== "product_id" ||
                                row.type ===
                                  (resource === "rooms" ? "hotel" : "tour"),
                            )
                            .map((row) => ({
                              value: String(row.id),
                              label: String(row.title || row.name || row.id),
                            })),
                        ]}
                      />
                    ) : ["textarea", "json"].includes(field.type || "") ? (
                      <textarea
                        id={`ad-module-${field.name}`}
                        className="ad-input min-h-28"
                        name={field.name}
                        required={field.required}
                        readOnly={
                          resource === "contacts" && field.name === "message"
                        }
                        defaultValue={inputValue(field, selected[field.name])}
                      />
                    ) : (
                      <input
                        id={`ad-module-${field.name}`}
                        className="ad-input"
                        name={field.name}
                        type={field.type || "text"}
                        required={field.required}
                        readOnly={
                          resource === "contacts" && field.name !== "status"
                        }
                        min={field.type === "number" ? 0 : undefined}
                        step={field.step}
                        defaultValue={inputValue(field, selected[field.name])}
                      />
                    )}
                  </div>
                ),
              )
            )}
            {resource === "contacts" && selected.email ? (
              <a
                className="ad-button"
                href={"mailto:" + encodeURIComponent(String(selected.email))}
              >
                <Icon name="mail" /> Soạn email trả lời
              </a>
            ) : null}
            {message && (
              <p role="alert" className="text-error">
                {message}
              </p>
            )}
            {Boolean(selected.id) && (
              <>
                {resource !== "requests" &&
                  resource !== "contacts" &&
                  (!definition.archive || selected.active !== false) && (
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
                              : previous.filter(
                                  (row) => row.id !== selected.id,
                                ),
                          );
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
