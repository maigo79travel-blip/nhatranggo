import "server-only";
import { z } from "zod";
import { AppError } from "./errors";

export async function readJson(
  request: Request,
  maxBytes = 65536,
): Promise<Record<string, unknown>> {
  if (
    !/^application\/json(?:;|$)/i.test(
      request.headers.get("content-type") || "",
    )
  )
    throw new AppError("Yêu cầu phải dùng JSON", 415);
  if (Number(request.headers.get("content-length")) > maxBytes)
    throw new AppError("Dữ liệu gửi lên quá lớn", 413);
  const reader = request.body?.getReader();
  if (!reader) throw new AppError("Dữ liệu không hợp lệ");
  const chunks: Uint8Array[] = [];
  let length = 0;
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      length += value.byteLength;
      if (length > maxBytes) {
        await reader.cancel();
        throw new AppError("Dữ liệu gửi lên quá lớn", 413);
      }
      chunks.push(value);
    }
    const bytes = new Uint8Array(length);
    let offset = 0;
    for (const chunk of chunks) {
      bytes.set(chunk, offset);
      offset += chunk.byteLength;
    }
    const result: unknown = JSON.parse(new TextDecoder().decode(bytes));
    if (!result || typeof result !== "object" || Array.isArray(result))
      throw new AppError("Dữ liệu không hợp lệ");
    return result as Record<string, unknown>;
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError("Dữ liệu JSON không hợp lệ");
  } finally {
    reader.releaseLock();
  }
}

export function errorResponse(error: unknown) {
  const pg = error as { code?: string };
  const message =
    error instanceof z.ZodError
      ? error.issues[0]?.message
      : error instanceof AppError
        ? error.message
        : pg?.code === "23505"
          ? "Mã hoặc đường dẫn đã tồn tại"
          : pg?.code === "23503"
            ? "Bản ghi đang được sử dụng hoặc liên kết không tồn tại"
            : "Không thực hiện được thao tác. Vui lòng thử lại.";
  const status =
    error instanceof AppError
      ? error.status
      : error instanceof z.ZodError ||
          ["23505", "23503", "23514"].includes(pg?.code || "")
        ? 400
        : 503;
  if (status >= 500)
    console.error("api_failure", { code: pg?.code || "unknown" });
  return Response.json(
    { error: message },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store",
        ...(error instanceof AppError ? error.headers : {}),
      },
    },
  );
}
