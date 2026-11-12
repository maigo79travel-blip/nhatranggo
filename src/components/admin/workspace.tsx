"use client";

import brand from "@/config/brand.json";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { api, rowKey, scopeLabels, type Row } from "./api";
import {
  ProductEditor,
  ContentEditor,
  AccountEditor,
  Field,
  Save,
} from "./editors";
import { useSiteData } from "../content";
import type { Product, AdminUser, AdminOverviewData } from "@/lib/types";
import "./admin.css";
import { resources } from "@/modules/admin/resources";
import { ModulePanel } from "@/modules/admin/module-panel";
import { ManualBooking } from "@/modules/bookings/manual-booking";
import { FareCreate } from "@/modules/travel/fare-create";
import { canAccess } from "@/modules/admin/permissions";

// UI sub-components
import { Icon } from "./ui/admin-icon";
import { Badge } from "./ui/admin-badge";
import { Brand } from "./ui/admin-brand";
import { Filter } from "./ui/admin-filter";
import { Empty } from "./ui/admin-empty";
import { EditorDrawer } from "./ui/editor-drawer";

// Panels
import { OverviewPanel } from "./panels/overview-panel";
import { ResourceTable } from "./panels/resource-table";
import { BookingEditor } from "./panels/booking-editor";
import { Login } from "./panels/login-form";

const sections = [
  {
    id: "overview",
    label: "Tổng quan",
    icon: "space_dashboard",
    description: "Mọi hoạt động, trong một góc nhìn.",
  },
  {
    id: "bookings",
    label: "Đặt chỗ",
    icon: "confirmation_number",
    description: "Theo dõi và xử lý yêu cầu của khách hàng.",
  },
  {
    id: "products",
    label: "Dịch vụ",
    icon: "luggage",
    description: "Quản lý khách sạn, tour du lịch và các gói combo.",
  },
  {
    id: "fares",
    label: "Bảng giá xe",
    icon: "airport_shuttle",
    description: "Cập nhật giá theo tuyến đường và loại xe.",
  },
  {
    id: "content",
    label: "Nội dung website",
    icon: "article",
    description: "Chăm chút từng nội dung trên website của bạn.",
  },
  {
    id: "account",
    label: "Tài khoản",
    icon: "manage_accounts",
    description: "Quản lý thông tin đăng nhập và bảo mật.",
  },
];

const allSections = [
  ...sections,
  ...Object.entries(resources).map(([id, resource]) => ({
    id,
    label: resource.label,
    icon: resource.icon,
    description: "Quản lý dữ liệu " + resource.label.toLowerCase(),
  })),
];
const PAGE_SIZE = 10;

