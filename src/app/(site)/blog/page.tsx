import { listArticles } from "@/modules/blog/service";
import { db } from "@/lib/db";
import { PublicPage } from "@/components/site/public-page";
import Link from "next/link";
import Form from "next/form";
import { FilterField } from "@/components/site/filter-field";
import { PublicEmptyState, PublicIcon } from "@/components/site/public-ui";
import { CustomSelect } from "@/components/ui/custom-select";
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string }>;
}) {
  const params = await searchParams;
  const [articles, categories] = await Promise.all([
    listArticles(params.category, params.q),
    db.query(
      "SELECT title,slug FROM article_categories WHERE active=true ORDER BY title",
    ),
  ]);
  return (
    <PublicPage title="Blog & Tin tức">
      <Form
        key={JSON.stringify(params)}
        action="/blog"
        scroll={false}
        className="catalog-search-bar mb-8"
      >
        <FilterField
          label="Từ khóa"
          icon="search"
          className="catalog-keyword-field"
        >
          <input
            className="catalog-filter-control"
            placeholder="Tìm kinh nghiệm, điểm đến…"
            name="q"
            defaultValue={params.q}
          />
        </FilterField>
        <FilterField
          label="Chuyên mục"
          icon="category"
          className="catalog-destination-field"
        >
          <CustomSelect
            name="category"
            ariaLabel="Chuyên mục"
            searchable={categories.rows.length > 5}
            defaultValue={params.category || ""}
            buttonClassName="catalog-filter-control cursor-pointer"
            options={[
              { value: "", label: "Tất cả" },
              ...categories.rows.map((c) => ({
                value: String(c.slug),
                label: String(c.title),
              })),
            ]}
          />
        </FilterField>
        <button
          type="submit"
          aria-label="Tìm bài viết"
          className="public-primary-button catalog-search-submit"
        >
          <PublicIcon name="search" className="text-xl" />
          <span className="hidden sm:inline">Tìm bài viết</span>
        </button>
      </Form>
      <div className="public-card-grid">
        {articles.map((article) => (
          <article key={article.id} className="public-service-card">
            {article.image && (
              <Link
                href={"/blog/" + article.slug}
                aria-label={article.title}
                className="public-card-image"
              >
                <img src={article.image} alt="" loading="lazy" />
              </Link>
            )}
            <div className="public-card-content">
              <span className="text-primary text-xs font-bold uppercase tracking-wider">
                {article.category || "Cẩm nang du lịch"}
              </span>
              <h2 className="font-bold text-xl leading-snug">
                <Link
                  className="hover:text-primary transition-colors"
                  href={"/blog/" + article.slug}
                >
                  {article.title}
                </Link>
              </h2>
              <p className="text-sm text-on-surface-variant leading-relaxed line-clamp-3">
                {article.excerpt}
              </p>
              <Link
                href={"/blog/" + article.slug}
                className="inline-flex items-center gap-2 text-primary text-sm font-bold mt-auto pt-3 min-h-11"
              >
                Đọc tiếp <PublicIcon name="arrow_forward" className="text-lg" />
              </Link>
            </div>
          </article>
        ))}
      </div>
      {!articles.length && (
        <PublicEmptyState>
          Chưa có bài viết phù hợp trong ngôn ngữ này.
        </PublicEmptyState>
      )}
    </PublicPage>
  );
}
