"use client";
import { useRef, useState } from "react";
import { Markdown } from "./markdown";
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
      value.slice(0, start) +
        before +
        value.slice(start, end) +
        after +
        value.slice(end),
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
