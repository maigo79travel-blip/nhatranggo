"use client";

import { useEffect, useId, useMemo, useRef, useState } from "react";
import { useSiteData } from "@/components/content";

export interface CustomSelectOption {
  value: string;
  label: string;
}

function normalizeText(text: string) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/đ/g, "d");
}

export function CustomSelect({
  options,
  value,
  defaultValue,
  onChange,
  name,
  id,
  ariaLabel,
  placeholder,
  disabled = false,
  required = false,
  searchable = false,
  searchPlaceholder,
  emptyText,
  buttonClassName = "",
  menuClassName = "",
  align = "left",
}: {
  options: readonly CustomSelectOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  id?: string;
  ariaLabel?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  searchable?: boolean;
  searchPlaceholder?: string;
  emptyText?: string;
  buttonClassName?: string;
  menuClassName?: string;
  align?: "left" | "right";
}) {
  const { messages } = useSiteData();
  const resolvedSearchPlaceholder =
    searchPlaceholder ?? messages?.common.searchPlaceholder ?? "Tìm kiếm...";
  const resolvedEmptyText =
    emptyText ?? messages?.common.emptySelect ?? "Không tìm thấy kết quả";
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  useEffect(() => {
    if (!isControlled && defaultValue !== undefined) {
      setInternalValue(defaultValue);
    }
  }, [defaultValue, isControlled]);

  const currentValue = isControlled ? value : internalValue;
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    if (searchable) {
      requestAnimationFrame(() => searchRef.current?.focus());
    }
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, searchable]);

  const selected = useMemo(
    () => options.find((option) => option.value === currentValue),
    [options, currentValue],
  );

  const filteredOptions = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const needle = normalizeText(query.trim());
    return options.filter((option) =>
      normalizeText(option.label).includes(needle),
    );
  }, [options, searchable, query]);

  const selectValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  useEffect(() => {
    const form = rootRef.current?.closest("form");
    if (!form || !name) return;
    const onFormData = (event: FormDataEvent) => {
      event.formData.set(name, currentValue);
    };
    form.addEventListener("formdata", onFormData);
    return () => form.removeEventListener("formdata", onFormData);
  }, [name, currentValue]);

  return (
    <div ref={rootRef} className="relative min-w-0">
      {required && (
        <input
          tabIndex={-1}
          aria-hidden="true"
          required
          value={currentValue}
          onChange={() => {}}
          className="pointer-events-none absolute inset-0 h-full min-h-11 w-full rounded-lg opacity-0"
        />
      )}
      <button
        id={id}
        type="button"
        disabled={disabled}
        aria-label={ariaLabel}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((prev) => !prev)}
        className={`flex w-full items-center justify-between gap-2 text-left disabled:cursor-not-allowed disabled:opacity-60 ${buttonClassName}`}
      >
        <span className="min-w-0 truncate">
          {selected?.label ?? placeholder ?? options[0]?.label ?? ""}
        </span>
        <span
          aria-hidden="true"
          className={`material-symbols-outlined shrink-0 text-[18px] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <div
          className={`absolute top-full z-50 mt-2 min-w-full w-max max-w-[min(22rem,calc(100vw-2rem))] rounded-2xl border border-brand-light bg-surface p-1.5 shadow-floating ${align === "right" ? "right-0" : "left-0"} ${menuClassName}`}
        >
          {searchable && (
            <div className="mb-1.5 flex items-center gap-2 rounded-xl border border-border-subtle bg-surface-muted px-2.5 py-1.5">
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[16px] text-on-surface-variant"
              >
                search
              </span>
              <input
                ref={searchRef}
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onClick={(event) => event.stopPropagation()}
                placeholder={resolvedSearchPlaceholder}
                aria-label={resolvedSearchPlaceholder}
                className="w-full min-w-0 bg-transparent text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none"
              />
            </div>
          )}
          <ul
            id={listboxId}
            role="listbox"
            aria-label={ariaLabel}
            className="max-h-60 overflow-y-auto"
          >
            {filteredOptions.length === 0 ? (
              <li className="px-3 py-2 text-sm text-on-surface-variant">
                {resolvedEmptyText}
              </li>
            ) : (
              filteredOptions.map((option) => {
                const active = option.value === currentValue;
                return (
                  <li key={option.value} role="option" aria-selected={active}>
                    <button
                      type="button"
                      onClick={() => selectValue(option.value)}
                      className={`flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2 text-left text-sm transition-colors ${
                        active
                          ? "bg-surface-brand font-bold text-primary"
                          : "font-medium text-on-surface hover:bg-surface-muted"
                      }`}
                    >
                      <span className="truncate">{option.label}</span>
                      {active && (
                        <span
                          aria-hidden="true"
                          className="material-symbols-outlined shrink-0 text-[16px] text-primary"
                        >
                          check
                        </span>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
