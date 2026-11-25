import { HomeLink } from "@/modules/home/home-link";
import { ContentText, ContentElement } from "@/components/content";

export function HomeTransfers() {
  return (
    <section className="site-container py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="font-headline-lg text-headline-lg font-extrabold text-on-surface">
            <ContentText contentKey="home.text-106" />
          </h2>
          <div className="w-12 h-1 rounded-full bg-primary mt-2" />
        </div>
        <HomeLink
          contentKey="home.attributes-009"
          className="text-secondary hover:text-ocean-deep font-label-lg text-label-lg font-bold flex items-center gap-1.5 group"
          href="/dich-vu?type=hotel"
        >
          <span>
            <ContentText contentKey="home.text-107" />
          </span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            {"arrow_forward"}
          </span>
        </HomeLink>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <HomeLink
          contentKey="home.attributes-010"
          className="relative rounded-3xl overflow-hidden group min-h-[344px] shadow-card hover:shadow-card-hover transition-all duration-300 block"
          href="/dich-vu?type=hotel"
          queryKey="home.text-109"
        >
          <ContentElement
            contentKey="home.attributes-011"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001a29]/20 to-[#001a29]/90"></div>
          <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 text-on-primary">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="material-symbols-outlined text-[28px] text-white">
                  {"location_on"}
                </span>
                <h3 className="font-headline-lg text-3xl font-extrabold text-white">
                  <ContentText contentKey="home.text-109" />
                </h3>
              </div>
              <p className="font-body-md text-lg font-semibold text-white/95 pl-9">
                <ContentText contentKey="home.text-110" />
              </p>
            </div>
            <span className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center text-white shrink-0 group-hover:bg-white group-hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[24px]">
                {"arrow_forward"}
              </span>
            </span>
          </div>
        </HomeLink>

        <div className="grid grid-cols-2 gap-4">
          {[
            { attr: "home.attributes-012", bg: "home.attributes-013", title: "home.text-112", sub: "home.text-113" },
            { attr: "home.attributes-014", bg: "home.attributes-015", title: "home.text-115", sub: "home.text-116" },
            { attr: "home.attributes-016", bg: "home.attributes-017", title: "home.text-118", sub: "home.text-119" },
            { attr: "home.attributes-018", bg: "home.attributes-019", title: "home.text-121", sub: "home.text-122" },
          ].map((item) => (
            <HomeLink
              key={item.attr}
              contentKey={item.attr}
              className="relative rounded-3xl overflow-hidden group min-h-[164px] shadow-card hover:shadow-card-hover transition-all duration-300 block"
              href="/dich-vu?type=hotel"
              queryKey={item.title}
            >
              <ContentElement
                contentKey={item.bg}
                tag="div"
                className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
              ></ContentElement>
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#001a29]/25 to-[#001a29]/90"></div>
              <div className="absolute bottom-4 left-4 right-4 text-on-primary">
                <div className="flex items-center gap-1.5 mb-0.5">
                  <span className="material-symbols-outlined text-[18px] text-white shrink-0">
                    {"location_on"}
                  </span>
                  <h3 className="font-headline-sm text-lg font-extrabold text-white truncate">
                    <ContentText contentKey={item.title} />
                  </h3>
                </div>
                <p className="font-body-sm text-xs text-white/90 line-clamp-1 pl-6">
                  <ContentText contentKey={item.sub} />
                </p>
              </div>
            </HomeLink>
          ))}
        </div>
      </div>
    </section>
  );
}
