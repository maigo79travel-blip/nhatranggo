"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CustomSelect } from "@/components/ui/custom-select";
import type { Product } from "@/lib/types";
import type { AdminTourOption } from "@/modules/travel/tour-departure-types";
import { tourDeparturesPath } from "../../routes";
import { api } from "../api";
import { ProductEditor } from "../editors";
import { Icon } from "../primitives/admin-icon";
import { AdminPageHeading } from "../primitives/admin-page-heading";

const emptyTour: Product = {
  id: "",
  type: "tour",
  title: "",
  price: 0,
  image: "",
  location: "",
  rating: 0,
  description: "",
};

export function TourCreatePanel({ title }: { title: string }) {
  const [templates, setTemplates] = useState<AdminTourOption[]>([]);
  const [templateId, setTemplateId] = useState("");
  const [initialValues, setInitialValues] = useState(emptyTour);
  const [templateError, setTemplateError] = useState("");
  const [applying, setApplying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [created, setCreated] = useState<Product>();

  useEffect(() => {
    const controller = new AbortController();
    void api("departures?options=1", "GET", undefined, controller.signal)
      .then(({ data }) => {
        if (!controller.signal.aborted) setTemplates(data);
      })
      .catch((error: Error) => {
        if (!controller.signal.aborted) setTemplateError(error.message);
      });
    return () => controller.abort();
  }, []);

  async function applyTemplate() {
    setTemplateError("");
    if (templateId === "") {
      setInitialValues(emptyTour);
      return;
    }
    setApplying(true);
    try {
      const { data } = await api(
        "products?" + new URLSearchParams({ tourTemplate: templateId }),
      );
      setInitialValues({ ...data, title: "", active: false, featured: false });
    } catch (error) {
      setTemplateError((error as Error).message);
    } finally {
      setApplying(false);
    }
  }

  async function save(values: Record<string, unknown>) {
    setSaving(true);
    try {
      const { data } = await api("products", "POST", {
        ...values,
        action: "create-tour",
        cloneId: initialValues.id || undefined,
      });
      setCreated(data);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="ad-tour-create">
      <AdminPageHeading title={title}>
        <Link href="/admin/tour" className="ad-button">
          <Icon name="arrow_back" />
          Danh sách tour
        </Link>
      </AdminPageHeading>
      {created ? (
        <section className="ad-panel ad-tour-create-card">
          <div role="status">
            <h2>{created.active ? "Đã đăng tour" : "Đã lưu bản nháp"}</h2>
            <p className="ad-tour-created-name">{created.title}</p>
          </div>
          <Link
            className="ad-button ad-button-primary"
            href={
              tourDeparturesPath +
              "?" +
              new URLSearchParams({ tour: created.id })
            }
          >
            <Icon name="calendar_month" />
            Thêm lịch khởi hành
          </Link>
        </section>
      ) : (
        <>
          {templates.length > 0 && (
            <section
              className="ad-panel ad-tour-create-card"
              aria-labelledby="tour-template-heading"
            >
              <h2 id="tour-template-heading">Sao chép tour có sẵn</h2>
              <p className="ad-tour-create-hint">
                Áp dụng mẫu sẽ điền lại biểu mẫu. Lịch khởi hành được tạo riêng.
              </p>
              <div className="ad-tour-template-row">
                <CustomSelect
                  ariaLabel="Chọn tour mẫu"
                  value={templateId}
                  onChange={setTemplateId}
                  searchable
                  searchPlaceholder="Tìm tour mẫu…"
                  disabled={saving || applying}
                  buttonClassName="ad-input cursor-pointer"
                  options={[
                    { value: "", label: "Tạo từ đầu" },
                    ...templates.map(({ id, title }) => ({
                      value: id,
                      label: title,
                    })),
                  ]}
                />
                <button
                  type="button"
                  className="ad-button"
                  onClick={() => void applyTemplate()}
                  disabled={
                    saving || applying || templateId === initialValues.id
                  }
                >
                  {applying ? "Đang áp dụng…" : "Áp dụng mẫu"}
                </button>
              </div>
            </section>
          )}
          {templateError && (
            <p className="ad-form-error" role="alert">
              {templateError}
            </p>
          )}
          <section
            className="ad-panel ad-tour-create-card"
            aria-labelledby="tour-create-heading"
          >
            <h2 id="tour-create-heading">Thông tin tour</h2>
            <ProductEditor
              key={initialValues.id}
              product={initialValues}
              fixedType="tour"
              creating
              busy={saving || applying}
              onSave={save}
            />
          </section>
        </>
      )}
    </div>
  );
}
