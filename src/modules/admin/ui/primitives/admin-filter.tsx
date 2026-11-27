"use client";
import { Icon } from "./admin-icon";
import { CustomSelect } from "@/components/ui/custom-select";

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
    <div className="ad-filter">
      <CustomSelect
        ariaLabel={label}
        value={value}
        onChange={onChange}
        leadingIcon={<Icon name="filter_list" className="ad-filter-icon" />}
        buttonClassName="ad-filter-button"
        options={options.map(([id, optLabel]) => ({
          value: id,
          label: optLabel,
        }))}
      />
    </div>
  );
}
