import { getPublicPageCopy } from "@/lib/public-page-copy";
import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/components/site/public-page";
import { getSiteContent } from "@/lib/catalog";
import { PublicIcon } from "@/components/site/public-ui";
import { contactInfo } from "@/lib/content-values";
import { contactChannels } from "@/modules/support/contact-channels";
import { getMessages } from "@/lib/i18n";
import { getPublicLocale } from "@/lib/catalog";

export default async function ContactPage() {
  const [content, locale] = await Promise.all([
    getSiteContent("shared"),
    getPublicLocale(),
  ]);
  const t = getMessages(locale);
  const copy = await getPublicPageCopy("contact", t.pages.contactTitle);
  const contact = contactInfo(content);
  return (
    <PublicPage {...copy}>
      <div className="flex flex-wrap gap-3 mb-7">
        {contactChannels(contact, t.support.callHotlinePrefix)
          .filter((channel) => channel.href)
          .map((channel) => (
            <a
              className="public-contact-link"
              key={channel.key}
              href={channel.href}
              target={channel.key === "telephone" ? undefined : "_blank"}
              rel={
                channel.key === "telephone" ? undefined : "noopener noreferrer"
              }
            >
              {channel.image ? (
                <img src={channel.image} alt="" width={20} height={20} />
              ) : (
                <PublicIcon name="call" className="text-xl" />
              )}
              {channel.label}
            </a>
          ))}
        {contact.email && (
          <a className="public-contact-link" href={"mailto:" + contact.email}>
            <PublicIcon name="mail" className="text-xl" />
            Email
          </a>
        )}
      </div>
      <PublicForm kind="contact" />
    </PublicPage>
  );
}
