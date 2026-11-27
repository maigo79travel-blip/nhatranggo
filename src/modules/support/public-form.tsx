"use client";
import { useState } from "react";
import { DialogField } from "@/components/catalog/dialog-field";
import { PublicIcon } from "@/components/site/public-ui";
import { useT } from "@/components/content";
import { SupportGuide } from "./support-guide";
export function PublicForm({ kind }: { kind: "contact" | "fast-track" }) {
  const t = useT();
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const isFastTrack = kind === "fast-track";
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
            setMessage(
              `${body.message} ${t.support.requestCodePrefix} ${body.id}`,
            );
            form.reset();
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setBusy(false);
          }
        }}
      >
        <div className="public-form-heading">
          {isFastTrack && (
            <PublicIcon name="flight_land" className="fast-track-form-icon" />
          )}
          <h2 className="text-2xl font-bold">
            {kind === "contact"
              ? t.support.contactTitle
              : t.support.requestTitle}
          </h2>
        </div>
        <fieldset className="public-form-fields">
          <legend className="public-fieldset-title">
            {t.support.contactInfoLegend}
          </legend>
          <DialogField
            label={t.support.name}
            name="name"
            autoComplete="name"
            required
            minLength={2}
            maxLength={120}
          />
          <DialogField
            label={t.support.phone}
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
              {t.support.supportContentLegend}
            </legend>
            <div className="sm:col-span-2">
              <DialogField
                label={t.support.subjectLabel}
                name="subject"
                required
                maxLength={300}
              />
            </div>
            <label className="public-field sm:col-span-2">
              {t.support.message}
              <textarea
                className="public-control"
                rows={5}
                placeholder={t.support.messagePlaceholder}
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
                {t.support.arrivalLegend}
              </legend>
              <div className="sm:col-span-2">
                <DialogField
                  label={t.support.arrivalDateTime}
                  name="arrival_at"
                  type="datetime-local"
                  required
                />
              </div>
              <DialogField
                label={t.support.airport}
                name="airport"
                required
                maxLength={300}
              />
              <DialogField
                label={t.support.nationality}
                name="nationality"
                required
                maxLength={100}
              />
              <label className="public-field sm:col-span-2">
                {t.support.notes}
                <textarea
                  className="public-control"
                  rows={4}
                  placeholder={t.support.notesPlaceholder}
                  name="notes"
                  maxLength={2000}
                />
              </label>
            </fieldset>
            <p className="public-form-note">
              <PublicIcon name="info" className="text-xl shrink-0" />
              <span>{t.support.advisoryNote}</span>
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
          {busy ? t.support.submitting : t.support.submitContact}
          <PublicIcon name="arrow_forward" className="text-lg" />
        </button>
      </form>
      <SupportGuide fastTrack={isFastTrack} />
    </div>
  );
}
