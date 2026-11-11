import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { passwordHash, verifyPassword } from "@/lib/admin-auth";
import type { AdminOverviewData, AdminUser } from "@/lib/types";
import type { z as zType } from "zod";
import type { productSchema, contentSchema } from "@/lib/admin-validation";

export async function getAdminOverview(): Promise<AdminOverviewData> {
  const [stats, categories, bookings, updates] = await Promise.all([
    db.query(`SELECT (SELECT count(*)::int FROM products WHERE type<>'transfer') AS services,
      (SELECT count(*)::int FROM products WHERE type<>'transfer' AND active) AS active_services,
      (SELECT count(*)::int FROM bookings) AS bookings,
      (SELECT count(*)::int FROM bookings WHERE status='pending') AS pending,
      (SELECT count(*)::int FROM site_content) AS content,
      (SELECT count(*)::int FROM bookings WHERE status='completed') AS completed,
      (SELECT COALESCE(sum(confirmed_total),0)::float FROM bookings WHERE status='completed') AS revenue,
      (SELECT count(*)::int FROM transfer_fares) AS fares`),
    db.query(
      "SELECT type,count(*)::int AS count FROM products WHERE type<>'transfer' AND active GROUP BY type ORDER BY count(*) DESC",
    ),
    db.query(
      "SELECT b.id,b.customer_name,b.status,b.created_at,b.departure_date::text AS departure_date,p.title FROM bookings b JOIN products p ON p.id=b.product_id ORDER BY b.created_at DESC LIMIT 5",
    ),
    db.query(
      "SELECT id,title,type,image,updated_at FROM products WHERE type<>'transfer' ORDER BY updated_at DESC LIMIT 4",
    ),
  ]);

  return {
    stats: stats.rows[0],
    categories: categories.rows,
    bookings: bookings.rows,
    updates: updates.rows,
  };
}

const RESOURCE_QUERIES: Record<string, string> = {
  products: "SELECT * FROM products ORDER BY position,id",
  content: "SELECT * FROM site_content ORDER BY scope,key",
  fares: "SELECT * FROM transfer_fares ORDER BY route,vehicle",
  bookings:
    "SELECT b.*,b.departure_date::text AS departure_date,p.title FROM bookings b JOIN products p ON p.id=b.product_id ORDER BY b.created_at DESC LIMIT 500",
};

export async function getAdminResourceList(
  resource: string,
): Promise<Record<string, unknown>[] | null> {
  const query = RESOURCE_QUERIES[resource];
  if (!query) return null;
  const result = await db.query(query);
  return result.rows;
}

export async function cloneAdminProduct(cloneId: string, title: string) {
  const id = "product-" + randomUUID();
  const { rows } = await db.query(
    `INSERT INTO products(id,type,title,price,image,location,rating,description,position,original_price,collection_id,template_id,active,content)
 SELECT $1,type,$2,price,image,location,rating,description,position+1,original_price,collection_id,template_id,false,content FROM products WHERE id=$3 AND template_id IS NOT NULL RETURNING *`,
    [id, title, cloneId],
  );
  return rows[0] || null;
}

export async function updateAdminProduct(p: zType.infer<typeof productSchema>) {
  if (p.type === "transfer") {
    throw new Error("Sửa giá xe tại mục Bảng giá xe");
  }
  const { rows } = await db.query(
    "UPDATE products SET title=$2,type=$3,price=$4,original_price=$5,image=$6,location=$7,rating=$8,description=$9,position=$10,active=$11,content=$12,destination_id=$13,partner_id=$14,updated_at=now() WHERE id=$1 RETURNING *",
    [
      p.id,
      p.title,
      p.type,
      p.price,
      p.original_price,
      p.image,
      p.location,
      p.rating,
      p.description,
      p.position,
      p.active,
      JSON.stringify(p.content),
      p.destination_id,
      p.partner_id,
    ],
  );
  return rows[0] || null;
}

export async function updateAdminContent(
  key: string,
  p: zType.infer<typeof contentSchema>,
) {
  const existing = await db.query(
    "SELECT kind FROM site_content WHERE key=$1",
    [key],
  );
  if (!existing.rows[0]) return null;
  if (existing.rows[0].kind !== p.kind) {
    throw new Error("Không được đổi loại trường nội dung");
  }

  if (key === "site.contact") {
    z.object({
      phone: z.string().min(1).max(80),
      telephone: z.string().regex(/^[+0-9]+$/),
      zalo: z.url().refine((url) => url.startsWith("https://")),
      email: z.email(),
      whatsapp: z
        .union([
          z.url().refine((url) => url.startsWith("https://")),
          z.literal(""),
        ])
        .optional(),
      telegram: z
        .union([
          z.url().refine((url) => url.startsWith("https://")),
          z.literal(""),
        ])
        .optional(),
    }).parse(p.value);
  }
  if (key === "site.mobile-navigation" || key === "site.navigation") {
    z.array(
      z.object({
        label: z.string().min(1).max(100),
        href: z.string().regex(/^(\/[^/]|\/$|https?:\/\/|#)/),
      }),
    )
      .max(30)
      .parse(p.value);
  }
  if (key === "site.metadata" || key.startsWith("metadata.")) {
    z.object({
      title: z.string().min(1).max(200),
      description: z.string().max(1000).optional(),
    }).parse(p.value);
  }

  const { rows } = await db.query(
    "UPDATE site_content SET label=$2,value=$3,updated_at=now() WHERE key=$1 RETURNING *",
    [key, p.label, JSON.stringify(p.value)],
  );
  return rows[0] || null;
}

export async function updateAdminFare(
  route: string,
  vehicle: "4cho" | "7cho" | "16cho" | "limo9",
  price: number,
) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const res = await client.query(
      "UPDATE transfer_fares SET price=$3 WHERE route=$1 AND vehicle=$2 RETURNING *",
      [route, vehicle, price],
    );
    if (!res.rowCount) {
      await client.query("ROLLBACK");
      return null;
    }
    await client.query(
      "UPDATE products SET price=$2,updated_at=now() WHERE id=$1",
      [`transfer-${route}-${vehicle}`, price],
    );
    await client.query("COMMIT");
    return res.rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function changeAdminPassword(
  user: AdminUser,
  currentPassword: string,
  newPassword: string,
) {
  const row = await db.query(
    "SELECT password_hash FROM admin_users WHERE id=$1",
    [user.id],
  );
  if (!verifyPassword(currentPassword, row.rows[0].password_hash)) {
    throw new Error("Mật khẩu hiện tại không đúng");
  }
  await db.query("UPDATE admin_users SET password_hash=$2 WHERE id=$1", [
    user.id,
    passwordHash(newPassword),
  ]);
  await db.query("DELETE FROM admin_sessions WHERE user_id=$1", [user.id]);
}
