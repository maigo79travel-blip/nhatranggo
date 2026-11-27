import Link from "next/link";
import { ContentText } from "@/components/content";
import { listArticles } from "@/modules/blog/service";
import { ArticleCard } from "@/modules/blog/article-card";
import { HomeHeading, HomeSectionLink } from "./home-heading";

export async function HomeArticles() {
  const articles = await listArticles(3);
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
            <ArticleCard key={article.id} article={article} variant="compact" />
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
