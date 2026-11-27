import Link from "next/link";
import { ContentText } from "@/components/content";
import { getCurrentMessages } from "@/lib/i18n";

export async function HomeOfferBanner() {
  const t = await getCurrentMessages();
  return (
    <section className="site-container w-full pb-12 lg:pb-16">
      <div className="relative isolate flex min-h-[226px] items-center overflow-hidden rounded-[28px] bg-primary px-5 py-8 text-white shadow-card sm:px-9 lg:pl-[23%]">
        <img
          src="/images/figma/home/offer-banner.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-on-surface/55 lg:bg-transparent"
        />
        <div className="relative w-full lg:max-w-[65%]">
          <h2 className="text-2xl font-extrabold leading-snug tracking-tight sm:text-[32px]">
            <ContentText contentKey="home.text-166" />
          </h2>
          <p className="mt-2 text-sm text-white">
            <ContentText contentKey="home.text-167" />
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/tour-hang-ngay?type=combo"
              className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-5 py-2.5 text-center text-sm font-bold text-on-surface hover:bg-surface-muted sm:justify-start"
            >
              <span
                className="material-symbols-outlined text-[20px] text-primary"
                aria-hidden="true"
              >
                sell
              </span>
              {t.home.viewDeals}
            </Link>
            <Link
              href="/lien-he"
              className="home-booking-button border border-white/40"
            >
              {t.home.contactConsult}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
