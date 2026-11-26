-- Remove 9-seat limousine (limo9) transfer vehicle from active catalog and fares.
DELETE FROM transfer_fares WHERE vehicle = 'limo9';

UPDATE products
SET active = false
WHERE id LIKE 'transfer-%-limo9';

DELETE FROM products p
WHERE p.id LIKE 'transfer-%-limo9'
  AND NOT EXISTS (SELECT 1 FROM bookings b WHERE b.product_id = p.id);

UPDATE site_content
SET
  value = to_jsonb(
    E'\n            Xe đời mới 4 - 7 - 16 - 29 - 45 chỗ. Đón trả tận nơi tại Nha Trang, Bãi Dài, Đà Lạt, Phú Yên. Tài xế chuẩn phong cách dịch vụ, đúng giờ, chủ động kiểm tra giờ hạ cánh miễn phí.\n          '::text
  ),
  label = 'Xe đời mới 4 - 7 - 16 - 29 - 45 chỗ. Đón trả tận nơi tại Nha Trang, Bãi Dài, Đà Lạt, Phú Yên. Tài xế chuẩn phong cách dịch '
WHERE key = 'transfers.text-030';

DELETE FROM site_content
WHERE key IN (
  'transfers.attributes-019',
  'transfers.attributes-020',
  'transfers.text-059',
  'transfers.text-082',
  'transfers.text-083',
  'transfers.text-126',
  'transfers.text-127',
  'transfers.text-128',
  'transfers.text-129',
  'transfers.text-130',
  'transfers.text-131',
  'transfers.text-132',
  'transfers.text-133',
  'transfers.text-134',
  'transfers.text-135'
);
