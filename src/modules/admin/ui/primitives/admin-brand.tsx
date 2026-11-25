"use client";

import brand from "@/config/brand.json";
import { Icon } from "./admin-icon";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="/admin" className={`ad-brand ${light ? "ad-brand-light" : ""}`}>
      <span className="ad-brand-mark">
        <Icon name="tsunami" />
      </span>
      <span>
        <strong>
          {brand.wordmarkPrimary}
          <span>{brand.wordmarkSecondary}</span>
        </strong>
        <small>KHÔNG GIAN QUẢN TRỊ</small>
      </span>
    </a>
  );
}
