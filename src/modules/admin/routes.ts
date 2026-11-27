export type ProductSection = "hotel" | "tour" | "combo";

export const contentScopes = {
  home: {
    slug: "trang-chu",
    label: "Trang chủ",
    icon: "home",
    publicHref: "/",
  },
  hotels: {
    slug: "khach-san",
    label: "Khách sạn",
    icon: "bed",
    publicHref: "/khach-san",
  },
  tours: {
    slug: "tour",
    label: "Tour & Combo",
    icon: "map",
    publicHref: "/tour-hang-ngay",
  },
  transfers: {
    slug: "xe-dua-don",
    label: "Xe đưa đón",
    icon: "airport_shuttle",
    publicHref: "/xe-dua-don",
  },
  "fast-track": {
    slug: "fast-track",
    label: "Fast-track",
    icon: "flight_land",
    publicHref: "/fast-track",
  },
  contact: {
    slug: "lien-he",
    label: "Liên hệ",
    icon: "support_agent",
    publicHref: "/lien-he",
  },
  lookup: {
    slug: "tra-cuu",
    label: "Tra cứu booking",
    icon: "search",
    publicHref: "/tra-cuu",
  },
  blog: { slug: "blog", label: "Blog", icon: "article", publicHref: "/blog" },
  shared: {
    slug: "giao-dien-chung",
    label: "Logo, menu & chân trang",
    icon: "web",
    publicHref: "/",
  },
} as const;

export type ContentScope = keyof typeof contentScopes;
export const scopedContent = Object.entries(contentScopes) as [
  ContentScope,
  (typeof contentScopes)[ContentScope],
][];
export const adminContentHref = (scope: ContentScope) =>
  "/admin/noi-dung/" + contentScopes[scope].slug;
export const tourDeparturesPath = "/admin/tour/lich-khoi-hanh";
export const tourCreatePath = "/admin/tour/them-moi";

type PageInfo = {
  label: string;
  icon: string;
  resource: string;
  description?: string;
  product?: ProductSection;
  create?: true;
  scope?: ContentScope;
  publicHref?: string;
  related?: readonly string[];
};

