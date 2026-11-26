"use client";

import Link from "next/link";
import { Icon } from "../primitives/admin-icon";
import { Status } from "../primitives/admin-badge";
import { Empty } from "../primitives/admin-empty";
import { money, type AdminOverviewData } from "@/lib/types";
import { typeLabels, dateLabel } from "../api";

const quickActions = [
  { href: "/admin/khach-san", icon: "hotel", title: "Quản lý khách sạn" },
  {
    href: "/admin/noi-dung/trang-chu",
    icon: "edit_note",
    title: "Sửa trang chủ",
  },
  {
    href: "/admin/xe-dua-don",
    icon: "airport_shuttle",
    title: "Cập nhật giá xe",
  },
];

export function OverviewPanel({
  data,
  loading,
  canManageBookings,
  canManageProducts,
}: {
  data: AdminOverviewData | null;
  loading: boolean;
  canManageBookings: boolean;
  canManageProducts: boolean;
}) {
  const stats = data?.stats;
  const total =
    data?.categories.reduce((sum, item) => sum + item.count, 0) ?? 0;

  return (
    <div className="ad-overview" aria-busy={loading}>
      <dl className="ad-stat-grid" aria-label="Chỉ số vận hành">
        {canManageBookings && (
          <>
            <div className="ad-stat-card ad-stat-priority">
              <dt>Đơn chờ xác nhận</dt>
              <dd className="ad-stat-value">{stats?.pending ?? "—"}</dd>
              {stats && (
                <dd className="ad-stat-meta">
                  {stats.new_today} đơn mới hôm nay
                </dd>
              )}
              <dd className="ad-stat-meta">
                <Link className="ad-text-button" href="/admin/dat-cho">
                  Mở danh sách đặt chỗ <Icon name="arrow_forward" />
                </Link>
              </dd>
            </div>
            <div className="ad-stat-card">
              <dt>Đơn hoàn tất</dt>
              <dd className="ad-stat-value">{stats?.completed ?? "—"}</dd>
              <dd className="ad-stat-meta">
                {stats ? `${stats.bookings} yêu cầu đã nhận` : "—"}
              </dd>
            </div>
            <div className="ad-stat-card">
              <dt>Giá trị đơn hoàn tất</dt>
              <dd className="ad-stat-value">
                {stats ? money(stats.revenue) : "—"}
              </dd>
              <dd className="ad-stat-meta">Theo giá trị khi xác nhận đơn</dd>
            </div>
          </>
        )}
        <div className="ad-stat-card">
          <dt>Dịch vụ đang hiển thị</dt>
          <dd className="ad-stat-value">{stats?.active_services ?? "—"}</dd>
          <dd className="ad-stat-meta">
            {stats ? `${stats.services} dịch vụ trong danh mục` : "—"}
          </dd>
        </div>
        {!canManageBookings && (
          <div className="ad-stat-card">
            <dt>Mục nội dung website</dt>
            <dd className="ad-stat-value">{stats?.content ?? "—"}</dd>
          </div>
        )}
      </dl>

      <div className="ad-overview-grid">
        {canManageBookings && (
          <section className="ad-panel">
            <div className="ad-panel-heading ad-panel-heading-between">
              <h2>Yêu cầu đặt chỗ gần đây</h2>
              <Link className="ad-text-button" href="/admin/dat-cho">
                Xem tất cả <Icon name="arrow_forward" />
              </Link>
            </div>
            {data?.bookings.length ? (
              <div
                className="ad-table-scroll"
                role="region"
                aria-label="Yêu cầu đặt chỗ gần đây"
                tabIndex={0}
              >
                <table className="ad-table ad-table-recent">
                  <thead>
                    <tr>
                      <th scope="col">Khách hàng</th>
                      <th scope="col">Dịch vụ</th>
                      <th scope="col">Trạng thái</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.bookings.map((row) => (
                      <tr key={String(row.id)}>
                        <td>
                          <strong>{String(row.customer_name)}</strong>
                          <small>{dateLabel(row.created_at)}</small>
                        </td>
                        <td className="ad-cell-service">{String(row.title)}</td>
                        <td>
                          <Status value={row.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <Empty
                icon="confirmation_number"
                title={
                  loading ? "Đang tải yêu cầu…" : "Chưa có yêu cầu đặt chỗ"
                }
              />
            )}
          </section>
        )}
        {canManageProducts && (
          <section className="ad-panel">
            <div className="ad-panel-heading ad-panel-heading-between">
              <h2>Danh mục dịch vụ</h2>
              <Link className="ad-text-button" href="/admin/khach-san">
                Xem danh mục <Icon name="arrow_forward" />
              </Link>
            </div>
            {total > 0 ? (
              <ul
                className="ad-distribution-list"
                aria-label="Dịch vụ đang hiển thị theo loại"
              >
                {data?.categories.map(({ type, count }) => (
                  <li key={type}>
                    <span>{typeLabels[type] ?? type}</span>
                    <strong>{count}</strong>
                    <span className="ad-distribution-track" aria-hidden="true">
                      <span style={{ width: `${(count / total) * 100}%` }} />
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty
                icon="luggage"
                title={
                  loading ? "Đang tải danh mục…" : "Chưa có dịch vụ hiển thị"
                }
              />
            )}
          </section>
        )}
        {canManageProducts && (
          <section className="ad-panel">
            <div className="ad-panel-heading">
              <h2>Truy cập nhanh</h2>
            </div>
            <div className="ad-quick-list">
              {quickActions.map((action) => (
                <Link key={action.href} href={action.href}>
                  <Icon name={action.icon} />
                  <span>{action.title}</span>
                  <Icon name="chevron_right" />
                </Link>
              ))}
            </div>
          </section>
        )}
        {canManageProducts && (
          <section className="ad-panel">
            <div className="ad-panel-heading">
              <h2>Cập nhật gần đây</h2>
            </div>
            {data?.updates.length ? (
              <ul className="ad-update-list">
                {data.updates.map((row) => (
                  <li key={String(row.id)}>
                    {row.image ? (
                      <img src={String(row.image)} alt="" loading="lazy" />
                    ) : (
                      <span className="ad-thumbnail">
                        <Icon name="luggage" />
                      </span>
                    )}
                    <div>
                      <strong>{String(row.title)}</strong>
                      <small>
                        {typeLabels[String(row.type)]} ·{" "}
                        {dateLabel(row.updated_at)}
                      </small>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <Empty
                icon="history"
                title={loading ? "Đang tải cập nhật…" : "Chưa có cập nhật"}
              />
            )}
          </section>
        )}
      </div>
    </div>
  );
}
