"use client";

import { useEffect, useId, useRef, useState } from "react";

export interface CustomSelectOption {
  value: string;
  label: string;
}

export function CustomSelect({
  options,
  value,
  defaultValue,
  onChange,
  name,
  id,
  ariaLabel,
  disabled = false,
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
  disabled?: boolean;
  buttonClassName?: string;
  menuClassName?: string;
  align?: "left" | "right";
}) {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState(
    defaultValue ?? options[0]?.value ?? "",
  );
  const currentValue = isControlled ? value : internalValue;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const generatedId = useId();
  const listboxId = `${id ?? generatedId}-listbox`;

  useEffect(() => {
    if (!open) return;
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
  }, [open]);

  const selected =
    options.find((option) => option.value === currentValue) ?? options[0];

  const selectValue = (next: string) => {
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="relative min-w-0">
      {name && <input type="hidden" name={name} value={currentValue} />}
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
        <span className="min-w-0 truncate">{selected?.label ?? ""}</span>
        <span
          aria-hidden="true"
          className={`material-symbols-outlined shrink-0 text-[18px] transition-transform duration-150 ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-label={ariaLabel}
          className={`absolute top-full z-50 mt-2 max-h-64 min-w-full w-max overflow-y-auto rounded-2xl border border-brand-light bg-surface p-1.5 shadow-floating ${align === "right" ? "right-0" : "left-0"} ${menuClassName}`}
        >
          {options.map((option) => {
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
                  <span className="whitespace-nowrap">{option.label}</span>
                  {active && (
                    <span
                      aria-hidden="true"
                      className="material-symbols-outlined text-[16px] text-primary"
                    >
                      check
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
