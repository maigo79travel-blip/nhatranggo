"use client";

import { useEffect, useState } from "react";
import type { AdminOverviewData, AdminUser } from "@/lib/types";
import { api, roleLabels, type Row } from "../api";
import { AccountEditor } from "../editors";
import { AdminPageHeading } from "../primitives/admin-page-heading";
import { AdminNotice, useAdminNotice } from "../primitives/admin-notice";
import { EditorDrawer } from "../primitives/editor-drawer";
import { Icon } from "../primitives/admin-icon";
import { OverviewPanel } from "./overview-panel";
import { BookingEditor } from "./booking-editor";
import { BookingsPanel } from "./bookings-panel";
import { ManualBooking } from "./manual-booking";

export function AdminOverview({
  canManageBookings,
  canManageProducts,
}: {
  canManageBookings: boolean;
  canManageProducts: boolean;
}) {
  const [data, setData] = useState<AdminOverviewData | null>(null);
  const [failure, setFailure] = useState("");
  const [loading, setLoading] = useState(true);
  const [revision, setRevision] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setFailure("");
    void api("overview", "GET", undefined, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted) setData(data);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setFailure(error.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });
    return () => controller.abort();
  }, [revision]);

  return (
    <>
      <AdminPageHeading title="Tổng quan">
        <button
          type="button"
          className="ad-button"
          disabled={loading}
          onClick={() => setRevision((current) => current + 1)}
        >
          <Icon name="refresh" /> Làm mới
        </button>
      </AdminPageHeading>
      {failure && (
        <p role="alert" className="ad-form-error">
          {failure}
        </p>
      )}
      <OverviewPanel
        data={data}
        loading={loading}
        canManageBookings={canManageBookings}
        canManageProducts={canManageProducts}
      />
    </>
  );
}

export function AdminBookings({ description }: { description?: string }) {
  const [selected, setSelected] = useState<Row | null>(null);
  const [creating, setCreating] = useState(false);
  const [version, setVersion] = useState(0);
  const [saving, setSaving] = useState(false);
  const { notice, notify, clearNotice } = useAdminNotice();

  async function save(body: unknown) {
    setSaving(true);
    clearNotice();
    try {
      await api("bookings", "PATCH", body);
      setVersion((value) => value + 1);
      setSelected(null);
      notify("Đã cập nhật đơn đặt chỗ.");
    } catch (error) {
      notify((error as Error).message, true);
    } finally {
      setSaving(false);
    }
  }

  return (
    <>
      <AdminPageHeading title="Đặt chỗ" description={description}>
        <button
          type="button"
          className="ad-button ad-button-primary"
          onClick={() => {
            clearNotice();
            setCreating(true);
          }}
        >
          <Icon name="add" /> Tạo đơn thủ công
        </button>
      </AdminPageHeading>
      <BookingsPanel
        version={version}
        onEdit={(row) => {
          clearNotice();
          setSelected(row);
        }}
      />
      <EditorDrawer
        open={Boolean(selected)}
        title="Chi tiết đặt chỗ"
        onClose={() => setSelected(null)}
        saveForm="ad-record-form"
        busy={saving}
      >
        {selected && notice?.error && (
          <p role="alert" className="ad-form-error">
            {notice.text}
          </p>
        )}
        {selected && (
          <BookingEditor row={selected} busy={saving} onSave={save} />
        )}
      </EditorDrawer>
      <EditorDrawer
        open={creating}
        title="Tạo đơn đặt chỗ thủ công"
        onClose={() => setCreating(false)}
      >
        {creating && (
          <ManualBooking
            onSaved={(id) => {
              setCreating(false);
              setVersion((value) => value + 1);
              notify(`Đã tạo đơn ${id}.`);
            }}
          />
        )}
      </EditorDrawer>
      {!(selected && notice?.error) && (
        <AdminNotice notice={notice} dismiss={clearNotice} />
      )}
    </>
  );
}

export function AdminAccount({ user }: { user: AdminUser }) {
  const { notice, notify, clearNotice } = useAdminNotice();
  return (
    <>
      <AdminPageHeading title="Tài khoản cá nhân" />
      <div className="ad-account-layout">
        <section className="ad-panel ad-account-card">
          <div className="ad-panel-heading">
            <span className="ad-heading-icon">
              <Icon name="lock" />
            </span>
            <h2>Đổi mật khẩu</h2>
          </div>
          <AccountEditor onMessage={notify} />
        </section>
        <aside className="ad-panel ad-account-info">
          <span className="ad-avatar ad-avatar-large">
            {user.username.slice(0, 1).toUpperCase()}
          </span>
          <h2>{user.username}</h2>
          <p className="ad-account-role">{roleLabels[user.role]}</p>
          <p>
            <Icon name="verified_user" /> Đổi mật khẩu sẽ kết thúc các phiên
            đăng nhập hiện tại.
          </p>
        </aside>
      </div>
      <AdminNotice notice={notice} dismiss={clearNotice} />
    </>
  );
}
