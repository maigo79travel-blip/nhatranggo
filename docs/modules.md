# Đối chiếu module với ĐỀ ÁN NÂNG CẤP.docx

Phạm vi đối chiếu: sự hiện diện và luồng sử dụng của module. Không dùng tài liệu này để tuyên bố đã hoàn tất chuyển hosting, vận hành production, tích hợp nhà cung cấp hoặc dịch toàn bộ nội dung.

| Nhóm module trong đề án | Khách hàng                                                                                   | Quản trị / dữ liệu                                                                                                              | Kết quả |
| ----------------------- | -------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | ------- |
| Trang chủ               | `/`, thẻ dịch vụ, tìm nhanh, popup gửi booking                                               | Nội dung website: logo, banner, ảnh, liên hệ, menu; Dịch vụ: nội dung/giá/trạng thái và ưu tiên trang chủ                                                  | Có      |
| Đặt xe                  | `/xe-dua-don`, chọn điểm đón/trả, báo giá, gửi ngày/giờ và yêu cầu | Địa phương/Điểm đến, Tuyến xe, Bảng giá xe, Booking, Đối tác/Tài xế                                                             | Có      |
| Đặt phòng               | `/khach-san`, chọn loại phòng và ngày nhận/trả                        | Dịch vụ, Loại phòng, Địa phương, Booking, Đối tác                                                                               | Có      |
| Đặt tour                | `/tour-hang-ngay`, ngày khởi hành, số khách                            | Dịch vụ, Lịch khởi hành tour, Địa phương, Đối tác, Booking                                                                      | Có      |
| E-Visa; Fast-track      | `/e-visa`, `/fast-track`, ngày giờ đến, sân bay, yêu cầu tư vấn có mã                        | E-Visa & Fast-track: danh sách, chi tiết, trạng thái                                                                            | Có      |
| Blog / Bài viết         | `/blog`, tìm theo từ khóa/chuyên mục; `/blog/[slug]`                                         | Blog & Tin tức, Chuyên mục; soạn Markdown có thanh công cụ và xem trước, tải ảnh hoặc chèn bằng URL, nháp/đăng/ẩn/xóa, SEO                    | Có      |
| Đơn hàng / Booking      | Mã booking và `/tra-cuu` theo mã + điện thoại; gửi hỗ trợ qua `/lien-he`                     | Danh sách chung, lọc, tạo thủ công, sửa khách, đối tác/tài xế, ghi chú, xác nhận/hoàn tất/hủy, lịch sử, xuất Excel theo bộ lọc | Có      |
| Liên hệ & Hỗ trợ        | `/lien-he`, form và điện thoại/Zalo/WhatsApp/Telegram/email đã cấu hình                      | Liên hệ & Hỗ trợ; `site.contact` trong Nội dung website                                                                         | Có      |
| Ngôn ngữ & thông tin    | Bộ chọn vi/en/ru/ko/zh, nội dung CMS/dịch vụ theo bản dịch; `/thong-tin/[slug]`              | Ngôn ngữ website, Giới thiệu & Chính sách; bài viết và trang có bản riêng theo ngôn ngữ                                         | Có      |

## Các menu quản trị bổ trợ

- Tổng quan: đơn mới/chờ xác nhận, hoàn tất, dịch vụ/nội dung và tổng giá trị xác nhận của các đơn hoàn tất. Giá trị do nhân viên nhập, không coi giá tham khảo là doanh thu đã thu tiền.
- Khách hàng: thông tin liên hệ và lịch sử booking theo điện thoại; khách gửi booking được cập nhật vào danh bạ.
- Đối tác & Tài xế: danh bạ tài xế, khách sạn, nhà tour; liên kết dịch vụ và phân công booking.
- Địa phương / Điểm đến: thêm địa phương không cần sửa JSX; tuyến xe sử dụng điểm đến và danh mục dịch vụ có lọc địa phương.
- Tài khoản & Phân quyền: quản trị cao nhất, nhân viên booking và biên tập viên. Kiểm tra quyền tại API; menu ẩn theo quyền chỉ là lớp giao diện.

## Quy tắc dữ liệu

- Booking và yêu cầu E-Visa/Fast-track khởi tạo ở `pending`. Không tự xác nhận còn phòng, ghế hay dịch vụ.
- Booking hủy vẫn giữ bản ghi và lịch sử. Khách chỉ tra cứu được khi khớp cả mã và số điện thoại; ghi chú nội bộ không trả về API công khai.
- Dịch vụ, phòng, lịch tour, tuyến, địa phương và đối tác dùng ẩn/lưu trữ để giữ liên kết. Bài viết/trang/chuyên mục có khóa ngoại bảo vệ các liên kết đang dùng.
- Mật khẩu băm scrypt; không đưa hash vào API quản trị. Khi đổi quyền/khóa tài khoản, các phiên đăng nhập của tài khoản đó bị thu hồi. Không cho tự khóa/hạ quyền quản trị đang dùng hoặc làm mất quản trị cao nhất cuối cùng.
- Nội dung ngôn ngữ, thông tin chính sách, sân bay, đối tác và lịch khởi hành thực tế cần quản trị nhập. Không sinh bài viết giả, không tự dịch hoặc tự công bố chính sách doanh nghiệp.
- Editor bài viết dùng Markdown. Quản trị có thể chọn ảnh JPG, PNG hoặc WebP tối đa 3 MB, hoặc nhập URL. Ảnh tải lên được lưu trong PostgreSQL dưới dạng WebP và phục vụ từ `/api/media/`.
- Danh sách đặt chỗ phân trang ở máy chủ. Bộ lọc theo mã/khách/số điện thoại, loại dịch vụ, trạng thái và ngày sử dụng được áp dụng cho cả file Excel `.xlsx`.

## Phần ngoài phạm vi đã loại bỏ

- Yêu thích: bỏ API, trạng thái trình duyệt, nút và hộp thoại.
- Email ưu đãi/newsletter: bỏ API đăng ký, form và menu quản trị.
- Bỏ công cụ chuyển HTML/trích xuất nội dung cũ và dependency `cheerio` chỉ phục vụ chuyển đổi.
- Giữ migration cũ và dữ liệu lịch sử tương thích; không drop bảng lịch sử trong database đã cài đặt.
- Combo là loại sản phẩm trong danh mục dịch vụ, không tạo thành một module quản trị độc lập.

## Kiểm thử

`npm run test:modules` dùng PostgreSQL và server thực để kiểm tra CRUD, công bố/nháp, tuyến/giá, phòng/lịch tour, booking/lịch sử/xuất danh sách, CRM, E-Visa/Fast-track, liên hệ, bản dịch và phân quyền. Test tạo dữ liệu có mã riêng và xóa dữ liệu đó ở cuối; chỉ chạy trên database phát triển/kiểm thử.
