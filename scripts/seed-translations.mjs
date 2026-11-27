import fs from "node:fs";
import pg from "pg";
import { connectionOptions } from "../db/connection.mjs";

const locales = ["en", "ru", "ko", "zh"];
const db = new pg.Pool(
  connectionOptions(process.env.DIRECT_URL || process.env.DATABASE_URL),
);

const client = await db.connect();
try {
  await client.query("BEGIN");
  let contentCount = 0;
  let productCount = 0;
  let pageCount = 0;

  for (const locale of locales) {
    const filePath = `db/seed/translations/${locale}.json`;
    if (!fs.existsSync(filePath)) continue;
    const data = JSON.parse(fs.readFileSync(filePath, "utf8"));

    for (const [key, value] of Object.entries(data.content || {})) {
      await client.query(
        `INSERT INTO translations(id, entity, entity_key, locale, value)
         VALUES(gen_random_uuid(), 'content', $1, $2, $3::jsonb)
         ON CONFLICT(entity, entity_key, locale) DO NOTHING`,
        [key, locale, JSON.stringify({ value })],
      );
      contentCount++;
    }

    for (const [id, product] of Object.entries(data.products || {})) {
      await client.query(
        `INSERT INTO translations(id, entity, entity_key, locale, value)
         VALUES(gen_random_uuid(), 'product', $1, $2, $3::jsonb)
         ON CONFLICT(entity, entity_key, locale) DO NOTHING`,
        [id, locale, JSON.stringify(product)],
      );
      productCount++;
    }

    for (const page of data.information_pages || []) {
      await client.query(
        `INSERT INTO information_pages(id, title, slug, locale, body, status)
         VALUES(gen_random_uuid(), $1, $2, $3, $4, 'published')
         ON CONFLICT(slug, locale) DO NOTHING`,
        [page.title, page.slug, locale, page.body],
      );
      pageCount++;
    }
  }

  await client.query("COMMIT");
  console.log(
    `Seeded translations: ${contentCount} content, ${productCount} product, ${pageCount} info pages`,
  );
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await db.end();
}
