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
      <Icon name="filter_list" />
      <CustomSelect
        ariaLabel={label}
        value={value}
        onChange={onChange}
        buttonClassName="cursor-pointer bg-transparent text-sm font-medium text-on-surface"
        options={options.map(([id, optLabel]) => ({
          value: id,
          label: optLabel,
        }))}
      />
    </div>
  );
}
