import "server-only";
import { db } from "@/lib/db";
import { cookies } from "next/headers";
import { parseLocale } from "@/lib/locale";
import { cache } from "react";

export type ArticleSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  updated_at: Date;
  category: string | null;
};

export async function listArticles(limit: number, offset = 0) {
  const locale = parseLocale((await cookies()).get("site_locale")?.value);
  return (
    await db.query<ArticleSummary>(
      `SELECT a.id,a.title,a.slug,a.excerpt,a.image,a.updated_at,c.title AS category
       FROM articles a LEFT JOIN article_categories c ON c.id=a.category_id AND c.active
       WHERE a.status='published' AND a.locale=$1
       ORDER BY a.updated_at DESC,a.id LIMIT $2 OFFSET $3`,
      [locale, limit, offset],
    )
  ).rows;
}

export const getPublishedPage = cache(
  async (type: "article" | "page", slug: string) => {
    const locale = parseLocale((await cookies()).get("site_locale")?.value);
    const table = type === "article" ? "articles" : "information_pages";
    return (
      (
        await db.query(
          `SELECT title,body${type === "article" ? ",image,updated_at,seo_title,seo_description" : ""} FROM ${table} WHERE slug=$1 AND locale=$2 AND status='published'`,
          [slug, locale],
        )
      ).rows[0] || null
    );
  },
);
