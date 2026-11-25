"use client";
import { money } from "@/lib/types";
import { Icon } from "../primitives/admin-icon";
import { Badge, Status } from "../primitives/admin-badge";
import {
  typeLabels,
  scopeLabels,
  collectionLabel,
  dateLabel,
  rowKey,
  type Row,
} from "../api";

export function ResourceTable({
  section,
  rows,
  loading,
  onEdit,
  routeLabel,
}: {
  section: string;
  rows: Row[];
  loading: boolean;
  onEdit: (r: Row) => void;
  routeLabel: (v: unknown) => string;
}) {
  const headings =
    section === "products"
      ? ["DỊCH VỤ", "LOẠI", "GIÁ BÁN", "TRẠNG THÁI", "VỊ TRÍ"]
      : section === "content"
        ? ["NỘI DUNG", "TRANG", "LOẠI NỘI DUNG", "CẬP NHẬT"]
        : section === "fares"
          ? ["TUYẾN ĐƯỜNG", "LOẠI XE", "GIÁ MỖI CHUYẾN"]
          : section === "bookings"
            ? ["KHÁCH HÀNG", "DỊCH VỤ", "NGÀY SỬ DỤNG", "TRẠNG THÁI"]
            : [];

  return (
    <div
      className="ad-table-scroll"
      role="region"
      aria-label="Bảng dữ liệu"
      tabIndex={0}
    >
      <table className={`ad-table ad-table-${section}`}>
        <thead>
          <tr>
            {headings.map((h) => (
              <th key={h}>{h}</th>
            ))}
            <th>
              <span className="sr-only">Thao tác</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {loading
            ? Array.from({ length: 4 }, (_, i) => (
                <tr key={i}>
                  {[...headings, "action"].map((h, k) => (
                    <td key={h}>
                      <span
                        className={`ad-skeleton ${k === 0 ? "ad-skeleton-wide" : ""}`}
                      />
                    </td>
                  ))}
                </tr>
              ))
            : rows.map((row) => (
                <tr key={rowKey(row)}>
                  {section === "products" ? (
                    <>
                      <td>
                        <div className="ad-product-cell">
                          {row.image ? (
                            <img
                              src={String(row.image)}
                              alt=""
                              loading="lazy"
                            />
                          ) : (
                            <span className="ad-thumbnail">
                              <Icon name="luggage" />
                            </span>
                          )}
                          <div>
                            <button
                              type="button"
                              className="ad-row-title"
                              onClick={() => onEdit(row)}
                            >
                              {String(row.title)}
                            </button>
                            <small>
                              <Icon name="location_on" />
                              {String(row.location || "Chưa cập nhật địa điểm")}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className={`ad-type ad-type-${row.type}`}>
                          {typeLabels[String(row.type)] || String(row.type)}
                        </span>
                      </td>
                      <td>
                        {row.original_price &&
                        Number(row.original_price) > Number(row.price) ? (
                          <small className="ad-old-price">
                            {money(Number(row.original_price))}
                          </small>
                        ) : null}
                        <strong className="ad-price">
                          {money(Number(row.price))}
                        </strong>
                      </td>
                      <td>
                        <Badge tone={row.active ? "green" : "neutral"}>
                          {row.active ? "Đang hiển thị" : "Bản nháp / Ẩn"}
                        </Badge>
                      </td>
                      <td className="ad-cell-muted">
                        {collectionLabel(row.collection_id)}
                      </td>
                    </>
                  ) : section === "content" ? (
                    <>
                      <td>
                        <div className="ad-content-cell">
                          <span className="ad-file-icon">
                            <Icon
                              name={
                                row.kind === "text"
                                  ? "notes"
                                  : row.kind === "settings"
                                    ? "tune"
                                    : "link"
                              }
                            />
                          </span>
                          <div>
                            <button
                              type="button"
                              className="ad-row-title"
                              onClick={() => onEdit(row)}
                            >
                              {String(row.label).replace(/\s+/g, " ")}
                            </button>
                            <small>
                              {row.kind === "text"
                                ? String(row.value).replace(/\s+/g, " ")
                                : row.kind === "settings"
                                  ? "Cấu hình hiển thị và thông tin dùng chung"
                                  : "Liên kết, ảnh và các thuộc tính hiển thị"}
                            </small>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="ad-scope">
                          {scopeLabels[String(row.scope)] || String(row.scope)}
                        </span>
                      </td>
                      <td className="ad-cell-muted">
                        {row.kind === "text"
                          ? "Văn bản"
                          : row.kind === "settings"
                            ? "Cấu hình"
                            : "Thuộc tính"}
                      </td>
                      <td className="ad-cell-muted">
                        {dateLabel(row.updated_at)}
                      </td>
                    </>
                  ) : section === "fares" ? (
                    <>
                      <td>
                        <div className="ad-content-cell">
                          <span className="ad-file-icon">
                            <Icon name="route" />
                          </span>
                          <button
                            type="button"
                            className="ad-row-title"
                            onClick={() => onEdit(row)}
                          >
                            {routeLabel(row.route)}
                          </button>
                        </div>
                      </td>
                      <td>
                        <span className="ad-scope">
                          {row.vehicle === "limo9"
                            ? "Limousine 9 chỗ"
                            : `Xe ${String(row.vehicle).replace("cho", " chỗ")}`}
                        </span>
                      </td>
                      <td>
                        <strong className="ad-price">
                          {money(Number(row.price))}
                        </strong>
                      </td>
                    </>
                  ) : section === "bookings" ? (
                    <>
                      <td>
                        <button
                          type="button"
                          className="ad-row-title"
                          onClick={() => onEdit(row)}
                        >
                          {String(row.customer_name)}
                        </button>
                        <small>{String(row.phone)}</small>
                      </td>
                      <td className="ad-cell-service">{String(row.title)}</td>
                      <td className="ad-cell-muted">
                        {dateLabel(row.departure_date)}
                      </td>
                      <td>
                        <Status value={row.status} />
                      </td>
                    </>
                  ) : null}
                  <td>
                    <button
                      type="button"
                      className="ad-icon-button ad-edit-button"
                      aria-label={`Chỉnh sửa ${String(row.title || row.label || row.email || routeLabel(row.route))}`}
                      onClick={() => onEdit(row)}
                    >
                      <Icon name="edit_square" />
                    </button>
                  </td>
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
}
