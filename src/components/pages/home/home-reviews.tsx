import { ContentText, ContentElement } from "@/components/content";

export function HomeReviews() {
  return (
    <section className="site-container py-12 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 font-label-sm text-label-sm font-bold text-secondary uppercase tracking-widest mb-1.5">
            <span className="w-6 h-0.5 bg-secondary rounded-full"></span>
            <span>
              <ContentText contentKey="home.text-136" />
            </span>
          </div>
          <h2 className="font-headline-lg text-headline-lg font-bold text-on-surface">
            <ContentText contentKey="home.text-137" />
          </h2>
        </div>
        <ContentElement
          contentKey="home.attributes-028"
          tag="a"
          className="text-primary hover:text-ocean-deep font-label-lg text-label-lg flex items-center gap-1 group"

          data-action="details"
        >
          <span>
            <ContentText contentKey="home.text-138" />
          </span>
          <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
            {"arrow_forward"}
          </span>
        </ContentElement>
      </div>

      <div className="card-grid-compact">
        <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div className="relative h-44 overflow-hidden">
            <ContentElement
              contentKey="home.attributes-029"
              tag="div"
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            ></ContentElement>
            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                {"visibility"}
              </span>
              <ContentText contentKey="home.text-139" />
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="font-label-sm text-label-sm text-outline mb-2">
                <ContentText contentKey="home.text-140" />
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                <ContentText contentKey="home.text-141" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mt-2">
                <ContentText contentKey="home.text-142" />
              </p>
            </div>
            <ContentElement
              contentKey="home.attributes-030"
              tag="a"
              className="font-label-md text-label-md text-primary hover:text-ocean-deep flex items-center gap-1 mt-4 pt-2"

              data-action="details"
            >
              <span>
                <ContentText contentKey="home.text-143" />
              </span>
              <span className="material-symbols-outlined text-[16px]">
                {"chevron_right"}
              </span>
            </ContentElement>
          </div>
        </article>

        <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div className="relative h-44 overflow-hidden">
            <ContentElement
              contentKey="home.attributes-031"
              tag="div"
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            ></ContentElement>
            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                {"visibility"}
              </span>
              <ContentText contentKey="home.text-144" />
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="font-label-sm text-label-sm text-outline mb-2">
                <ContentText contentKey="home.text-145" />
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                <ContentText contentKey="home.text-146" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mt-2">
                <ContentText contentKey="home.text-147" />
              </p>
            </div>
            <ContentElement
              contentKey="home.attributes-032"
              tag="a"
              className="font-label-md text-label-md text-primary hover:text-ocean-deep flex items-center gap-1 mt-4 pt-2"

              data-action="details"
            >
              <span>
                <ContentText contentKey="home.text-148" />
              </span>
              <span className="material-symbols-outlined text-[16px]">
                {"chevron_right"}
              </span>
            </ContentElement>
          </div>
        </article>

        <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div className="relative h-44 overflow-hidden">
            <ContentElement
              contentKey="home.attributes-033"
              tag="div"
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            ></ContentElement>
            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                {"visibility"}
              </span>
              <ContentText contentKey="home.text-149" />
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="font-label-sm text-label-sm text-outline mb-2">
                <ContentText contentKey="home.text-150" />
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                <ContentText contentKey="home.text-151" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mt-2">
                <ContentText contentKey="home.text-152" />
              </p>
            </div>
            <ContentElement
              contentKey="home.attributes-034"
              tag="a"
              className="font-label-md text-label-md text-primary hover:text-ocean-deep flex items-center gap-1 mt-4 pt-2"

              data-action="details"
            >
              <span>
                <ContentText contentKey="home.text-153" />
              </span>
              <span className="material-symbols-outlined text-[16px]">
                {"chevron_right"}
              </span>
            </ContentElement>
          </div>
        </article>

        <article className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col group">
          <div className="relative h-44 overflow-hidden">
            <ContentElement
              contentKey="home.attributes-035"
              tag="div"
              className="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
            ></ContentElement>
            <span className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-surface-container-lowest/90 backdrop-blur-md font-label-sm text-label-sm text-on-surface font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-primary">
                {"visibility"}
              </span>
              <ContentText contentKey="home.text-154" />
            </span>
          </div>
          <div className="p-5 flex-1 flex flex-col justify-between">
            <div>
              <div className="font-label-sm text-label-sm text-outline mb-2">
                <ContentText contentKey="home.text-155" />
              </div>
              <h3 className="font-title-md text-title-md font-bold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                <ContentText contentKey="home.text-156" />
              </h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant line-clamp-3 mt-2">
                <ContentText contentKey="home.text-157" />
              </p>
            </div>
            <ContentElement
              contentKey="home.attributes-036"
              tag="a"
              className="font-label-md text-label-md text-primary hover:text-ocean-deep flex items-center gap-1 mt-4 pt-2"

              data-action="details"
            >
              <span>
                <ContentText contentKey="home.text-158" />
              </span>
              <span className="material-symbols-outlined text-[16px]">
                {"chevron_right"}
              </span>
            </ContentElement>
          </div>
        </article>
      </div>

      <div className="mt-8 p-6 bg-surface-container-low rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary text-on-primary flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-[20px]">
              {"auto_stories"}
            </span>
          </div>
          <div>
            <h4 className="font-title-md text-title-md font-bold text-on-surface">
              <ContentText contentKey="home.text-159" />
            </h4>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              <ContentText contentKey="home.text-160" />
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <ContentElement
            contentKey="home.attributes-037"
            tag="a"
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary font-label-sm text-label-sm transition-colors shadow-sm action-link"

            data-action="details"
          >
            <ContentText contentKey="home.text-161" />
          </ContentElement>
          <ContentElement
            contentKey="home.attributes-038"
            tag="a"
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary font-label-sm text-label-sm transition-colors shadow-sm action-link"

            data-action="details"
          >
            <ContentText contentKey="home.text-162" />
          </ContentElement>
          <ContentElement
            contentKey="home.attributes-039"
            tag="a"
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary font-label-sm text-label-sm transition-colors shadow-sm action-link"

            data-action="details"
          >
            <ContentText contentKey="home.text-163" />
          </ContentElement>
          <ContentElement
            contentKey="home.attributes-040"
            tag="a"
            className="px-3 py-1.5 rounded-lg bg-surface-container-lowest text-on-surface hover:text-primary font-label-sm text-label-sm transition-colors shadow-sm action-link"

            data-action="details"
          >
            <ContentText contentKey="home.text-164" />
          </ContentElement>
        </div>
      </div>
    </section>
  );
}