export function AdminWorkspace({ user }: { user: AdminUser | null }) {
  const router = useRouter();
  const site = useSiteData();
  const [section, setSection] = useState("overview");
  const [overview, setOverview] = useState<AdminOverviewData | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [manualBooking, setManualBooking] = useState(false);
  const [newFare, setNewFare] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [stateFilter, setStateFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState<{ text: string; error: boolean } | null>(
    null,
  );
  const [syncedAt, setSyncedAt] = useState("");
  const requestId = useRef(0);
  const modalOpen = Boolean(selected) || creating || manualBooking || newFare;

  useEffect(() => {
    if (!modalOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modalOpen]);

  useEffect(() => {
    document.body.dataset.adminReady = "true";
    return () => {
      delete document.body.dataset.adminReady;
    };
  }, []);

  const notify = (text: string, error = false) => setNotice({ text, error });

  const refreshOverview = useCallback(async () => {
    if (!user) return;
    const result = await api("overview");
    setOverview(result.data);
    setSyncedAt(
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [user]);

  const load = useCallback(async () => {
    const current = ++requestId.current;
    if (!user || section === "account" || resources[section]) return;
    setLoading(true);
    try {
      if (section === "overview") await refreshOverview();
      else {
        const result = await api(section);
        if (current === requestId.current) setRows(result.data);
      }
    } catch (error) {
      if (current === requestId.current) notify((error as Error).message, true);
    } finally {
      if (current === requestId.current) setLoading(false);
    }
  }, [section, user, refreshOverview]);

  useEffect(() => {
    setRows([]);
    setSelected(null);
    setQuery("");
    setFilter("all");
    setStateFilter("all");
    setPage(1);
    void load();
    return () => {
      requestId.current++;
    };
  }, [load]);

  useEffect(() => {
    if (user && section !== "overview") void refreshOverview().catch(() => {});
  }, [user, section, refreshOverview]);

  useEffect(() => {
    setPage(1);
  }, [query, filter, stateFilter]);

  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(null), 6500);
    return () => clearTimeout(timer);
  }, [notice]);

  const navigate = (id: string) => {
    if (user && !canAccess(user, id)) {
      notify("Bạn không có quyền vào mục này", true);
      return;
    }
    setSection(id);
    setMenuOpen(false);
    setSelected(null);
    setNotice(null);
  };

  const current = allSections.find((item) => item.id === section)!;

  async function save(body: unknown) {
    setSaving(true);
    try {
      const result = await api(section, "PATCH", body);
      setRows((old) =>
        old.map((row) =>
          rowKey(row) === rowKey(result.data)
            ? { ...row, ...result.data }
            : row,
        ),
      );
      setSelected(null);
      notify("Đã lưu thay đổi. Website đã sẵn sàng hiển thị nội dung mới.");
      void refreshOverview().catch(() => {});
      router.refresh();
    } catch (error) {
      notify((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }

  async function logout() {
    try {
      await api("session", "DELETE");
      router.refresh();
    } catch (error) {
      notify((error as Error).message, true);
    }
  }

  if (!user) return <Login />;

  const baseRows = rows.filter(
    (row) => !(section === "products" && row.type === "transfer"),
  );
  const filtered = baseRows.filter(
    (row) =>
      JSON.stringify(row).toLowerCase().includes(query.trim().toLowerCase()) &&
      (filter === "all" ||
        String(
          section === "content"
            ? row.scope
            : section === "fares"
              ? row.vehicle
              : section === "bookings"
                ? row.status
                : row.type,
        ) === filter) &&
      (stateFilter === "all" ||
        Boolean(row.active) === (stateFilter === "active")),
  );
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const actualPage = Math.min(page, pageCount);
  const visible = filtered.slice(
    (actualPage - 1) * PAGE_SIZE,
    actualPage * PAGE_SIZE,
  );

  const pointKeys: Record<string, string> = {
    CXR: "transfers.text-040",
    NT_CENTER: "transfers.text-041",
    BAI_DAI: "transfers.text-042",
    DALAT: "transfers.text-043",
    DOC_LET: "transfers.text-049",
    TUY_HOA: "transfers.text-051",
  };

  function routeLabel(value: unknown) {
    const route = String(value);
    const origin = Object.keys(pointKeys).find((code) =>
      route.startsWith(code + "_"),
    );
    if (!origin) return route;
    const destination = route.slice(origin.length + 1);
    const label = (code: string) =>
      String(site.content[pointKeys[code]]?.value || code).trim();
    return `${label(origin)} → ${label(destination)}`;
  }

  const heading = selected
    ? section === "products"
      ? "Chỉnh sửa dịch vụ"
      : section === "content"
        ? "Chỉnh sửa nội dung"
        : section === "fares"
          ? "Cập nhật giá xe"
          : section === "bookings"
            ? "Chi tiết đặt chỗ"
            : "Thông tin đăng ký"
    : "";

  return (
    <div className="admin-ui ad-app">
      {menuOpen && (
        <button
          type="button"
          className="ad-nav-shade"
          aria-label="Đóng menu"
          onClick={() => setMenuOpen(false)}
        />
      )}
      <aside className={`ad-sidebar ${menuOpen ? "is-open" : ""}`}>
        <Brand light />
        <span className="ad-nav-caption">KHÔNG GIAN LÀM VIỆC</span>
        <nav aria-label="Điều hướng quản trị">
          {allSections
            .filter((s) => s.id !== "account" && canAccess(user, s.id))
            .map((item) => (
              <button
                type="button"
                key={item.id}
                onClick={() => navigate(item.id)}
                aria-current={section === item.id ? "page" : undefined}
                className={`ad-nav-item ${section === item.id ? "is-active" : ""}`}
              >
                <Icon name={item.icon} />
                <span>{item.label}</span>
                {item.id === "bookings" && Boolean(overview?.stats.pending) && (
                  <b className="ad-nav-count">{overview?.stats.pending}</b>
                )}
                {section === item.id && <span className="ad-nav-active-dot" />}
              </button>
            ))}
        </nav>
        <span className="ad-nav-caption ad-settings-caption">CÀI ĐẶT</span>
        <button
          type="button"
          className={`ad-nav-item ${section === "account" ? "is-active" : ""}`}
          aria-current={section === "account" ? "page" : undefined}
          onClick={() => navigate("account")}
        >
          <Icon name="settings" />
          <span>Tài khoản & bảo mật</span>
        </button>
        <div className="ad-sidebar-bottom">
          <div className="ad-website-card">
            <span className="ad-site-icon">
              <Icon name="public" />
            </span>
            <strong>Website của bạn</strong>
            <p>Một điểm chạm, ngàn hành trình.</p>
            <a href="/" target="_blank" rel="noopener">
              Mở website
              <Icon name="arrow_outward" />
            </a>
          </div>
          <div className="ad-user">
            <span className="ad-avatar">
              {user.username.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <strong>{user.username}</strong>
              <small>Quản trị viên</small>
            </div>
            <button
              type="button"
              className="ad-icon-button"
              aria-label="Đăng xuất"
              title="Đăng xuất"
              onClick={() => void logout()}
            >
              <Icon name="logout" />
            </button>
          </div>
        </div>
      </aside>
      <div className="ad-main">
        <header className="ad-topbar">
          <div className="ad-topbar-left">
            <button
              type="button"
              className="ad-icon-button ad-mobile-toggle"
              aria-label="Mở menu quản trị"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(!menuOpen)}
            >
              <Icon name="menu" />
            </button>
            <span className="ad-breadcrumb">
              Không gian quản trị
              <Icon name="chevron_right" />
              <strong>{current.label}</strong>
            </span>
          </div>
          <div className="ad-topbar-right">
            <a
              className="ad-topbar-site"
              href="/"
              target="_blank"
              rel="noopener"
            >
              <Icon name="open_in_new" />
              Xem website
            </a>
            <span className="ad-topbar-divider" />
            <button
              type="button"
              className="ad-profile-button"
              aria-label="Thông tin tài khoản"
              onClick={() => navigate("account")}
            >
              <span className="ad-avatar ad-avatar-small">
                {user.username.slice(0, 1).toUpperCase()}
              </span>
              <span>{user.username}</span>
              <Icon name="expand_more" />
            </button>
          </div>
        </header>
        <main className="ad-content">
          {section === "bookings" && (
            <div className="flex flex-wrap gap-3 mb-4">
              <button
                type="button"
                className="ad-button ad-button-primary"
                onClick={() => setManualBooking(true)}
              >
                Tạo đơn thủ công
              </button>
              <a className="ad-button" href="/api/admin/booking-export">
                Xuất CSV (Excel)
              </a>
            </div>
          )}
          {section === "fares" && (
            <button
              type="button"
              className="ad-button ad-button-primary mb-4"
              onClick={() => setNewFare(true)}
            >
              Thêm mức giá
            </button>
          )}
          <div className="ad-page-heading">
            <div>
              <div className="ad-eyebrow">{brand.name.toUpperCase()} ADMIN</div>
              <h1>{current.label}</h1>
              <p>
                {section === "overview"
                  ? `Chào ${user.username}, chúc bạn một ngày làm việc hiệu quả.`
                  : current.description}
              </p>
            </div>
            <div className="ad-heading-actions">
              {section === "overview" ? (
                <span className="ad-date">
                  <Icon name="calendar_today" />
                  {new Intl.DateTimeFormat("vi-VN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                    timeZone: "Asia/Ho_Chi_Minh",
                  }).format(new Date())}
                </span>
              ) : section === "products" ? (
                <button
                  type="button"
                  className="ad-button ad-button-primary"
                  onClick={() => setCreating(true)}
                >
                  <Icon name="add" />
                  Thêm dịch vụ
                </button>
              ) : (
                <button
                  type="button"
                  className="ad-button ad-button-secondary"
                  disabled={loading}
                  onClick={() => void load()}
                >
                  <Icon name="refresh" />
                  Làm mới dữ liệu
                </button>
              )}
            </div>
          </div>
          {resources[section] ? (
            <ModulePanel key={section} resource={section} />
          ) : section === "overview" ? (
            <OverviewPanel
              data={overview}
              loading={loading}
              syncedAt={syncedAt}
              navigate={navigate}
              onRefresh={() => void load()}
            />
          ) : section === "account" ? (
            <div className="ad-account-layout">
              <section className="ad-panel ad-account-card">
                <div className="ad-panel-heading">
                  <span className="ad-heading-icon">
                    <Icon name="lock" />
                  </span>
                  <div>
                    <h2>Bảo mật tài khoản</h2>
                    <p>Cập nhật mật khẩu để bảo vệ không gian quản trị.</p>
                  </div>
                </div>
                <AccountEditor onMessage={(text) => notify(text)} />
              </section>
              <aside className="ad-panel ad-account-info">
                <span className="ad-avatar ad-avatar-large">
                  {user.username.slice(0, 1).toUpperCase()}
                </span>
                <h2>{user.username}</h2>
                <Badge tone="green">Quản trị viên</Badge>
                <dl>
                  <dt>Quyền truy cập</dt>
                  <dd>Quản lý toàn bộ nội dung</dd>
                  <dt>Thời hạn phiên đăng nhập</dt>
                  <dd>8 giờ</dd>
                </dl>
                <p>
                  <Icon name="verified_user" />
                  Đổi mật khẩu sẽ kết thúc các phiên đăng nhập hiện tại.
                </p>
              </aside>
            </div>
          ) : (
            <section className="ad-panel">
              <div className="ad-resource-heading">
                <div>
                  <h2>
                    {section === "products"
                      ? "Danh sách dịch vụ"
                      : section === "content"
                        ? "Thư viện nội dung"
                        : section === "bookings"
                          ? "Yêu cầu đặt chỗ"
                          : section === "fares"
                            ? "Giá xe niêm yết"
                            : "Khách hàng đăng ký"}
                    <span className="ad-count">{baseRows.length}</span>
                  </h2>
                  <p>
                    {section === "products"
                      ? "Tất cả dịch vụ, được tổ chức trong một danh sách."
                      : section === "content"
                        ? "Tìm và cập nhật nội dung tại từng vị trí trên website."
                        : section === "fares"
                          ? "Bảng giá và báo giá trực tuyến luôn được đồng bộ."
                          : "Thông tin mới nhất được hiển thị ở đầu danh sách."}
                  </p>
                </div>
                <button
                  type="button"
                  className="ad-icon-button"
                  aria-label="Tải lại dữ liệu"
                  title="Tải lại dữ liệu"
                  disabled={loading}
                  onClick={() => void load()}
                >
                  <Icon name="refresh" />
                </button>
              </div>
              <div className="ad-toolbar">
                <label className="ad-search">
                  <Icon name="search" />
                  <input
                    aria-label="Tìm dữ liệu"
                    placeholder={
                      section === "products"
                        ? "Tìm tên dịch vụ, địa điểm…"
                        : section === "content"
                          ? "Tìm nội dung, từ khóa hoặc mã…"
                          : "Tìm trong danh sách…"
                    }
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query && (
                    <button
                      type="button"
                      aria-label="Xóa tìm kiếm"
                      onClick={() => setQuery("")}
                    >
                      <Icon name="close" />
                    </button>
                  )}
                </label>
                {section === "products" && (
                  <>
                    <Filter
                      label="Loại dịch vụ"
                      value={filter}
                      onChange={setFilter}
                      options={[
                        ["all", "Tất cả loại dịch vụ"],
                        ["hotel", "Khách sạn"],
                        ["tour", "Tour du lịch"],
                        ["combo", "Combo"],
                      ]}
                    />
                    <Filter
                      label="Trạng thái hiển thị"
                      value={stateFilter}
                      onChange={setStateFilter}
                      options={[
                        ["all", "Tất cả trạng thái"],
                        ["active", "Đang hiển thị"],
                        ["inactive", "Bản nháp / Đã ẩn"],
                      ]}
                    />
                  </>
                )}
                {section === "content" && (
                  <Filter
                    label="Khu vực nội dung"
                    value={filter}
                    onChange={setFilter}
                    options={[
                      ["all", "Tất cả trang"],
                      ...[...new Set(baseRows.map((r) => String(r.scope)))].map(
                        (scope) => [scope, scopeLabels[scope] || scope],
                      ),
                    ]}
                  />
                )}
                {section === "bookings" && (
                  <Filter
                    label="Trạng thái đặt chỗ"
                    value={filter}
                    onChange={setFilter}
                    options={[
                      ["all", "Tất cả trạng thái"],
                      ["pending", "Chờ xác nhận"],
                      ["confirmed", "Đã xác nhận"],
                      ["cancelled", "Đã hủy"],
                    ]}
                  />
                )}
                {section === "fares" && (
                  <Filter
                    label="Loại xe"
                    value={filter}
                    onChange={setFilter}
                    options={[
                      ["all", "Tất cả loại xe"],
                      ["4cho", "Xe 4 chỗ"],
                      ["7cho", "Xe 7 chỗ"],
                      ["16cho", "Xe 16 chỗ"],
                      ["limo9", "Limousine 9 chỗ"],
                    ]}
                  />
                )}
                <span className="ad-result-count">
                  {filtered.length} kết quả
                </span>
              </div>
              <ResourceTable
                section={section}
                rows={visible}
                loading={loading}
                onEdit={setSelected}
                routeLabel={routeLabel}
              />
              {!loading && !visible.length && (
                <Empty
                  icon={query ? "search_off" : current.icon}
                  title={
                    query || filter !== "all" || stateFilter !== "all"
                      ? "Không tìm thấy kết quả phù hợp"
                      : "Danh sách đang trống"
                  }
                  text={
                    query || filter !== "all" || stateFilter !== "all"
                      ? "Thử từ khóa khác hoặc điều chỉnh bộ lọc."
                      : "Dữ liệu mới sẽ xuất hiện tại đây khi có phát sinh."
                  }
                >
                  {(query || filter !== "all" || stateFilter !== "all") && (
                    <button
                      type="button"
                      className="ad-text-button"
                      onClick={() => {
                        setQuery("");
                        setFilter("all");
                        setStateFilter("all");
                      }}
                    >
                      Xóa bộ lọc
                    </button>
                  )}
                </Empty>
              )}
              <div className="ad-pagination">
                <p>
                  {filtered.length
                    ? `Hiển thị ${(actualPage - 1) * PAGE_SIZE + 1}–${Math.min(actualPage * PAGE_SIZE, filtered.length)} trong ${filtered.length} kết quả`
                    : "Chưa có kết quả"}
                </p>
                <div>
                  <button
                    type="button"
                    className="ad-page-button"
                    disabled={actualPage === 1}
                    aria-label="Trang trước"
                    onClick={() => setPage((p) => p - 1)}
                  >
                    <Icon name="chevron_left" />
                  </button>
                  {Array.from({ length: Math.min(pageCount, 5) }, (_, i) => {
                    const value =
                      Math.max(1, Math.min(actualPage - 2, pageCount - 4)) + i;
                    return (
                      <button
                        type="button"
                        key={value}
                        aria-label={`Trang ${value}`}
                        aria-current={value === actualPage ? "page" : undefined}
                        className={`ad-page-button ${actualPage === value ? "is-active" : ""}`}
                        onClick={() => setPage(value)}
                      >
                        {value}
                      </button>
                    );
                  })}
                  <button
                    type="button"
                    className="ad-page-button"
                    disabled={actualPage === pageCount}
                    aria-label="Trang sau"
                    onClick={() => setPage((p) => p + 1)}
                  >
                    <Icon name="chevron_right" />
                  </button>
                </div>
              </div>
            </section>
          )}
          <footer className="ad-footer">
            <span>
              {brand.name}
              <span className="ad-footer-dot">·</span>Không gian quản trị
            </span>
            <span>
              <i className={overview ? "is-connected" : ""} />
              {overview ? "Dữ liệu đã đồng bộ" : "Đang kết nối dữ liệu"}
            </span>
          </footer>
        </main>
      </div>
      {notice && !(notice.error && (selected || creating)) && (
        <div
          role={notice.error ? "alert" : "status"}
          className={`ad-toast ${notice.error ? "ad-toast-error" : ""}`}
        >
          <Icon name={notice.error ? "error" : "check_circle"} />
          <span>{notice.text}</span>
          <button
            type="button"
            className="ad-icon-button"
            aria-label="Đóng thông báo"
            onClick={() => setNotice(null)}
          >
            <Icon name="close" />
          </button>
        </div>
      )}
      <EditorDrawer
        open={Boolean(selected)}
        title={heading}
        onClose={() => setSelected(null)}
        saveForm={selected ? "ad-record-form" : undefined}
        busy={saving}
      >
        {notice?.error && (
          <div className="ad-form-error" role="alert">
            {notice.text}
          </div>
        )}
        {selected &&
          (section === "products" ? (
            <>
              <ProductEditor
                key={String(selected.id)}
                product={selected as unknown as Product}
                busy={saving}
                onSave={save}
              />
              <button
                type="button"
                className="ad-button mt-4"
                onClick={async () => {
                  try {
                    await api("products", "DELETE", { id: selected.id });
                    setSelected(null);
                    void load();
                    router.refresh();
                  } catch (e) {
                    notify((e as Error).message, true);
                  }
                }}
              >
                Ẩn / Lưu trữ dịch vụ
              </button>
            </>
          ) : section === "content" ? (
            <ContentEditor
              key={String(selected.key)}
              row={selected}
              busy={saving}
              onSave={save}
            />
          ) : section === "fares" ? (
            <form
              className="ad-editor"
              id="ad-record-form"
              onSubmit={(e) => {
                e.preventDefault();
                void save({
                  ...selected,
                  price: Number(new FormData(e.currentTarget).get("price")),
                });
              }}
            >
              <div className="ad-route-preview">
                <Icon name="route" />
                <h2>{routeLabel(selected.route)}</h2>
                <Badge tone="blue">
                  {selected.vehicle === "limo9"
                    ? "Limousine 9 chỗ"
                    : String(selected.vehicle).replace("cho", " chỗ")}
                </Badge>
              </div>
              <Field
                label="Giá mỗi chuyến (VND)"
                name="price"
                type="number"
                min={0}
                required
                defaultValue={Number(selected.price)}
              />
              <div className="ad-form-note">
                <Icon name="sync" />
                Giá mới được áp dụng đồng thời cho bảng niêm yết và báo giá trực
                tuyến. Yêu cầu đã gửi giữ nguyên giá đã ghi nhận.
              </div>
              <Save busy={saving} />
            </form>
          ) : section === "bookings" ? (
            <BookingEditor row={selected} busy={saving} onSave={save} />
          ) : null)}
      </EditorDrawer>
      <EditorDrawer
        open={manualBooking}
        title="Tạo booking thủ công"
        onClose={() => {
          setManualBooking(false);
          void load();
        }}
      >
        {manualBooking && <ManualBooking />}
      </EditorDrawer>
      <EditorDrawer
        open={newFare}
        title="Thêm mức giá xe"
        onClose={() => setNewFare(false)}
      >
        {newFare && (
          <FareCreate
            onSaved={() => {
              setNewFare(false);
              void load();
              router.refresh();
            }}
          />
        )}
      </EditorDrawer>
      <EditorDrawer
        open={creating}
        title="Thêm dịch vụ mới"
        onClose={() => setCreating(false)}
        compact
      >
        {notice?.error && (
          <div className="ad-form-error" role="alert">
            {notice.text}
          </div>
        )}
        <div className="ad-form-note">
          <Icon name="info" />
          Chọn một mẫu có sẵn hoặc tạo dịch vụ mới. Dịch vụ được lưu thành bản
          nháp để bạn hoàn thiện trước khi hiển thị.
        </div>
        <form
          className="ad-editor"
          onSubmit={async (e) => {
            e.preventDefault();
            const form = e.currentTarget;
            setSaving(true);
            try {
              const result = await api(
                "products",
                "POST",
                Object.fromEntries(new FormData(form)),
              );
              setRows((old) => [...old, result.data]);
              setCreating(false);
              setSelected(result.data);
              setQuery("");
              setFilter("all");
              setStateFilter("all");
              notify(
                "Đã tạo bản nháp. Hoàn thiện thông tin và bật hiển thị khi sẵn sàng.",
              );
              void refreshOverview().catch(() => {});
            } catch (error) {
              notify((error as Error).message, true);
            } finally {
              setSaving(false);
            }
          }}
        >
          <label className="ad-field">
            Mẫu bố cục
            <select className="ad-input" name="cloneId" defaultValue="">
              <option value="" disabled>
                Tạo dịch vụ mới (không cần mẫu)
              </option>
              {baseRows
                .filter((r) => r.template_id)
                .map((row) => (
                  <option key={String(row.id)} value={String(row.id)}>
                    {String(row.title)}
                  </option>
                ))}
            </select>
          </label>
          <label className="ad-field">
            Loại dịch vụ
            <select className="ad-input" name="type">
              <option value="hotel">Khách sạn</option>
              <option value="tour">Tour</option>
              <option value="combo">Combo</option>
            </select>
          </label>
          <Field
            label="Tên dịch vụ mới"
            name="title"
            required
            minLength={2}
            placeholder="Nhập tên khách sạn, tour hoặc combo…"
          />
          <button
            type="submit"
            className="ad-button ad-button-primary ad-full-width"
            disabled={saving}
          >
            <Icon name="add" />
            {saving ? "Đang tạo…" : "Tạo bản nháp"}
          </button>
        </form>
      </EditorDrawer>
    </div>
  );
}
