"use client";

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
import { useSiteData } from "@/components/content";
import { CustomSelect } from "@/components/ui/custom-select";
import type { Product, AdminUser, AdminOverviewData } from "@/lib/types";
import "./admin.css";
import { resources } from "../resources";
import { ModulePanel } from "./module-panel";
import { ManualBooking } from "./panels/manual-booking";
import { FareCreate } from "./panels/fare-create";
import { canAccess } from "../permissions";

import { Icon } from "./primitives/admin-icon";
import { Badge } from "./primitives/admin-badge";
import { Brand } from "./primitives/admin-brand";
import { Filter } from "./primitives/admin-filter";
import { Empty } from "./primitives/admin-empty";
import { EditorDrawer } from "./primitives/editor-drawer";

import { OverviewPanel } from "./panels/overview-panel";
import { ResourceTable } from "./panels/resource-table";
import { BookingEditor } from "./panels/booking-editor";
import { BookingsPanel } from "./panels/bookings-panel";
import { Login } from "./panels/login-form";

const sections = [
  {
    id: "overview",
    label: "Tổng quan",
    icon: "space_dashboard",
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
    description: "Quản lý khách sạn, tour và combo đang bán.",
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
    description: "Chỉnh sửa nội dung và hình ảnh trên các trang công khai.",
  },
  {
    id: "account",
    label: "Tài khoản",
    icon: "manage_accounts",
    description: "Quản lý thông tin đăng nhập và bảo mật.",
  },
];

const allSections: {
  id: string;
  label: string;
  icon: string;
  description?: string;
}[] = [
  ...sections,
  ...Object.entries(resources).map(([id, resource]) => ({
    id,
    label: resource.label,
    icon: resource.icon,
  })),
];
const PAGE_SIZE = 10;
const roleLabels: Record<AdminUser["role"], string> = {
  super_admin: "Quản trị viên",
  editor: "Biên tập viên",
  booking: "Nhân viên đặt chỗ",
};

