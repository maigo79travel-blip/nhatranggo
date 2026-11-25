"use client";
import type { InputHTMLAttributes } from "react";

export function DialogField({
  label,
  ...props
}: InputHTMLAttributes<HTMLInputElement> & { label: string }) {
  return (
    <label className="block text-body-sm">
      {label}
      <input
        {...props}
        className="block w-full border border-border-default rounded-lg p-2.5 mt-1 bg-white"
      />
    </label>
  );
}
