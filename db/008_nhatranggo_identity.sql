UPDATE site_content SET value=regexp_replace(
  regexp_replace(value::text, 'CÔNG TY TNHH BOOKING[[:space:]]*TRAVEL', '{{brand.name}}', 'gi'),
  'Booking[[:space:]]*Travel', '{{brand.name}}', 'gi')::jsonb
WHERE key <> 'site.contact' AND value::text ~* 'Booking[[:space:]]*Travel' AND value::text !~* 'bookingtravel\.vn';

UPDATE site_content SET value=to_jsonb(replacement.value)
FROM (VALUES
 ('header.text-021','{{brand.wordmarkPrimary}}'),
 ('header.text-022','{{brand.wordmarkSecondary}}'),
 ('header.text-023','{{brand.tagline}}'),
 ('footer.text-023','{{brand.name}}'),
 ('footer.text-025','{{brand.name}}'),
 ('footer.text-030','{{brand.name}}'),
 ('footer.text-052','© {{brand.name}}. Bảo lưu mọi quyền.')
) AS replacement(key,value) WHERE site_content.key=replacement.key;

UPDATE site_content SET value='{"href":"{{contact.website}}"}'::jsonb WHERE key='footer.attributes-003';
UPDATE site_content SET value=jsonb_set(value,'{title}','"{{brand.name}} | Khách sạn, Tour & Xe đưa đón"') WHERE key='site.metadata';
UPDATE site_content SET value=(value-'email') || '{"telephone":"0878458885","phone":"0878.458.885","zalo":"https://zalo.me/0878458885","telegram":"https://t.me/Nyachang_taksi_tury","whatsapp":"https://wa.me/84878458885","kakao":"0878458885","international":"+84 878 458 885","facebook":"https://www.facebook.com/share/1BhL4Qut3u/?mibextid=wwXIfr","website":"/"}'::jsonb
  || jsonb_build_object('email',CASE WHEN value->>'email'='info@bookingtravel.vn' THEN '' ELSE COALESCE(value->>'email','') END)
WHERE key='site.contact';

UPDATE translations SET value=regexp_replace(value::text,'Booking[[:space:]]*Travel','{{brand.name}}','gi')::jsonb
WHERE value::text ~* 'Booking[[:space:]]*Travel' AND value::text !~* 'bookingtravel\.vn';

DELETE FROM site_content WHERE key IN ('footer.attributes-020','footer.attributes-021','footer.attributes-022');
