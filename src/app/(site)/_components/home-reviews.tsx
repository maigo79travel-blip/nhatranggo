import { ContentText } from "@/components/content";
import { HomeLink } from "./home-link";
import { listArticles } from "@/modules/blog/service";
export async function HomeReviews() {
  const articles = (await listArticles()).slice(0, 3);
  return (
    <section id="cam-nang" className="site-container py-12 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <h2 className="text-headline-lg font-extrabold text-on-surface">
            <ContentText contentKey="home.text-137" />
          </h2>
          <div className="w-7 h-1 rounded-full bg-primary mt-2" />
        </div>
        <HomeLink
          contentKey="home.attributes-028"
          href="/blog"
          className="text-secondary hover:text-ocean-deep font-bold flex items-center gap-1.5"
        >
          <ContentText contentKey="home.text-138" />
          <span
            className="material-symbols-outlined text-[18px]"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </HomeLink>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-surface-container-lowest border border-border-light rounded-2xl overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300 flex flex-col group"
          >
            {article.image && (
              <a
                href={"/blog/" + article.slug}
                tabIndex={-1}
                aria-hidden="true"
                className="overflow-hidden block"
              >
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="w-full aspect-[16/10] object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </a>
            )}
            <div className="p-5 flex-1 flex flex-col gap-3">
              <h3 className="text-title-md font-extrabold text-on-surface group-hover:text-primary transition-colors line-clamp-2">
                <a href={"/blog/" + article.slug}>{article.title}</a>
              </h3>
              <div className="mt-auto pt-3 flex items-center justify-between text-outline text-sm">
                <span className="inline-flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-primary" aria-hidden="true">
                    calendar_today
                  </span>
                  <span>
                    {article.updated_at
                      ? new Date(article.updated_at).toLocaleDateString("vi-VN")
                      : article.category || "Nha Trang"}
                  </span>
                </span>
                <a
                  className="text-on-surface hover:text-primary font-semibold inline-flex items-center"
                  href={"/blog/" + article.slug}
                >
                  <span className="sr-only">Đọc tiếp: {article.title}</span>
                  <span
                    className="material-symbols-outlined text-[20px]"
                    aria-hidden="true"
                  >
                    arrow_forward
                  </span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!articles.length && (
        <p className="rounded-xl bg-surface-container-low p-5">
          Chưa có bài viết được đăng trong ngôn ngữ này.{" "}
          <a href="/blog" className="text-primary underline">
            Xem chuyên mục bài viết
          </a>
        </p>
      )}
    </section>
  );
}
