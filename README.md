# Booking Travel — Next.js + PostgreSQL

Chuyển trực tiếp 4 trang HTML gốc sang Next.js App Router, React và TypeScript. Frontend, API backend và truy vấn PostgreSQL nằm trong cùng project. Các thư mục HTML/PNG gốc được giữ nguyên để đối chiếu.

## Chạy local

Yêu cầu Node.js 20.9+ và Docker Desktop đang chạy.

```powershell
npm install
Copy-Item .env.example .env
docker compose up -d db
npm run db:migrate
npm run db:seed
npm run admin:setup
npm run dev
```

Mở http://localhost:3001. Lệnh `dev` và `start` dùng cổng 3001 để tránh trùng backend của project khác ở cổng 3000. PostgreSQL chạy tại `localhost:15432`, dữ liệu lưu trong Docker volume `booking_pgdata`. Nếu có PostgreSQL riêng, sửa `DATABASE_URL` trong `.env` và bỏ bước Docker. Mật khẩu trong Compose dành cho local; cấu hình tài khoản riêng khi triển khai.

| Đường dẫn | Trang HTML tương ứng |
| --- | --- |
| `/` | Trang chủ du lịch, khách sạn, combo, tour |
| `/khach-san` | Danh sách khách sạn & resort |
| `/tour-hang-ngay` | Tour hằng ngày, tour đảo Nha Trang |
| `/xe-dua-don` | Xe sân bay và du lịch liên tỉnh |

## Giao diện và tái sử dụng

- **`src/theme/colors.json` là nơi duy nhất sửa bảng màu**: ví dụ đổi `primary`, `secondary`, `sale-crimson`, `background`. Tailwind và CSS lấy cùng bộ biến `--color-*` được sinh tự động từ file này, bao gồm các màu có độ trong suốt (`bg-primary/70`), gradient và viền focus. Không khai báo mã màu trực tiếp trong component.
- `tailwind.config.cjs`: typography, spacing và shadow dùng chung; màu được nhập từ bộ theme. Khi mô tả trong `DESIGN.md` khác với HTML, ưu tiên HTML để giữ đúng giao diện đang có.
- `price-stack.tsx`: bố cục giá dùng chung, giá gốc phía trên và giá giảm phía dưới. Hàng giá/nút được phép chuyển nguyên nút xuống hàng khi không đủ chỗ, chữ trong nút giữ trên một dòng.
- `src/components/pages/`: JSX của từng trang, giữ cấu trúc, class, nội dung và ảnh gốc; không dùng iframe hoặc chèn nguyên HTML bằng `dangerouslySetInnerHTML`.
- `site-header.tsx`, `site-footer.tsx`: dùng chung cho cả 4 trang; menu desktop/mobile liên kết các trang.
- `catalog.tsx`: thẻ dịch vụ, tên/giá/ảnh lấy từ PostgreSQL, yêu thích trên trình duyệt, form đặt chỗ, tra cứu, đăng ký ưu đãi và logic giá xe.
- `listing-filters.tsx`: xử lý bộ lọc và sắp xếp từ các điều khiển gốc.
- `public/images/`: 47 ảnh gốc; `public/fonts/` và `src/app/fonts.css`: Plus Jakarta Sans có tiếng Việt và Material Symbols, phục vụ cục bộ.
- `content.tsx`: đọc nội dung văn bản, liên kết, ảnh nền và các tập dịch vụ từ PostgreSQL; JSX chỉ giữ bố cục và các mã tham chiếu nội dung.
- `db/seed/`: dữ liệu khởi tạo, chỉ được đọc bởi lệnh seed. Frontend/backend phục vụ website không đọc JSON seed và không dùng dữ liệu mẫu dự phòng khi DB lỗi.

## Quản trị dữ liệu

Mở **http://localhost:3001/admin**. Tài khoản quản trị ban đầu được tạo bằng `npm run admin:setup`; tên đăng nhập và mật khẩu ngẫu nhiên lưu ở **`.local/admin-access.txt`** (không đưa vào Git). Mật khẩu được băm scrypt trong database; phiên đăng nhập dùng cookie HttpOnly và có thời hạn 8 giờ. Có thể đổi mật khẩu ở mục **Tài khoản**; thao tác này đăng xuất các phiên cũ. Chạy setup lần nữa không đổi mật khẩu tài khoản đã có.

