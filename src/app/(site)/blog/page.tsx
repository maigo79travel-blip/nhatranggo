import Link from "next/link";
import { PublicPage } from "@/components/site/public-page";
import { PublicIcon } from "@/components/site/public-ui";
import { getPublicPageCopy } from "@/lib/public-page-copy";
import { ArticleCard } from "@/modules/blog/article-card";
import { listArticles } from "@/modules/blog/service";
import "./blog.css";

const pageSize = 12;

function pageHref(page: number) {
  return page === 1 ? "/blog" : `/blog?page=${page}`;
}

export default async function BlogPage({ searchParams }: PageProps<"/blog">) {
  const raw = await searchParams;
  const page =
    typeof raw.page === "string" && /^\d{1,4}$/.test(raw.page)
      ? Math.max(1, Math.min(1000, Number(raw.page)))
      : 1;
  const [rows, copy] = await Promise.all([
    listArticles(pageSize + 1, (page - 1) * pageSize),
    getPublicPageCopy("blog", "Blog & Tin tức"),
  ]);
  const articles = rows.slice(0, pageSize);
  const hasNext = rows.length > pageSize && page < 1000;
  const lead = page === 1 ? articles[0] : undefined;
  const cards = lead ? articles.slice(1) : articles;

  return (
    <PublicPage
      {...copy}
      className="blog-page"
      hero={{ image: "/images/figma/hero-beach.png" }}
    >
      <section aria-labelledby="blog-list-heading">
        <h2
          id="blog-list-heading"
          className="mb-4 text-2xl font-extrabold tracking-tight sm:mb-5 sm:text-headline-lg"
        >
          Bài viết mới nhất
        </h2>

        {lead && <ArticleCard article={lead} variant="lead" />}
        {cards.length > 0 && (
          <div
            className={`grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-6 ${lead ? "mt-5 sm:mt-6" : ""}`}
          >
            {cards.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        )}
        {!articles.length && (
          <div className="public-empty-state">
            <PublicIcon name="article" className="text-4xl text-primary" />
            <p className="text-lg font-bold">Chưa có bài viết được đăng</p>
          </div>
        )}
        {(page > 1 || hasNext) && (
          <nav
            aria-label="Phân trang bài viết"
            className="mt-6 flex flex-wrap items-center justify-center gap-4"
          >
            {page > 1 && (
              <Link href={pageHref(page - 1)} className="public-contact-link">
                Trang trước
              </Link>
            )}
            <span className="text-sm text-on-surface-variant">
              Trang {page}
            </span>
            {hasNext && (
              <Link href={pageHref(page + 1)} className="public-contact-link">
                Trang sau
              </Link>
            )}
          </nav>
        )}
      </section>
    </PublicPage>
  );
}