export function AdminWorkspace({ user }: { user: AdminUser | null }) {
  const router = useRouter();
  const userId = user?.id;
  const site = useSiteData();
  const [section, setSection] = useState("overview");
  const [overview, setOverview] = useState<AdminOverviewData | null>(null);
  const [rows, setRows] = useState<Row[]>([]);
  const [selected, setSelected] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [manualBooking, setManualBooking] = useState(false);
  const [bookingVersion, setBookingVersion] = useState(0);
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
  const menuToggle = useRef<HTMLButtonElement>(null);
  const menuClose = useRef<HTMLButtonElement>(null);
  const modalOpen = Boolean(selected) || creating || manualBooking || newFare;

  useEffect(() => {
    if (!modalOpen && !menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [modalOpen, menuOpen]);

  useEffect(() => {
    document.body.dataset.adminReady = "true";
    return () => {
      delete document.body.dataset.adminReady;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const frame = requestAnimationFrame(() =>
      menuClose.current?.focus({ preventScroll: true }),
    );
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      cancelAnimationFrame(frame);
      desktop.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    requestAnimationFrame(() => menuToggle.current?.focus());
  }

  const notify = (text: string, error = false) => setNotice({ text, error });

  const refreshOverview = useCallback(async () => {
    if (!userId) return;
    const result = await api("overview");
    setOverview(result.data);
    setSyncedAt(
      new Date().toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    );
  }, [userId]);

  const load = useCallback(async () => {
    const current = ++requestId.current;
    if (
      !userId ||
      section === "account" ||
      section === "bookings" ||
      resources[section]
    )
      return;
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
  }, [section, userId, refreshOverview]);

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
    if (userId && section !== "overview")
      void refreshOverview().catch(() => {});
  }, [userId, section, refreshOverview]);

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
    if (id !== section) {
      requestId.current++;
      setRows([]);
      setLoading(id !== "account" && id !== "bookings" && !resources[id]);
      setSection(id);
      window.scrollTo(0, 0);
    }
    if (menuOpen) closeMenu();
    setSelected(null);
    setNotice(null);
  };

  const current = allSections.find((item) => item.id === section)!;

  async function save(body: unknown) {
    setSaving(true);
    try {
      const result = await api(section, "PATCH", body);
      if (section === "bookings") setBookingVersion((value) => value + 1);
      else {
        setRows((old) =>
          old.map((row) =>
            rowKey(row) === rowKey(result.data)
              ? { ...row, ...result.data }
              : row,
          ),
        );
      }
      setSelected(null);
      notify("Đã lưu thay đổi.");
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
      setSection("overview");
      setOverview(null);
      setSyncedAt("");
      if (menuOpen) closeMenu();
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
          tabIndex={-1}
          onClick={closeMenu}
        />
      )}
      <aside
        className={`ad-sidebar ${menuOpen ? "is-open" : ""}`}
        id="ad-sidebar"
        onKeyDown={(event) => {
          if (menuOpen && event.key === "Escape") closeMenu();
        }}
      >
        <div className="ad-sidebar-heading">
          <Brand />
          <button
            ref={menuClose}
            type="button"
            className="ad-icon-button ad-mobile-toggle"
            aria-label="Đóng menu quản trị"
            onClick={closeMenu}
          >
            <Icon name="close" />
          </button>
        </div>
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
                  <b className="ad-nav-count" title="Đơn chờ xác nhận">
                    {overview?.stats.pending}
                  </b>
                )}
              </button>
            ))}
        </nav>
        <div className="ad-sidebar-bottom">
          <button
            type="button"
            className={`ad-nav-item ${section === "account" ? "is-active" : ""}`}
            aria-current={section === "account" ? "page" : undefined}
            onClick={() => navigate("account")}
          >
            <Icon name="settings" />
            <span>Tài khoản &amp; bảo mật</span>
          </button>
          <div className="ad-user">
            <span className="ad-avatar">
              {user.username.slice(0, 1).toUpperCase()}
            </span>
            <div>
              <strong>{user.username}</strong>
              <small>{roleLabels[user.role]}</small>
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
      <div className="ad-main" inert={menuOpen}>
        <header className="ad-topbar">
          <div className="ad-topbar-left">
            <button
              ref={menuToggle}
              type="button"
              className="ad-icon-button ad-mobile-toggle"
              aria-label="Mở menu quản trị"
              aria-controls="ad-sidebar"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
            >
              <Icon name="menu" />
            </button>
            <span className="ad-breadcrumb">
              <span>Quản trị</span>
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
            </button>
          </div>
        </header>
        <main className="ad-content">
          <div className="ad-page-heading">
            <div>
              <h1>{current.label}</h1>
              {current.description && <p>{current.description}</p>}
            </div>
            <div className="ad-heading-actions">
              {section === "overview" && (
                <>
                  <span className="ad-date">
                    <Icon name="calendar_today" />
                    {new Intl.DateTimeFormat("vi-VN", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                      timeZone: "Asia/Ho_Chi_Minh",
                    }).format(new Date())}
                  </span>
                  <button
                    type="button"
                    className="ad-icon-button"
                    aria-label="Làm mới tổng quan"
                    title="Làm mới tổng quan"
                    disabled={loading}
                    onClick={() => void load()}
                  >
                    <Icon name="refresh" />
                  </button>
                </>
              )}
              {section === "bookings" && (
                <>
                  <button
                    type="button"
                    className="ad-button ad-button-primary"
                    onClick={() => setManualBooking(true)}
                  >
                    <Icon name="add" /> Tạo đơn thủ công
                  </button>
                </>
              )}
              {section === "fares" && (
                <button
                  type="button"
                  className="ad-button ad-button-primary"
                  onClick={() => setNewFare(true)}
                >
                  <Icon name="add" /> Thêm mức giá
                </button>
              )}
              {section === "products" && (
                <button
                  type="button"
                  className="ad-button ad-button-primary"
                  onClick={() => setCreating(true)}
                >
                  <Icon name="add" /> Thêm dịch vụ
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
              canNavigate={(id) => canAccess(user, id)}
              navigate={navigate}
            />
          ) : section === "bookings" ? (
            <BookingsPanel version={bookingVersion} onEdit={setSelected} />
          ) : section === "account" ? (
            <div className="ad-account-layout">
              <section className="ad-panel ad-account-card">
                <div className="ad-panel-heading">
                  <span className="ad-heading-icon">
                    <Icon name="lock" />
                  </span>
                  <h2>Bảo mật tài khoản</h2>
                </div>
                <AccountEditor onMessage={(text) => notify(text)} />
              </section>
              <aside className="ad-panel ad-account-info">
                <span className="ad-avatar ad-avatar-large">
                  {user.username.slice(0, 1).toUpperCase()}
                </span>
                <h2>{user.username}</h2>
                <p className="ad-account-role">{roleLabels[user.role]}</p>
                <dl>
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
                    ]}
                  />
                )}
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
                  {String(selected.vehicle).replace("cho", " chỗ")}
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
              <button
                type="button"
                className="ad-button mt-4"
                disabled={saving}
                onClick={async () => {
                  if (
                    !window.confirm("Gỡ mức giá này khỏi bảng giá công khai?")
                  )
                    return;
                  setSaving(true);
                  try {
                    await api("fares", "DELETE", {
                      route: selected.route,
                      vehicle: selected.vehicle,
                    });
                    setSelected(null);
                    void load();
                    void refreshOverview().catch(() => {});
                    notify("Đã gỡ mức giá xe.");
                  } catch (error) {
                    notify((error as Error).message, true);
                  } finally {
                    setSaving(false);
                  }
                }}
              >
                Gỡ mức giá
              </button>
            </form>
          ) : section === "bookings" ? (
            <BookingEditor row={selected} busy={saving} onSave={save} />
          ) : null)}
      </EditorDrawer>
      <EditorDrawer
        open={manualBooking}
        title="Tạo booking thủ công"
        onClose={() => setManualBooking(false)}
      >
        {manualBooking && (
          <ManualBooking
            onSaved={(id) => {
              setManualBooking(false);
              setBookingVersion((value) => value + 1);
              void refreshOverview().catch(() => {});
              notify(`Đã tạo đơn ${id}`);
            }}
          />
        )}
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
          <div className="ad-field">
            <span>Mẫu bố cục</span>
            <CustomSelect
              name="cloneId"
              ariaLabel="Mẫu bố cục"
              searchable
              searchPlaceholder="Tìm mẫu bố cục…"
              defaultValue=""
              buttonClassName="ad-input cursor-pointer"
              options={[
                { value: "", label: "Tạo dịch vụ mới (không cần mẫu)" },
                ...baseRows
                  .filter((r) => r.template_id)
                  .map((row) => ({
                    value: String(row.id),
                    label: String(row.title),
                  })),
              ]}
            />
          </div>
          <div className="ad-field">
            <span>Loại dịch vụ</span>
            <CustomSelect
              name="type"
              ariaLabel="Loại dịch vụ"
              defaultValue="hotel"
              buttonClassName="ad-input cursor-pointer"
              options={[
                { value: "hotel", label: "Khách sạn" },
                { value: "tour", label: "Tour" },
                { value: "combo", label: "Combo" },
              ]}
            />
          </div>
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
