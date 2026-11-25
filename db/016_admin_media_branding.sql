CREATE TABLE IF NOT EXISTS site_images (
  id text PRIMARY KEY CHECK (id ~ '^[a-f0-9]{64}$'),
  data bytea NOT NULL CHECK (octet_length(data) BETWEEN 1 AND 3145728),
  created_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO site_content(key,scope,kind,label,value)
VALUES
  ('site.logo','site','attributes','Logo đầu và chân trang','{"src":"/images/figma/logo-mark.png"}'),
  ('home.hero-image','home','attributes','Ảnh nền banner trang chủ','{"src":"/images/figma/hero-beach.png"}')
ON CONFLICT (key) DO NOTHING;

ALTER TABLE products ADD COLUMN IF NOT EXISTS featured boolean NOT NULL DEFAULT false;

ALTER TABLE public.site_images ENABLE ROW LEVEL SECURITY;
REVOKE ALL ON TABLE public.site_images FROM PUBLIC;

DO $$
DECLARE
  api_role text;
BEGIN
  FOREACH api_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname=api_role) THEN
      EXECUTE format('REVOKE ALL ON TABLE public.site_images FROM %I', api_role);
    END IF;
  END LOOP;
END $$;
