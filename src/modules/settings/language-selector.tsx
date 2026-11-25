"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSiteData } from "@/components/content";
import { localeOptions } from "../admin/validation";
export function LanguageSelector() {
  const { locale } = useSiteData();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  return (
    <div>
      <label className="sr-only" htmlFor="site-language">
        Ngôn ngữ / Language
      </label>
      <select
        id="site-language"
        className="rounded-full border border-border-light bg-surface-container-low text-on-surface font-label-md text-label-md px-2.5 py-1.5 max-w-28 cursor-pointer focus:border-primary focus:outline-none"
        value={locale}
        disabled={busy}
        onChange={async (event) => {
          setBusy(true);
          setError("");
          try {
            const result = await fetch("/api/locale", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ locale: event.target.value }),
            });
            if (!result.ok) throw Error("Không đổi được ngôn ngữ");
            router.refresh();
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        {localeOptions.map((v) => (
          <option key={v.value} value={v.value}>
            {v.label}
          </option>
        ))}
      </select>
      {error && <span role="alert">{error}</span>}
    </div>
  );
}
