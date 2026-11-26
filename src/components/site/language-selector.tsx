"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSiteData } from "@/components/content";
import { localeOptions } from "@/lib/locale";
import { CustomSelect } from "@/components/ui/custom-select";

export function LanguageSelector({ id = "site-language" }: { id?: string }) {
  const { locale } = useSiteData();
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="relative">
      <CustomSelect
        id={id}
        ariaLabel="Ngôn ngữ / Language"
        options={localeOptions}
        value={locale}
        disabled={busy}
        align="right"
        buttonClassName="h-10 rounded-full border border-border-subtle bg-surface-muted px-3.5 text-on-surface font-label-md text-label-md hover:border-primary/40 focus:border-focus-ring focus:outline-none"
        onChange={async (nextLocale) => {
          setBusy(true);
          setError("");
          try {
            const result = await fetch("/api/locale", {
              method: "POST",
              headers: { "content-type": "application/json" },
              body: JSON.stringify({ locale: nextLocale }),
            });
            if (!result.ok) throw Error("Không đổi được ngôn ngữ");
            router.refresh();
          } catch (e) {
            setError((e as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      />
      {error && (
        <span role="alert" className="mt-1 block text-xs text-error">
          {error}
        </span>
      )}
    </div>
  );
}
