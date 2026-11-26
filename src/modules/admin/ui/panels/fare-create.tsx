"use client";
import { useEffect, useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import { api, type Row } from "../api";
export function FareCreate({ onSaved }: { onSaved: () => void }) {
  const [routes, setRoutes] = useState<Row[]>([]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    let live = true;
    void api("routes")
      .then((data) => {
        if (live) setRoutes(data.data.filter((r: Row) => r.active));
      })
      .catch((e) => {
        if (live) setError(e.message);
      });
    return () => {
      live = false;
    };
  }, []);
  return (
    <form
      className="space-y-4"
      onSubmit={async (e) => {
        e.preventDefault();
        setBusy(true);
        try {
          await api(
            "fares",
            "POST",
            Object.fromEntries(new FormData(e.currentTarget)),
          );
          onSaved();
        } catch (e) {
          setError((e as Error).message);
        } finally {
          setBusy(false);
        }
      }}
    >
      <div className="block">
        <span className="mb-1 block">Tuyến xe</span>
        <CustomSelect
          name="route"
          ariaLabel="Tuyến xe"
          required
          searchable
          searchPlaceholder="Tìm tuyến xe…"
          defaultValue=""
          buttonClassName="ad-input cursor-pointer"
          options={[
            { value: "", label: "Chọn tuyến đã tạo" },
            ...routes.map((r) => ({
              value: String(r.code),
              label: String(r.title),
            })),
          ]}
        />
      </div>
      <div className="block">
        <span className="mb-1 block">Loại xe</span>
        <CustomSelect
          name="vehicle"
          ariaLabel="Loại xe"
          defaultValue="4cho"
          buttonClassName="ad-input cursor-pointer"
          options={["4cho", "7cho", "16cho"].map((v) => ({
            value: v,
            label: `Xe ${v.replace("cho", " chỗ")}`,
          }))}
        />
      </div>
      <label className="block">
        Giá tham khảo / chuyến
        <input
          className="ad-input"
          name="price"
          type="number"
          min={0}
          required
        />
      </label>
      {error && (
        <p role="alert" className="text-error">
          {error}
        </p>
      )}
      <button className="ad-button ad-button-primary" disabled={busy}>
        Thêm mức giá
      </button>
    </form>
  );
}
