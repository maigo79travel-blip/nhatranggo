"use client";

import brand from "@/config/brand.json";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../api";
import { Icon } from "../primitives/admin-icon";
import { Brand } from "../primitives/admin-brand";
import { Field } from "../editors";

export function Login() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [show, setShow] = useState(false);

  return (
    <main className="admin-ui ad-login">
      <section className="ad-login-story">
        <Brand light />
        <div className="ad-login-orbit ad-orbit-one" />
        <div className="ad-login-orbit ad-orbit-two" />
        <div className="ad-login-story-content">
          <span className="ad-login-tag">
            <i />
            {brand.name.toUpperCase()} WORKSPACE
          </span>
          <h2>
            Mọi hành trình.
            <br />
            Một nơi <em>quản lý.</em>
          </h2>
          <p>
            Không gian làm việc để chăm chút dịch vụ, kết nối khách hàng và vận
            hành mỗi ngày.
          </p>
          <div className="ad-login-features">
            <span>
              <Icon name="luggage" />
              Dịch vụ & ưu đãi
            </span>
            <span>
              <Icon name="confirmation_number" />
              Yêu cầu đặt chỗ
            </span>
            <span>
              <Icon name="article" />
              Nội dung website
            </span>
          </div>
        </div>
        <div className="ad-login-story-footer">
          <span>{brand.name}</span>
          <span>Khởi đầu cho những kỳ nghỉ trọn vẹn.</span>
        </div>
      </section>
      <section className="ad-login-form-area">
        <a href="/" className="ad-login-back">
          <Icon name="arrow_back" />
          Về website
        </a>
        <div className="ad-login-form">
          <span className="ad-login-lock">
            <Icon name="admin_panel_settings" />
          </span>
          <span className="ad-eyebrow">CHÀO MỪNG BẠN TRỞ LẠI</span>
          <h1>Đăng nhập quản trị</h1>
          <p>Đăng nhập để tiếp tục quản lý {brand.name}.</p>
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              setBusy(true);
              setMessage("");
              try {
                await api(
                  "session",
                  "POST",
                  Object.fromEntries(new FormData(e.currentTarget)),
                );
                router.refresh();
              } catch (error) {
                setMessage((error as Error).message);
              } finally {
                setBusy(false);
              }
            }}
          >
            <Field
              label="Tên đăng nhập"
              name="username"
              autoComplete="username"
              placeholder="Nhập tên đăng nhập"
              required
            />
            <label className="ad-field">
              Mật khẩu
              <span className="ad-password-input">
                <input
                  className="ad-input"
                  aria-label="Mật khẩu"
                  name="password"
                  type={show ? "text" : "password"}
                  autoComplete="current-password"
                  placeholder="Nhập mật khẩu của bạn"
                  required
                />
                <button
                  type="button"
                  aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  onClick={() => setShow(!show)}
                >
                  <Icon name={show ? "visibility_off" : "visibility"} />
                </button>
              </span>
            </label>
            {message && (
              <div className="ad-login-error" role="alert">
                <Icon name="error" />
                {message}
              </div>
            )}
            <button
              type="submit"
              disabled={busy}
              className="ad-button ad-button-primary ad-full-width"
            >
              {busy ? "Đang đăng nhập…" : "Đăng nhập"}
              <Icon name="arrow_forward" />
            </button>
          </form>
          <div className="ad-login-security">
            <Icon name="lock" />
            Không gian dành riêng cho quản trị viên.
          </div>
        </div>
        <footer>{brand.name} · Không gian quản trị</footer>
      </section>
    </main>
  );
}
