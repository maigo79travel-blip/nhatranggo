"use client";
import { Icon } from "./admin-icon";

export function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="/admin" className={`ad-brand ${light ? "ad-brand-light" : ""}`}>
      <span className="ad-brand-mark">
        <Icon name="tsunami" />
      </span>
      <span>
        <strong>
          BOOKING<span>TRAVEL</span>
        </strong>
        <small>KHÔNG GIAN QUẢN TRỊ</small>
      </span>
    </a>
  );
}
