import { ContentText } from "@/components/content";
import { HomeLink } from "@/modules/home/home-link";
import { listArticles } from "@/modules/blog/service";
export async function HomeReviews() {
  const articles = (await listArticles()).slice(0, 4);
  return (
    <section id="cam-nang" className="site-container py-12 w-full">
      <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
        <div>
          <p className="text-label-sm font-bold text-secondary uppercase tracking-widest mb-2">
            <ContentText contentKey="home.text-136" />
          </p>
          <h2 className="text-headline-lg font-bold">
            <ContentText contentKey="home.text-137" />
          </h2>
        </div>
        <HomeLink
          contentKey="home.attributes-028"
          href="/blog"
          className="text-primary font-semibold"
        >
          <ContentText contentKey="home.text-138" />
          <span
            className="material-symbols-outlined align-middle ml-1"
            aria-hidden="true"
          >
            arrow_forward
          </span>
        </HomeLink>
      </div>
      <div className="card-grid-compact">
        {articles.map((article) => (
          <article
            key={article.id}
            className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md flex flex-col"
          >
            {article.image && (
              <a
                href={"/blog/" + article.slug}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={article.image}
                  alt=""
                  loading="lazy"
                  className="w-full h-44 object-cover"
                />
              </a>
            )}
            <div className="p-5 flex-1 flex flex-col gap-3">
              {article.category && (
                <p className="text-label-sm text-secondary">
                  {article.category}
                </p>
              )}
              <h3 className="text-title-md font-bold">
                <a href={"/blog/" + article.slug}>{article.title}</a>
              </h3>
              <p className="text-body-md text-on-surface-variant line-clamp-3">
                {article.excerpt}
              </p>
              <a
                className="text-primary font-semibold mt-auto pt-3"
                href={"/blog/" + article.slug}
              >
                Đọc tiếp<span className="sr-only">: {article.title}</span>
                <span
                  className="material-symbols-outlined align-middle"
                  aria-hidden="true"
                >
                  chevron_right
                </span>
              </a>
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
      <div className="mt-8 p-6 bg-surface-container-low rounded-2xl">
        <h3 className="text-title-md font-bold mb-3">
          <ContentText contentKey="home.text-159" />
        </h3>
        <div className="flex flex-wrap gap-2">
          {[37, 38, 39, 40].map((key, index) => (
            <HomeLink
              key={key}
              contentKey={"home.attributes-" + String(key).padStart(3, "0")}
              href="/blog"
              queryKey={"home.text-" + (161 + index)}
              className="px-3 py-2 rounded-lg bg-surface-container-lowest text-primary text-body-md"
            >
              <ContentText contentKey={"home.text-" + (161 + index)} />
            </HomeLink>
          ))}
        </div>
      </div>
    </section>
  );
}
