import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { AppError } from "@/lib/errors";
import {
  fastTrackRatesKey,
  fastTrackRatesSchema,
} from "@/modules/support/fast-track-rates";
import { isNavigationHref } from "@/lib/navigation";
import { passwordHash, verifyPassword } from "./auth";
import type { AdminOverviewData, AdminUser } from "@/lib/types";
import { productSchema, type contentSchema } from "./content-validation";
import type { ContentScope, ProductSection } from "./routes";
import { homeContentFields } from "./home-content-fields";
import { vietnamToday } from "@/modules/travel/search";
import { tourBookedGuests } from "@/modules/travel/tour-availability";

export async function getAdminOverview(
  includeBookings: boolean,
): Promise<AdminOverviewData> {
  const [catalog, categories, updates, bookingStats, bookings] =
    await Promise.all([
      db.query(
        `SELECT count(*)::int AS services, count(*) FILTER (WHERE active)::int AS active_services,
        (SELECT count(*)::int FROM site_content) AS content,
        (SELECT count(*)::int FROM transfer_fares WHERE active) AS fares
       FROM products WHERE type<>'transfer'`,
      ),
      db.query(
        "SELECT type,count(*)::int AS count FROM products WHERE type<>'transfer' AND active GROUP BY type ORDER BY count(*) DESC,type",
      ),
      db.query(
        "SELECT id,title,type,image,updated_at FROM products WHERE type<>'transfer' ORDER BY updated_at DESC,id LIMIT 4",
      ),
      includeBookings
        ? db.query(
            `SELECT count(*)::int AS bookings,
             count(*) FILTER (WHERE created_at >= (date_trunc('day', now() AT TIME ZONE 'Asia/Ho_Chi_Minh') AT TIME ZONE 'Asia/Ho_Chi_Minh'))::int AS new_today,
             count(*) FILTER (WHERE status='pending')::int AS pending,
             count(*) FILTER (WHERE status='completed')::int AS completed,
             COALESCE(sum(confirmed_total) FILTER (WHERE status='completed'),0)::float AS revenue
           FROM bookings`,
          )
        : null,
      includeBookings
        ? db.query(
            "SELECT b.id,b.customer_name,b.status,b.created_at,b.departure_date::text AS departure_date,p.title FROM bookings b JOIN products p ON p.id=b.product_id ORDER BY b.created_at DESC,b.id DESC LIMIT 5",
          )
        : null,
    ]);

  return {
    stats: {
      ...catalog.rows[0],
      ...(bookingStats?.rows[0] ?? {
        bookings: 0,
        new_today: 0,
        pending: 0,
        completed: 0,
        revenue: 0,
      }),
    },
    categories: categories.rows,
    bookings: bookings?.rows ?? [],
    updates: updates.rows,
  };
}

const RESOURCE_QUERIES: Record<string, string> = {
  products: "SELECT * FROM products ORDER BY position,id",
  content: "SELECT * FROM site_content WHERE scope<>'evisa' ORDER BY scope,key",
  fares:
    "SELECT f.route,f.vehicle,f.price,r.title AS route_title FROM transfer_fares f LEFT JOIN transfer_routes r ON r.code=f.route WHERE f.active ORDER BY r.title,f.route,f.vehicle",
  bookings:
    "SELECT b.*,b.departure_date::text AS departure_date,p.title FROM bookings b JOIN products p ON p.id=b.product_id ORDER BY b.created_at DESC LIMIT 500",
};

