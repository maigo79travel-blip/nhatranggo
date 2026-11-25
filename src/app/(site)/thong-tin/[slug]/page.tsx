import { notFound } from "next/navigation";
import { getPublishedPage } from "@/modules/blog/service";
import { Markdown } from "@/modules/blog/markdown";
import { PublicPage } from "@/components/site/public-page";
export default async function InformationPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPublishedPage("page", slug);
  if (!page) notFound();
  return (
    <PublicPage title={page.title}>
      <div className="public-reading">
        <Markdown value={page.body} />
      </div>
    </PublicPage>
  );
}
