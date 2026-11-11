UPDATE site_content SET value=replace(replace(replace(replace(value::text,
 'https://zalo.me/0846477222','{{contact.zalo}}'),
 '084.64.77.222','{{contact.phone}}'),
 '0846477222','{{contact.telephone}}'),
 'info@bookingtravel.vn','{{contact.email}}')::jsonb
WHERE key <> 'site.contact' AND (value::text LIKE '%0846477222%' OR value::text LIKE '%084.64.77.222%' OR value::text LIKE '%info@bookingtravel.vn%');
UPDATE products SET content=replace(replace(replace(replace(content::text,
 'https://zalo.me/0846477222','{{contact.zalo}}'),
 '084.64.77.222','{{contact.phone}}'),
 '0846477222','{{contact.telephone}}'),
 'info@bookingtravel.vn','{{contact.email}}')::jsonb
WHERE content::text LIKE '%0846477222%' OR content::text LIKE '%084.64.77.222%' OR content::text LIKE '%info@bookingtravel.vn%';
