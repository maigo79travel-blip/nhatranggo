-- Update the original footer copy and retain changes made through the CMS.
UPDATE site_content AS content
SET value = to_jsonb(defaults.new_value),
    label = CASE WHEN content.label = defaults.old_label
      THEN defaults.new_value ELSE content.label END
FROM (VALUES
  ('footer.text-024', 'Nền tảng du lịch trực tuyến', 'Nền tảng du lịch trực tuyến', 'DU LỊCH & TRẢI NGHIỆM'),
  ('footer.text-025', 'Nền tảng đặt phòng, tour du lịch và trải nghiệm hằng ngày tại Nha Trang.', 'Nền tảng đặt phòng, tour du lịch và trải nghiệm hằng ngày tại Nha Trang.', 'Nền tảng đặt phòng, tour du lịch và trải nghiệm tại Nha Trang.'),
  ('footer.text-031', 'Dịch vụ nổi bật', 'Dịch vụ nổi bật', 'Dịch vụ'),
  ('footer.text-032', 'Khách sạn Nha Trang', 'Khách sạn Nha Trang', 'Khách sạn'),
  ('footer.text-033', 'Resort Phú Quốc & Cam Ranh', 'Resort Phú Quốc & Cam Ranh', 'Tour du lịch'),
  ('footer.text-034', 'Tour 3 đảo Nha Trang VIP', 'Tour 3 đảo Nha Trang VIP', 'Xe đưa đón'),
  ('footer.text-035', 'Combo Bay & Nghỉ dưỡng', 'Combo Bay & Nghỉ dưỡng', 'Combo du lịch'),
  ('footer.text-036', 'Vé VinWonders & Cáp treo', 'Vé VinWonders & Cáp treo', 'Ưu đãi & khuyến mãi'),
  ('footer.text-038', 'Chính sách & Quy định', 'Chính sách & Quy định', 'Về chúng tôi'),
  ('footer.text-025', '{{brand.name}}', '{{brand.name}}', 'Nền tảng đặt phòng, tour du lịch và trải nghiệm tại Nha Trang.')
) AS defaults(key, old_value, old_label, new_value)
WHERE content.key = defaults.key
  AND content.kind = 'text'
  AND content.value = to_jsonb(defaults.old_value);

-- Keep starter information pages in draft for review.
INSERT INTO information_pages (id, title, slug, locale, body, status) VALUES
  (
    gen_random_uuid(),
    'Giới thiệu',
    'gioi-thieu',
    'vi',
    'NhaTrangGo là nền tảng đặt phòng khách sạn, tour du lịch và xe đưa đón sân bay Cam Ranh – Nha Trang với mức giá minh bạch và hỗ trợ 24/7.',
    'draft'
  ),
  (
    gen_random_uuid(),
    'Điều khoản sử dụng',
    'dieu-khoan-su-dung',
    'vi',
    'Quý khách vui lòng kiểm tra kỹ thông tin hành trình, thời gian đón trả và xác nhận đặt chỗ từ tư vấn viên trước khi thanh toán.',
    'draft'
  ),
  (
    gen_random_uuid(),
    'Chính sách bảo mật',
    'chinh-sach-bao-mat',
    'vi',
    'NhaTrangGo cam kết bảo mật thông tin cá nhân, số điện thoại và lịch trình đặt dịch vụ của quý khách, chỉ sử dụng cho mục đích xác nhận và hỗ trợ chuyến đi.',
    'draft'
  ),
  (
    gen_random_uuid(),
    'Hỗ trợ khách hàng',
    'ho-tro-khach-hang',
    'vi',
    'Đội ngũ điều hành NhaTrangGo hỗ trợ trực tuyến 24/7 qua Hotline 0878.458.885, Zalo, Telegram và WhatsApp để tư vấn đặt phòng, tour và xe đưa đón.',
    'draft'
  )
ON CONFLICT (slug, locale) DO NOTHING;
