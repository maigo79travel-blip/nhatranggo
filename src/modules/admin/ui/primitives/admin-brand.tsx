"use client";

import brand from "@/config/brand.json";
import Link from "next/link";
import { Icon } from "./admin-icon";

export function Brand({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <Link
      href="/admin"
      prefetch={false}
      className="ad-brand"
      onNavigate={onNavigate}
    >
      <span className="ad-brand-mark">
        <Icon name="tsunami" />
      </span>
      <span>
        <strong>{brand.name}</strong>
        <small>Quản trị</small>
      </span>
    </Link>
  );
}
