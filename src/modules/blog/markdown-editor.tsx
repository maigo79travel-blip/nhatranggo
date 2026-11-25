"use client";
import { useRef, useState } from "react";
import { Markdown } from "./markdown";
import { ImageUpload } from "@/modules/admin/ui/primitives/admin-image";
export function MarkdownEditor({
  name,
  label,
  initialValue,
}: {
  name: string;
  label: string;
  initialValue: string;
}) {
  const [value, setValue] = useState(initialValue);
  const [preview, setPreview] = useState(false);
  const ref = useRef<HTMLTextAreaElement>(null);
  const insert = (before: string, after = "") => {
    const field = ref.current;
    const start = field?.selectionStart ?? value.length;
    const end = field?.selectionEnd ?? start;
    setValue(
      (current) =>
        current.slice(0, start) +
        before +
        current.slice(start, end) +
        after +
        current.slice(end),
    );
    requestAnimationFrame(() => field?.focus());
  };
  return (
    <div className="space-y-3">
      <label className="block" htmlFor={name}>
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {[
          ["Tiêu đề", "\n\n## ", ""],
          ["In đậm", "**", "**"],
          ["Danh sách", "\n\n- ", ""],
          ["Chèn ảnh", "\n\n![Mô tả ảnh](", ")"],
          ["Liên kết", "[Tên liên kết](", ")"],
        ].map(([title, before, after]) => (
          <button
            key={title}
            type="button"
            className="ad-button"
            onClick={() => {
              setPreview(false);
              insert(before, after);
            }}
          >
            {title}
          </button>
        ))}
        <ImageUpload
          onUploaded={(url) => {
            setPreview(false);
            insert(`\n\n![Mô tả ảnh](${url})\n\n`);
          }}
        />
        <button
          type="button"
          className="ad-button"
          aria-pressed={preview}
          onClick={() => setPreview(!preview)}
        >
          Xem trước
        </button>
      </div>
      <textarea
        ref={ref}
        id={name}
        name={name}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="ad-input min-h-64"
        hidden={preview}
      />
      {preview && (
        <div className="border border-border-subtle rounded-xl p-4">
          <Markdown value={value} />
        </div>
      )}
    </div>
  );
}
