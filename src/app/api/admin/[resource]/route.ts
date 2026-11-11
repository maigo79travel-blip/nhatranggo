import { z } from "zod";
import { adminUser, sameOrigin } from "@/lib/admin-auth";
import { productSchema, contentSchema } from "@/lib/admin-validation";
import {
  getAdminOverview,
  getAdminResourceList,
  cloneAdminProduct,
  updateAdminProduct,
  updateAdminContent,
  updateAdminFare,
  updateAdminBookingStatus,
  changeAdminPassword,
} from "@/lib/services/admin-service";

type RouteContext = { params: Promise<{ resource: string }> };

const unauthorized = () =>
  Response.json({ error: "Vui lòng đăng nhập" }, { status: 401 });

export async function GET(request: Request, context: RouteContext) {
  if (!(await adminUser())) return unauthorized();
  const { resource } = await context.params;

  if (resource === "overview") {
    try {
      const data = await getAdminOverview();
      return Response.json({ data });
    } catch {
      return Response.json(
        { error: "Không tải được tổng quan. Vui lòng thử lại." },
        { status: 503 },
      );
    }
  }

  try {
    const data = await getAdminResourceList(resource);
    if (!data) {
      return Response.json(
        { error: "Không tìm thấy dữ liệu" },
        { status: 404 },
      );
    }
    return Response.json({ data });
  } catch {
    return Response.json({ error: "Không tải được dữ liệu" }, { status: 503 });
  }
}

export async function POST(request: Request, context: RouteContext) {
  if (!(await adminUser())) return unauthorized();
  if (!sameOrigin(request)) {
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  }

  const { resource } = await context.params;
  if (resource !== "products") {
    return Response.json({ error: "Không hỗ trợ thao tác" }, { status: 405 });
  }

  try {
    const body = z
      .object({
        cloneId: z.string().max(100),
        title: z.string().trim().min(2).max(300),
      })
      .parse(await request.json());

    const cloned = await cloneAdminProduct(body.cloneId, body.title);
    return cloned
      ? Response.json({ data: cloned }, { status: 201 })
      : Response.json({ error: "Mẫu không tồn tại" }, { status: 404 });
  } catch {
    return Response.json(
      { error: "Không tạo được dịch vụ. Kiểm tra tên và mẫu." },
      { status: 400 },
    );
  }
}

export async function PATCH(request: Request, context: RouteContext) {
  const user = await adminUser();
  if (!user) return unauthorized();
  if (!sameOrigin(request)) {
    return Response.json({ error: "Yêu cầu không hợp lệ" }, { status: 403 });
  }

  const { resource } = await context.params;

  try {
    const body = await request.json();

    if (resource === "products") {
      const p = productSchema.parse(body);
      try {
        const updated = await updateAdminProduct(p);
        return updated
          ? Response.json({ data: updated })
          : Response.json({ error: "Không tìm thấy dịch vụ" }, { status: 404 });
      } catch (err) {
        if ((err as Error).message === "Sửa giá xe tại mục Bảng giá xe") {
          return Response.json(
            { error: (err as Error).message },
            { status: 400 },
          );
        }
        throw err;
      }
    }

    if (resource === "content") {
      const p = contentSchema.parse(body);
      const key = z.string().min(1).max(200).parse(body.key);
      try {
        const updated = await updateAdminContent(key, p);
        return updated
          ? Response.json({ data: updated })
          : Response.json(
              { error: "Không tìm thấy nội dung" },
              { status: 404 },
            );
      } catch (err) {
        if ((err as Error).message === "Không được đổi loại trường nội dung") {
          return Response.json(
            { error: (err as Error).message },
            { status: 400 },
          );
        }
        throw err;
      }
    }

    if (resource === "fares") {
      const p = z
        .object({
          route: z.string().max(100),
          vehicle: z.enum(["4cho", "7cho", "16cho", "limo9"]),
          price: z.coerce.number().int().min(0).max(2000000000),
        })
        .parse(body);

      const updated = await updateAdminFare(p.route, p.vehicle, p.price);
      return updated
        ? Response.json({ data: updated })
        : Response.json({ error: "Không tìm thấy tuyến xe" }, { status: 404 });
    }

    if (resource === "bookings") {
      const p = z
        .object({
          id: z.uuid(),
          status: z.enum(["pending", "confirmed", "cancelled"]),
        })
        .parse(body);

      const updated = await updateAdminBookingStatus(p.id, p.status);
      return updated
        ? Response.json({ data: updated })
        : Response.json({ error: "Không tìm thấy yêu cầu" }, { status: 404 });
    }

    if (resource === "account") {
      const p = z
        .object({
          currentPassword: z.string().max(200),
          newPassword: z.string().min(12).max(200),
        })
        .parse(body);

      try {
        await changeAdminPassword(user, p.currentPassword, p.newPassword);
        return Response.json({
          ok: true,
          message: "Đã đổi mật khẩu. Vui lòng đăng nhập lại.",
        });
      } catch (err) {
        if ((err as Error).message === "Mật khẩu hiện tại không đúng") {
          return Response.json(
            { error: (err as Error).message },
            { status: 400 },
          );
        }
        throw err;
      }
    }

    return Response.json({ error: "Không hỗ trợ thao tác" }, { status: 404 });
  } catch (error) {
    return Response.json(
      {
        error:
          error instanceof z.ZodError
            ? error.issues[0]?.message
            : "Không lưu được dữ liệu. Vui lòng thử lại.",
      },
      { status: error instanceof z.ZodError ? 400 : 503 },
    );
  }
}
