import { PublicForm } from "@/modules/support/public-form";
import { PublicPage } from "@/modules/settings/public-page";
import { getSiteData } from "@/lib/catalog";
import { PublicIcon } from "@/modules/settings/public-ui";
import { contactInfo } from "@/lib/content-values";
import { contactChannels } from "@/modules/support/contact-channels";
export default async function ContactPage() {
  const { content } = await getSiteData();
  const contact = contactInfo(content);
  return (
    <PublicPage title="Liên hệ & Hỗ trợ">
      <div className="flex flex-wrap gap-3 mb-7">
        {contactChannels(contact)
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
