# Nguồn cụm liên hệ

Theo yêu cầu, cụm floating được chuyển từ dự án Maigo local tại `../Booking_car/src/components/FloatingContacts.tsx` và các icon tương ứng trong `../Booking_car/public/icon/`.

Có đủ Hotline, Zalo, Telegram, WhatsApp, KakaoTalk và Facebook/Messenger; giữ các bản dịch vi/en/ru/ko/zh và nội dung hộp KakaoTalk. Logic được nối với `site.contact` của dự án này, bỏ phụ thuộc vào context và thư viện icon của Maigo. Icon được sao chép vào `public/icons/contact/`, không hotlink ảnh của website ngoài.

Desktop dùng cụm nổi dọc như Maigo. Trên điện thoại, 6 kênh nằm trên thanh nổi ngang có vùng bấm tối thiểu 44px; trang có khoảng trống đáy để cuộn đến nội dung cuối. KakaoTalk dùng native dialog để hỗ trợ Escape, khóa focus trong hộp và trả focus khi đóng.

Các khóa CMS: `telephone`, `phone`, `zalo`, `telegram`, `whatsapp`, `kakao`, `international`, `facebook`, `email`, `website`. Giá trị rỗng ẩn kênh tương ứng. Cấu hình này dùng chung cho floating và trang Liên hệ; placeholder `{{contact.*}}` dùng cho header/footer. Không gọi API nhắn tin hay gửi tin nhắn tự động.
