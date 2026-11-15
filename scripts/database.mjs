import fs from "node:fs";
import pg from "pg";
import { migrate } from "./lib/migrations.mjs";
import { connectionOptions } from "../db/connection.mjs";
const db = new pg.Pool(
  connectionOptions(process.env.DIRECT_URL || process.env.DATABASE_URL),
);
try {
  if (process.argv[2] === "migrate") {
    await migrate(db);
    console.log("Migration complete");
  } else if (process.argv[2] === "seed") {
    const client = await db.connect();
    try {
      await client.query("BEGIN");
      const products = JSON.parse(
        fs.readFileSync("db/seed/products.json", "utf8"),
      );
      const fares = JSON.parse(fs.readFileSync("db/seed/fares.json", "utf8"));
      for (const [index, p] of products.entries())
        await client.query(
          "INSERT INTO products(id,type,title,price,image,location,rating,description,position) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(id) DO NOTHING",
          [
            p.id,
            p.type,
            p.title,
            p.price,
            p.image,
            p.location,
            p.rating,
            p.description,
            index,
          ],
        );
      for (const [route, prices] of Object.entries(fares))
        for (const [i, vehicle] of [
          "4cho",
          "7cho",
          "16cho",
          "limo9",
        ].entries()) {
          await client.query(
            "INSERT INTO transfer_fares(route,vehicle,price) VALUES($1,$2,$3) ON CONFLICT DO NOTHING",
            [route, vehicle, prices[i]],
          );
          await client.query(
            "INSERT INTO products(id,type,title,price,location,description) VALUES($1,'transfer',$2,$3,$4,$5) ON CONFLICT DO NOTHING",
            [
              `transfer-${route}-${vehicle}`,
              `Xe ${vehicle} · ${route}`,
              prices[i],
              route,
              "Giá mỗi chuyến, chưa bao gồm yêu cầu phát sinh.",
            ],
          );
        }
      await client.query("COMMIT");
      console.log(`Seeded ${products.length} cards and 32 transfer fares`);
      await import("./seed-content.mjs");
    } catch (e) {
      await client.query("ROLLBACK");
      throw e;
    } finally {
      client.release();
    }
  } else throw new Error("Use migrate or seed");
} finally {
  await db.end();
}
