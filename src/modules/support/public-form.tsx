"use client";
import { useState } from "react";
import { DialogField } from "@/components/catalog/dialog-field";
import { PublicIcon } from "@/components/site/public-ui";
import { SupportGuide } from "./support-guide";
export function PublicForm({
  kind,
}: {
  kind: "contact" | "evisa" | "fast-track";
}) {
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="public-form-layout">
      <form
        className="public-form public-form-card"
        aria-busy={busy}
        onSubmit={async (e) => {
          e.preventDefault();
          setBusy(true);
          setMessage("");
          setError("");
          const form = e.currentTarget;
          try {
            const fields = Object.fromEntries(new FormData(form));
            if (fields.arrival_at)
              fields.arrival_at = new Date(
                String(fields.arrival_at) + "+07:00",
              ).toISOString();
            const result = await fetch(
              kind === "contact" ? "/api/contact" : "/api/requests",
              {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ ...fields, kind }),
              },
            );
            const body = await result.json();
            if (!result.ok) throw Error(body.error);
            setMessage(body.message + " Mã yêu cầu: " + body.id);
            form.reset();
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="public-form-heading">
          <h2 className="text-2xl font-bold">
            {kind === "contact"
              ? "Gửi lời nhắn cho chúng tôi"
              : "Đăng ký tư vấn dịch vụ"}
          </h2>
        </div>
        <fieldset className="public-form-fields">
          <legend className="public-fieldset-title">Thông tin liên hệ</legend>
          <DialogField
            label="Họ và tên"
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
          />
          <DialogField
            label="Điện thoại"
            name="phone"
            type="tel"
            autoComplete="tel"
            required
            maxLength={30}
          />
          <div className="sm:col-span-2">
            <DialogField
              label="Email"
              name="email"
              type="email"
              autoComplete="email"
              required
              maxLength={254}
            />
          </div>
        </fieldset>
        {kind === "contact" ? (
          <fieldset className="public-form-fields">
            <legend className="public-fieldset-title">
              Nội dung cần hỗ trợ
            </legend>
            <div className="sm:col-span-2">
              <DialogField
                label="Chủ đề / Mã booking cần hỗ trợ"
                name="subject"
                required
                maxLength={300}
              />
            </div>
            <label className="public-field sm:col-span-2">
              Nội dung
              <textarea
                className="public-control"
                rows={5}
                placeholder="Chia sẻ nội dung bạn cần tư vấn hoặc hỗ trợ…"
                name="message"
                required
                minLength={10}
                maxLength={10000}
              />
            </label>
          </fieldset>
        ) : (
          <>
            <fieldset className="public-form-fields">
              <legend className="public-fieldset-title">
                Thông tin chuyến đến
              </legend>
              <div className="sm:col-span-2">
                <DialogField
                  label="Ngày giờ đến (giờ Việt Nam)"
                  name="arrival_at"
                  type="datetime-local"
                  required
                />
              </div>
              <DialogField
                label="Sân bay đến"
                name="airport"
                required
                maxLength={300}
              />
              <DialogField
                label="Quốc tịch"
                name="nationality"
                required
                maxLength={100}
              />
              <label className="public-field sm:col-span-2">
                Ghi chú
                <textarea
                  className="public-control"
                  rows={4}
                  placeholder="Số hiệu chuyến bay, số khách hoặc yêu cầu riêng…"
                  name="notes"
                  maxLength={2000}
                />
              </label>
            </fieldset>
            <p className="public-form-note">
              <PublicIcon name="info" className="text-xl shrink-0" />
              <span>
                Đây là yêu cầu tư vấn; dịch vụ chỉ được xác nhận sau khi nhân
                viên kiểm tra.
              </span>
            </p>
          </>
        )}
        {error && (
          <p role="alert" className="public-feedback public-feedback-error">
            {error}
          </p>
        )}
        {message && (
          <p role="status" className="public-feedback public-feedback-success">
            {message}
          </p>
        )}
        <button
          className="public-primary-button w-full sm:w-auto"
          disabled={busy}
          type="submit"
        >
          {busy ? "Đang gửi…" : "Gửi yêu cầu"}
          <PublicIcon name="arrow_forward" className="text-lg" />
        </button>
      </form>
      <SupportGuide />
    </div>
  );
}
