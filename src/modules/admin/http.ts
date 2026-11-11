import { z } from "zod";
import { ModuleError } from "./service";
export function moduleError(error: unknown) {
  const pg = error as { code?: string };
  const message =
    error instanceof z.ZodError
      ? error.issues[0]?.message
      : error instanceof ModuleError
        ? error.message
        : pg.code === "23505"
          ? "Mã hoặc đường dẫn đã tồn tại"
          : pg.code === "23503"
            ? "Bản ghi đang được sử dụng hoặc liên kết không tồn tại"
            : "Không thực hiện được thao tác. Vui lòng thử lại.";
  return Response.json(
    { error: message },
    {
      status:
        error instanceof ModuleError
          ? error.status
          : error instanceof z.ZodError ||
              ["23505", "23503", "23514"].includes(pg.code || "")
            ? 400
            : 503,
    },
  );
}
