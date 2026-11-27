export type ContactChannel = {
  key: string;
  label: string;
  href?: string;
  image?: string;
};

export function contactChannels(
  contact: Record<string, string>,
  hotlinePrefix = "Gọi hotline",
): ContactChannel[] {
  const phone = (contact.telephone || "").replace(/[^\d+]/g, "");
  const entries: ContactChannel[] = [
    {
      key: "telephone",
      label: `${hotlinePrefix} ${contact.phone || phone}`,
      href: phone ? "tel:" + phone : "",
    },
    {
      key: "zalo",
      label: "Zalo",
      href: contact.zalo,
      image: "/icons/contact/zalo.png",
    },
    {
      key: "telegram",
      label: "Telegram",
      href: contact.telegram,
      image: "/icons/contact/telegram.png",
    },
    {
      key: "whatsapp",
      label: "WhatsApp",
      href: contact.whatsapp,
      image: "/icons/contact/whatsapp.png",
    },
    { key: "kakao", label: "KakaoTalk", image: "/icons/contact/kakao.png" },
    {
      key: "facebook",
      label: "Facebook / Messenger",
      href: contact.facebook,
      image: "/icons/contact/facebook.png",
    },
  ];
  return entries.filter((entry) =>
    entry.key === "kakao"
      ? Boolean(contact.kakao)
      : Boolean(entry.href && /^(https:\/\/|tel:)/.test(entry.href)),
  );
}
