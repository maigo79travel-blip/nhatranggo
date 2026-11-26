import { ContentElement, ContentText } from "@/components/content";
import { HomeHeading, HomeSectionLink } from "./home-heading";
import { HomeLink } from "./home-link";
import type { HomeDestination } from "./home-navigation";

export function HomeDestinations({
  destinations,
}: {
  destinations: HomeDestination[];
}) {
  if (!destinations.length) return null;
  const collage = destinations.length === 5;
  const grid = collage
    ? "grid-cols-2 lg:grid-cols-[2fr_1.02fr_.96fr] lg:grid-rows-[repeat(2,minmax(150px,1fr))]"
    : destinations.length === 3
      ? "grid-cols-2 lg:grid-cols-3"
      : destinations.length > 1
        ? "grid-cols-2"
        : "grid-cols-1";
  return (
    <section className="home-destinations site-container w-full pt-4 pb-10 lg:pt-3 lg:pb-[42px]">
      <HomeHeading contentKey="home.text-106">
        <HomeSectionLink contentKey="home.attributes-009" href="/khach-san">
          <ContentText contentKey="home.text-107" />
        </HomeSectionLink>
      </HomeHeading>
      <div className={`grid gap-3 sm:gap-4 ${grid}`}>
        {destinations.map((item, index) => {
          const featured = index === 0;
          return (
            <HomeLink
              key={item.contentKey}
              contentKey={item.contentKey}
              href={item.href}
              className={`group relative isolate flex min-w-0 items-end overflow-hidden rounded-[22px] bg-on-surface text-white sm:rounded-[26px] ${
                featured && collage
                  ? "col-span-2 min-h-[216px] p-5 sm:min-h-[300px] lg:col-span-1 lg:row-span-2 lg:min-h-[345px] lg:p-8"
                  : "min-h-[164px] p-4 sm:min-h-[216px] sm:p-5 lg:p-6"
              } ${
                featured && destinations.length === 3
                  ? "col-span-2 lg:col-span-1"
                  : ""
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
                    className={`font-extrabold leading-tight ${featured && collage ? "text-2xl lg:text-[32px]" : "text-base sm:text-xl lg:text-2xl"}`}
                  >
                    <ContentText contentKey={item.title} />
                  </h3>
                </div>
                <p
                  className={`mt-1 ${featured && collage ? "text-sm lg:text-lg" : "text-xs sm:text-sm"}`}
                >
                  <ContentText contentKey={item.detail} />
                </p>
              </div>
              {featured && collage && (
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
