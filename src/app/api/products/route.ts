import { z } from "zod";
import { getPublicLocale } from "@/lib/catalog";
import { errorResponse } from "@/lib/http";
import { listPublicProducts } from "@/modules/travel/public-products";

const productListQuery = z.object({
  type: z.enum(["hotel", "tour", "combo", "transfer"]).optional(),
  q: z.string().trim().max(150).default(""),
  sort: z.enum(["recommended", "price", "rating"]).default("recommended"),
  limit: z.coerce.number().int().min(1).max(100).default(50),
  offset: z.coerce.number().int().min(0).max(10000).default(0),
});

export async function GET(request: Request) {
  try {
    const params = productListQuery.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    const rows = await listPublicProducts({
      locale: await getPublicLocale(),
      types: params.type ? [params.type] : undefined,
      query: params.q,
      sort: params.sort,
      limit: params.limit + 1,
      offset: params.offset,
    });
    return Response.json({
      data: rows.slice(0, params.limit),
      hasMore: rows.length > params.limit,
    });
  } catch (error) {
    return errorResponse(error);
  }
}
