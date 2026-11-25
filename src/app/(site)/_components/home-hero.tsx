import { ContentText } from "@/components/content";
import { HomeSearch } from "./home-search";

const benefits = [
  { icon: "hotel", title: "home.text-064", detail: "home.text-065" },
  { icon: "sell", title: "home.text-066", detail: "home.text-067" },
  { icon: "headset_mic", title: "home.text-068", detail: "home.text-069" },
  { icon: "verified_user", title: "home.text-070", detail: "home.text-071" },
];

export function HomeHero({ image }: { image: string }) {
  return (
    <section className="relative isolate w-full bg-surface-muted">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-[-1] h-[350px] bg-cover bg-[center_bottom] lg:h-[453px] lg:bg-[length:110%_auto] lg:bg-[left_bottom]"
        style={{ backgroundImage: `url(${JSON.stringify(image)})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-surface-brand/95 via-hero-overlay/45 to-transparent lg:right-[29%]" />
      </div>

      <div className="site-container w-full pt-8 sm:pt-10">
        <div className="min-h-[236px] pb-5 sm:min-h-[280px] lg:min-h-[299px]">
          <img
            src="/images/figma/hero-kham-pha.png"
            alt=""
            width={334}
            height={112}
            className="-ml-2 -mb-4 h-auto w-48 select-none sm:-mb-7 sm:w-64 lg:w-[334px]"
          />
          <h1 className="w-fit bg-gradient-to-r from-blue-500 to-brand-deep bg-clip-text font-display text-[clamp(2.75rem,7vw,5.8125rem)] font-extrabold leading-[1.2] tracking-tight text-transparent">
            <ContentText contentKey="home.text-044" />{" "}
            <ContentText contentKey="home.text-045" />
          </h1>
          <p className="mt-2 text-base font-bold text-on-surface sm:text-lg lg:text-[22px]">
            <ContentText contentKey="home.text-043" />
          </p>
          <div
            aria-hidden="true"
            className="ml-5 h-2 w-28 rounded-[50%] border-b-[3px] border-promo-highlight sm:w-40"
          />
        </div>

        <HomeSearch />

        <ul className="grid grid-cols-2 gap-x-4 gap-y-6 py-10 lg:grid-cols-4 lg:gap-x-8 xl:mt-[50px] xl:min-h-[162px] xl:items-center xl:py-6">
          {benefits.map(({ icon, title, detail }) => (
            <li
              key={title}
              className="flex min-w-0 items-center gap-3 lg:justify-center lg:gap-5"
            >
              <span
                className="material-symbols-outlined shrink-0 text-[30px] text-brand-deep lg:text-[44px]"
                aria-hidden="true"
              >
                {icon}
              </span>
              <div>
                <strong className="block text-base font-extrabold text-on-surface lg:text-xl">
                  <ContentText contentKey={title} />
                </strong>
                <span className="mt-0.5 block text-xs font-semibold text-on-surface-variant lg:text-sm">
                  <ContentText contentKey={detail} />
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
