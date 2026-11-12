# Cấu trúc dự án

Ứng dụng dùng một Next.js App Router và PostgreSQL. Cấu trúc tách route, giao diện và nghiệp vụ; không thêm các tầng repository/controller chỉ để bọc lại một lời gọi hàm.

```text
src/
  app/
    (site)/              Trang công khai và layout website
    admin/               Điểm vào trang quản trị
    api/                 HTTP: kiểm tra quyền, parse input, gọi nghiệp vụ
    layout.tsx           HTML, ngôn ngữ, font và CSS toàn ứng dụng
  modules/
    admin/               Registry CRUD, quyền, validation chung và màn hình CRUD
    blog/                Bài viết/chuyên mục, truy vấn công khai, editor Markdown
    bookings/            Cập nhật đơn, lịch sử, tạo thủ công, xuất danh sách
    crm/                 Khách hàng, đối tác, tài xế
    home/                Tìm nhanh, bộ lọc và liên kết trang chủ
    settings/            Tài khoản, ngôn ngữ, trang thông tin
    support/             E-Visa/Fast-track, liên hệ, tra cứu
    travel/              Địa phương, tuyến, phòng, lịch tour, thẻ danh mục
  components/            Giao diện chia sẻ và các bố cục trang hiện có
  lib/                   Pool DB, session, lỗi/HTTP, giới hạn yêu cầu, resolver CMS và dịch vụ dùng chung
  config/                Nhận diện NhaTrangGo dùng chung
  theme/                 Bảng màu duy nhất và adapter Tailwind

db/                      SQL migration có thứ tự và seed dùng lúc khởi tạo
scripts/
  lib/                   Migration runner dùng chung
  maintenance/           Công cụ tải lại font
  database.mjs           CLI migrate/seed
  seed-content.mjs       Seed CMS không ghi đè nội dung đã sửa
  setup-admin.mjs        Tạo quản trị ban đầu

tests/e2e/               Kiểm thử giao diện/API với database thực
docs/                    Thiết kế, kiến trúc, đối chiếu module
public/                  Ảnh và font tĩnh
```

Các thư mục `(site)` không thay đổi URL. Quản trị không dùng layout/header/footer của website; trang đăng nhập không tải danh mục công khai. `src/lib/services` vẫn chứa dịch vụ đã có; dịch vụ mới đặt cùng module để tránh đợt di chuyển hàng loạt không cần thiết.

## Ranh giới và mở rộng

- Server code chứa `server-only`. Component client không nhập pool DB hay hàm xác thực server.
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
- `FilterField` dùng cho bộ lọc Dịch vụ và Blog. `PublicPage`, `PublicForm`, `SupportGuide`, `ServiceCards` dùng lại giữa các route liên quan.
- `publicProductWhere` giữ cùng quy tắc hiển thị tại danh mục, chi tiết và tạo booking. `bookingSchema` dùng cho yêu cầu công khai và tạo đơn quản trị.
- `AppError`, `readJson`, `errorResponse`, kiểm tra Origin/cookie và rate limiter tách khỏi module admin để các module công khai không phụ thuộc vào lớp CRUD quản trị.

Cấu trúc giữ các route và nghiệp vụ riêng khi hành vi khác nhau; không ép mọi component thành abstraction chỉ để giảm số dòng. TypeScript bật kiểm tra biến/tham số không dùng và Knip kiểm tra export/type thừa.
