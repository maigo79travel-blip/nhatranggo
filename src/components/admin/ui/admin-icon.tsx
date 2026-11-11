"use client";
import type { HTMLAttributes } from "react";

export function Icon({
  name,
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement> & { name: string }) {
  return (
    <span
      aria-hidden="true"
      {...props}
      className={`material-symbols-outlined ${className || ""}`}
    >
      {name}
    </span>
  );
}
