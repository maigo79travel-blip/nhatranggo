import "server-only";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { parseLocale } from "@/lib/locale";
export async function listArticles(category = "", query = "") {
  const locale = parseLocale((await cookies()).get("site_locale")?.value);
  return (
    await db.query(
      "SELECT a.id,a.title,a.slug,a.excerpt,a.image,c.title AS category FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id WHERE a.status='published' AND a.locale=$1 AND ($2='' OR c.slug=$2) AND ($3='' OR a.title ILIKE '%'||$3||'%' OR a.excerpt ILIKE '%'||$3||'%') ORDER BY a.updated_at DESC LIMIT 100",
      [locale, category, query],
    )
  ).rows;
}
export async function getPublishedPage(type: "article" | "page", slug: string) {
  const locale = parseLocale((await cookies()).get("site_locale")?.value);
  const table = type === "article" ? "articles" : "information_pages";
  return (
    (
      await db.query(
        `SELECT title,body${type === "article" ? ",image,seo_title,seo_description" : ""} FROM ${table} WHERE slug=$1 AND locale=$2 AND status='published'`,
        [slug, locale],
      )
    ).rows[0] || null
  );
}
