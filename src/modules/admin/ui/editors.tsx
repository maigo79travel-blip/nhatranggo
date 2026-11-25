"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/types";
import { api, inputClass, type Row } from "./api";
export function Field({
  label,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-body-sm">
      {label}
      <input {...props} className={`${inputClass} mt-1`} />
    </label>
  );
}
export function Save({ busy }: { busy: boolean }) {
  return (
    <button
      disabled={busy}
      type="submit"
      className="ad-button ad-button-primary ad-save-button"
    >
      {busy ? "Đang lưu…" : "Lưu thay đổi"}
    </button>
  );
}
export function ProductEditor({
  product,
  busy,
  onSave,
}: {
  product: Product;
  busy: boolean;
  onSave: (p: unknown) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [tab, setTab] = useState("general");
  const [references, setReferences] = useState<{
    destinations: Row[];
    partners: Row[];
  }>({ destinations: [], partners: [] });
  useEffect(() => {
    let live = true;
    void Promise.all([api("destinations"), api("partners")])
      .then(([d, p]) => {
        if (live) setReferences({ destinations: d.data, partners: p.data });
      })
      .catch((e) => {
        if (live) setError((e as Error).message);
      });
    return () => {
      live = false;
    };
  }, []);
  return (
    <form
      className="ad-editor space-y-4"
      id="ad-record-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
          const form = e.currentTarget;
          setTab("general");
          requestAnimationFrame(() => form.reportValidity());
          return;
        }
        setError("");
        try {
          const f = new FormData(e.currentTarget);
          const content = Object.fromEntries(
            Object.entries(product.content || {}).map(([key, entry]) => [
              key,
              {
                ...entry,
                value:
                  entry.kind === "text"
                    ? String(f.get("content:" + key))
                    : JSON.parse(String(f.get("content:" + key))),
              },
            ]),
          );
          void onSave({
            ...product,
            title: f.get("title"),
            type: f.get("type"),
            price: Number(f.get("price")),
            original_price: f.get("original_price")
              ? Number(f.get("original_price"))
              : null,
            image: f.get("image"),
            location: f.get("location"),
            description: f.get("description"),
            rating: Number(f.get("rating")),
            position: Number(f.get("position")),
            active: f.get("active") === "on",
            content,
            destination_id: f.get("destination_id") || null,
            partner_id: f.get("partner_id") || null,
          });
        } catch {
          setError("Thuộc tính bổ sung phải là JSON hợp lệ.");
        }
      }}
    >
      <div
        className="ad-editor-tabs"
        role="tablist"
        aria-label="Thông tin dịch vụ"
      >
        <button
          type="button"
          role="tab"
          aria-selected={tab === "general"}
          onClick={() => setTab("general")}
        >
          Thông tin chung
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={tab === "details"}
          onClick={() => setTab("details")}
        >
          Ưu đãi & tiện ích
        </button>
      </div>
      <div className="ad-product-basic" hidden={tab !== "general"}>
        <Field
          label="Tên dịch vụ"
          name="title"
          defaultValue={product.title}
          required
        />
        <div className="grid sm:grid-cols-2 gap-3">
          <label className="block text-body-sm">
            Loại
            <select
              className={inputClass}
              name="type"
              defaultValue={product.type}
            >
              <option value="hotel">Khách sạn</option>
              <option value="tour">Tour</option>
              <option value="combo">Combo</option>
            </select>
          </label>
          <Field
            label="Thứ tự"
            name="position"
            type="number"
            min={0}
            defaultValue={product.position || 0}
          />
          <Field
            label="Giá bán (VND)"
            name="price"
            type="number"
            min={0}
            required
            defaultValue={product.price}
          />
          <Field
            label="Giá gốc (VND, bỏ trống để ẩn)"
            name="original_price"
            type="number"
            min={0}
            defaultValue={product.original_price ?? ""}
          />
        </div>
        <Field
          label="Đường dẫn ảnh"
          name="image"
          defaultValue={product.image}
        />
        {product.image && (
          <img
            src={product.image}
            alt="Ảnh dịch vụ"
            className="w-48 h-28 rounded-lg object-cover"
          />
        )}
        <label className="block">
          Địa phương
          <select
            name="destination_id"
            className="ad-input"
            defaultValue={product.destination_id || ""}
          >
            <option value="">Chưa phân loại</option>
            {references.destinations.map((d) => (
              <option key={String(d.id)} value={String(d.id)}>
                {String(d.name)}
              </option>
            ))}
          </select>
        </label>
        <label className="block">
          Đối tác cung cấp
          <select
            name="partner_id"
            className="ad-input"
            defaultValue={product.partner_id || ""}
          >
            <option value="">Chưa phân công</option>
            {references.partners.map((d) => (
              <option key={String(d.id)} value={String(d.id)}>
                {String(d.name)}
              </option>
            ))}
          </select>
        </label>
        <Field
          label="Địa điểm"
          name="location"
          defaultValue={product.location}
        />
        <Field
          label="Điểm đánh giá"
          name="rating"
          type="number"
          min={0}
          max={5}
          step="0.1"
          defaultValue={product.rating}
        />
        <label className="block text-body-sm">
          Mô tả
          <textarea
            className={`${inputClass} min-h-24`}
            name="description"
            defaultValue={product.description}
          />
        </label>
        <label className="flex gap-2 items-center">
          <input
            type="checkbox"
            name="active"
            defaultChecked={product.active}
          />
          Hiển thị trên website
        </label>
      </div>
      <details
        className="border border-border-subtle rounded-xl p-4"
        open={tab === "details"}
        hidden={tab !== "details"}
      >
        <summary className="cursor-pointer font-semibold">
          Nhãn ưu đãi, tiện ích, lịch trình và liên kết (
          {Object.keys(product.content || {}).length})
        </summary>
        <div className="mt-4 space-y-4">
          {Object.entries(product.content || {}).map(([key, entry]) => (
            <label className="block text-body-sm" key={key}>
              <span className="block text-on-surface-variant mb-1 break-words">
                {key} · {entry.label}
              </span>
              <textarea
                className={`${inputClass} ${entry.kind === "text" ? "min-h-16" : "min-h-28 font-mono"}`}
                name={"content:" + key}
                defaultValue={
                  entry.kind === "text"
                    ? String(entry.value)
                    : JSON.stringify(entry.value, null, 2)
                }
              />
            </label>
          ))}
        </div>
      </details>
      {error && (
        <p className="text-error" role="alert">
          {error}
        </p>
      )}
      <Save busy={busy} />
    </form>
  );
}
export function ContentEditor({
  row,
  busy,
  onSave,
}: {
  row: Row;
  busy: boolean;
  onSave: (p: unknown) => Promise<void>;
}) {
  const [error, setError] = useState("");
  const [value, setValue] = useState(row.value);
  const [raw, setRaw] = useState(JSON.stringify(row.value, null, 2));
  const flat =
    value != null &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.values(value).every((v) => typeof v === "string");
  const [rawMode, setRawMode] = useState(!flat && row.kind !== "text");
  const labels: Record<string, string> = {
    href: "Liên kết",
    src: "Đường dẫn ảnh",
    alt: "Mô tả ảnh",
    title: "Tiêu đề",
    placeholder: "Gợi ý nhập liệu",
    defaultValue: "Giá trị mặc định",
    backgroundImage: "Ảnh nền",
    phone: "Hotline hiển thị",
    telephone: "Số điện thoại",
    email: "Email liên hệ",
    zalo: "Liên kết Zalo",
    whatsapp: "Liên kết WhatsApp",
    telegram: "Liên kết Telegram",
    description: "Mô tả",
    "aria-label": "Nhãn hỗ trợ truy cập",
    "data-alt": "Mô tả hình ảnh",
    "data-location": "Địa điểm",
  };
  return (
    <form
      className="ad-editor space-y-4"
      id="ad-record-form"
      onSubmit={(e) => {
        e.preventDefault();
        try {
          const f = new FormData(e.currentTarget);
          void onSave({
            ...row,
            label: String(f.get("label")),
            value: rawMode ? JSON.parse(raw) : value,
          });
          setError("");
        } catch {
          setError("Vui lòng nhập JSON hợp lệ.");
        }
      }}
    >
      <p className="text-body-sm text-on-surface-variant break-all">
        {String(row.scope)} · {String(row.key)}
      </p>
      <Field
        label="Nhãn quản lý"
        name="label"
        defaultValue={String(row.label)}
        required
      />
      {row.kind === "text" ? (
        <label className="ad-field">
          Nội dung
          <textarea
            className={`${inputClass} min-h-56`}
            name="value"
            aria-label="Nội dung"
            value={String(value)}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
      ) : (
        <>
          {flat && (
            <div
              className="ad-editor-tabs"
              role="tablist"
              aria-label="Chế độ chỉnh sửa"
            >
              <button
                type="button"
                role="tab"
                aria-selected={!rawMode}
                onClick={() => {
                  if (!rawMode) return;
                  try {
                    setValue(JSON.parse(raw));
                    setRawMode(false);
                    setError("");
                  } catch {
                    setError("Vui lòng kiểm tra lại cấu hình JSON.");
                  }
                }}
              >
                Biểu mẫu
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={rawMode}
                onClick={() => {
                  if (rawMode) return;
                  setRaw(JSON.stringify(value, null, 2));
                  setRawMode(true);
                }}
              >
                JSON nâng cao
              </button>
            </div>
          )}
          {!rawMode && flat ? (
            <div className="ad-product-basic">
              {Object.entries(value as Record<string, string>).map(
                ([key, text]) => (
                  <Field
                    key={key}
                    label={labels[key] || key}
                    value={text}
                    onChange={(e) =>
                      setValue({ ...(value as object), [key]: e.target.value })
                    }
                  />
                ),
              )}
            </div>
          ) : (
            <label className="ad-field">
              Cấu hình JSON
              <textarea
                className={`${inputClass} min-h-56 font-mono`}
                name="value"
                aria-label="Nội dung"
                value={raw}
                onChange={(e) => setRaw(e.target.value)}
              />
            </label>
          )}
        </>
      )}
      {error && (
        <p className="text-error" role="alert">
          {error}
        </p>
      )}
      <Save busy={busy} />
    </form>
  );
}
export function AccountEditor({
  onMessage,
}: {
  onMessage: (m: string) => void;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  return (
    <form
      className="ad-editor space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          const f = new FormData(e.currentTarget);
          await api("account", "PATCH", Object.fromEntries(f));
          onMessage("Đã đổi mật khẩu. Vui lòng đăng nhập lại.");
          router.refresh();
        } catch (error) {
          onMessage((error as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <h2 className="text-headline-sm">Đổi mật khẩu quản trị</h2>
      <Field
        label="Mật khẩu hiện tại"
        name="currentPassword"
        type="password"
        autoComplete="current-password"
        required
      />
      <Field
        label="Mật khẩu mới (ít nhất 12 ký tự)"
        name="newPassword"
        type="password"
        autoComplete="new-password"
        minLength={12}
        required
      />
      <Save busy={busy} />
    </form>
  );
}
