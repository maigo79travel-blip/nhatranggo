import { db } from "@/lib/db";

export async function GET() {
  try {
    const {
      rows: [schema],
    } = await db.query<{ ready: boolean }>(
      "SELECT EXISTS (SELECT 1 FROM schema_migrations WHERE name=$1) AS ready",
      ["020_public_catalog_copy.sql"],
    );
    if (schema.ready) return Response.json({ status: "ok" });
  } catch {
    return Response.json({ status: "unavailable" }, { status: 503 });
  }
  return Response.json({ status: "unavailable" }, { status: 503 });
}
