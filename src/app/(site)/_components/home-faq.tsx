import Link from "next/link";
import { ContentText } from "@/components/content";

export function HomeFaq() {
  return (
    <section className="site-container py-10 w-full mb-8">
      <div
        className="rounded-3xl bg-cover bg-center px-6 py-8 md:px-12 md:py-10 shadow-floating text-on-primary relative overflow-hidden min-h-[226px] flex items-center"
        style={{ backgroundImage: "url('/images/figma/newsletter-bg.png')" }}
      >
        <div className="relative z-10 w-full md:pl-[22%] max-w-4xl">
          <h2 className="font-headline-lg text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            <ContentText contentKey="home.text-166" />
          </h2>
          <p className="font-body-md text-sm sm:text-base text-white/95 mt-2">
            <ContentText contentKey="home.text-167" />
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link
              href="/khach-san"
              className="h-12 px-6 rounded-full bg-primary hover:bg-ocean-deep text-on-primary font-bold text-sm sm:text-base shadow-md transition-colors inline-flex items-center justify-center"
            >
              Khám phá ưu đãi hôm nay
            </Link>
            <Link
              href="/lien-he"
              className="h-12 px-6 rounded-full bg-surface-container-lowest text-on-surface hover:bg-ocean-light font-bold text-sm sm:text-base shadow-md transition-colors inline-flex items-center justify-center"
            >
              Liên hệ tư vấn 24/7
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