Admin sử dụng sidebar điều hướng, trang tổng quan lấy số liệu thực từ DB, bảng danh sách có tìm kiếm/bộ lọc/phân trang và khung chỉnh sửa mở bên phải. Trên điện thoại, menu thu gọn và bảng cuộn ngang trong khung. Các cấu hình gồm trường văn bản đơn giản có chế độ biểu mẫu; có thể chuyển sang JSON nâng cao khi cần. Giao diện admin nằm trong `src/components/admin/`, CSS riêng trong `admin.css`; các màu `admin-*` vẫn khai báo cùng bảng màu `src/theme/colors.json`.

- **Dịch vụ**: sửa tên, giá bán, giá gốc, ảnh, mô tả, địa điểm, điểm đánh giá, thứ tự và trạng thái hiển thị. Mở phần chi tiết để sửa nhãn ưu đãi, tiện ích, lịch trình và liên kết. Giá gốc chỉ hiện khi lớn hơn giá bán.
- **Thêm dịch vụ**: chọn một mẫu bố cục, nhập tên rồi thêm bản nháp. Chỉnh nội dung và bật **Hiển thị trên website** để công khai. Bản ghi mới tự xuất hiện trong tập dịch vụ của mẫu, không phải thêm JSX. Bỏ chọn hiển thị để lưu trữ dịch vụ, giữ nguyên lịch sử đặt chỗ.
- **Nội dung website**: tìm theo văn bản, nhãn, mã hoặc khu vực `home`, `hotels`, `tours`, `transfers`, `header`, `footer`, `site`. Có 681 mục nội dung ban đầu, gồm tiêu đề, đoạn giới thiệu, FAQ, điểm đến, bài viết, thông tin xe, menu, liên kết, ảnh nền và SEO. Văn bản sửa trực tiếp; thuộc tính/cấu hình sửa dưới dạng JSON, giữ nguyên tên khóa.
- **Liên hệ dùng chung**: tìm `site.contact` để đổi hotline, số gọi điện, Zalo và email. Các trường có `{{contact.phone}}`, `{{contact.telephone}}`, `{{contact.zalo}}`, `{{contact.email}}` tự dùng cấu hình này. `site.mobile-navigation` quản lý các mục menu điện thoại; `site.metadata` và `metadata.*` quản lý SEO.
- **Bảng giá xe**: sửa một mức giá sẽ cập nhật đồng thời bảng niêm yết, API báo giá và giá tham khảo dùng khi đặt xe. Đơn đã gửi giữ giá được ghi nhận tại thời điểm tạo.
- **Đặt chỗ**: xem thông tin khách và chuyển trạng thái chờ xác nhận / đã xác nhận / đã hủy.
- **Email ưu đãi**: xem danh sách email đăng ký.

Mỗi thẻ dịch vụ ban đầu giữ một mẫu trình bày để bảo toàn thiết kế. Cùng một khách sạn có thể có các bản ghi/thẻ độc lập ở trang chủ và danh sách; chọn đúng vị trí trong quản trị khi sửa nội dung. Ảnh thực tế phục vụ từ `public/images/` hoặc URL ảnh do quản trị nhập; đường dẫn, mô tả ảnh và ảnh được sử dụng do database quyết định. **Bảng màu vẫn dùng duy nhất `src/theme/colors.json` theo yêu cầu trước; CSS, font, icon và bố cục là phần mã giao diện.**

API `/api/admin/*` yêu cầu đăng nhập. Chỉnh dữ liệu được kiểm tra phía server; không mở quyền sửa dữ liệu cho khách truy cập. Sau khi lưu, tải lại trang công khai để thấy nội dung mới.

## Backend

