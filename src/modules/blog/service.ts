import "server-only";
import { db } from "@/lib/db";
import { getPublicLocale } from "@/lib/i18n";
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
  const locale = await getPublicLocale();
  return (
    await db.query<ArticleSummary>(
      `SELECT id, title, slug, excerpt, image, updated_at, category FROM (
         SELECT DISTINCT ON (a.slug) a.id, a.title, a.slug, a.excerpt, a.image,
                a.updated_at, c.title AS category
         FROM articles a
         LEFT JOIN article_categories c ON c.id=a.category_id AND c.active
         WHERE a.status='published' AND a.locale IN ($1, 'vi')
         ORDER BY a.slug, (a.locale=$1) DESC
       ) latest
       ORDER BY updated_at DESC, id
       LIMIT $2 OFFSET $3`,
      [locale, limit, offset],
    )
  ).rows;
}

export const getPublishedPage = cache(
  async (type: "article" | "page", slug: string) => {
    const locale = await getPublicLocale();
    const table = type === "article" ? "articles" : "information_pages";
    return (
      (
        await db.query(
          `SELECT title, body${type === "article" ? ", image, updated_at, seo_title, seo_description" : ""}
           FROM ${table}
           WHERE slug=$1 AND locale IN ($2, 'vi') AND status='published'
           ORDER BY (locale=$2) DESC
           LIMIT 1`,
          [slug, locale],
        )
      ).rows[0] || null
    );
  },
);
