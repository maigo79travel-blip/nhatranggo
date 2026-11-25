import { ContentElement, ContentText } from "@/components/content";
import { HomeHeading, HomeSectionLink } from "./home-heading";
import { HomeLink } from "./home-link";

const destinations = [
  {
    link: "home.attributes-010",
    image: "home.attributes-011",
    title: "home.text-109",
    detail: "home.text-110",
  },
  {
    link: "home.attributes-012",
    image: "home.attributes-013",
    title: "home.text-112",
    detail: "home.text-113",
  },
  {
    link: "home.attributes-014",
    image: "home.attributes-015",
    title: "home.text-115",
    detail: "home.text-116",
  },
  {
    link: "home.attributes-016",
    image: "home.attributes-017",
    title: "home.text-118",
    detail: "home.text-119",
  },
  {
    link: "home.attributes-018",
    image: "home.attributes-019",
    title: "home.text-121",
    detail: "home.text-122",
  },
];

export function HomeDestinations() {
  return (
    <section className="home-destinations site-container w-full pt-4 pb-10 lg:pt-3 lg:pb-[42px]">
      <HomeHeading contentKey="home.text-106">
        <HomeSectionLink
          contentKey="home.attributes-009"
          href="/dich-vu?type=hotel"
        >
          <ContentText contentKey="home.text-107" />
        </HomeSectionLink>
      </HomeHeading>
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-[2fr_1.02fr_.96fr] lg:grid-rows-[repeat(2,minmax(150px,1fr))]">
        {destinations.map((item, index) => {
          const featured = index === 0;
          return (
            <HomeLink
              key={item.link}
              contentKey={item.link}
              href="/dich-vu?type=hotel"
              queryKey={item.title}
              className={`group relative isolate flex min-w-0 items-end overflow-hidden rounded-[22px] bg-on-surface text-white sm:rounded-[26px] ${
                featured
                  ? "col-span-2 min-h-[216px] p-5 sm:min-h-[300px] lg:col-span-1 lg:row-span-2 lg:min-h-[345px] lg:p-8"
                  : "min-h-[132px] p-3 sm:min-h-[164px] sm:p-5 lg:p-6"
              }`}
            >
              <ContentElement
                contentKey={item.image}
                tag="div"
                className="absolute inset-0 -z-20 bg-cover bg-center transition-transform duration-500 motion-safe:group-hover:scale-105"
              />
              <span
                aria-hidden="true"
                className="absolute inset-0 -z-10 bg-gradient-to-t from-destination-scrim/90 via-destination-scrim/20 to-transparent"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1 sm:gap-2">
                  <span
                    className={`material-symbols-outlined shrink-0 ${featured ? "text-[25px]" : "text-[19px]"}`}
                    aria-hidden="true"
                  >
                    location_on
                  </span>
                  <h3
                    className={`font-extrabold leading-tight ${featured ? "text-2xl lg:text-[32px]" : "text-base sm:text-xl lg:text-2xl"}`}
                  >
                    <ContentText contentKey={item.title} />
                  </h3>
                </div>
                <p
                  className={`mt-1 ${featured ? "text-sm lg:text-lg" : "text-xs sm:text-sm"}`}
                >
                  <ContentText contentKey={item.detail} />
                </p>
              </div>
              {featured && (
                <span
                  className="ml-3 grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-on-surface"
                  aria-hidden="true"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    arrow_forward
                  </span>
                </span>
              )}
            </HomeLink>
          );
        })}
      </div>
    </section>
  );
}
