"use client";

import Image from "next/image";
import Link from "next/link";
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
      <section className="ad-login-form-area">
        <header className="ad-login-header">
          <Brand />
          <Link href="/" className="ad-login-back">
            <Icon name="arrow_back" />
            Về website
          </Link>
        </header>
        <div className="ad-login-form">
          <h1>Đăng nhập quản trị</h1>
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
            </button>
          </form>
        </div>
      </section>
      <div className="ad-login-photo" aria-hidden="true">
        <Image
          src="/images/figma/hero-beach.png"
          alt=""
          fill
          sizes="(max-width: 767px) 0px, 50vw"
        />
      </div>
    </main>
  );
}
