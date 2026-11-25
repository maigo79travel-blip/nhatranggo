"use client";
import { useEffect, useState } from "react";
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
      <label className="block">
        Tuyến xe
        <select className="ad-input" name="route" required>
          <option value="">Chọn tuyến đã tạo</option>
          {routes.map((r) => (
            <option value={String(r.code)} key={String(r.id)}>
              {String(r.title)}
            </option>
          ))}
        </select>
      </label>
      <label className="block">
        Loại xe
        <select className="ad-input" name="vehicle">
          {["4cho", "7cho", "16cho", "limo9"].map((v) => (
            <option value={v} key={v}>
              {v}
            </option>
          ))}
        </select>
      </label>
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
