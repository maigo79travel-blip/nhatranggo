"use client";
import { useSiteData } from "@/components/content";
export function DestinationOptions() {
  return (
    <>
      {useSiteData().destinations.map((d) => (
        <option key={d.id} value={d.code}>
          {d.name}
        </option>
      ))}
    </>
  );
}
