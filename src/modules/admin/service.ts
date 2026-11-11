import "server-only";
import { randomUUID } from "node:crypto";
import { z } from "zod";
import { db } from "@/lib/db";
import { passwordHash } from "@/lib/admin-auth";
import type { AdminUser } from "@/lib/types";
import { resources } from "./resources";
export class ModuleError extends Error {
  constructor(
    message: string,
    public status = 400,
  ) {
    super(message);
  }
}
export async function listRecords(resource: string) {
  const definition = resources[resource];
  if (!definition) throw new ModuleError("Không tìm thấy module", 404);
  const columns =
    resource === "users" ? "id,username,role,active,created_at" : "*";
  return (
    await db.query(
      `SELECT ${columns} FROM ${definition.table} ORDER BY ${resource === "articles" ? "updated_at DESC" : "id"} LIMIT 2000`,
    )
  ).rows;
}
export async function saveRecord(
  resource: string,
  body: unknown,
  actor: AdminUser,
  recordId?: string,
) {
  const definition = resources[resource];
  if (!definition) throw new ModuleError("Không tìm thấy module", 404);
  const values = definition.schema.parse(body) as Record<string, unknown>;
  if (recordId) z.uuid().parse(recordId);
  const client = await db.connect();
  try {
    await client.query("BEGIN");
    if (resource === "users") {
      await client.query("LOCK TABLE admin_users IN SHARE ROW EXCLUSIVE MODE");
      if (!recordId && !values.password)
        throw new ModuleError("Tài khoản mới cần mật khẩu từ 12 ký tự");
      if (
        recordId === actor.id &&
        (!values.active || values.role !== "super_admin")
      )
        throw new ModuleError(
          "Không được tự khóa hoặc hạ quyền tài khoản đang dùng",
        );
      if (recordId && (!values.active || values.role !== "super_admin")) {
        const count = await client.query(
          "SELECT count(*)::int AS n FROM admin_users WHERE role='super_admin' AND active=true AND id<>$1",
          [recordId],
        );
        if (count.rows[0].n < 1)
          throw new ModuleError("Phải giữ ít nhất một quản trị cao nhất");
      }
      if (values.password)
        values.password_hash = passwordHash(String(values.password));
      delete values.password;
    }
    if (resource === "destinations" && recordId) {
      const old = (
        await client.query("SELECT code FROM destinations WHERE id=$1", [
          recordId,
        ])
      ).rows[0];
      if (
        old &&
        old.code !== values.code &&
        (
          await client.query(
            "SELECT 1 FROM transfer_routes WHERE pickup_id=$1 OR dropoff_id=$1 LIMIT 1",
            [recordId],
          )
        ).rowCount
      )
        throw new ModuleError(
          "Điểm đến đã có tuyến xe; giữ mã hiện tại hoặc tạo điểm đến mới",
        );
    }
    if (resource === "routes") {
      const endpoints = await client.query(
        "SELECT id,code FROM destinations WHERE id=ANY($1::uuid[]) AND active=true",
        [[values.pickup_id, values.dropoff_id]],
      );
      if (endpoints.rowCount !== 2)
        throw new ModuleError("Điểm đón / trả không hoạt động");
      values.code =
        endpoints.rows.find((r) => r.id === values.pickup_id).code +
        "_" +
        endpoints.rows.find((r) => r.id === values.dropoff_id).code;
    }
    if (resource === "routes" && recordId) {
      const old = (
        await client.query("SELECT code FROM transfer_routes WHERE id=$1", [
          recordId,
        ])
      ).rows[0];
      if (
        old &&
        old.code !== values.code &&
        (
          await client.query(
            "SELECT 1 FROM transfer_fares WHERE route=$1 LIMIT 1",
            [old.code],
          )
        ).rowCount
      )
        throw new ModuleError(
          "Tuyến đã có bảng giá; hãy tạo tuyến mới khi đổi điểm đón trả",
        );
    }
    if (resource === "rooms" || resource === "departures") {
      const p = await client.query("SELECT type FROM products WHERE id=$1", [
        values.product_id,
      ]);
      if (p.rows[0]?.type !== (resource === "rooms" ? "hotel" : "tour"))
        throw new ModuleError("Loại dịch vụ không phù hợp");
    }
    const columns = Object.keys(values);
    const params = columns.map((key) =>
      typeof values[key] === "object" && values[key] !== null
        ? JSON.stringify(values[key])
        : values[key],
    );
    let result;
    if (recordId)
      result = await client.query(
        `UPDATE ${definition.table} SET ${columns.map((key, index) => `${key}=$${index + 1}`).join(",")}${["articles", "information_pages"].includes(definition.table) ? ",updated_at=now()" : ""} WHERE id=$${columns.length + 1} RETURNING *`,
        [...params, recordId],
      );
    else
      result = await client.query(
        `INSERT INTO ${definition.table}(id,${columns.join(",")}) VALUES($1,${columns.map((_, index) => `$${index + 2}`).join(",")}) RETURNING *`,
        [randomUUID(), ...params],
      );
    if (!result.rowCount) throw new ModuleError("Không tìm thấy bản ghi", 404);
    if (resource === "users" && recordId)
      await client.query("DELETE FROM admin_sessions WHERE user_id=$1", [
        recordId,
      ]);
    await client.query("COMMIT");
    const row = result.rows[0];
    delete row.password_hash;
    return row;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
export async function removeRecord(
  resource: string,
  id: string,
  actor: AdminUser,
) {
  z.uuid().parse(id);
  const definition = resources[resource];
  if (!definition) throw new ModuleError("Không tìm thấy module", 404);
  if (resource === "requests")
    throw new ModuleError(
      "Yêu cầu dịch vụ phải giữ lịch sử; hãy chuyển trạng thái Đã hủy",
    );
  if (resource === "users") {
    const row = (
      await db.query("SELECT username,role FROM admin_users WHERE id=$1", [id])
    ).rows[0];
    if (!row) throw new ModuleError("Không tìm thấy tài khoản", 404);
    return saveRecord(
      resource,
      { username: row.username, role: row.role, active: false },
      actor,
      id,
    );
  }
  const result = await db.query(
    definition.archive
      ? `UPDATE ${definition.table} SET active=false WHERE id=$1 RETURNING id`
      : `DELETE FROM ${definition.table} WHERE id=$1 RETURNING id`,
    [id],
  );
  if (!result.rowCount) throw new ModuleError("Không tìm thấy bản ghi", 404);
  return result.rows[0];
}
