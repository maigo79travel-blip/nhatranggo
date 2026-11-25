"use client";

import { useRef, useState } from "react";
import { Icon } from "./admin-icon";
import { isPublicImageUrl } from "@/lib/content-attributes";

export function ImageUpload({
  label = "Tải ảnh lên",
  onUploaded,
}: {
  label?: string;
  onUploaded: (url: string) => void;
}) {
  const input = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  return (
    <div>
      <input
        ref={input}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        hidden
        onChange={async (event) => {
          const file = event.currentTarget.files?.[0];
          event.currentTarget.value = "";
          if (!file) return;
          setError("");
          if (file.size > 3 * 1024 * 1024) {
            setError("Ảnh phải nhỏ hơn hoặc bằng 3 MB.");
            return;
          }
          setBusy(true);
          try {
            const response = await fetch("/api/admin/media", {
              method: "POST",
              headers: { "Content-Type": file.type },
              body: file,
            });
            const result = await response.json();
            if (!response.ok) throw new Error(result.error);
            onUploaded(result.url);
          } catch (err) {
            setError((err as Error).message || "Không tải được ảnh");
          } finally {
            setBusy(false);
          }
        }}
      />
      <button
        type="button"
        className="ad-button"
        disabled={busy}
        onClick={() => input.current?.click()}
      >
        <Icon name="upload" />
        {busy ? "Đang tải ảnh…" : label}
      </button>
      {error && (
        <p className="text-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

export function ImageField({
  label,
  name,
  initialValue,
  onChange,
}: {
  label: string;
  name?: string;
  initialValue: string;
  onChange?: (url: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const update = (url: string) => {
    setValue(url);
    onChange?.(url);
  };
  return (
    <div className="space-y-2">
      <label className="ad-field">
        {label}
        <input
          name={name}
          className="ad-input"
          maxLength={2000}
          value={value}
          onChange={(event) => update(event.target.value)}
        />
      </label>
      <ImageUpload onUploaded={update} />
      {isPublicImageUrl(value) && (
        <img
          src={value}
          alt="Xem trước ảnh"
          className="h-24 max-w-full rounded-lg object-contain"
        />
      )}
    </div>
  );
}
