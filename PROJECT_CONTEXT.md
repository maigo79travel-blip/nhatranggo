# Context bàn giao NhaTrangGo

**Cập nhật lúc 21:22 ngày 27/11/2026 (UTC+7).** NhaTrangGo là website gửi yêu cầu đặt xe, phòng, tour, combo và dịch vụ sân bay. Chủ web dùng Admin để quản lý nội dung, giá và vận hành đơn. Tài liệu gốc là [ĐỀ ÁN NÂNG CẤP.docx](<ĐỀ ÁN NÂNG CẤP.docx>). Tình trạng production cần kiểm tra lại khi bắt đầu chat mới.

## Điểm tiếp tục hiện tại

- Workspace `/Users/admin/Project/Web/01-nextjs/nhatrang-booking-portal`. GitHub `maigo79travel-blip/nhatranggo`, repo private tại thời điểm kiểm tra. Local đang ở `feat/figma-ui-update`, commit `227f72d`. GitHub `main` ở `1c3a25a`, đã chứa `227f72d`. Kiểm tra nhánh từ xa trước khi làm việc dựa trên `main` vì ref local có thể cũ.
- Local chạy tại `http://localhost:3001`. PostgreSQL local là `booking_travel` qua cổng `15433`, đã chạy đến migration `021_editable_public_pages.sql`.
- Supabase production đã áp dụng `017`–`021` và có đủ 21/21 migration. Bản sao lưu schema `public` trước nâng cấp nằm trong `.local/db-backups/` và đã được khôi phục thành công trên database thử nghiệm. `019` bổ sung loại xe và dữ liệu chuyến khứ hồi. `021` bổ sung 10 trường CMS cho 5 trang công khai. [Health handler](src/app/api/health/route.ts) · [Hướng dẫn Vercel và Supabase](docs/vercel.md)
- Sau migration, Trang chủ, trang Xe đưa đón, API báo giá, API bộ lọc khách sạn, API sức khỏe và trang đăng nhập Admin đều trả HTTP 200. Báo giá thử xe 7 chỗ từ Cam Ranh đến trung tâm Nha Trang trả 300.000₫. [Trang chủ](https://nhatranggo.vercel.app/) · [Đăng nhập Admin](https://nhatranggo.vercel.app/admin/dang-nhap) · [Health](https://nhatranggo.vercel.app/api/health)
- Đã đối chiếu đủ 28 dịch vụ (14 khách sạn, 11 tour, 3 combo), 24 mức giá xe theo seed và 663 mục CMS trong lượt kiểm tra trước nâng cấp. Sau nâng cấp có 28 dịch vụ và 24 mức giá đang bật. Migration `017` đã ẩn 8 mức giá Limo 9 cũ. Có 4 trang thông tin dạng nháp từ migration `018`. Loại phòng, lịch khởi hành, bài viết và chuyên mục cần chủ web nhập dữ liệu vận hành.
- Deployment cũ của PR #3 từng bị Vercel Hobby chặn ở commit `0012af5` do GitHub `doanhdai` chưa được xác nhận là chủ team `booking car`. URL đăng nhập mới hiện đã hoạt động, vì vậy không dùng ảnh lỗi Blocked cũ để kết luận trạng thái hiện tại. GitHub vẫn báo repo private. [Quyền cộng tác trên Vercel](https://vercel.com/docs/deployments/troubleshoot-project-collaboration)

## Kiến trúc và quy ước

- Next.js 16 App Router, React 19, TypeScript, Tailwind CSS 3, PostgreSQL qua `pg`, Zod và Playwright. Node.js 22 được pin cho triển khai. Vercel đặt region `icn1`.
- Route công khai ở `src/app/(site)/`, route Admin ở `src/app/admin/`, HTTP handlers ở `src/app/api/`. Nghiệp vụ theo module trong `src/modules/{admin,travel,bookings,blog,crm,support,settings}/`. Component dùng chung nằm ở `src/components/`.
- `src/lib/catalog.ts` tải dữ liệu theo phạm vi của trang. `src/modules/travel/public-products.ts`, `fare-service.ts` và `product-visibility.ts` quản lý truy vấn danh mục, báo giá và điều kiện hiển thị. Luồng booking dùng chung `src/components/catalog/` và `src/modules/bookings/`.
- `src/modules/admin/routes.ts` là danh sách URL quản trị, liên kết giữa các mục và phạm vi CMS. Session và quyền được kiểm tra ở route server và API. Có ba vai trò `super_admin`, `editor`, `booking`.
- Thương hiệu ở `src/config/brand.json`, màu dùng chung ở `src/theme/colors.json`. Dùng token Tailwind/CSS hiện có để giữ tông xanh da trời và Plus Jakarta Sans. Header, footer và nút nổi dùng cấu hình `site.contact`. Nguồn tham chiếu các nút nổi là dự án Maigo local. [Hệ thống thiết kế](docs/design-system.md) · [Nguồn liên hệ Maigo](docs/contact-source.md)
- Ưu tiên tái sử dụng component, schema và nghiệp vụ hiện có. Giữ điều hướng nội bộ bằng Next Link/Form để tránh tải lại cả trang. Dùng dữ liệu PostgreSQL cho giá, đánh giá, ưu đãi và kết quả tìm kiếm. Seed dùng lúc khởi tạo dữ liệu.
- Đọc [AGENTS.md](AGENTS.md) và tài liệu Next.js đang cài tại `node_modules/next/dist/docs/` trước khi sửa route hoặc layout. Khi có MCP codebase-memory, ưu tiên tra graph của `nhatrang-booking-portal` để tìm định nghĩa và nơi sử dụng.

## Các luồng đã triển khai

| Khách truy cập | Quản trị | Luồng chính |
| --- | --- | --- |
| `/` | `/admin/noi-dung/trang-chu` | Tìm nhanh 4 loại dịch vụ. Lần tải đầu lấy tối đa 6 khách sạn, 3 tour, 3 combo và 3 bài đã đăng. Bộ lọc khách sạn gọi `/api/products` và lọc tại server. Gợi ý mặc định chỉ hiện khi có kết quả. |
| `/khach-san` | `/admin/khach-san`, `/admin/khach-san/loai-phong` | Tìm khách sạn, chọn ngày và sức chứa. Admin quản lý giá, phòng, ảnh, nội dung và hiển thị. |
| `/tour-hang-ngay`, `/tour-hang-ngay?type=combo` | `/admin/tour`, `/admin/tour/lich-khoi-hanh`, `/admin/combo` | Danh mục và lọc theo lịch; tour và combo có mục quản lý riêng. Trang chủ hiển thị 3 thẻ tour một hàng trên desktop. |
| `/xe-dua-don` | `/admin/xe-dua-don`, `/admin/xe-dua-don/tuyen-xe`, `/admin/diem-den` | Báo giá theo tuyến và loại xe, kiểm tra sức chứa và lưu thông tin khứ hồi. Tuyến, điểm đón/trả, giá và sản phẩm xe cùng quyết định trạng thái công khai. |
| `/tra-cuu` | `/admin/dat-cho`, `/admin/khach-hang`, `/admin/doi-tac` | Tạo đơn thủ công, lọc, phân công, xác nhận, hủy, lưu lịch sử, xuất Excel. Khách tra cứu bằng mã đơn và điện thoại. |
| `/e-visa`, `/lien-he` | `/admin/e-visa`, `/admin/lien-he` | Tiếp nhận yêu cầu E-Visa và liên hệ, cập nhật trạng thái và ghi chú. |
| `/blog`, `/blog/[slug]`, `/thong-tin/[slug]` | `/admin/bai-viet`, `/admin/bai-viet/chuyen-muc`, `/admin/trang-thong-tin` | Bài viết và trang thông tin có nháp, đăng và ẩn; editor Markdown có xem trước và tải ảnh. |

Admin có đăng nhập tại `/admin/dang-nhap`, điều hướng có URL riêng và quay về trang đích sau đăng nhập. `/admin/noi-dung` tập hợp trình sửa theo từng trang, trong đó `/admin/noi-dung/giao-dien-chung` quản lý logo và menu, còn `/admin/noi-dung/lien-he` quản lý kênh liên hệ. `/admin/ban-dich` có biểu mẫu cho văn bản và dịch vụ, cấu hình phức tạp dùng JSON nâng cao. Tài khoản cá nhân và phân quyền nằm ở `/admin/tai-khoan` và `/admin/phan-quyen`.

Bản local đã gỡ Fast-track khỏi menu, Admin và API, chuyển URL cũ sang E-Visa. Bản local cũng đã làm lại Tour, E-Visa và Blog.

Booking công khai lấy chi tiết qua `/api/products/[id]` và gửi qua `/api/bookings`. Máy chủ kiểm tra giá và dữ liệu khi lưu. Trạng thái ban đầu là chờ xác nhận để nhân viên kiểm tra với đối tác. Đơn đã hủy được giữ lịch sử. `/dich-vu` đã bỏ khỏi menu và chuyển đường dẫn cũ sang trang phù hợp. Module yêu thích và newsletter đã bỏ trong phạm vi đề án. [Đối chiếu module](docs/modules.md)

## Chạy và kiểm tra local

Trên môi trường mới, tạo `.env` từ `.env.example`, trỏ đến PostgreSQL local rồi chạy các lệnh sau. Với workspace hiện tại, database đã có schema và seed, có thể bắt đầu từ `npm run dev`.

```sh
npm ci
docker compose up -d db
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run dev
```

Thông tin đăng nhập do lệnh setup local tạo nằm ở `.local/admin-access.txt` nếu đã dùng cơ chế tạo tự động. Cấu hình môi trường, mật khẩu và dữ liệu riêng giữ trong file local đã được Git bỏ qua.

```sh
npm run typecheck
npm run build
npm run test:theme
npm run test:deployment
```

Kiểm thử trình duyệt cần Chromium và server trỏ đúng database kiểm thử. Các lệnh chính là `npm test`, `npm run test:home`, `npm run test:cms`, `npm run test:modules`, `npm run test:navigation`, `npm run test:production`. Tên `test:production` chỉ cách kiểm thử cấu hình production, dữ liệu test vẫn đặt trên database riêng. Tại `227f72d`, build và các suite Playwright đã đạt trên PostgreSQL tách riêng, gồm điều hướng, phân quyền, tạo combo nháp, đổi nội dung công khai và xuất Excel.

## Vận hành production

- Vercel dùng `DATABASE_URL` là transaction pooler cổng 6543. Migration và seed dùng `DIRECT_URL` session pooler cổng 5432, cấu hình riêng trong `.env.supabase`. Adapter `db/connection.mjs` xác minh TLS với CA Supabase.
- Khi đã được giao triển khai, xác nhận đúng database đích và kiểm tra backup trước khi dùng `node --env-file=.env.supabase scripts/database.mjs migrate`. Script áp các migration chưa có trong `schema_migrations` theo thứ tự. Seed cơ bản trên production đã đủ theo lần kiểm tra nêu trên.
- Xác minh lại `/api/health`, `/xe-dua-don`, báo giá `/api/fares`, đăng nhập Admin và các trang danh mục. Kiểm tra đọc có thể thực hiện trên production, còn kiểm thử ghi dùng database tách riêng.

## Tài liệu tham chiếu

- [README](README.md) · [Kiến trúc](docs/architecture.md) · [Đối chiếu đề án](docs/modules.md) · [Triển khai](docs/vercel.md)
- File Figma BOOKING. [Trang chủ](https://www.figma.com/design/P2QPQwAEQqKg6i9fGhqosz/BOOKING?node-id=48-771&m=dev) · [Màu](https://www.figma.com/design/P2QPQwAEQqKg6i9fGhqosz/BOOKING?node-id=314-859&m=dev) · [Xe đưa đón](https://www.figma.com/design/P2QPQwAEQqKg6i9fGhqosz/BOOKING?node-id=100-317&m=dev) · [Khách sạn](https://www.figma.com/design/P2QPQwAEQqKg6i9fGhqosz/BOOKING?node-id=275-670&m=dev)
