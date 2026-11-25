-- Refresh the home defaults from Figma while keeping locally edited CMS content.
UPDATE site_content AS content
SET value = to_jsonb(replacement.new_value),
    label = CASE WHEN content.label = replacement.old_label
                 THEN replacement.new_value ELSE content.label END
FROM (VALUES
  ('home.text-043', 'Hơn 500+ khách sạn đang có sẵn trên toàn quốc', 'Hơn 500+ khách sạn đang có sẵn trên toàn quốc', 'Biển xanh – Trải nghiệm mới – Ưu đãi mỗi ngày'),
  ('home.text-044', '
        Khám phá kỳ nghỉ tuyệt vời ', 'Khám phá kỳ nghỉ tuyệt vời', 'Nha'),
  ('home.text-045', 'giá tốt nhất', 'giá tốt nhất', 'Trang'),
  ('home.text-047', 'Khách sạn & Resort', 'Khách sạn & Resort', 'Đặt phòng'),
  ('home.text-048', 'Tour hằng ngày', 'Tour hằng ngày', 'Tour du lịch'),
  ('home.text-049', 'Combo trọn gói', 'Combo trọn gói', 'Combo du lịch'),
  ('home.text-051', 'Điểm đến / Khách sạn', 'Điểm đến / Khách sạn', 'Điểm đến'),
  ('home.text-059', 'Gợi ý hot:', 'Gợi ý hot:', 'Gợi ý tìm kiếm hot:'),
  ('home.text-064', '500+', '500+', 'Khách sạn'),
  ('home.text-065', 'Khách sạn toàn quốc', 'Khách sạn toàn quốc', 'Khách sạn và resort đa dạng'),
  ('home.text-066', '2M+', '2M+', 'Ưu đãi'),
  ('home.text-067', 'Lượt đặt thành công', 'Lượt đặt thành công', 'Khám phá combo du lịch'),
  ('home.text-068', '98%', '98%', 'Hỗ trợ 24/7'),
  ('home.text-069', 'Khách hàng hài lòng', 'Khách hàng hài lòng', 'Liên hệ hotline và Zalo'),
  ('home.text-070', '24/7', '24/7', 'Đặt chỗ'),
  ('home.text-071', 'Hỗ trợ hotline & Zalo', 'Hỗ trợ hotline & Zalo', 'Xác nhận trực tiếp'),
  ('home.text-080', '
            Khách sạn + tour + vé Vinpearl + vé máy bay
          ', 'Khách sạn + tour + vé Vinpearl + vé máy bay', 'Ưu đãi nổi bật'),
  ('home.text-106', '
          Chọn vị trí bạn yêu thích
        ', 'Chọn vị trí bạn yêu thích', 'Khám phá điểm đến'),
  ('home.text-107', 'Tất cả điểm đến', 'Tất cả điểm đến', 'Xem tất cả điểm đến')
) AS replacement(key, old_value, old_label, new_value)
WHERE content.key = replacement.key
  AND content.kind = 'text'
  AND content.value = to_jsonb(replacement.old_value);
