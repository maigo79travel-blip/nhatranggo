# NhaTrangGo — Booking portal

Next.js App Router, React, TypeScript và PostgreSQL. Website cho khách gửi yêu cầu xe, phòng, tour, E-Visa/Fast-track và đọc bài viết; `/admin` quản lý dữ liệu và xử lý yêu cầu.

[Đối chiếu các module với đề án](docs/modules.md) · [Cấu trúc dự án](docs/architecture.md) · [Hệ thống thiết kế](docs/design-system.md)

## Chạy local

Yêu cầu Node.js 22+ và Docker Desktop. Tạo `.env` từ `.env.example`, sau đó:

```sh
npm ci
docker compose up -d db
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run dev
```

Website: `http://localhost:3001`; quản trị: `http://localhost:3001/admin`. Tài khoản khởi tạo lưu tại `.local/admin-access.txt` và không được đưa vào Git. Lệnh setup lần sau giữ nguyên tài khoản đã có.

PostgreSQL mặc định dùng cổng 15432. Nếu cổng đã được dùng, sửa cả `DB_PORT` và cổng trong `DATABASE_URL` của `.env`; phiên phát triển này dùng 15433. Compose chỉ phục vụ database phát triển.

## Đường dẫn và quản trị

| URL                      | Module                                         |
| ------------------------ | ---------------------------------------------- |
| `/`                      | Trang chủ, dịch vụ và popup yêu cầu đặt chỗ    |
| `/xe-dua-don`            | Tuyến xe, loại xe và báo giá                   |
| `/khach-san`             | Khách sạn và loại phòng                        |
| `/tour-hang-ngay`        | Tour và lịch khởi hành                         |
| `/dich-vu`               | Danh mục chung, lọc loại dịch vụ và địa phương |
| `/e-visa`, `/fast-track` | Gửi yêu cầu dịch vụ sân bay                    |
| `/blog`, `/blog/[slug]`  | Bài viết, chủ đề, tìm kiếm                     |
| `/tra-cuu`               | Tra cứu booking theo mã + điện thoại           |
| `/lien-he`               | Liên hệ và gửi hỗ trợ                          |
| `/thong-tin/[slug]`      | Giới thiệu, điều khoản, chính sách đã đăng     |

Admin có Dịch vụ, Loại phòng, Lịch khởi hành tour, Tuyến xe, Bảng giá, Địa phương, Blog/Chuyên mục, Booking, E-Visa/Fast-track, Khách hàng, Đối tác/Tài xế, Liên hệ, Nội dung website, Trang thông tin, Ngôn ngữ và Tài khoản/Phân quyền.

- Tạo dịch vụ mới từ mẫu hoặc tạo độc lập. Dịch vụ độc lập hiển thị trong danh mục chung và phần dịch vụ mới của trang khách sạn/tour khi được bật hiển thị.
- Tạo địa phương trước, tạo tuyến từ hai điểm đến rồi thêm mức giá theo loại xe. Mã tuyến sinh từ mã hai điểm đến. Không đổi mã điểm đến/tuyến đã có liên kết giá; tạo tuyến mới khi thay đổi hành trình.
- Bài viết/trang có nháp, đã đăng và đã ẩn. Editor hỗ trợ tiêu đề, in đậm, danh sách, ảnh URL, liên kết và xem trước Markdown; không chạy HTML nhập vào.
- Gửi booking tạo trạng thái chờ xác nhận. Nhân viên kiểm tra với đối tác rồi xác nhận, phân công, nhập tổng giá, hoàn tất hoặc hủy. Hủy không xóa lịch sử.
- `site.contact` quản lý điện thoại, Zalo, Telegram, WhatsApp, KakaoTalk, Facebook, hotline quốc tế và email; header/footer/floating dùng chung cấu hình này. `site.navigation` và `site.mobile-navigation` quản lý menu; `site.metadata`/`metadata.*` quản lý SEO.
- Ngôn ngữ: vi/en/ru/ko/zh. Bài viết và trang thông tin có bản ghi riêng theo ngôn ngữ. Bản dịch CMS có dạng `{"value":"…"}`, bản dịch sản phẩm có `title`, `description`, `location`, `content`. Khi chưa nhập bản dịch CMS/dịch vụ, nội dung gốc vẫn được hiển thị. Quản trị chịu trách nhiệm nội dung và bản dịch được công bố.
- Quản trị cao nhất có toàn quyền; nhân viên booking xử lý đơn, CRM, liên hệ; biên tập viên quản lý dịch vụ/nội dung. API kiểm tra quyền độc lập với menu.

Nhận diện thương hiệu tại `src/config/brand.json`. Sửa màu tại `src/theme/colors.json`; Tailwind và CSS dùng cùng biến màu. `db/seed` chỉ dùng để khởi tạo; runtime luôn đọc PostgreSQL. Migration cũ được giữ để nâng cấp database hiện có; module yêu thích và newsletter đã bỏ khỏi ứng dụng theo phạm vi đề án.

## Kiểm tra

```sh
npm run typecheck
npm run build
```

Khi server ở cổng 3001 và database phát triển đã seed:

```sh
npx playwright install chromium
npm test
npm run test:cms
npm run test:modules
npm run test:home
npm run test:navigation
npm run test:production
```

Test dùng Chromium đi kèm Playwright hoặc đường dẫn đặt tại `PLAYWRIGHT_CHROMIUM_EXECUTABLE`; `TEST_URL` đổi địa chỉ server. Chỉ chạy test ghi dữ liệu trên database phát triển/kiểm thử. `test:home` kiểm tra tab tìm kiếm, ngày/số khách, bộ lọc, nút đặt chỗ và các liên kết Home. `test:modules` kiểm tra thêm CSS/font, kích thước ô nhập, trạng thái tra cứu và responsive của 8 loại trang ở 5 kích thước màn hình (320–1920px), bao gồm kiểm tra khung trang không bị giới hạn chiều rộng. `test:navigation` xác nhận chuyển trang qua header không reload và giữ CSS. Ảnh kiểm tra lưu trong `test-results/`; test module tự dọn dữ liệu có mã riêng.

## Triển khai

```sh
npm run build
npm run start
```

Trước khi chạy bản mới, cấu hình `DATABASE_URL`, `APP_URL` và chạy `npm run db:migrate` một lần cho môi trường đích. Build tạo bản standalone kèm ảnh/CSS; `npm start` kiểm tra cấu hình rồi chạy bản này. Có `Dockerfile`, `compose.production.yml`, `/api/health` và workflow CI. [Hướng dẫn triển khai](docs/production.md) · [Nguồn floating từ Maigo local](docs/contact-source.md). Seed không ghi đè chỉnh sửa đã có. Có thể xem lịch sử schema trong bảng `schema_migrations`.

Hosting Việt Nam, TLS, backup/restore và cPanel không được tự cấu hình bởi repository này. Xuất booking hiện là CSV UTF-8 để mở bằng Excel; chưa có thanh toán online, tồn kho thời gian thực, kho upload ảnh hoặc tự động gửi email/SMS. Những chức năng đó không được coi là module đã triển khai.
