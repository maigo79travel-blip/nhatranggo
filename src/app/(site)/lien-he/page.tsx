import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/modules/settings/public-page";
import { getSiteData } from "@/lib/catalog";
import { PublicIcon } from "@/modules/settings/public-ui";
export default async function ContactPage() {
  const { content } = await getSiteData();
  const contact = content["site.contact"]?.value as
    Record<string, string> | undefined;
  return (
    <PublicPage title="Liên hệ & Hỗ trợ">
      <div className="flex flex-wrap gap-3 mb-7">
        {Object.entries({
          telephone: "Gọi điện",
          zalo: "Zalo",
          whatsapp: "WhatsApp",
          telegram: "Telegram",
          email: "Email",
        }).map(([key, label]) => {
          const value = contact?.[key];
          if (!value) return null;
          const href =
            key === "telephone"
              ? "tel:" + value
              : key === "email"
                ? "mailto:" + value
                : value;
          return /^(https?:\/\/|tel:|mailto:)/.test(href) ? (
            <a className="public-contact-link" key={key} href={href}>
              <PublicIcon
                name={
                  key === "telephone"
                    ? "call"
                    : key === "email"
                      ? "mail"
                      : "chat"
                }
                className="text-xl"
              />
              {label}
            </a>
          ) : null;
        })}
      </div>
      <PublicForm kind="contact" />
    </PublicPage>
  );
}
