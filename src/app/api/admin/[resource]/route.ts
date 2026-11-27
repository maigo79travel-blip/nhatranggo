import { AppError } from "@/lib/errors";
import { z } from "zod";
import { adminUser } from "@/modules/admin/auth";
import { sameOrigin } from "@/lib/request-security";
import {
  productSchema,
  contentSchema,
} from "@/modules/admin/content-validation";
import { bookingSchema } from "@/modules/bookings/validation";
import { db } from "@/lib/db";
import { writeFare } from "@/modules/travel/fare-admin";
import {
  closeAdminDeparture,
  listAdminDepartures,
  listAdminTourOptions,
  saveAdminDeparture,
} from "@/modules/travel/departure-admin";
import { publicProductWhere } from "@/modules/travel/product-visibility";
import {
  getAdminOverview,
  getAdminResourceList,
  getAdminTourTemplate,
  createAdminTour,
  cloneAdminProduct,
  updateAdminProduct,
  updateAdminContent,
  changeAdminPassword,
} from "@/modules/admin/core-resources";
import { createBooking } from "@/modules/bookings/service";
import { resources } from "@/modules/admin/resources";
import { canAccess } from "@/modules/admin/permissions";
import { contentScopes, type ContentScope } from "@/modules/admin/routes";
import { listRecords, saveRecord, removeRecord } from "@/modules/admin/service";
import { errorResponse, readJson } from "@/lib/http";
import {
  bookingUpdateSchema,
  updateBooking,
  exportBookings,
  listAdminBookings,
} from "@/modules/bookings/admin-service";
import {
  bookingPageSchema,
  readBookingFilters,
} from "@/modules/bookings/admin-filters";

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
      const { searchParams } = new URL(request.url);
      if (resource === "departures")
        return Response.json(
          searchParams.get("options") === "1"
            ? { data: await listAdminTourOptions() }
            : await listAdminDepartures(searchParams),
        );
      if (resource === "booking-export") {
        const format = z
          .enum(["csv", "xlsx"])
          .parse(searchParams.get("format") ?? "csv");
        const { body, type } = await exportBookings(
          readBookingFilters(searchParams),
          format,
        );
        return new Response(body, {
          headers: {
            "Content-Type": type,
            "Content-Disposition": `attachment; filename="bookings.${format}"`,
            "Cache-Control": "private, no-store",
          },
        });
      }
      if (resource === "overview")
        return Response.json({
          data: await getAdminOverview(canAccess(user, "bookings")),
        });
      if (resource === "bookings" && searchParams.has("phone"))
        return Response.json({
          data: (
            await db.query(
              "SELECT b.*,b.departure_date::text,p.title FROM bookings b JOIN products p ON p.id=b.product_id WHERE phone=$1 ORDER BY created_at DESC",
              [searchParams.get("phone")],
            )
          ).rows,
        });
      if (resource === "bookings" && searchParams.has("history"))
        return Response.json({
          data: (
            await db.query(
              "SELECT h.status,h.notes,h.created_at,u.username FROM booking_history h LEFT JOIN admin_users u ON u.id=h.actor_id WHERE h.booking_id=$1 ORDER BY h.created_at DESC",
              [z.uuid().parse(searchParams.get("history"))],
            )
          ).rows,
        });
      if (resource === "bookings" && searchParams.has("page"))
        return Response.json(
          await listAdminBookings(
            readBookingFilters(searchParams),
            bookingPageSchema.parse(searchParams.get("page")),
          ),
        );
      if (
        resource === "products" &&
        (user.role === "booking" || searchParams.get("bookable") === "1")
      ) {
        const { rows } = await db.query(
          `SELECT p.id,p.type,p.title,p.price,p.active FROM products p WHERE ${publicProductWhere} ORDER BY p.position,p.id`,
        );
        return Response.json({ data: rows });
      }
      if (resource === "requests" && searchParams.has("kind"))
        z.literal("fast-track").parse(searchParams.get("kind"));
      if (resource === "products" && searchParams.has("tourTemplate"))
        return Response.json({
          data: await getAdminTourTemplate(
            z.string().min(1).max(100).parse(searchParams.get("tourTemplate")),
          ),
        });
      const data = Object.hasOwn(resources, resource)
        ? await listRecords(resource)
        : await getAdminResourceList(resource, {
            type:
              resource === "products"
                ? z
                    .enum(["hotel", "tour", "combo"])
                    .optional()
                    .parse(searchParams.get("type") ?? undefined)
                : undefined,
            scope:
              resource === "content"
                ? z
                    .enum(Object.keys(contentScopes) as ContentScope[])
                    .optional()
                    .parse(searchParams.get("scope") ?? undefined)
                : undefined,
          });
      if (!data) throw new AppError("Không tìm thấy module", 404);
      return Response.json({ data });
    }
    const body = await readJson(request, 1048576);
    if (resource === "departures") {
      if (method === "DELETE")
        return Response.json({ data: await closeAdminDeparture(body) });
      const id = method === "PATCH" ? z.uuid().parse(body.id) : undefined;
      return Response.json(await saveAdminDeparture(body, id), {
        status: method === "POST" ? 201 : 200,
      });
    }
    if (Object.hasOwn(resources, resource)) {
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
          "UPDATE products SET active=false,updated_at=now() WHERE id=$1 AND type<>'transfer' RETURNING id",
          [z.string().min(1).max(100).parse(body.id)],
        );
        if (!result.rowCount) throw new AppError("Không tìm thấy dịch vụ", 404);
        return Response.json({ data: result.rows[0] });
      }
      if (method === "POST") {
        if (body.action === "create-tour")
          return Response.json(
            { data: await createAdminTour(body) },
            { status: 201 },
          );
        const input = z
          .object({
            cloneId: z.string().max(100).optional(),
            title: z.string().trim().min(2).max(300),
            type: z.enum(["hotel", "tour", "combo"]).optional(),
          })
          .parse(body);
        if (input.cloneId) {
          const data = await cloneAdminProduct(
            input.cloneId,
            input.title,
            input.type,
          );
          if (!data) throw new AppError("Mẫu không tồn tại", 404);
          return Response.json({ data }, { status: 201 });
        }
        const data = (
          await db.query(
            "INSERT INTO products(id,type,title,price,location,active) VALUES(gen_random_uuid()::text,$1,$2,0,'',false) RETURNING *",
            [input.type ?? "hotel", input.title],
          )
        ).rows[0];
        return Response.json({ data }, { status: 201 });
      }
      return Response.json({
        data: await updateAdminProduct(productSchema.parse(body)),
      });
    }
    if (resource === "content") {
      if (method !== "PATCH")
        throw new AppError("Chỉ hỗ trợ cập nhật trường nội dung hiện có", 405, {
          Allow: "GET, PATCH",
        });
      return Response.json({
        data: await updateAdminContent(
          z.string().min(1).max(200).parse(body.key),
          contentSchema.parse(body),
        ),
      });
    }
    if (resource === "fares") {
      const data = await writeFare(method, body);
      return Response.json({ data }, { status: method === "POST" ? 201 : 200 });
    }
    if (resource === "bookings") {
      if (method === "DELETE")
        throw new AppError("Booking phải lưu lịch sử. Hãy chuyển sang Đã hủy");
      return Response.json(
        {
          data:
            method === "POST"
              ? await createBooking(bookingSchema.parse(body), user.id)
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
