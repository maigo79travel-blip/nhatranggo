INSERT INTO site_content (key, scope, kind, label, value)
SELECT pages.scope||'.'||field.name, pages.scope, 'text',
       field.label, to_jsonb(field.value)
FROM (VALUES
  ('evisa', 'E-Visa'),
  ('fast-track', 'Fast-track sân bay'),
  ('contact', 'Liên hệ & Hỗ trợ'),
  ('lookup', 'Tra cứu booking'),
  ('blog', 'Blog & Tin tức')
) AS pages(scope, title)
CROSS JOIN LATERAL (VALUES
  ('title', 'Tiêu đề trang', pages.title),
  ('intro', 'Giới thiệu dưới tiêu đề (tùy chọn)', '')
) AS field(name, label, value)
ON CONFLICT (key) DO NOTHING;