export async function getAdminResourceList(
  resource: string,
  filters: { scope?: ContentScope; type?: ProductSection } = {},
): Promise<Record<string, unknown>[] | null> {
  if (resource === "products" && filters.type === "tour")
    return (
      await db.query(
        `SELECT p.*,
            EXISTS(SELECT 1 FROM departures d WHERE d.product_id=p.id) AS has_departures,
            (SELECT min(d.date)::text FROM departures d
             WHERE d.product_id=p.id AND d.active AND d.date >= $1::date
               AND (d.capacity IS NULL OR d.capacity > ${tourBookedGuests})) AS next_departure
         FROM products p WHERE p.type='tour' ORDER BY p.position,p.id`,
        [vietnamToday()],
      )
    ).rows;
  if (resource === "products" && filters.type)
    return (
      await db.query(
        "SELECT * FROM products WHERE type=$1 ORDER BY position,id",
        [filters.type],
      )
    ).rows;
  if (resource === "content" && filters.scope) {
    const scope = filters.scope;
    const result = await db.query(
      `SELECT * FROM site_content
       WHERE ((scope=ANY($1::text[]) AND key<>'site.contact')
          OR ($2='contact' AND key='site.contact'))
          AND ($3::text[] IS NULL OR key=ANY($3::text[]))
       ORDER BY CASE WHEN key LIKE '%.text-%' OR key LIKE '%.attributes-%' THEN 1 ELSE 0 END,scope,key`,
      [
        scope === "shared" ? ["site", "header", "footer"] : [scope],
        scope,
        scope === "home" ? Object.keys(homeContentFields) : null,
      ],
    );
    return scope === "home"
      ? result.rows.map((row) => ({
          ...row,
          display_label: homeContentFields[row.key],
        }))
      : result.rows;
  }
  if (!Object.hasOwn(RESOURCE_QUERIES, resource)) return null;
  const query = RESOURCE_QUERIES[resource];
  const result = await db.query(query);
  return result.rows;
}

export async function cloneAdminProduct(
  cloneId: string,
  title: string,
  type?: ProductSection,
) {
  const id = "product-" + randomUUID();
  const { rows } = await db.query(
    `INSERT INTO products(id,type,title,price,image,location,rating,description,position,original_price,collection_id,template_id,active,content,destination_id,partner_id)
     SELECT $1,type,$2,price,image,location,rating,description,position,original_price,collection_id,template_id,false,content,destination_id,partner_id
     FROM products WHERE id=$3 AND type<>'transfer' AND ($4::text IS NULL OR type=$4)
       AND (type='tour' OR template_id IS NOT NULL) RETURNING *`,
    [id, title, cloneId, type ?? null],
  );
  return rows[0] || null;
}

export async function getAdminTourTemplate(id: string) {
  const {
    rows: [tour],
  } = await db.query("SELECT * FROM products WHERE id=$1 AND type='tour'", [
    id,
  ]);
  if (!tour) throw new AppError("Không tìm thấy tour mẫu", 404);
  return tour;
}

function productValues(p: z.infer<typeof productSchema>) {
  return [
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
    p.featured ?? null,
  ];
}

export async function createAdminTour(body: Record<string, unknown>) {
  const tour = productSchema.parse({ ...body, id: randomUUID(), type: "tour" });
  const template = z.string().min(1).max(100).optional().parse(body.cloneId);
  const {
    rows: [saved],
  } = await db.query(
    `INSERT INTO products(
       id,title,type,price,original_price,image,location,rating,description,position,
       active,content,destination_id,partner_id,featured,collection_id,template_id
     )
     SELECT $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,
            COALESCE($15::boolean,false),source.collection_id,source.template_id
     FROM (SELECT $16::text AS id) selected
     LEFT JOIN products source ON source.id=selected.id AND source.type='tour'
     WHERE selected.id IS NULL OR source.id IS NOT NULL
     RETURNING *`,
    [...productValues(tour), template ?? null],
  );
  if (!saved) throw new AppError("Không tìm thấy tour mẫu", 404);
  return saved;
}

