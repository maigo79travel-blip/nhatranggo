"use client";
import type { ReactNode } from "react";

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode;
  tone?: string;
}) {
  return (
    <span className={`ad-badge ad-badge-${tone}`}>
      <i />
      {children}
    </span>
  );
}

export function Status({ value }: { value: unknown }) {
  return (
    <Badge
      tone={
        value === "confirmed" || value === "completed"
          ? "green"
          : value === "cancelled"
            ? "red"
            : "amber"
      }
    >
      {{
        confirmed: "Đã xác nhận",
        completed: "Hoàn tất",
        cancelled: "Đã hủy",
        pending: "Chờ xác nhận",
      }[String(value)] || String(value)}
    </Badge>
  );
}
