import { AppError } from "@/lib/errors";
import { z } from "zod";
import { adminUser } from "@/modules/admin/auth";
import { sameOrigin } from "@/lib/request-security";
import { productSchema, contentSchema } from "@/modules/admin/content-validation";
import { bookingSchema } from "@/modules/bookings/validation";
import { db } from "@/lib/db";
import {
  getAdminOverview,
  getAdminResourceList,
  cloneAdminProduct,
  updateAdminProduct,
  updateAdminContent,
  updateAdminFare,
  changeAdminPassword,
} from "@/modules/admin/core-resources";
import { createBooking } from "@/modules/bookings/service";
import { resources } from "@/modules/admin/resources";
import { canAccess } from "@/modules/admin/permissions";
import { listRecords, saveRecord, removeRecord } from "@/modules/admin/service";
import { errorResponse, readJson } from "@/lib/http";
import {
  bookingUpdateSchema,
  updateBooking,
  exportBookings,
} from "@/modules/bookings/admin-service";
type Context = { params: Promise<{ resource: string }> };
async function handle(request: Request, context: Context) {
  try {
    const user = await adminUser();
    if (!user)
      return Response.json({ error: "Vui lòng đăng nhập" }, { status: 401 });
    const { resource } = await context.params;
    if (
      !canAccess(user, resource) &&
      !(
        request.method === "GET" &&
        resource === "products" &&
        user.role === "booking"
      )
    )
      return Response.json(
        { error: "Bạn không có quyền truy cập module này" },
        { status: 403 },
      );
    const method = request.method;
    if (method !== "GET" && !sameOrigin(request))
      return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
    if (method === "GET") {
      if (resource === "booking-export")
        return new Response(await exportBookings(), {
          headers: {
            "Content-Type": "text/csv; charset=utf-8",
            "Content-Disposition": 'attachment; filename="bookings.csv"',
          },
        });
      if (resource === "overview") {
        const data = await getAdminOverview();
        if (user.role === "editor") {
          data.bookings = [];
          data.stats.bookings = 0;
          data.stats.pending = 0;
          data.stats.completed = 0;
          data.stats.revenue = 0;
        }
        return Response.json({ data });
      }
      const url = new URL(request.url);
      if (resource === "bookings" && url.searchParams.has("phone"))
        return Response.json({
          data: (
            await db.query(
              "SELECT b.*,b.departure_date::text,p.title FROM bookings b JOIN products p ON p.id=b.product_id WHERE phone=$1 ORDER BY created_at DESC",
              [url.searchParams.get("phone")],
            )
          ).rows,
        });
      if (resource === "bookings" && url.searchParams.has("history"))
        return Response.json({
          data: (
            await db.query(
              "SELECT h.status,h.notes,h.created_at,u.username FROM booking_history h LEFT JOIN admin_users u ON u.id=h.actor_id WHERE h.booking_id=$1 ORDER BY h.created_at DESC",
              [z.uuid().parse(url.searchParams.get("history"))],
            )
          ).rows,
        });
      const data = resources[resource]
        ? await listRecords(resource)
        : await getAdminResourceList(resource);
      if (!data) throw new AppError("Không tìm thấy module", 404);
      return Response.json({ data });
    }
    const body = await readJson(request, 1048576);
    if (resources[resource]) {
      if (method === "DELETE")
        return Response.json({
          data: await removeRecord(resource, z.uuid().parse(body.id), user),
        });
      return Response.json(
        {
          data: await saveRecord(
            resource,
            body,
            user,
            method === "PATCH" ? z.uuid().parse(body.id) : undefined,
          ),
        },
        { status: method === "POST" ? 201 : 200 },
      );
    }
    if (resource === "products") {
      if (method === "DELETE") {
        const result = await db.query(
          "UPDATE products SET active=false,updated_at=now() WHERE id=$1 RETURNING id",
          [z.string().max(100).parse(body.id)],
        );
        if (!result.rowCount) throw new AppError("Không tìm thấy dịch vụ", 404);
        return Response.json({ data: result.rows[0] });
      }
      if (method === "POST") {
        const input = z
          .object({
            cloneId: z.string().max(100).optional(),
            title: z.string().trim().min(2).max(300),
            type: z.enum(["hotel", "tour", "combo"]).default("hotel"),
          })
          .parse(body);
        if (input.cloneId) {
          const data = await cloneAdminProduct(input.cloneId, input.title);
          if (!data) throw new AppError("Mẫu không tồn tại", 404);
          return Response.json({ data }, { status: 201 });
        }
        const data = (
          await db.query(
            "INSERT INTO products(id,type,title,price,location,active) VALUES(gen_random_uuid()::text,$1,$2,0,'',false) RETURNING *",
            [input.type, input.title],
          )
        ).rows[0];
        return Response.json({ data }, { status: 201 });
      }
      return Response.json({
        data: await updateAdminProduct(productSchema.parse(body)),
      });
    }
    if (resource === "content")
      return Response.json({
        data: await updateAdminContent(
          z.string().max(200).parse(body.key),
          contentSchema.parse(body),
        ),
      });
    if (resource === "fares") {
      const p = z
        .object({
          route: z.string().regex(/^[A-Z0-9_]{2,100}$/),
          vehicle: z.enum(["4cho", "7cho", "16cho", "limo9"]),
          price: z.coerce.number().int().min(0).max(2000000000),
        })
        .parse(body);
      if (method === "POST") {
        const route = (
          await db.query(
            "SELECT title FROM transfer_routes WHERE code=$1 AND active=true",
            [p.route],
          )
        ).rows[0];
        if (!route) throw new AppError("Hãy tạo tuyến xe trước");
        const client = await db.connect();
        try {
          await client.query("BEGIN");
          const result = await client.query(
            "INSERT INTO transfer_fares(route,vehicle,price) VALUES($1,$2,$3) RETURNING *",
            [p.route, p.vehicle, p.price],
          );
          await client.query(
            "INSERT INTO products(id,type,title,price,location,description) VALUES($1,'transfer',$2,$3,$4,'Giá tham khảo mỗi chuyến')",
            [
              `transfer-${p.route}-${p.vehicle}`,
              `${route.title} · ${p.vehicle}`,
              p.price,
              route.title,
            ],
          );
          await client.query("COMMIT");
          return Response.json({ data: result.rows[0] }, { status: 201 });
        } catch (e) {
          await client.query("ROLLBACK");
          throw e;
        } finally {
          client.release();
        }
      }
      return Response.json({
        data: await updateAdminFare(p.route, p.vehicle, p.price),
      });
    }
    if (resource === "bookings") {
      if (method === "DELETE")
        throw new AppError("Booking phải lưu lịch sử. Hãy chuyển sang Đã hủy");
      return Response.json(
        {
          data:
            method === "POST"
              ? await createBooking(bookingSchema.parse(body))
              : await updateBooking(bookingUpdateSchema.parse(body), user.id),
        },
        { status: method === "POST" ? 201 : 200 },
      );
    }
    if (resource === "account") {
      const p = z
        .object({
          currentPassword: z.string().max(200),
          newPassword: z.string().min(12).max(200),
        })
        .parse(body);
      await changeAdminPassword(user, p.currentPassword, p.newPassword);
      return Response.json({ ok: true });
    }
    throw new AppError("Không hỗ trợ thao tác", 404);
  } catch (error) {
    return errorResponse(error);
  }
}
export const GET = handle;
export const POST = handle;
export const PATCH = handle;
export const DELETE = handle;
