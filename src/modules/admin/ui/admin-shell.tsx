"use client";

import Link, { useLinkStatus } from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import type { AdminUser } from "@/lib/types";
import { adminNav, adminPage } from "../routes";
import { api, roleLabels } from "./api";
import { Brand } from "./primitives/admin-brand";
import { Icon } from "./primitives/admin-icon";

function NavigationStatus() {
  const { pending } = useLinkStatus();
  return (
    pending && (
      <span className="ad-route-loading" role="status">
        <Icon name="hourglass_empty" />
        <span className="sr-only">Đang mở trang…</span>
      </span>
    )
  );
}

export function AdminShell({
  user,
  visiblePaths,
  children,
}: {
  user: AdminUser;
  visiblePaths: string[];
  children: ReactNode;
}) {
  const pathname = usePathname();
  const current = adminPage(pathname);
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [error, setError] = useState("");
  const menuToggle = useRef<HTMLButtonElement>(null);
  const menuClose = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    document.body.dataset.adminReady = "true";
    return () => {
      delete document.body.dataset.adminReady;
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    menuClose.current?.focus();
    const desktop = window.matchMedia("(min-width: 1024px)");
    const handleResize = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", handleResize);
    return () => {
      document.body.style.overflow = previous;
      desktop.removeEventListener("change", handleResize);
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
    requestAnimationFrame(() => menuToggle.current?.focus());
  }

  async function logout() {
    setLoggingOut(true);
    setError("");
    try {
      await api("session", "DELETE");
      setMenuOpen(false);
      router.replace("/admin/dang-nhap");
      router.refresh();
    } catch (error) {
      setError((error as Error).message);
      setLoggingOut(false);
    }
  }

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
        role={menuOpen ? "dialog" : undefined}
        aria-label={menuOpen ? "Menu quản trị" : undefined}
        aria-modal={menuOpen || undefined}
        onKeyDown={(event) => {
          if (!menuOpen) return;
          if (event.key === "Escape") closeMenu();
          if (event.key !== "Tab") return;
          const controls = event.currentTarget.querySelectorAll<
            HTMLAnchorElement | HTMLButtonElement
          >("a[href], button:not(:disabled)");
          const first = controls[0];
          const last = controls[controls.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
      >
        <div className="ad-sidebar-heading">
          <Brand onNavigate={menuOpen ? closeMenu : undefined} />
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
          {adminNav.map(({ label, paths }) => {
            const visible = paths.filter((href) => visiblePaths.includes(href));
            if (!visible.length) return null;
            return (
              <div className="ad-nav-group" key={label ?? "overview"}>
                {label && <p className="ad-nav-label">{label}</p>}
                {visible.map((href) => {
                  const item = adminPage(href)!;
                  const selected = pathname === href;
                  const active =
                    selected ||
                    (href !== "/admin" && pathname.startsWith(href + "/"));
                  return (
                    <Link
                      key={href}
                      href={href}
                      prefetch={false}
                      onNavigate={() => {
                        if (menuOpen) closeMenu();
                      }}
                      aria-current={
                        selected ? "page" : active ? "location" : undefined
                      }
                      className={`ad-nav-item ${active ? "is-active" : ""}`}
                    >
                      <Icon name={item.icon} />
                      <span>{item.label}</span>
                      <NavigationStatus />
                    </Link>
                  );
                })}
              </div>
            );
          })}
        </nav>
        <div className="ad-sidebar-bottom">
          <div className="ad-user">
            <Link
              href="/admin/tai-khoan"
              className="ad-user-account"
              prefetch={false}
              onNavigate={menuOpen ? closeMenu : undefined}
              aria-label="Tài khoản cá nhân"
              aria-current={
                pathname === "/admin/tai-khoan" ? "page" : undefined
              }
            >
              <span className="ad-avatar" aria-hidden="true">
                {user.username.slice(0, 1).toUpperCase()}
              </span>
              <div>
                <strong>{user.username}</strong>
                <small>{roleLabels[user.role]}</small>
              </div>
            </Link>
            <button
              type="button"
              className="ad-icon-button"
              aria-label="Đăng xuất"
              title="Đăng xuất"
              disabled={loggingOut}
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
              <strong>{current?.label ?? "NhaTrangGo"}</strong>
            </span>
          </div>
          <a
            className="ad-topbar-site"
            href={current?.publicHref ?? "/"}
            target="_blank"
            rel="noopener"
          >
            <Icon name="open_in_new" />
            {current?.publicHref ? "Xem trang khách" : "Xem website"}
          </a>
        </header>
        <main className="ad-content">{children}</main>
      </div>
      {error && (
        <p className="ad-toast ad-toast-error" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
