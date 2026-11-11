import fs from "node:fs";
import pg from "pg";
const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const client = await db.connect();
try {
  await client.query("BEGIN");
  for (const file of fs
    .readdirSync("db")
    .filter((f) => /^\d.*\.sql$/.test(f))
    .sort())
    await client.query(fs.readFileSync("db/" + file, "utf8"));
  const products = JSON.parse(fs.readFileSync("db/seed/products.json", "utf8"));
  const entries = JSON.parse(fs.readFileSync("db/seed/content.json", "utf8"));
  for (const [position, p] of products.entries()) {
    await client.query(
      `INSERT INTO products(id,type,title,price,image,location,rating,description,position,original_price,collection_id,template_id,content)
   VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13)
   ON CONFLICT(id) DO UPDATE SET original_price=CASE WHEN products.template_id IS NULL THEN EXCLUDED.original_price ELSE products.original_price END,
   collection_id=COALESCE(products.collection_id,EXCLUDED.collection_id),template_id=COALESCE(products.template_id,EXCLUDED.template_id),
   description=CASE WHEN products.template_id IS NULL THEN EXCLUDED.description ELSE products.description END,
   content=CASE WHEN products.template_id IS NULL THEN EXCLUDED.content ELSE products.content END`,
      [
        p.id,
        p.type,
        p.title,
        p.price,
        p.image,
        p.location,
        p.rating,
        p.description,
        position,
        p.original_price ?? null,
        p.collection_id,
        p.template_id,
        JSON.stringify(p.content || {}),
      ],
    );
  }
  for (const entry of entries)
    await client.query(
      "INSERT INTO site_content(key,scope,label,kind,value) VALUES($1,$2,$3,$4,$5) ON CONFLICT DO NOTHING",
      [
        entry.key,
        entry.scope,
        entry.label,
        entry.kind,
        JSON.stringify(entry.value),
      ],
    );
  await client.query("COMMIT");
  console.log(
    `CMS ready: ${products.length} product templates; ${entries.length} content entries. Existing changes preserved.`,
  );
} catch (error) {
  await client.query("ROLLBACK");
  throw error;
} finally {
  client.release();
  await db.end();
}
