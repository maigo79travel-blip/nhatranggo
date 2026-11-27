---
name: NhaTrangGo Design System
colorTokens: src/theme/colors.json
typography:
  display:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: "800"
    lineHeight: 56px
    letterSpacing: -0.03em
  display-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "800"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: "700"
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 24px
    fontWeight: "700"
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 20px
    fontWeight: "600"
    lineHeight: 28px
  title-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "700"
    lineHeight: 24px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: "400"
    lineHeight: 26px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "400"
    lineHeight: 22px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: "400"
    lineHeight: 18px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: "600"
    lineHeight: 20px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: "600"
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 11px
    fontWeight: "700"
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2.5rem
---

## Brand & Style

### Brand Personality & Philosophy

This design system defines a premier travel and hospitality booking experience tailored for Vietnam's most iconic coastal and leisure destinations (Nha Trang, Phú Quốc, Cam Ranh, Đà Lạt). The aesthetic bridges tropical vacation inspiration with professional, friction-free e-commerce booking flows. It evokes warmth, crystal-clear ocean tranquility, trust, and luxury leisure.

### Visual Style Movement

The system adopts an **Elevated Modern Coastal** style:

- **Clean Air & Whitespace:** Expansive layout breathing room with crisp hierarchy.
- **Glassmorphic Accents:** Translucent floating search bars, backdrop blurs, and glass badge overlays over vivid travel photography.
- **Subtle Organic Softness:** Curated 16px–24px corner radii, delicate multi-tier card elevation, and luminous warm accents.
- **High Information Clarity:** Structured travel metadata (ratings, itineraries, resort inclusions, countdown timers) formatted for instant comprehension without clutter.

## Màu sắc