export const adminPages: Record<string, PageInfo> = {
  "/admin": {
    label: "Tổng quan",
    icon: "space_dashboard",
    resource: "overview",
  },
  "/admin/dat-cho": {
    label: "Đặt chỗ",
    icon: "confirmation_number",
    resource: "bookings",
    description: "Xác nhận, phân công và theo dõi các đơn xe, phòng và tour.",
    publicHref: "/tra-cuu",
  },
  "/admin/khach-hang": {
    label: "Khách hàng",
    icon: "group",
    resource: "customers",
    description: "Tra thông tin liên hệ và lịch sử đặt chỗ.",
  },
  "/admin/doi-tac": {
    label: "Đối tác & Tài xế",
    icon: "handshake",
    resource: "partners",
    description: "Quản lý nhà cung cấp và tài xế để phân công đơn.",
  },
  "/admin/fast-track": {
    label: "Fast-track",
    icon: "flight_land",
    resource: "requests",
    description: "Theo dõi giờ đến, sân bay và trạng thái hỗ trợ khách.",
    publicHref: "/fast-track",
    related: [adminContentHref("fast-track")],
  },
  "/admin/lien-he": {
    label: "Liên hệ & Hỗ trợ",
    icon: "support_agent",
    resource: "contacts",
    publicHref: "/lien-he",
    related: [adminContentHref("contact")],
  },
  "/admin/khach-san": {
    label: "Khách sạn",
    icon: "hotel",
    resource: "products",
    product: "hotel",
    description: "Cập nhật giá, hình ảnh và trạng thái hiển thị của khách sạn.",
    publicHref: "/khach-san",
    related: ["/admin/khach-san/loai-phong", adminContentHref("hotels")],
  },
  "/admin/khach-san/loai-phong": {
    label: "Loại phòng",
    icon: "bed",
    resource: "rooms",
    description: "Sửa giá mỗi đêm và sức chứa theo khách sạn.",
    related: ["/admin/khach-san"],
  },
  "/admin/tour": {
    label: "Tour du lịch",
    icon: "map",
    resource: "products",
    product: "tour",
    description: "Đăng tour, cập nhật giá, mô tả và đối tác cung cấp.",
    publicHref: "/tour-hang-ngay",
    related: [tourDeparturesPath, adminContentHref("tours")],
  },
  [tourCreatePath]: {
    label: "Thêm tour",
    icon: "add",
    resource: "products",
    product: "tour",
    create: true,
  },
  [tourDeparturesPath]: {
    label: "Lịch khởi hành tour",
    icon: "calendar_month",
    resource: "departures",
    description: "Mở bán theo ngày, đặt sức chứa và theo dõi số chỗ đã giữ.",
    related: ["/admin/tour"],
  },
  "/admin/combo": {
    label: "Combo",
    icon: "luggage",
    resource: "products",
    product: "combo",
    publicHref: "/tour-hang-ngay?type=combo",
    related: [adminContentHref("home")],
  },
  "/admin/xe-dua-don": {
    label: "Bảng giá xe",
    icon: "airport_shuttle",
    resource: "fares",
    description: "Điều chỉnh giá công khai và giá báo theo tuyến, loại xe.",
    publicHref: "/xe-dua-don",
    related: [
      "/admin/xe-dua-don/tuyen-xe",
      "/admin/diem-den",
      adminContentHref("transfers"),
    ],
  },
  "/admin/xe-dua-don/tuyen-xe": {
    label: "Tuyến xe",
    icon: "route",
    resource: "routes",
    related: ["/admin/xe-dua-don", "/admin/diem-den"],
  },
  "/admin/diem-den": {
    label: "Điểm đến",
    icon: "location_on",
    resource: "destinations",
    description: "Thêm địa phương cho khách sạn, tour và các điểm đón trả.",
  },
  "/admin/noi-dung": {
    label: "Nội dung website",
    icon: "web",
    resource: "content",
    description:
      "Chọn trang khách đang xem để sửa nội dung, ảnh hoặc liên kết.",
  },
  "/admin/bai-viet": {
    label: "Blog & Tin tức",
    icon: "article",
    resource: "articles",
    publicHref: "/blog",
    related: ["/admin/bai-viet/chuyen-muc", adminContentHref("blog")],
  },
  "/admin/bai-viet/chuyen-muc": {
    label: "Chuyên mục bài viết",
    icon: "category",
    resource: "categories",
    related: ["/admin/bai-viet"],
  },
  "/admin/trang-thong-tin": {
    label: "Giới thiệu & Chính sách",
    icon: "description",
    resource: "pages",
  },
  "/admin/ban-dich": {
    label: "Ngôn ngữ website",
    icon: "translate",
    resource: "translations",
  },
  "/admin/tai-khoan": {
    label: "Tài khoản cá nhân",
    icon: "manage_accounts",
    resource: "account",
  },
  "/admin/phan-quyen": {
    label: "Tài khoản & Phân quyền",
    icon: "admin_panel_settings",
    resource: "users",
  },
  ...Object.fromEntries(
    scopedContent.map(([scope, info]) => [
      adminContentHref(scope),
      {
        label: info.label,
        icon: info.icon,
        resource: "content",
        scope,
        publicHref: info.publicHref,
      },
    ]),
  ),
};

export function adminPage(href: string) {
  return Object.hasOwn(adminPages, href) ? adminPages[href] : undefined;
}

export const adminNav = [
  { paths: ["/admin"] },
  {
    label: "Vận hành",
    paths: [
      "/admin/dat-cho",
      "/admin/khach-hang",
      "/admin/fast-track",
      "/admin/lien-he",
      "/admin/doi-tac",
    ],
  },
  {
    label: "Dịch vụ & giá",
    paths: [
      "/admin/xe-dua-don",
      "/admin/khach-san",
      "/admin/tour",
      "/admin/combo",
      "/admin/diem-den",
    ],
  },
  {
    label: "Website",
    paths: [
      "/admin/noi-dung",
      "/admin/bai-viet",
      "/admin/trang-thong-tin",
      "/admin/ban-dich",
    ],
  },
  { label: "Hệ thống", paths: ["/admin/phan-quyen"] },
];
