import { z } from "zod";
import { localeSchema, localeOptions } from "@/lib/locale";
import type { ResourceDefinition } from "../admin/types";
import {
  title,
  text,
  slug,
  id,
  url,
  publication,
  publicationOptions,
} from "@/lib/validation";
export const blogResources: Record<string, ResourceDefinition> = {
  categories: {
    table: "article_categories",
    label: "Chuyên mục bài viết",
    icon: "category",
    roles: ["editor"],
    archive: true,
    columns: ["title", "slug", "active"],
    schema: z.object({ title, slug, active: z.boolean() }),
    fields: [
      { name: "title", label: "Tên chuyên mục", required: true },
      { name: "slug", label: "Đường dẫn", required: true },
      { name: "active", label: "Hiển thị", type: "checkbox" },
    ],
  },
  articles: {
    table: "articles",
    label: "Blog & Tin tức",
    icon: "article",
    roles: ["editor"],
    columns: ["title", "locale", "status", "updated_at"],
    schema: z.object({
      title,
      slug,
      locale: localeSchema,
      category_id: id,
      excerpt: text,
      body: text,
      image: url,
      seo_title: text,
      seo_description: text,
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
      {
        name: "category_id",
        label: "Chuyên mục",
        type: "select",
        resource: "categories",
      },
      { name: "excerpt", label: "Tóm tắt", type: "textarea" },
      { name: "body", label: "Nội dung bài viết", type: "markdown" },
      { name: "image", label: "Ảnh đại diện" },
      { name: "seo_title", label: "Tiêu đề SEO" },
      { name: "seo_description", label: "Mô tả SEO", type: "textarea" },
      {
        name: "status",
        label: "Trạng thái",
        type: "select",
        options: publicationOptions,
      },
    ],
  },
};
