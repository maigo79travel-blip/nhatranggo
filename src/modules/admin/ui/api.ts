import { scopedContent } from "../routes";

export type Row = Record<string, unknown>;
export const inputClass = "ad-input";
export async function api(
  resource: string,
  method = "GET",
  body?: unknown,
  signal?: AbortSignal,
) {
  const response = await fetch("/api/admin/" + resource, {
    method,
    signal,
    cache: "no-store",
    ...(body
      ? {
          headers: { "content-type": "application/json" },
          body: JSON.stringify(body),
        }
      : {}),
  });
  const data = await response.json();
  if (!response.ok) throw Error(data.error || "Không thực hiện được thao tác");
  return data;
}
export const rowKey = (row: Row) =>
  String(row.id || row.key || `${row.route}-${row.vehicle}`);
export const typeLabels: Record<string, string> = {
  hotel: "Khách sạn",
  tour: "Tour du lịch",
  combo: "Combo",
  transfer: "Xe đưa đón",
};
export const scopeLabels: Record<string, string> = {
  ...Object.fromEntries(
    scopedContent.map(([key, scope]) => [key, scope.label]),
  ),
  header: "Đầu trang",
  footer: "Chân trang",
  site: "Toàn website",
};
export const dateLabel = (value: unknown) =>
  value
    ? new Intl.DateTimeFormat("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        timeZone: "Asia/Ho_Chi_Minh",
      }).format(new Date(String(value)))
    : "—";

export const roleLabels = {
  super_admin: "Quản trị viên",
  editor: "Biên tập viên",
  booking: "Nhân viên đặt chỗ",
};
