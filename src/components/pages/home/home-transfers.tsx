import { HomeLink } from "@/modules/home/home-link";
import { ContentText, ContentElement } from "@/components/content";

export function HomeTransfers() {
  return (
    <section className="site-container py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm font-bold text-secondary uppercase tracking-widest mb-1.5">
            <span className="w-6 h-0.5 bg-secondary rounded-full"></span>
            <span>
              <ContentText contentKey="home.text-105" />
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            <ContentText contentKey="home.text-106" />
          </h2>
        </div>
        <HomeLink
          contentKey="home.attributes-009"
          className="text-primary hover:text-ocean-deep font-label-lg text-label-lg flex items-center gap-1 group"
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

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <HomeLink
          contentKey="home.attributes-010"
          className="relative rounded-3xl overflow-hidden group min-h-[300px] lg:col-span-2 lg:row-span-2 shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-109"
        >
          <ContentElement
            contentKey="home.attributes-011"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 rounded-full bg-primary/90 backdrop-blur-md text-on-primary font-label-sm text-label-sm font-bold uppercase tracking-wider">
              <ContentText contentKey="home.text-108" />
            </span>
          </div>
          <div className="absolute bottom-6 left-6 right-6 text-on-primary">
            <h3 className="font-headline-lg text-headline-lg font-bold text-white mb-1 group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-109" />
            </h3>
            <p className="font-body-md text-body-md text-ocean-light">
              <ContentText contentKey="home.text-110" />
            </p>
            <div className="flex items-center gap-2 mt-3 pt-3 bg-white/10 backdrop-blur-sm rounded-xl px-3 py-1.5 w-fit">
              <span className="material-symbols-outlined text-[16px] text-gold-amber">
                {"hotel"}
              </span>
              <span className="font-label-md text-label-md text-white font-semibold">
                <ContentText contentKey="home.text-111" />
              </span>
            </div>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-012"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-112"
        >
          <ContentElement
            contentKey="home.attributes-013"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-112" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-113" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-114" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-014"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-115"
        >
          <ContentElement
            contentKey="home.attributes-015"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-115" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-116" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-117" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-016"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-118"
        >
          <ContentElement
            contentKey="home.attributes-017"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-118" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-119" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-120" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-018"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-121"
        >
          <ContentElement
            contentKey="home.attributes-019"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-121" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-122" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-123" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-020"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-124"
        >
          <ContentElement
            contentKey="home.attributes-021"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-124" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-125" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-126" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-022"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-127"
        >
          <ContentElement
            contentKey="home.attributes-023"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-127" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-128" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-129" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-024"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-130"
        >
          <ContentElement
            contentKey="home.attributes-025"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-130" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-131" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-132" />
            </span>
          </div>
        </HomeLink>

        <HomeLink
          contentKey="home.attributes-026"
          className="relative rounded-2xl overflow-hidden group min-h-[220px] shadow-md hover:shadow-xl transition-all duration-300"
          href="/dich-vu?type=hotel"
          queryKey="home.text-133"
        >
          <ContentElement
            contentKey="home.attributes-027"
            tag="div"
            className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-700"
          ></ContentElement>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent"></div>
          <div className="absolute bottom-4 left-4 right-4 text-on-primary">
            <h3 className="font-headline-sm text-headline-sm font-bold text-white group-hover:text-gold-amber transition-colors">
              <ContentText contentKey="home.text-133" />
            </h3>
            <p className="font-body-sm text-body-sm text-ocean-light line-clamp-1">
              <ContentText contentKey="home.text-134" />
            </p>
            <span className="inline-block font-label-sm text-label-sm text-gold-soft mt-1 font-semibold">
              <ContentText contentKey="home.text-135" />
            </span>
          </div>
        </HomeLink>
      </div>
    </section>
  );
}
