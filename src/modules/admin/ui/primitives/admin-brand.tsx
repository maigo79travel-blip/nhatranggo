"use client";

import brand from "@/config/brand.json";
import { Icon } from "./admin-icon";

export function Brand() {
  return (
    <a href="/admin" className="ad-brand">
      <span className="ad-brand-mark">
        <Icon name="tsunami" />
      </span>
      <span>
        <strong>{brand.name}</strong>
        <small>Quản trị</small>
      </span>
    </a>
  );
}
