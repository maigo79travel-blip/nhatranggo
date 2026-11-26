import { z } from "zod";
import { getPublicLocale } from "@/lib/catalog";
import { errorResponse } from "@/lib/http";
import { listPublicProducts } from "@/modules/travel/public-products";
import {
  catalogSorts,
  hotelCategories,
  tourCategories,
} from "@/modules/travel/search-options";
import { homeHotelFilters } from "@/modules/travel/home-catalog-options";
import { vietnamToday } from "@/modules/travel/search";

const productListQuery = z
  .object({
    type: z.enum(["hotel", "tour", "combo", "transfer"]).optional(),
    q: z.string().trim().max(150).default(""),
    sort: z.enum(catalogSorts).default("recommended"),
    destination: z.uuid().optional(),
    category: z.string().max(40).optional(),
    homeFilter: z.enum(homeHotelFilters).optional(),
    date: z.iso
      .date()
      .refine((date) => date >= vietnamToday(), "Ngày sử dụng phải từ hôm nay")
      .optional(),
    guests: z.coerce.number().int().min(1).max(100).optional(),
    limit: z.coerce.number().int().min(1).max(100).default(50),
    offset: z.coerce.number().int().min(0).max(10000).default(0),
  })
  .refine(
    ({ type, homeFilter }) => !homeFilter || type === "hotel",
    "Bộ lọc Trang chủ chỉ áp dụng cho khách sạn",
  );

export async function GET(request: Request) {
  try {
    const params = productListQuery.parse(
      Object.fromEntries(new URL(request.url).searchParams),
    );
    const categories =
      params.type === "tour"
        ? tourCategories
        : params.type === "hotel"
          ? hotelCategories
          : {};
    const rows = await listPublicProducts({
      locale: await getPublicLocale(),
      types: params.type ? [params.type] : undefined,
      query: params.q,
      sort: params.sort,
      featuredFirst: params.homeFilter !== undefined,
      homeHotelFilter: params.homeFilter,
      destination: params.destination,
      date: params.date,
      guests: params.guests,
      categoryTerms:
        params.category && Object.hasOwn(categories, params.category)
          ? (categories as Record<string, readonly string[]>)[params.category]
          : undefined,
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
