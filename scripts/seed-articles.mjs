import { readFileSync } from "node:fs";
import pg from "pg";
import { connectionOptions } from "../db/connection.mjs";

const articles = JSON.parse(
  readFileSync(new URL("../db/seed/articles.json", import.meta.url), "utf8"),
);
const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
if (!connectionString) throw new Error("Set DATABASE_URL or DIRECT_URL.");

const db = new pg.Client(connectionOptions(connectionString));
await db.connect();
try {
  await db.query("BEGIN");
  let inserted = 0;
  for (const article of articles.toReversed()) {
    await db.query(
      `INSERT INTO article_categories(id, title, slug)
       VALUES(gen_random_uuid(), $1, $2)
       ON CONFLICT(slug) DO NOTHING`,
      [article.category.title, article.category.slug],
    );
    const result = await db.query(
      `INSERT INTO articles(
         id, title, slug, locale, category_id, excerpt, body, image,
         seo_title, seo_description, status, created_at, updated_at
       )
       SELECT gen_random_uuid(), $1, $2, 'vi', id, $3, $4, $5,
              $6, $7, 'published', statement_timestamp(), statement_timestamp()
       FROM article_categories WHERE slug = $8
       ON CONFLICT(slug, locale) DO NOTHING`,
      [
        article.title,
        article.slug,
        article.excerpt,
        article.body.join("\n\n"),
        article.image,
        article.seoTitle,
        article.seoDescription,
        article.category.slug,
      ],
    );
    inserted += result.rowCount;
  }
  await db.query("COMMIT");
  console.log(
    `Published ${inserted} articles. Skipped ${articles.length - inserted} existing articles.`,
  );
} catch (error) {
  await db.query("ROLLBACK");
  throw error;
} finally {
  await db.end();
}
