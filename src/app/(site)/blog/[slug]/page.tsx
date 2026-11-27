import { notFound } from "next/navigation";
import { getPublishedPage } from "@/modules/blog/service";
import { Markdown } from "@/modules/blog/markdown";
import { PublicPage } from "@/components/site/public-page";
import { isPublicImageUrl } from "@/lib/content-attributes";
import { ArticleDate } from "@/modules/blog/article-card";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedPage("article", slug);
  return {
    title: page?.seo_title || page?.title,
    description: page?.seo_description,
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getPublishedPage("article", slug);
  if (!article) notFound();
  return (
    <PublicPage
      title={article.title}
      parentBreadcrumb={{ href: "/blog", label: "Blog" }}
    >
      <article className="mx-auto overflow-hidden rounded-[24px] border border-border-subtle bg-surface shadow-card">
        {isPublicImageUrl(article.image) && (
          <img
            src={article.image}
            alt=""
            className="max-h-[min(44vw,32rem)] w-full object-cover"
          />
        )}
        <div className="mx-auto max-w-[76ch] px-5 py-6 sm:px-8 sm:py-9">
          <div className="mb-5 border-b border-border-subtle pb-4">
            <ArticleDate date={article.updated_at} />
          </div>
          <Markdown value={article.body} />
        </div>
      </article>
    </PublicPage>
  );
}
