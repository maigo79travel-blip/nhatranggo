-- Sync footer labels with Figma design and seed default information_pages.
UPDATE site_content SET value = to_jsonb('DU LỊCH & TRẢI NGHIỆM'::text), label = 'DU LỊCH & TRẢI NGHIỆM' WHERE key = 'footer.text-024';
UPDATE site_content SET value = to_jsonb('Nền tảng đặt phòng, tour du lịch và trải nghiệm hàng đầu tại Nha Trang.'::text), label = 'Nền tảng đặt phòng, tour du lịch và trải nghiệm hàng đầu tại Nha Trang.' WHERE key = 'footer.text-025';
UPDATE site_content SET value = to_jsonb('Dịch vụ'::text), label = 'Dịch vụ' WHERE key = 'footer.text-031';
UPDATE site_content SET value = to_jsonb('Khách sạn'::text), label = 'Khách sạn' WHERE key = 'footer.text-032';
UPDATE site_content SET value = to_jsonb('Tour du lịch'::text), label = 'Tour du lịch' WHERE key = 'footer.text-033';
UPDATE site_content SET value = to_jsonb('Xe đưa đón'::text), label = 'Xe đưa đón' WHERE key = 'footer.text-034';
UPDATE site_content SET value = to_jsonb('Combo du lịch'::text), label = 'Combo du lịch' WHERE key = 'footer.text-035';
UPDATE site_content SET value = to_jsonb('Ưu đãi & khuyến mãi'::text), label = 'Ưu đãi & khuyến mãi' WHERE key = 'footer.text-036';
UPDATE site_content SET value = to_jsonb('Về chúng tôi'::text), label = 'Về chúng tôi' WHERE key = 'footer.text-038';

INSERT INTO information_pages (id, title, slug, locale, body, status) VALUES
  (
    gen_random_uuid(),
    'Giới thiệu',
    'gioi-thieu',
    'vi',
    'NhaTrangGo là nền tảng đặt phòng khách sạn, tour du lịch và xe đưa đón sân bay Cam Ranh – Nha Trang với mức giá minh bạch và hỗ trợ 24/7.',
    'published'
  ),
  (
    gen_random_uuid(),
    'Điều khoản sử dụng',
    'dieu-khoan-su-dung',
    'vi',
    'Quý khách vui lòng kiểm tra kỹ thông tin hành trình, thời gian đón trả và xác nhận đặt chỗ từ tư vấn viên trước khi thanh toán.',
    'published'
  ),
  (
    gen_random_uuid(),
    'Chính sách bảo mật',
    'chinh-sach-bao-mat',
    'vi',
    'NhaTrangGo cam kết bảo mật thông tin cá nhân, số điện thoại và lịch trình đặt dịch vụ của quý khách, chỉ sử dụng cho mục đích xác nhận và hỗ trợ chuyến đi.',
    'published'
  ),
  (
    gen_random_uuid(),
    'Hỗ trợ khách hàng',
    'ho-tro-khach-hang',
    'vi',
    'Đội ngũ điều hành NhaTrangGo hỗ trợ trực tuyến 24/7 qua Hotline 0878.458.885, Zalo, Telegram và WhatsApp để tư vấn đặt phòng, tour và xe đưa đón.',
    'published'
  )
ON CONFLICT (slug, locale) DO NOTHING;
