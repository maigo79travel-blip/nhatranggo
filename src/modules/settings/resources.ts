import { z } from "zod";
import { localeSchema, localeOptions } from "@/lib/locale";
import type { ResourceDefinition } from "../admin/types";
import {
  title,
  text,
  slug,
  publication,
  publicationOptions,
} from "@/lib/validation";
export const settingsResources: Record<string, ResourceDefinition> = {
  pages: {
    table: "information_pages",
    label: "Giới thiệu & Chính sách",
    icon: "description",
    roles: ["editor"],
    columns: ["title", "slug", "locale", "status"],
    schema: z.object({
      title,
      slug,
      locale: localeSchema,
      body: text,
      status: publication,
    }),
    fields: [
      { name: "title", label: "Tiêu đề", required: true },
      { name: "slug", label: "Đường dẫn", required: true },
      {
        name: "locale",
        label: "Ngôn ngữ",
        type: "select",
        options: localeOptions,
      },
      { name: "body", label: "Nội dung", type: "markdown" },
      {
        name: "status",
        label: "Trạng thái",
        type: "select",
        options: publicationOptions,
      },
    ],
  },
  translations: {
    table: "translations",
    label: "Ngôn ngữ website",
    icon: "translate",
    roles: ["editor"],
    columns: ["entity", "entity_key", "locale"],
    schema: z.object({
      entity: z.enum(["content", "product"]),
      entity_key: title,
      locale: localeSchema.exclude(["vi"]),
      value: z.record(z.string(), z.unknown()),
    }),
    fields: [
      {
        name: "entity",
        label: "Loại nội dung",
        type: "select",
        options: [
          { value: "content", label: "Nội dung CMS" },
          { value: "product", label: "Dịch vụ" },
        ],
      },
      { name: "entity_key", label: "Mã nội dung / mã dịch vụ", required: true },
      {
        name: "locale",
        label: "Ngôn ngữ",
        type: "select",
        options: localeOptions.filter((v) => v.value !== "vi"),
      },
      {
        name: "value",
        label:
          'Bản dịch JSON: CMS {"value":"..."}; dịch vụ {"title":"...","description":"..."}',
        type: "json",
      },
    ],
  },
  users: {
    table: "admin_users",
    label: "Tài khoản & Phân quyền",
    icon: "admin_panel_settings",
    roles: [],
    archive: true,
    columns: ["username", "role", "active"],
    schema: z.object({
      username: z.string().trim().min(3).max(80),
      password: z.string().min(12).max(200).optional(),
      role: z.enum(["super_admin", "booking", "editor"]),
      active: z.boolean(),
    }),
    fields: [
      { name: "username", label: "Tên đăng nhập", required: true },
      {
        name: "password",
        label: "Mật khẩu (để trống khi không đổi)",
        type: "password",
      },
      {
        name: "role",
        label: "Vai trò",
        type: "select",
        options: [
          { value: "super_admin", label: "Quản trị cao nhất" },
          { value: "booking", label: "Nhân viên booking" },
          { value: "editor", label: "Biên tập viên" },
        ],
      },
      { name: "active", label: "Cho phép đăng nhập", type: "checkbox" },
    ],
  },
};