export async function updateAdminProduct(p: z.infer<typeof productSchema>) {
  if (p.type === "transfer") {
    throw new AppError("Sửa giá xe tại mục Bảng giá xe");
  }
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const {
      rows: [existing],
    } = await client.query<{ type: string }>(
      "SELECT type FROM products WHERE id=$1 AND type<>'transfer' FOR NO KEY UPDATE",
      [p.id],
    );
    if (!existing)
      throw new AppError("Không tìm thấy dịch vụ có thể chỉnh sửa", 404);
    if (
      existing.type !== p.type &&
      (existing.type === "tour" || p.type === "tour")
    ) {
      const {
        rows: [inUse],
      } = await client.query<{ linked: boolean }>(
        `SELECT EXISTS(SELECT 1 FROM departures WHERE product_id=$1)
           OR EXISTS(SELECT 1 FROM bookings WHERE product_id=$1)
           OR EXISTS(SELECT 1 FROM rooms WHERE product_id=$1) AS linked`,
        [p.id],
      );
      if (inUse.linked)
        throw new AppError(
          "Dịch vụ đã có lịch, loại phòng hoặc đơn đặt nên không thể đổi loại.",
          409,
        );
    }
    const { rows } = await client.query(
      `UPDATE products SET title=$2,type=$3,price=$4,original_price=$5,image=$6,location=$7,rating=$8,description=$9,position=$10,active=$11,content=$12,destination_id=$13,partner_id=$14,featured=COALESCE($15,featured),updated_at=now()
       WHERE id=$1 RETURNING *`,
      productValues(p),
    );
    await client.query("COMMIT");
    return rows[0];
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function updateAdminContent(
  key: string,
  p: z.infer<typeof contentSchema>,
) {
  const existing = await db.query(
    "SELECT kind FROM site_content WHERE key=$1 AND scope<>'evisa'",
    [key],
  );
  if (!existing.rows[0]) throw new AppError("Không tìm thấy nội dung", 404);
  if (existing.rows[0].kind !== p.kind) {
    throw new AppError("Không được đổi loại trường nội dung");
  }

  if (/^(fast-track|contact|lookup|blog)\.title$/.test(key)) {
    z.string()
      .trim()
      .min(1, "Tiêu đề không được bỏ trống")
      .max(200)
      .parse(p.value);
  }
  if (/^(fast-track|contact|lookup|blog)\.intro$/.test(key)) {
    z.string().max(2000).parse(p.value);
  }
  if (key === fastTrackRatesKey) fastTrackRatesSchema.parse(p.value);

  if (key === "site.contact") {
    const optionalChannel = z
      .union([
        z.url().refine((url) => url.startsWith("https://")),
        z.literal(""),
      ])
      .optional();
    z.object({
      phone: z.string().min(1).max(80),
      telephone: z.string().regex(/^[+0-9]+$/),
      email: z.union([z.email(), z.literal("")]).optional(),
      zalo: optionalChannel,
      whatsapp: optionalChannel,
      telegram: optionalChannel,
      facebook: optionalChannel,
      kakao: z.string().max(80).optional(),
      international: z.string().max(80).optional(),
      website: z.string().max(2000).refine(isNavigationHref).optional(),
    }).parse(p.value);
  }
  if (key === "site.mobile-navigation" || key === "site.navigation") {
    z.array(
      z.object({
        label: z.string().min(1).max(100),
        href: z
          .string()
          .trim()
          .max(2000)
          .refine(isNavigationHref, "Liên kết menu không hợp lệ"),
      }),
    )
      .max(30)
      .refine(
        (items) => new Set(items.map(({ href }) => href)).size === items.length,
        "Mỗi đường dẫn chỉ xuất hiện một lần trong menu",
      )
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

export async function changeAdminPassword(
  user: AdminUser,
  currentPassword: string,
  newPassword: string,
) {
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    const {
      rows: [account],
    } = await client.query<{ password_hash: string }>(
      "SELECT password_hash FROM admin_users WHERE id=$1 AND active FOR UPDATE",
      [user.id],
    );
    if (!account || !verifyPassword(currentPassword, account.password_hash))
      throw new AppError("Mật khẩu hiện tại không đúng");
    await client.query("UPDATE admin_users SET password_hash=$2 WHERE id=$1", [
      user.id,
      passwordHash(newPassword),
    ]);
    await client.query("DELETE FROM admin_sessions WHERE user_id=$1", [
      user.id,
    ]);
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
