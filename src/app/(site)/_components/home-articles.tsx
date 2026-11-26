import Link from "next/link";
import { ContentText } from "@/components/content";
import { listArticles } from "@/modules/blog/service";
import { HomeHeading, HomeSectionLink } from "./home-heading";

const dateFormat = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Asia/Ho_Chi_Minh",
});

export async function HomeArticles() {
  const articles = await listArticles("", "", 3);
  return (
    <section
      id="cam-nang"
      className="site-container w-full py-10 lg:pt-[60px] lg:pb-[120px]"
    >
      <HomeHeading contentKey="home.text-137">
        <HomeSectionLink contentKey="home.attributes-028" href="/blog">
          <ContentText contentKey="home.text-138" />
        </HomeSectionLink>
      </HomeHeading>
      {articles.length ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <article
              key={article.id}
              className="overflow-hidden rounded-[22px] bg-white shadow-card transition-shadow hover:shadow-card-hover"
            >
              <Link
                href={`/blog/${article.slug}`}
                aria-label={`Đọc tiếp: ${article.title}`}
                className="group flex h-full flex-col"
              >
                <div className="aspect-[2.57] overflow-hidden bg-surface-muted">
                  {article.image && (
                    <img
                      src={article.image}
                      alt=""
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-300 motion-safe:group-hover:scale-105"
                    />
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-5">
                  <h3 className="line-clamp-2 text-lg font-extrabold leading-snug text-on-surface group-hover:text-primary">
                    {article.title}
                  </h3>
                  <div className="mt-auto flex items-center justify-between gap-3 text-sm font-medium text-on-surface-variant">
                    <span className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-[18px] text-primary"
                        aria-hidden="true"
                      >
                        calendar_today
                      </span>
                      <time
                        dateTime={new Date(article.updated_at).toISOString()}
                      >
                        {dateFormat.format(new Date(article.updated_at))}
                      </time>
                    </span>
                    <span
                      className="material-symbols-outlined text-[22px] text-primary"
                      aria-hidden="true"
                    >
                      arrow_forward
                    </span>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      ) : (
        <div className="rounded-[22px] border border-border-subtle bg-white p-6 text-on-surface-variant shadow-card">
          Chưa có bài viết được đăng trong ngôn ngữ này.
          <Link
            className="ml-2 inline-flex min-h-11 items-center font-bold text-primary hover:underline"
            href="/blog"
          >
            Xem chuyên mục bài viết
          </Link>
        </div>
      )}
    </section>
  );
}
