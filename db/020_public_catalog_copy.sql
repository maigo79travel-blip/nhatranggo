-- Replace imported presentation copy while preserving CMS and catalogue edits.
UPDATE site_content AS c
SET value=to_jsonb(copy.new_value),
    label=CASE WHEN c.label=copy.old_label THEN copy.new_value ELSE c.label END
FROM (VALUES
  ('tours.text-038', ' Đã bao gồm bảo hiểm 50.000.000đ/vụ
          ', 'Đã bao gồm bảo hiểm 50.000.000đ/vụ', 'Hỗ trợ kiểm tra điều kiện bảo hiểm của từng tour'),
  ('tours.text-055', '
          Không cần thanh toán trước 100%, hủy tour đổi ngày linh hoạt, an tâm trải nghiệm kỳ nghỉ tuyệt đối.
        ', 'Không cần thanh toán trước 100%, hủy tour đổi ngày linh hoạt, an tâm trải nghiệm kỳ nghỉ tuyệt đối.', 'Điều kiện thanh toán, đổi ngày và hủy được xác nhận khi tư vấn tour.'),
  ('tours.text-071', '
              100% khách hàng tham gia tour biển đảo đều được cấp bảo hiểm du lịch Bảo Việt trách nhiệm tối đa 50.000.000đ/vụ.
            ', '100% khách hàng tham gia tour biển đảo đều được cấp bảo hiểm du lịch Bảo Việt trách nhiệm tối đa 50.000.000đ/vụ.', 'Nhân viên sẽ xác nhận quyền lợi bảo hiểm áp dụng cho tour đã chọn.'),
  ('tours.text-073', '
              Thời tiết xấu, biển động hoặc thay đổi lịch trình cá nhân? Hoàn tiền 100% hoặc đổi ngày đi dễ dàng chỉ với 1 tin nhắn.
            ', 'Thời tiết xấu, biển động hoặc thay đổi lịch trình cá nhân? Hoàn tiền 100% hoặc đổi ngày đi dễ dàng chỉ với 1 tin nhắn.', 'Liên hệ để được hỗ trợ đổi lịch khi điều kiện khởi hành thay đổi.'),
  ('transfers.text-105', '
          100% xe phục vụ đều là xe gia đình / xe hợp đồng du lịch đời mới từ 2022 trở lên, được bảo dưỡng định kỳ, nội thất sạch sẽ, êm ái và không mùi say xe.
        ', '100% xe phục vụ đều là xe gia đình / xe hợp đồng du lịch đời mới từ 2022 trở lên, được bảo dưỡng định kỳ, nội thất sạch sẽ, êm ái và không mùi say xe.', 'Xem loại xe, số khách tối đa và giá tham khảo theo tuyến.')
) AS copy(key,old_value,old_label,new_value)
WHERE c.key=copy.key AND c.value=to_jsonb(copy.old_value);


UPDATE products AS p
SET description=''
FROM (VALUES
  ('hotels-1', 'Tiết kiệm 25% Flash Deal Hôm Nay favorite photo_camera 32 hình ảnh star star star star star 5 Sao Quốc Tế Rất Tuyệt Vời 1.250 đánh giá 4.8 Khách sạn The Empyrean Nha Trang location_on 2 Trần Phú, P. Lộc Thọ, TP. Nha Trang (Cách Quảng trường 2/4 chỉ 100m) pool Hồ bơi vô cực tầng 40 visibility View trọn vẹn vịnh Nha Trang restaurant Miễn phí Buffet sáng 2 khách check_circle Miễn phí hủy phòng trước 48h • Xác nhận tức thì qua Zalo 1.800.000đ 1.091.000đ /đêm Đã gồm thuế, phí & bữa sáng chat Xem phòng & Đặt ngay'),
  ('hotels-2', 'Thương hiệu Quốc tế Accor Giảm 30% Hè 2024 favorite photo_camera 48 hình ảnh star star star star star 5 Sao Resort Xuất Sắc 890 đánh giá 4.9 Mövenpick Resort Cam Ranh location_on Bãi Dài, Xã Cam Hải Đông, Cam Ranh (Cách sân bay Cam Ranh 10 phút) cookie Miễn phí Giờ Sô-cô-la (Chocolate Hour) qr_code_2 Công viên nước Water Park 6.000m² beach_access Bãi cát trắng mịn riêng 800m child_friendly Tặng vé Water Park cho bé • Xe bus đón tiễn trung tâm Nha Trang 4.200.000đ 2.969.000đ /đêm Phòng Seaview Deluxe • Bữa sáng 5 sao chat Xem phòng & Đặt ngay'),
  ('hotels-3', 'Top Resort Gia Đình favorite photo_camera 55 hình ảnh star star star star star 5 Sao Siêu Sang Xuất Sắc 1.040 đánh giá 4.9 Alma Resort Cam Ranh location_on Nguyễn Tất Thành, Bãi Dài, Cam Ranh, Khánh Hòa pool 12 Hồ bơi tràn bờ view biển theaters Rạp chiếu phim Alma Cinema miễn phí museum Bảo tàng khoa học trẻ em check_circle Tặng voucher ăn uống 300.000đ khi đặt trước 7 ngày 4.500.000đ 3.309.500đ /đêm Căn hộ Suite 1PN • Bữa sáng quốc tế chat Xem phòng & Đặt ngay'),
  ('hotels-4', 'Bao Trọn Gói Liệu Trình Spa favorite photo_camera 40 hình ảnh star star star star star 5 Sao Luxury Xuất Sắc Tuyệt Đối 650 đánh giá 5.0 Fusion Resort Cam Ranh - All Spa Inclusive location_on Bãi Dài, Cam Hải Đông, Cam Ranh, Khánh Hòa spa Miễn phí Spa mỗi khách hằng ngày breakfast_dining Ăn sáng mọi lúc mọi nơi (Anywhere Anytime) deck Villa có hồ bơi riêng biệt lập check_circle Đổi ngày linh hoạt miễn phí trước 5 ngày 5.100.000đ 3.684.000đ /đêm Chic Suite Private Pool • Gồm Spa chat Xem phòng & Đặt ngay'),
  ('hotels-5', 'Trung Tâm Phố Biển favorite photo_camera 28 hình ảnh star star star star 4 Sao Cao Cấp Rất Tốt 740 đánh giá 4.7 Diamond Bay Hotel Nha Trang location_on 20 Trần Phú, P. Lộc Thọ, TP. Nha Trang (Đối diện Trung tâm Thương mại Nha Trang Center) beach_access View biển trực diện bãi tắm shopping_bag Gắn liền TTTM mua sắm ẩm thực restaurant Bao gồm Buffet sáng hàng ngày check_circle Vị trí thuận tiện đi bộ tắm biển và chợ đêm 1.500.000đ 1.148.000đ /đêm Phòng Deluxe City • Bữa sáng 2 người chat Xem phòng & Đặt ngay'),
  ('hotels-6', 'Ưu đãi Combo Gia Đình favorite photo_camera 36 hình ảnh star star star star star 5 Sao Resort Rất Tuyệt Vời 510 đánh giá 4.8 Duyên Hà Resort Cam Ranh location_on Lô D9B, Khu du lịch Bắc Bán Đảo Cam Ranh, Khánh Hòa restaurant_menu 6 Nhà hàng ẩm thực Á - Âu chuẩn vị pool Hồ bơi rộng 2.500m² giữa vườn nhiệt đới airport_shuttle Đưa đón sân bay theo lịch trình check_circle Miễn phí phụ thu cho 1 bé dưới 12 tuổi 3.600.000đ 2.499.000đ /đêm Phòng Deluxe Garden View • Buffet sáng chat Xem phòng & Đặt ngay'),
  ('tours-1', 'local_fire_department Bán chạy #1 • Tiết kiệm 15% favorite schedule 08:00 - 16:00 Hằng Ngày Cano Cao Tốc pin_drop Nha Trang • Vịnh San Hô star 4.9 (3.4k lượt đặt) Tour 3 Đảo Nha Trang VIP: Hòn Mun - Làng Chài - Tắm Bùn Khoáng Hòn Tằm bathtub Tắm bùn Hòn Tằm 5* scuba_diving San hô Hòn Mun restaurant Bữa trưa hải sản bè nổi airport_shuttle Đón trả tận nơi 760.000đ 650.000đ /khách -15% HÔM NAY menu_book Xem lịch trình bolt Đặt tour ngay'),
  ('home-4', 'Tiết kiệm 20% favorite star 4.8 Còn 2 phòng Khách sạn Empyrean Nha Trang location_on 02 Nguyễn Thị Minh Khai, Lộc Thọ, Nha Trang pool Hồ bơi vô cực view trọn vịnh Nha Trang explore Đối diện Quảng trường 2/4 trung tâm beach_access Sát biển Trần Phú & Chợ đêm Hạn ưu đãi: 23:59, 30/05/2026 1.650.000đ 1.091.000đ /đêm Đặt phòng'),
  ('home-5', 'Tiết kiệm 24% favorite star 4.9 Miễn phí hủy Khu nghỉ dưỡng Movenpick Cam Ranh location_on Bãi Dài, Cam Hải Đông, Cam Lâm, Khánh Hòa icecream Chocolate Hour Thụy Sĩ miễn phí mỗi ngày water_drop Công viên nước Water Park mạo hiểm cottage Làng Thụy Sĩ giải trí sầm uất (Swiss Village) Hạn ưu đãi: 23:59, 31/05/2026 3.950.000đ 2.969.000đ /đêm Đặt phòng'),
  ('home-6', 'Tiết kiệm 18% favorite star 4.9 Gần biển Bãi Dài Khu nghỉ dưỡng ALMA Cam Ranh location_on Bắc bán đảo Cam Ranh, Cam Lâm, Khánh Hòa surfing Splash Water Park rộng 6.000m² pool Hệ thống 12 hồ bơi vô cực tràn biển theaters Rạp chiếu phim Alma Cinema miễn phí Hạn ưu đãi: 23:59, 02/06/2026 4.600.000đ 3.309.500đ /đêm Đặt phòng'),
  ('home-7', 'Tiết kiệm 22% favorite star 4.9 Bao gồm Spa Khu nghỉ dưỡng Fusion Cam Ranh location_on Nguyễn Tất Thành, Bãi Dài, Cam Ranh spa Miễn phí liệu trình Spa trọn gói hàng ngày restaurant Bữa sáng mọi lúc mọi nơi độc quyền villa Villa hồ bơi riêng biệt lập hướng biển Hạn ưu đãi: 23:59, 05/06/2026 4.850.000đ 3.684.000đ /đêm Đặt phòng'),
  ('home-8', 'Tiết kiệm 20% favorite star 4.9 Còn 2 phòng Khu nghỉ dưỡng Duyên Hà Cam Ranh location_on Bãi Dài, Cam Hải Đông, Cam Lâm beach_access Bãi biển riêng cát trắng Bãi Dài pool Hồ bơi ngoài trời phong cách nhiệt đới dining 06 nhà hàng & quầy bar Á - Âu thượng hạng Hạn ưu đãi: 23:59, 30/05/2026 3.300.000đ 2.499.000đ /đêm Đặt phòng'),
  ('home-9', 'Tiết kiệm 24% favorite star 4.8 Miễn phí hủy Khu nghỉ dưỡng CostaBella Nha Trang location_on Phước Hạ, Phước Đồng, Nha Trang beach_access Bãi biển riêng tư tĩnh lặng qr_code_2 Công viên nước Aqua Park giải trí pool Hồ bơi ngoài trời view toàn cảnh núi Hạn ưu đãi: 23:59, 31/05/2026 2.450.000đ 1.810.000đ /đêm Đặt phòng'),
  ('home-10', 'Tiết kiệm 18% favorite star 4.9 Gần biển Bãi Dài Khu nghỉ dưỡng Swandor Cam Ranh location_on Nguyễn Tất Thành, Bãi Dài, Cam Lâm beach_access Sát biển Bãi Dài nguyên sơ tuyệt đẹp restaurant_menu Ultra All-Inclusive trọn gói 24h ẩm thực pool Hệ thống hồ bơi ngoài trời quy mô lớn Hạn ưu đãi: 23:59, 02/06/2026 4.200.000đ 2.916.000đ /đêm Đặt phòng'),
  ('home-11', 'Tiết kiệm 24% favorite star 4.9 Miễn phí hủy Khách sạn Diamond Bay Nha Trang location_on 20 Trần Phú, Lộc Thọ, Nha Trang visibility View biển Trần Phú trực diện ngoạn mục pool Hồ bơi vô cực ngoài trời tầng thượng free_breakfast Ăn sáng buffet phong phú Á - Âu Hạn ưu đãi: 23:59, 31/05/2026 1.650.000đ 1.148.000đ /đêm Đặt phòng')
) AS imported(id,description)
WHERE p.id=imported.id AND p.description=imported.description;
