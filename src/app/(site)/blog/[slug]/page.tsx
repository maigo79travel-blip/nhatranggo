import { notFound } from "next/navigation";
import { getPublishedPage } from "@/modules/blog/service";
import { Markdown } from "@/modules/blog/markdown";
import { PublicPage } from "@/components/site/public-page";
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
    <PublicPage title={article.title}>
      <article className="public-reading">
        {article.image && (
          <img src={article.image} alt="" className="rounded-2xl w-full mb-8" />
        )}
        <Markdown value={article.body} />
      </article>
    </PublicPage>
  );
}
