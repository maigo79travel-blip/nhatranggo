# Cấu trúc dự án

Ứng dụng dùng một Next.js App Router và PostgreSQL. Cấu trúc tách route, giao diện và nghiệp vụ; không thêm các tầng repository/controller chỉ để bọc lại một lời gọi hàm.

```text
src/
  app/
    (site)/              Trang công khai và layout website
      _components/       Giao diện và bộ lọc riêng của trang chủ
      khach-san/         Route khách sạn và _components riêng
      tour-hang-ngay/    Route tour và _components riêng
      xe-dua-don/        Route đưa đón và _components riêng
    admin/               Điểm vào trang quản trị
    api/                 HTTP: kiểm tra quyền, parse input, gọi nghiệp vụ
    layout.tsx           HTML, ngôn ngữ, font và CSS toàn ứng dụng
  modules/
    admin/               Xác thực, phân quyền và nghiệp vụ CRUD quản trị
      ui/                Màn hình, form, CSS và client API quản trị
    blog/                Bài viết/chuyên mục, truy vấn công khai, editor Markdown
    bookings/            Cập nhật đơn, lịch sử, tạo thủ công, xuất danh sách
    crm/                 Khách hàng, đối tác, tài xế
    settings/            Tài khoản, ngôn ngữ, trang thông tin
    support/             E-Visa/Fast-track, liên hệ, tra cứu
    travel/              Địa phương, tuyến, phòng, lịch tour, thẻ danh mục
  components/            Giao diện tái sử dụng giữa nhiều trang
    site/                Header, footer, điều hướng, khung trang và bộ lọc dùng chung
    catalog/             Thẻ danh mục và hộp thoại đặt dịch vụ
  lib/                   Pool DB, locale, validation dùng chung, lỗi/HTTP và resolver CMS
  config/                Nhận diện NhaTrangGo dùng chung
  theme/                 Bảng màu duy nhất và adapter Tailwind

db/                      SQL migration có thứ tự và seed dùng lúc khởi tạo
scripts/
  lib/                   Migration runner dùng chung
  maintenance/           Công cụ tải lại font
  database.mjs           CLI migrate/seed
  seed-content.mjs       Seed CMS không ghi đè nội dung đã sửa
  setup-admin.mjs        Tạo quản trị ban đầu

tests/
  e2e/                   Kiểm thử giao diện/API với database kiểm thử
  unit/                  Kiểm tra adapter kết nối database
docs/                    Thiết kế, kiến trúc, đối chiếu module
public/                  Ảnh và font tĩnh
```

Các thư mục `(site)` và `_components` giúp nhóm route và mã nội bộ mà vẫn giữ URL. Component dành riêng cho một trang đặt cạnh `page.tsx`. Component dùng ở nhiều trang đặt trong `components/`. Trang quản trị có giao diện riêng và trang đăng nhập chỉ tải dữ liệu cần cho xác thực.

## Ranh giới và mở rộng

- Server code chứa `server-only`. Component client không nhập pool DB hay hàm xác thực server.
- Service đặt trong module sở hữu nghiệp vụ. Tạo và tra cứu booking nằm trong `modules/bookings/service.ts`, cập nhật và xuất đơn nằm trong `modules/bookings/admin-service.ts`. Quản trị và giao diện công khai dùng chung schema locale từ `lib/locale.ts`.
- Module CRUD khai báo schema, field, cột danh sách và quyền; service chỉ sử dụng bảng/cột trong registry, không nhận tên SQL từ client.
- Những thao tác có nghiệp vụ riêng (booking, session, bảng giá đồng bộ sản phẩm) dùng service/transaction riêng, không ép vào CRUD tổng quát.
- Module mới thêm vào registry sẽ có menu quản trị theo quyền. Trang công khai vẫn khai báo route và truy vấn rõ ràng, không tự sinh route tùy ý từ database.
- Migrations được ghi vào `schema_migrations`, khóa đồng thời bằng advisory lock, chạy từng file trong transaction. Seed không đọc ở runtime và không thay thế dữ liệu khi DB lỗi.

## Phạm vi production

Bố cục này phù hợp để duy trì và mở rộng sản phẩm ở quy mô hiện tại. Tên thư mục không đủ để chứng nhận production: triển khai vẫn cần cấu hình môi trường, TLS, backup/restore, quan sát lỗi và kiểm thử trên cấu hình hosting thực. Chuyển hosting Việt Nam/cPanel là công việc vận hành riêng, không phải module thiếu trong source.

Không commit `.env`, `.local`, `node_modules`, `.next`, `test-results` hoặc thông tin đăng nhập. Compose mặc định cung cấp PostgreSQL phát triển. `compose.production.yml` chạy image web standalone với database do môi trường cấp; chi tiết vận hành tại `docs/production.md`.

## Những phần đã dùng chung

- `content-values.ts` giải quyết placeholder thương hiệu/liên hệ trên client và metadata server; không tạo tên thương hiệu riêng trong từng component.
- `contactInfo`, `contactChannels` và `FloatingContacts` sử dụng cùng `site.contact`; các bản dịch của cụm liên hệ lấy từ Maigo local.
- `FilterField` dùng cho bộ lọc trong kết quả tìm kiếm và Blog. `PublicPage`, `PublicForm`, `SupportGuide`, `ServiceCards` dùng lại giữa các route liên quan.
- `publicProductWhere` giữ cùng quy tắc hiển thị tại danh mục, API chi tiết và tạo booking. Xe chỉ xuất hiện khi dịch vụ, mức giá, tuyến và hai điểm đón trả đều đang bật. Bảng giá hiển thị theo các tuyến đã lưu trong admin. Xóa mức giá là lưu trữ, để seed lại vẫn giữ trạng thái ẩn và đơn đã tạo vẫn tra cứu được.
- Layout công khai tải nội dung chung cho header và footer. Trang chủ, Khách sạn, Tour và Đặt xe chỉ tải nội dung CMS và nhóm sản phẩm của trang. API `GET /api/products` nhận `type`, `q`, `sort`, `limit` (mặc định 50, tối đa 100) và `offset`. Phản hồi gồm `data` và `hasMore`.
- `bookingSchema` dùng cho yêu cầu công khai và tạo đơn quản trị.
- `AppError`, `readJson`, `errorResponse`, kiểm tra Origin/cookie và rate limiter tách khỏi module admin để các module công khai không phụ thuộc vào lớp CRUD quản trị.

TypeScript kiểm tra biến và tham số không dùng. CI chạy typecheck, build và kiểm thử các luồng chính trên PostgreSQL riêng.
