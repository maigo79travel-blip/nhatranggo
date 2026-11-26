const homeFields: Record<string, string> = {
  "home.hero-image": "Ảnh nền banner chính",
  "home.text-043": "Dòng giới thiệu trên banner",
  "home.text-044": "Tiêu đề banner (phần đầu)",
  "home.text-045": "Tiêu đề banner (phần sau)",
  "home.text-047": "Tên tab đặt phòng",
  "home.text-048": "Tên tab tìm tour",
  "home.text-049": "Tên tab tìm combo",
  "home.text-051": "Nhãn ô điểm đến",
  "home.attributes-002": "Gợi ý trong ô điểm đến",
  "home.text-058": "Nút tìm kiếm",
  "home.text-059": "Tiêu đề gợi ý tìm kiếm",
  "home.text-080": "Tiêu đề khu vực ưu đãi combo",
  "home.text-095": "Tiêu đề khu vực khách sạn",
  "home.text-101": "Nhãn xem tất cả khách sạn",
  "home.attributes-007": "Liên kết xem tất cả khách sạn",
  "home.text-103": "Tiêu đề khu vực tour",
  "home.text-104": "Nhãn xem tất cả tour",
  "home.attributes-008": "Liên kết xem tất cả tour",
  "home.text-106": "Tiêu đề khu vực điểm đến",
  "home.text-107": "Nhãn xem tất cả điểm đến",
  "home.attributes-009": "Liên kết xem tất cả điểm đến",
  "home.text-137": "Tiêu đề khu vực cẩm nang",
  "home.text-138": "Nhãn xem tất cả bài viết",
  "home.attributes-028": "Liên kết xem tất cả bài viết",
  "home.text-166": "Tiêu đề banner ưu đãi cuối trang",
  "home.text-167": "Mô tả banner ưu đãi cuối trang",
};

const contentKey = (kind: string, index: number) =>
  `home.${kind}-${String(index).padStart(3, "0")}`;

for (let index = 0; index < 4; index++) {
  homeFields[contentKey("text", 60 + index)] =
    `Tên gợi ý tìm kiếm ${index + 1}`;
  homeFields[contentKey("attributes", 3 + index)] =
    `Liên kết gợi ý tìm kiếm ${index + 1}`;
  homeFields[contentKey("text", 64 + 2 * index)] =
    `Tiêu đề lợi ích ${index + 1}`;
  homeFields[contentKey("text", 65 + 2 * index)] = `Mô tả lợi ích ${index + 1}`;
}

for (let index = 0; index < 5; index++) {
  homeFields[contentKey("text", 96 + index)] =
    `Tên bộ lọc khách sạn ${index + 1}`;
  homeFields[contentKey("text", 109 + 3 * index)] = `Tên điểm đến ${index + 1}`;
  homeFields[contentKey("text", 110 + 3 * index)] =
    `Mô tả điểm đến ${index + 1}`;
  homeFields[contentKey("attributes", 10 + 2 * index)] =
    `Liên kết điểm đến ${index + 1}`;
  homeFields[contentKey("attributes", 11 + 2 * index)] =
    `Ảnh điểm đến ${index + 1}`;
}

export const homeContentFields = homeFields;
