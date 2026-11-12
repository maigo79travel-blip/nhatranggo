# Chạy NhaTrangGo trên production

Dự án có bản build Next.js standalone, Docker chạy bằng user không phải root, health check, migration có lịch sử, kiểm tra đầu vào API và CI. Kiểm thử local không thay thế việc xác nhận domain, HTTPS, database và khôi phục backup trên hạ tầng thực tế.

## Cấu hình

- Node.js 22 trở lên và PostgreSQL 17.
- `DATABASE_URL`: database riêng của môi trường đích; tài khoản và mật khẩu do người vận hành cấp. Không dùng thông tin database phát triển cho production.
- `APP_URL`: origin HTTPS chính thức, không thêm đường dẫn. HTTP chỉ được chấp nhận cho localhost để kiểm thử. Giá trị này quyết định kiểm tra Origin và thuộc tính Secure của cookie, kể cả khi Next.js chạy sau reverse proxy HTTP nội bộ.
- `TRUST_PROXY=true` chỉ khi ingress/reverse proxy ghi đè `X-Forwarded-For` bằng IP thực; không công khai cổng Node.js trực tiếp trong cấu hình này. Khi tắt, giới hạn yêu cầu dùng một nhóm chung cho kết nối trực tiếp; phù hợp local và cần cấu hình proxy trước khi phục vụ nhiều khách.
- `PORT` đổi cổng của `npm start`; mặc định 3001. `APP_HOST` mặc định `127.0.0.1`. Docker dùng cổng 3001 nội bộ và Compose chỉ publish trên loopback.

`npm start` kiểm tra cấu hình trước khi khởi động. Tên thương hiệu nằm tại `src/config/brand.json`, bảng màu tại `src/theme/colors.json`, thông tin 6 kênh liên hệ tại CMS `site.contact`. Chỉ hiển thị email khi đã cấu hình địa chỉ thực.

## Nâng cấp bản đã có dữ liệu

1. Tạo backup database và xác nhận có thể khôi phục trên database thử nghiệm.
2. Cấp cấu hình môi trường và chạy `npm ci`.
3. Chạy `npm run db:migrate`; không chạy seed để thay thế dữ liệu vận hành.
4. Chạy `npm run build`, sau đó `npm start` dưới process supervisor.
5. Kiểm tra `/api/health`, đăng nhập, gửi yêu cầu thử, tra cứu và 6 kênh liên hệ qua domain HTTPS thực tế.

`db/007_request_limits.sql` thêm bộ đếm yêu cầu dùng chung giữa các process. `db/008_nhatranggo_identity.sql` đổi nhận diện mặc định sang placeholder thương hiệu và đưa các kênh Maigo vào `site.contact`; kiểm tra lại các tài khoản liên hệ này trước khi đưa website mới lên domain chính thức.

## Docker

```sh
docker compose --env-file /path/to/production.env -f compose.production.yml build
docker compose --env-file /path/to/production.env -f compose.production.yml run --rm web node scripts/database.mjs migrate
docker compose --env-file /path/to/production.env -f compose.production.yml up -d
docker compose --env-file /path/to/production.env -f compose.production.yml ps
```

Database phải truy cập được từ container; `localhost` trong container là chính container. Lần khởi tạo mới có thể chạy `node scripts/database.mjs seed` và `node scripts/setup-admin.mjs` bằng cùng cấu hình môi trường trước khi phục vụ người dùng. Đặt `ADMIN_USERNAME` và `ADMIN_INITIAL_PASSWORD` qua secret một lần khi tạo tài khoản; script không ghi đè tài khoản đã có.

Docker không copy `.env`, `.local`, tài khoản admin hay kết quả kiểm thử vào image. Migration là bước triển khai riêng, không tự chạy đồng thời từ từng instance web.

Reverse proxy cần TLS và giới hạn request body (ví dụ 1 MB). Với Nginx, cấu hình upstream nội bộ theo mẫu sau trong virtual host đã cấu hình certificate:

```nginx
location / {
    proxy_pass http://127.0.0.1:3001;
    proxy_set_header Host $host;
    proxy_set_header X-Forwarded-For $remote_addr;
    proxy_set_header X-Forwarded-Proto $scheme;
    client_max_body_size 1m;
    proxy_read_timeout 60s;
}
```

## Xác minh và vận hành

`/api/health` trả 200 khi database truy cập được, 503 khi không truy cập được; không trả chi tiết kết nối. HTTP API và admin được đặt `Cache-Control: private, no-store`. Lỗi API chung trả thông báo an toàn; mã lỗi hạ tầng được ghi log mà không ghi payload khách hàng.

Bộ đếm đăng nhập và gửi yêu cầu lưu tại PostgreSQL, không mất khi restart ứng dụng và không tách riêng theo từng instance. API trả 429 kèm `Retry-After` khi vượt hạn mức. Dữ liệu quá lớn trả 413, JSON không hợp lệ trả 400. Ranh giới quyền CRUD vẫn được kiểm tra tại server.

Workflow `.github/workflows/check.yml` chạy typecheck, build và các bộ e2e trên PostgreSQL thử nghiệm. Test có ghi dữ liệu, chỉ chạy trên database phát triển hoặc CI. `test:production` kiểm tra header, JSON, giới hạn đăng nhập giữa hai client, nhận diện và các nút nổi; không gửi tin nhắn đến các tài khoản liên hệ.

Backup, retention, cảnh báo uptime, thu thập log và thao tác rollback do người vận hành cấu hình. Khi rollback, dùng image trước và database/schema tương thích; không tự chạy SQL xóa dữ liệu để hoàn tác migration. Chưa có thanh toán online, tồn kho trực tiếp, email/SMS tự động hoặc kho upload ảnh.
