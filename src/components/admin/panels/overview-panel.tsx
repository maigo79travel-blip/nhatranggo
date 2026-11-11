"use client";
import { Icon } from "../ui/admin-icon";
import { Status } from "../ui/admin-badge";
import { Empty } from "../ui/admin-empty";
import { typeLabels, dateLabel, type Row } from "../api";

export type OverviewData = {
  stats: Record<string, number>;
  categories: { type: string; count: number }[];
  bookings: Row[];
  updates: Row[];
};

export function OverviewPanel({
  data,
  loading,
  syncedAt,
  navigate,
  onRefresh,
}: {
  data: OverviewData | null;
  loading: boolean;
  syncedAt: string;
  navigate: (s: string) => void;
  onRefresh: () => void;
}) {
  const cards = [
    {
      title: "Dịch vụ đang hiển thị",
      value: data?.stats.active_services,
      subtitle: data
        ? `${data.stats.services} dịch vụ trong danh mục`
        : "Đang tải dữ liệu",
      icon: "luggage",
      section: "products",
      tone: "blue",
    },
    {
      title: "Yêu cầu đặt chỗ",
      value: data?.stats.bookings,
      subtitle: data
        ? `${data.stats.pending} yêu cầu chờ xác nhận`
        : "Đang tải dữ liệu",
      icon: "confirmation_number",
      section: "bookings",
      tone: "teal",
    },
    {
      title: "Nội dung website",
      value: data?.stats.content,
      subtitle: "Nội dung trên toàn bộ website",
      icon: "article",
      section: "content",
      tone: "purple",
    },
    {
      title: "Email nhận ưu đãi",
      value: data?.stats.subscribers,
      subtitle: "Khách hàng đã đăng ký",
      icon: "mark_email_read",
      section: "subscribers",
      tone: "amber",
    },
  ];
  const total = data?.categories.reduce((sum, c) => sum + c.count, 0) || 0;

  return (
    <>
      <div className="ad-stat-grid">
        {cards.map((card) => (
          <button
            type="button"
            key={card.title}
            className={`ad-stat-card ad-stat-${card.tone}`}
            onClick={() => navigate(card.section)}
          >
            <div>
              <span className="ad-stat-label">{card.title}</span>
              <span className="ad-stat-icon">
                <Icon name={card.icon} />
              </span>
            </div>
            <strong>{card.value ?? "—"}</strong>
            <div>
              <small>{card.subtitle}</small>
              <Icon name="arrow_forward" />
            </div>
          </button>
        ))}
      </div>
      <section className="ad-welcome">
        <div>
          <span className="ad-welcome-symbol">
            <Icon name="explore" />
          </span>
          <div>
            <h2>Một trải nghiệm tốt bắt đầu từ sự chăm chút.</h2>
            <p>Cập nhật dịch vụ và nội dung để mỗi hành trình luôn sẵn sàng.</p>
          </div>
        </div>
        <button type="button" onClick={() => navigate("products")}>
          Quản lý dịch vụ
          <Icon name="arrow_forward" />
        </button>
      </section>
      <div className="ad-overview-grid">
        <section className="ad-panel">
          <div className="ad-panel-heading ad-panel-heading-between">
            <div>
              <h2>Yêu cầu đặt chỗ gần đây</h2>
              <p>Đồng hành cùng khách hàng từ bước đầu tiên.</p>
            </div>
            <button
              type="button"
              className="ad-text-button"
              onClick={() => navigate("bookings")}
            >
              Xem tất cả
              <Icon name="arrow_forward" />
            </button>
          </div>
          {data?.bookings.length ? (
            <div className="ad-table-scroll">
              <table className="ad-table">
                <thead>
                  <tr>
                    <th>KHÁCH HÀNG</th>
                    <th>DỊCH VỤ</th>
                    <th>TRẠNG THÁI</th>
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
              title={loading ? "Đang tải yêu cầu…" : "Chưa có yêu cầu đặt chỗ"}
              text="Các yêu cầu mới từ website sẽ được tập hợp tại đây."
            />
          )}
        </section>
        <section className="ad-panel ad-distribution">
          <div className="ad-panel-heading">
            <div>
              <h2>Danh mục dịch vụ</h2>
              <p>Các dịch vụ đang hiển thị trên website.</p>
            </div>
          </div>
          <div className="ad-distribution-total">
            <strong>{data ? total : "—"}</strong>
            <span>dịch vụ đang hiển thị</span>
            <span className="ad-distribution-icon">
              <Icon name="travel_explore" />
            </span>
          </div>
          <div className="ad-stacked-bar">
            {data?.categories.map((item) => (
              <span
                key={item.type}
                className={`ad-bar-${item.type}`}
                style={{ width: `${total ? (item.count / total) * 100 : 0}%` }}
              />
            ))}
          </div>
          <div className="ad-distribution-list">
            {data?.categories.map((item) => (
              <button
                type="button"
                onClick={() => navigate("products")}
                key={item.type}
              >
                <span>
                  <i className={`ad-bar-${item.type}`} />
                  {typeLabels[item.type]}
                </span>
                <strong>
                  {item.count}
                  <small>
                    {total ? Math.round((item.count / total) * 100) : 0}%
                  </small>
                </strong>
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="ad-overview-grid ad-overview-bottom">
        <section className="ad-panel">
          <div className="ad-panel-heading">
            <div>
              <h2>Truy cập nhanh</h2>
              <p>Những công việc thường ngày, ngay trong tầm tay.</p>
            </div>
          </div>
          <div className="ad-quick-grid">
            {[
              {
                id: "products",
                icon: "edit_location_alt",
                title: "Chăm chút dịch vụ",
                text: "Cập nhật thông tin và ưu đãi",
              },
              {
                id: "content",
                icon: "edit_note",
                title: "Làm mới nội dung",
                text: "Tiêu đề, hình ảnh và thông tin",
              },
              {
                id: "fares",
                icon: "airport_shuttle",
                title: "Điều chỉnh giá xe",
                text: "Giá theo tuyến và loại xe",
              },
            ].map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
              >
                <span>
                  <Icon name={item.icon} />
                </span>
                <strong>{item.title}</strong>
                <small>{item.text}</small>
                <Icon name="arrow_forward" />
              </button>
            ))}
          </div>
        </section>
        <section className="ad-panel">
          <div className="ad-panel-heading ad-panel-heading-between">
            <div>
              <h2>Cập nhật gần đây</h2>
              <p>Những dịch vụ vừa được chỉnh sửa.</p>
            </div>
            <button
              type="button"
              className="ad-icon-button"
              aria-label="Làm mới tổng quan"
              disabled={loading}
              onClick={onRefresh}
            >
              <Icon name="refresh" />
            </button>
          </div>
          <div className="ad-update-list">
            {data?.updates.map((row) => (
              <button
                type="button"
                key={String(row.id)}
                onClick={() => navigate("products")}
              >
                {row.image ? (
                  <img src={String(row.image)} alt="" />
                ) : (
                  <span className="ad-thumbnail">
                    <Icon name="luggage" />
                  </span>
                )}
                <span>
                  <strong>{String(row.title)}</strong>
                  <small>
                    {typeLabels[String(row.type)]} · {dateLabel(row.updated_at)}
                  </small>
                </span>
                <Icon name="chevron_right" />
              </button>
            ))}
          </div>
        </section>
      </div>
      <div className="ad-sync-line">
        <Icon name="sync" />
        {syncedAt
          ? `Đồng bộ gần nhất lúc ${syncedAt}`
          : "Đang tải thông tin tổng quan…"}
      </div>
    </>
  );
}