[Frame NhaTrangGo · Tonal ramps](https://www.figma.com/design/P2QPQwAEQqKg6i9fGhqosz/BOOKING?node-id=314-859&m=dev) là nguồn của bốn dải Blue, Neutral, Amber và Red. Bảng màu thực thi nằm tại `src/theme/colors.json`:

- `ramps` giữ nguyên 40 sắc độ từ Figma.
- `primitives` chứa màu nền tảng ngoài Figma như trắng, đen, màu riêng của admin và màu nhận diện kênh liên hệ.
- `roles` nhóm token theo chức năng như tương tác, nền, chữ, viền, lỗi và ưu đãi. Mỗi token tham chiếu đến một sắc độ hoặc màu nền tảng.

| Cách dùng                           | Token                                         | Giá trị mặc định              |
| ----------------------------------- | --------------------------------------------- | ----------------------------- |
| Nút chính và hover                  | `primary`, `primary-hover`                    | Blue 600 và Blue 800          |
| Viền khi dùng bàn phím              | `focus-ring`                                  | Blue 600                      |
| Nền trang, nền thẻ và nền ô nhập    | `background`, `surface`, `surface-muted`      | Neutral 50, trắng, Neutral 50 |
| Chữ chính và chữ phụ                | `on-surface`, `on-surface-variant`            | Neutral 900 và Neutral 600    |
| Viền mảnh và viền ô nhập            | `border-subtle`, `border-default`             | Neutral 100 và Neutral 200    |
| Lỗi và nền lỗi                      | `error`, `error-surface`                      | Red 700 và Red 50             |
| Giá giảm, nhãn giảm giá và màu nhấn | `sale-price`, `sale-badge`, `promo-highlight` | Red 700, Red 700, Amber 400   |

Trong TSX, dùng lớp theo vai trò như `bg-primary hover:bg-primary-hover text-on-primary`. Trong CSS, dùng `rgb(var(--color-primary))`. Cả hai lấy giá trị từ cùng adapter Tailwind. Dùng sắc độ trực tiếp như `blue-500` cho các chuyển sắc trang trí khi cần đúng thiết kế.

Để đổi riêng nút chính, chỉnh `roles.interaction.primary`. Để thay một sắc độ dùng ở nhiều nơi, chỉnh mục tương ứng trong `ramps`. Một số token chia sẻ cùng sắc độ mặc định để có thể đổi từng vai trò độc lập về sau. Chạy `npm run test:theme` để kiểm tra độ tương phản của chữ và viền focus sau khi đổi màu. CI cũng chạy kiểm tra này.

## Typography

### Character & Hierarchical Structure

**Plus Jakarta Sans** is utilized across all typography levels for its geometric legibility, modern open counters, and warm contemporary aesthetic.

- **Hero & Section Titles (`display`, `headline-lg`):** Strong negative tracking (`-0.02em` to `-0.03em`) and heavy weights (700, 800) create confident, modern resort-style editorial headers.
- **Card Titles & Listings (`title-md`):** Fixed 2-line clamps with 600–700 weights ensure uniform card grids across variable hotel and tour name lengths.
- **Prices & Deal Badges (`label-lg`, `label-sm`):** Formatted with bold weights; currency markers and nightly rate qualifiers (`/đêm`) scale down to `12px` or `11px` to keep numeric value paramount.

## Layout & Spacing

### Layout Model

- **Grid Architecture:** Responsive fluid grid using the available viewport width and responsive outer gutters, without a fixed maximum width.
- **Breakpoints:**
  - `Desktop (>= 1024px)`: 12 columns, 24px (`1.5rem`) gutters, 32px–48px outer margins.
  - `Tablet (768px – 1023px)`: 8 columns, 16px–20px gutters, 24px outer margins.
  - `Mobile (< 768px)`: 4 columns, 16px (`1rem`) gutters, 16px outer margins.
- **Section Pacing:** Main sections (Flash Deals, Top Destinations, Popular Tours) are spaced using `4rem` to `5rem` vertical margins to avoid the dense, cramped feeling of traditional aggregators.

## Elevation & Depth

Visual depth is achieved through ambient, atmospheric light scattering and subtle tinted shadows rather than harsh drop shadows.

- **Level 0 (Flat / Embedded):** Zero shadow, paired with `1px` subtle border `#E2E8F0` on off-white backgrounds.
- **Level 1 (Listing Cards, Filter Bars):** `0px 4px 20px -2px rgba(15, 23, 42, 0.06)`, producing an organic hoverable card appearance.
- **Level 2 (Hovered Cards, Dropdowns, Datepickers):** `0px 12px 32px -4px rgba(2, 132, 199, 0.12)`, slightly tinted with primary cyan-blue to emphasize vitality.
- **Level 3 (Sticky Search Bar, Booking Bottom Bar, Modals):** `0px 20px 48px -8px rgba(15, 23, 42, 0.16)` with `backdrop-filter: blur(16px)` and 90% surface opacity.

## Shapes

### Shape Language

The design system embraces refined rounded curves that mirror ocean waves and vacation comfort:

- **Small components (Chips, Tags, Micro-badges):** `8px` (`0.5rem`) radius.
- **Interactive Controls (Inputs, Form Dropdowns, Buttons):** `12px` (`0.75rem`) radius for high tactile comfort.
- **Content Cards & Media (Tour cards, Hotel cards, Destination tiles):** `16px` to `20px` (`rounded-2xl`) with `overflow: hidden` for edge-to-edge photography.
- **Floating Modals & Primary Floating Search Capsule:** `24px` (`1.5rem`) to `9999px` (full pill) for search bar modules.

## Components

Kết quả tìm khách sạn, tour, combo, xe đưa đón và các trang Blog, Fast-track, Liên hệ, Tra cứu và nội dung chi tiết dùng chung `PublicPage`, các component trong `src/components/site/public-ui.tsx` và nhóm class `.public-*` tại `src/app/globals.css`. Trang chủ, Khách sạn và Xe đưa đón dùng chung `SitePageFrame`. CSS được tải từ root layout để giữ giao diện khi chuyển trang. Form hỗ trợ và tra cứu dùng chung `SupportGuide`; không dùng class `.ad-*` hoặc component phụ thuộc stylesheet admin. Khung nội dung không giới hạn chiều rộng tối đa và giữ gutter responsive; thẻ ảnh giữ tỷ lệ 16:10 và bộ lọc tự xuống cột trên mobile. Cụm liên hệ dùng thanh nổi ngang trên điện thoại và cụm dọc từ 768px; giữ đủ sáu kênh từ Maigo local. Bộ lọc trong kết quả tìm kiếm dùng thanh tìm kiếm, ngày và số khách. Blog dùng chung `FilterField` và chia sẻ thẻ bài viết với Trang chủ.

### 1. Buttons

- **Primary Button:** Gradient or solid Ocean Azure (`#0284C7` to `#0369A1`), white text, `12px` radius, bold text (`label-lg`), height `48px` (desktop) / `44px` (mobile). Hover state subtly expands shadow with `translate-y(-1px)`.
- **Secondary / Combo CTA:** Solid Island Teal (`#0D9488`), crisp white typography.
- **Urgent / Deal CTA:** Golden Amber accent (`#FACC15`) with deep neutral text (`#0F172A`) for high contrast flash sales.
- **Ghost / Outlined:** Transparent surface with `1.5px` border in `#0284C7` or `#E2E8F0`, supporting secondary utility interactions.

### 2. Search & Filter Bar (Hero Engine)

- Modern horizontal pill/rounded-2xl modular bar floating above the hero image.
- Divided into 4 clear interactive segments: Destination, Dates (Check-in/Check-out), Guests/Rooms, and Action CTA.
- Uses micro-icons, clear labels (`label-sm` in slate-500), and values (`label-lg` in slate-900).

### 3. Travel & Hotel Cards

- **Structure:** Aspect ratio `16:10` image at top, followed by structured meta content.
- **Image Overlays:**
  - Top-left: Promo pill (`Tiết kiệm 25%`) in Amber Gold `#FACC15` or Emerald Green `#10B981`.
  - Top-right: Heart wishlist icon button inside a frosted glass circle (`backdrop-blur-md`, white/80%).
- **Card Body:**
  - Destination & Rating row: Star rating in `#F59E0B` with numerical score (e.g., `4.9 ★`) and location badge.
  - Title: 2-line truncated high-contrast bold header.
  - Perk Tags: Flexible soft chips (e.g., "Miễn phí bữa sáng", "Gần biển").
  - Price Block: Strikethrough original price, bold red or ocean-blue discounted price in large type, followed by small `/đêm` or `/người`.
  - Full-width "Đặt phòng" / "Đặt combo" button at card base.

### 4. Chips & Badges

- **Status Badges:** Compact (`padding: 4px 10px`, font size `12px`, weight `700`, radius `8px`).
- **Destination Discovery Chips:** Soft background `#F1F5F9`, slate-700 text, shifting to `#0284C7` background and white text when active.

### 5. Input Fields & Selectors

- Nền: `surface` hoặc `surface-muted`.
- Viền dùng `border-default`. Khi focus, dùng màu `focus-ring` cho viền và bóng viền.
- Integrated left-hand icons (calendar, pin-drop, user-group) in slate-400.

Các màu thực thi lấy từ bảng token chung. Nhận diện dùng `src/config/brand.json`.
