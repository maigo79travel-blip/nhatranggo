# Deploy NhaTrangGo lên Vercel và Supabase

Repository đã có `vercel.json` chọn Next.js, Node.js 22 được pin trong `package.json`, build command `npm run build` và function region `icn1` (Seoul). Điều chỉnh region nếu chuyển database sang khu vực khác.

## Supabase

Lấy hai URI tại **Connect**:

- Transaction pooler, cổng 6543 → `DATABASE_URL` dùng bởi website.
- Session pooler, cổng 5432 → `DIRECT_URL` dùng bởi migration, seed và tạo admin.

Các script ưu tiên `DIRECT_URL`, sau đó mới dùng `DATABASE_URL`. Đây là điều cần thiết vì migration dùng advisory lock theo phiên. Không chạy migration qua transaction pooler.

Kết nối đến hostname Supabase dùng CA công khai tại `db/supabase-ca.json`, được tải từ nguồn chính thức `https://supabase-downloads.s3-ap-southeast-1.amazonaws.com/prod/ssl/prod-ca-2021.crt`. Adapter dùng chung `db/connection.mjs` kiểm tra chuỗi chứng chỉ và hostname; không dùng `rejectUnauthorized: false`. CA hiện hết hạn ngày 26/04/2031 và cần được thay khi nhà cung cấp đổi CA.

Tạo file local `.env.supabase` (được Git bỏ qua):

```dotenv
DATABASE_URL="<transaction-pooler-URI>"
DIRECT_URL="<session-pooler-URI>"
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_INITIAL_PASSWORD="<mật-khẩu-admin-riêng-tối-thiểu-12-ký-tự>"
```

Trên database mới, chạy lần lượt:

```sh
node --env-file=.env.supabase scripts/database.mjs migrate
node --env-file=.env.supabase scripts/database.mjs seed
node --env-file=.env.supabase scripts/setup-admin.mjs
```

Nếu đã có dữ liệu, chỉ chạy migration, không khởi tạo lại dữ liệu để thay thế database vận hành. Migration 009 bật RLS và thu hồi quyền trực tiếp của `anon`/`authenticated` trên các bảng ứng dụng. Website dùng kết nối server với tài khoản sở hữu bảng; không dùng Supabase Data API hay Supabase Auth.

## Vercel

1. Import repository GitHub `maigo79travel-blip/nhatranggo`, nhánh `main`.
2. Framework Next.js, Root Directory `./`, Install/Build/Output để theo cấu hình repository.
   Install Command là `npm ci --include=dev`, bảo đảm Tailwind, Autoprefixer và TypeScript vẫn được cài khi môi trường đặt `NODE_ENV=production` hoặc `NPM_CONFIG_OMIT=dev`. Các gói này cần trong lúc build. Nếu đã ghi đè Install Command trên dashboard, dùng cùng lệnh này.
3. Thêm biến môi trường **Production**: `DATABASE_URL` là URI transaction pooler. Đánh dấu giá trị này là Sensitive. Không dùng tiền tố `NEXT_PUBLIC_`.
4. `APP_URL` là URL HTTPS chính thức khi đã có domain; nếu chưa đặt, server tự lấy production URL từ Vercel. Preview chấp nhận deployment URL và branch URL do Vercel cung cấp. Vercel tự bật cookie Secure và sử dụng IP do proxy Vercel cung cấp; self-host vẫn dùng cấu hình `TRUST_PROXY` riêng.
5. Deploy và kiểm tra `/api/health`, trang chủ, `/dich-vu`, đăng nhập `/admin` và một yêu cầu đặt chỗ được phép thử nghiệm.

Chỉ dùng database riêng cho Preview/Development. Các test e2e trong repository có ghi dữ liệu, không chạy toàn bộ các test đó trên database production.

Trên Vercel, build bỏ qua đóng gói standalone; local/Docker vẫn giữ standalone và `npm start`. Pool runtime trên Vercel được giới hạn 3 kết nối mỗi instance và gắn `attachDatabasePool` để thu hồi kết nối idle khi function tạm nghỉ. Vercel không chạy `npm start` hay `prestart`; môi trường triển khai phải được cấu hình tại dashboard.

Tài liệu đối chiếu: [Supabase connections](https://supabase.com/docs/guides/database/connecting-to-postgres), [Vercel pool lifecycle](https://vercel.com/docs/functions/functions-api-reference/vercel-functions-package#attachdatabasepool), [Vercel system variables](https://vercel.com/docs/environment-variables/system-environment-variables).
