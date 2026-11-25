"use client";
import { Icon } from "./admin-icon";

export function Filter({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[][];
}) {
  return (
    <label className="ad-filter">
      <Icon name="filter_list" />
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map(([id, optLabel]) => (
          <option key={id} value={id}>
            {optLabel}
          </option>
        ))}
      </select>
    </label>
  );
}
