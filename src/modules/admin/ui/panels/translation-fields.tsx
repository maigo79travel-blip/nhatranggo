"use client";

import { useEffect, useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { localeOptions } from "@/lib/locale";
import {
  scopedContent,
  type ContentScope,
  type ProductSection,
} from "../../routes";
import { api, typeLabels, type Row } from "../api";

const langs = localeOptions.filter(({ value }) => value !== "vi");
const typeOptions = Object.entries(typeLabels)
  .filter(([value]) => value !== "transfer")
  .map(([value, label]) => ({ value, label }));

export function TranslationFields({ row }: { row: Row }) {
  const [entity, setEntity] = useState(String(row.entity ?? "content"));
  const [sourceKey, setSourceKey] = useState(String(row.entity_key ?? ""));
  const [scope, setScope] = useState<ContentScope>("home");
  const [type, setType] = useState<ProductSection>("hotel");
  const [sources, setSources] = useState<Row[]>([]);
  const [loading, setLoading] = useState(!row.id);
  const [failure, setFailure] = useState("");
  const original = row.value as Row | undefined;
  const [values, setValues] = useState<Row>(original ?? {});
  const [raw, setRaw] = useState(JSON.stringify(original ?? {}, null, 2));
  const source = sources.find(
    (item) => (entity === "product" ? item.id : item.key) === sourceKey,
  );
  const textContent =
    entity === "content" &&
    (source?.kind === "text" || typeof values.value === "string");

  useEffect(() => {
    if (row.id) return;
    const controller = new AbortController();
    setSources([]);
    setFailure("");
    setLoading(true);
    const url =
      entity === "product" ? "products?type=" + type : "content?scope=" + scope;
    void api(url, "GET", undefined, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted) setSources(data);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setFailure(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [row.id, entity, scope, type]);

  function changeSource(key = "") {
    setSourceKey(key);
    setValues({});
    const picked =
      entity === "content" && sources.find((item) => item.key === key);
    setRaw(
      JSON.stringify(
        picked && picked.kind !== "text" ? { value: picked.value } : {},
        null,
        2,
      ),
    );
  }

  const textField = (
    key: string,
    label: string,
    kind: "input" | "textarea" = "input",
  ) => {
    const value = typeof values[key] === "string" ? values[key] : "";
    const originalText = key === "value" ? source?.value : source?.[key];
    const hint = typeof originalText === "string" ? originalText : "";
    const controlId = `ad-translation-${key}`;
    const Tag = kind;
    return (
      <div key={key} className="ad-field">
        <label htmlFor={controlId}>{label}</label>
        <Tag
          id={controlId}
          aria-describedby={hint ? controlId + "-original" : undefined}
          className="ad-input"
          rows={kind === "textarea" ? 4 : undefined}
          value={value}
          required={key === "value"}
          onChange={(event) => {
            const next = event.target.value;
            setValues((previous) => {
              const updated = { ...previous };
              if (next) updated[key] = next;
              else delete updated[key];
              return updated;
            });
          }}
        />
        {hint && <small id={controlId + "-original"}>Tiếng Việt: {hint}</small>}
      </div>
    );
  };

  return (
    <>
      {row.id ? (
        <div className="ad-form-note">
          {entity === "product" ? "Dịch vụ" : "Nội dung website"} · {sourceKey}
          <input type="hidden" name="entity" value={entity} />
          <input type="hidden" name="entity_key" value={sourceKey} />
        </div>
      ) : (
        <>
          <label className="ad-field">
            Cần dịch
            <select
              className="ad-input"
              name="entity"
              aria-label="Cần dịch"
              value={entity}
              onChange={(event) => {
                setEntity(event.target.value);
                changeSource();
              }}
            >
              <option value="content">Nội dung website</option>
              <option value="product">Dịch vụ</option>
            </select>
          </label>
          {entity === "content" ? (
            <label className="ad-field">
              Trang
              <select
                className="ad-input"
                value={scope}
                onChange={(event) => {
                  setScope(event.target.value as ContentScope);
                  changeSource();
                }}
              >
                {scopedContent.map(([key, section]) => (
                  <option key={key} value={key}>
                    {section.label}
                  </option>
                ))}
              </select>
            </label>
          ) : (
            <label className="ad-field">
              Loại dịch vụ
              <select
                className="ad-input"
                value={type}
                onChange={(event) => {
                  setType(event.target.value as ProductSection);
                  changeSource();
                }}
              >
                {typeOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          )}
          <div className="ad-field">
            <label htmlFor="ad-translation-source">Mục cần dịch</label>
            <CustomSelect
              id="ad-translation-source"
              ariaLabel="Mục cần dịch"
              name="entity_key"
              value={sourceKey}
              onChange={(value) => changeSource(value)}
              required
              searchable
              placeholder={
                loading ? "Đang tải danh sách…" : "Chọn mục cần dịch"
              }
              disabled={loading || Boolean(failure)}
              buttonClassName="ad-input cursor-pointer"
              options={sources.map((item) => ({
                value: String(entity === "product" ? item.id : item.key),
                label: String(
                  item.title ?? item.display_label ?? item.label ?? item.key,
                )
                  .trim()
                  .replace(/\s+/g, " "),
              }))}
            />
            {failure && (
              <p role="alert" className="text-error">
                {failure}
              </p>
            )}
          </div>
        </>
      )}
      <label className="ad-field">
        Ngôn ngữ
        <select
          className="ad-input"
          name="locale"
          aria-label="Ngôn ngữ"
          defaultValue={String(row.locale ?? "en")}
        >
          {langs.map(({ value, label }) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </label>
      {sourceKey &&
        (entity === "product" ? (
          <>
            {textField("title", "Tên dịch vụ")}
            {textField("location", "Địa điểm")}
            {textField("description", "Mô tả", "textarea")}
            <p>
              Dịch các trường cần cập nhật. Trường bỏ trống dùng nội dung gốc.
            </p>
          </>
        ) : textContent ? (
          textField("value", "Bản dịch", "textarea")
        ) : (
          <label className="ad-field">
            Bản dịch cấu hình (JSON)
            <textarea
              className="ad-input min-h-28 font-mono"
              value={raw}
              onChange={(event) => setRaw(event.target.value)}
              required
            />
            <small>
              Giữ cấu trúc của mục gốc và chỉ dịch phần chữ hiển thị.
            </small>
          </label>
        ))}
      <input
        type="hidden"
        name="value"
        value={
          entity === "product" || textContent ? JSON.stringify(values) : raw
        }
      />
    </>
  );
}