| API | Chức năng |
| --- | --- |
| `GET /api/products?type=hotel&q=Cam&sort=price` | Danh mục từ PostgreSQL; sort: `recommended`, `price`, `rating` |
| `GET /api/fares?pickup=CXR&dropoff=NT_CENTER&vehicle=7cho` | Báo giá theo tuyến và loại xe; tuyến chưa có giá trả 404 |
| `POST /api/bookings` | Lưu yêu cầu và giá tham khảo tại thời điểm đặt |
| `GET /api/bookings?id=<uuid>&phone=<số điện thoại>` | Tra cứu khi khớp cả mã yêu cầu và số điện thoại |
| `POST /api/subscribe` | Lưu email nhận ưu đãi, không tạo trùng email |
| `GET /api/favorites`, `POST /api/favorites` | Danh sách yêu thích lưu PostgreSQL theo cookie khách truy cập |

Body đặt chỗ:

```json
{
  "productId": "hotels-1",
  "name": "Nguyễn Văn A",
  "phone": "0901234567",
  "date": "2099-12-01",
  "guests": 2,
  "notes": "1 phòng, 2 đêm; vui lòng gọi xác nhận"
}
```

Giá được đọc phía server, không nhận giá do trình duyệt gửi. Kiểm tra dữ liệu bằng Zod, truy vấn SQL truyền tham số. Ngày sử dụng được kiểm tra theo múi giờ Việt Nam. Schema trong `db/001_initial.sql` đến `db/004_favorites.sql`; seed gồm 28 thẻ, 32 báo giá xe và 681 mục nội dung. Chạy seed nhiều lần không tạo trùng và không ghi đè nội dung, giá, ảnh hay trạng thái mà quản trị đã sửa.

Đặt chỗ là **yêu cầu tư vấn ở trạng thái chờ xác nhận**. Nội dung khởi tạo lấy từ bản thiết kế gốc và có thể sửa trong quản trị; chưa đồng bộ tồn phòng, thanh toán, email/SMS hay nhà cung cấp thật. Các liên kết chính sách chưa có trang nguồn dẫn về phần liên hệ và có thể cập nhật ở quản trị. Yêu thích được lưu PostgreSQL theo cookie của trình duyệt, chưa có tài khoản khách hàng để đồng bộ nhiều thiết bị. Khi DB lỗi, hệ thống báo lỗi tải/lưu dữ liệu thay vì hiển thị dữ liệu giả từ JSON.

## Kiểm tra và production

```powershell
npm run typecheck
npm run build
npm run start
```

Khi server đang chạy và PostgreSQL đã seed, chạy kiểm tra trình duyệt và dữ liệu:

```powershell
npx playwright install chromium
# Nếu dùng Chromium do Playwright cài:
$env:PLAYWRIGHT_CHROMIUM_EXECUTABLE = "<đường dẫn tới chrome.exe của Chromium>"
npm test
npm run test:cms
```

Nếu không đặt biến trên, script dùng Google Chrome đã cài (`channel: chrome`). Có thể đặt `TEST_URL` để kiểm tra server ở địa chỉ khác. Test kiểm tra 4 trang tại desktop/mobile, không tràn ngang, gửi yêu cầu qua UI rồi xác minh PostgreSQL, tra cứu đúng/sai số điện thoại, từ chối ngày quá khứ và đổi giá xe. Bản ghi đặt chỗ do test tạo được xóa sau kiểm tra. Ảnh chụp lưu tại `test-results/`.

`test:cms` dùng tài khoản trong `.local/admin-access.txt` để kiểm tra đăng nhập, sửa dịch vụ và nội dung qua UI, đối chiếu trang công khai, thêm/hiển thị/ẩn dịch vụ, đồng bộ giá xe, bảo vệ API và việc seed không ghi đè chỉnh sửa. Test khôi phục các dữ liệu nó thay đổi sau khi chạy; nên chạy trên database phát triển.

`scripts/convert.mjs` là công cụ chuyển đổi một lần, lưu để tham khảo; **không cần chạy lại** vì sẽ ghi đè các component đã hoàn thiện. `scripts/assets.mjs` và `scripts/fonts.mjs` dùng khi cần tải lại tài nguyên gốc.
#   n h a t r a n g - b o o k i n g - p o r t a l  
 