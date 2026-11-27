"use client";

import { useRef } from "react";
import { useSiteData, useT } from "@/components/content";
import { contactInfo } from "@/lib/content-values";
import { PublicIcon } from "@/components/site/public-ui";
import { contactChannels } from "./contact-channels";
import { contactCopy } from "./contact-copy";

export function FloatingContacts() {
  const { content, locale } = useSiteData();
  const t = useT();
  const contact = contactInfo(content);
  const copy = contactCopy[locale];
  const dialog = useRef<HTMLDialogElement>(null);
  return (
    <>
      <nav aria-label={t.common.quickContactAria} className="floating-contacts">
        {contactChannels(contact).map((channel) => {
          const label =
            channel.key === "telephone"
              ? `${copy.call} ${contact.phone || contact.telephone}`
              : channel.key === "zalo"
                ? copy.zalo
                : channel.label;
          const icon = (
            <span className="floating-contact-icon" data-channel={channel.key}>
              {channel.image ? (
                <img src={channel.image} alt="" width={48} height={48} />
              ) : (
                <PublicIcon name="call" className="text-xl" />
              )}
            </span>
          );
          return channel.key === "kakao" ? (
            <button
              key={channel.key}
              type="button"
              title={label}
              aria-label={label}
              data-contact-channel={channel.key}
              className="floating-contact-action"
              onClick={() => dialog.current?.showModal()}
            >
              {icon}
            </button>
          ) : (
            <a
              key={channel.key}
              href={channel.href}
              aria-label={label}
              title={label}
              data-contact-channel={channel.key}
              className="floating-contact-action"
              target={channel.key === "telephone" ? undefined : "_blank"}
              rel={
                channel.key === "telephone" ? undefined : "noopener noreferrer"
              }
            >
              {icon}
            </a>
          );
        })}
      </nav>
      <dialog
        ref={dialog}
        aria-labelledby="kakao-dialog-title"
        className="floating-contact-dialog"
        onClick={(event) => {
          if (event.target === event.currentTarget) dialog.current?.close();
        }}
      >
        <div className="relative p-6 sm:p-8 text-center space-y-5">
          <button
            className="absolute top-2 right-2 inline-flex items-center justify-center w-11 h-11 rounded-full hover:bg-surface-muted"
            type="button"
            aria-label={copy.close}
            onClick={() => dialog.current?.close()}
          >
            <PublicIcon name="close" />
          </button>
          <img
            src="/icons/contact/kakao.png"
            alt=""
            width={56}
            height={56}
            className="mx-auto rounded-full bg-contact-kakao p-2"
          />
          <h2 id="kakao-dialog-title" className="text-xl font-bold">
            {copy.kakao}
          </h2>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {copy.kakaoDesc}
          </p>
          <div className="rounded-xl bg-promo-surface/60 border border-promo-highlight/40 p-4 space-y-2 text-left text-sm break-words">
            <p>
              <strong>ID / Phone:</strong>{" "}
              <span className="select-all text-primary font-bold">
                {contact.kakao}
              </span>
            </p>
            {contact.international && (
              <p>
                <strong>{copy.international}:</strong>{" "}
                <span className="select-all text-primary font-bold">
                  {contact.international}
                </span>
              </p>
            )}
          </div>
          <a
            className="public-primary-button w-full"
            href={`tel:${(contact.telephone || "").replace(/[^\d+]/g, "")}`}
          >
            <PublicIcon name="call" className="text-lg" />
            {copy.callNow} {contact.phone || contact.telephone}
          </a>
        </div>
      </dialog>
    </>
  );
}
