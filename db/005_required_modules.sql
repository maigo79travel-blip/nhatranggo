ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS role text NOT NULL DEFAULT 'super_admin' CHECK(role IN ('super_admin','booking','editor'));
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS active boolean NOT NULL DEFAULT true;
CREATE TABLE IF NOT EXISTS destinations (
 id uuid PRIMARY KEY, name text NOT NULL, code text NOT NULL UNIQUE, active boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS partners (
 id uuid PRIMARY KEY, name text NOT NULL, kind text NOT NULL CHECK(kind IN ('driver','hotel','tour')),
 phone text NOT NULL, email text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true
);
ALTER TABLE products ADD COLUMN IF NOT EXISTS destination_id uuid REFERENCES destinations(id);
ALTER TABLE products ADD COLUMN IF NOT EXISTS partner_id uuid REFERENCES partners(id);
CREATE TABLE IF NOT EXISTS rooms (
 id uuid PRIMARY KEY, product_id text NOT NULL REFERENCES products(id), title text NOT NULL,
 price integer NOT NULL CHECK(price>=0), capacity integer NOT NULL CHECK(capacity BETWEEN 1 AND 100),
 image text NOT NULL DEFAULT '', description text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS departures (
 id uuid PRIMARY KEY, product_id text NOT NULL REFERENCES products(id), date date NOT NULL,
 notes text NOT NULL DEFAULT '', active boolean NOT NULL DEFAULT true, UNIQUE(product_id,date)
);
CREATE TABLE IF NOT EXISTS transfer_routes (
 id uuid PRIMARY KEY, code text NOT NULL UNIQUE, pickup_id uuid NOT NULL REFERENCES destinations(id),
 dropoff_id uuid NOT NULL REFERENCES destinations(id), title text NOT NULL, active boolean NOT NULL DEFAULT true,
 CHECK(pickup_id<>dropoff_id)
);
CREATE TABLE IF NOT EXISTS customers (
 id uuid PRIMARY KEY, name text NOT NULL, phone text NOT NULL UNIQUE, email text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT ''
);
ALTER TABLE bookings DROP CONSTRAINT IF EXISTS bookings_status_check;
ALTER TABLE bookings ADD CONSTRAINT bookings_status_check CHECK(status IN ('pending','confirmed','completed','cancelled'));
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS return_date date;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS departure_time time;
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS room_id uuid REFERENCES rooms(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS partner_id uuid REFERENCES partners(id);
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS internal_notes text NOT NULL DEFAULT '';
ALTER TABLE bookings ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();
CREATE TABLE IF NOT EXISTS booking_history (
 id uuid PRIMARY KEY, booking_id uuid NOT NULL REFERENCES bookings(id), actor_id uuid REFERENCES admin_users(id),
 status text NOT NULL, notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS article_categories (
 id uuid PRIMARY KEY, title text NOT NULL, slug text NOT NULL UNIQUE, active boolean NOT NULL DEFAULT true
);
CREATE TABLE IF NOT EXISTS articles (
 id uuid PRIMARY KEY, title text NOT NULL, slug text NOT NULL, locale text NOT NULL DEFAULT 'vi' CHECK(locale IN ('vi','en','ru','ko','zh')),
 category_id uuid REFERENCES article_categories(id), excerpt text NOT NULL DEFAULT '', body text NOT NULL DEFAULT '',
 image text NOT NULL DEFAULT '', seo_title text NOT NULL DEFAULT '', seo_description text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','hidden')),
 created_at timestamptz NOT NULL DEFAULT now(), updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(slug,locale)
);
CREATE TABLE IF NOT EXISTS service_requests (
 id uuid PRIMARY KEY, kind text NOT NULL CHECK(kind IN ('evisa','fast-track')), name text NOT NULL,
 phone text NOT NULL, email text NOT NULL, arrival_at timestamptz NOT NULL, airport text NOT NULL,
 nationality text NOT NULL DEFAULT '', notes text NOT NULL DEFAULT '',
 status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','confirmed','completed','cancelled')),
 created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS contacts (
 id uuid PRIMARY KEY, name text NOT NULL, phone text NOT NULL DEFAULT '', email text NOT NULL, subject text NOT NULL,
 message text NOT NULL, status text NOT NULL DEFAULT 'pending' CHECK(status IN ('pending','replied','closed')),
 admin_notes text NOT NULL DEFAULT '', created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE IF NOT EXISTS information_pages (
 id uuid PRIMARY KEY, title text NOT NULL, slug text NOT NULL, locale text NOT NULL DEFAULT 'vi' CHECK(locale IN ('vi','en','ru','ko','zh')),
 body text NOT NULL DEFAULT '', status text NOT NULL DEFAULT 'draft' CHECK(status IN ('draft','published','hidden')),
 updated_at timestamptz NOT NULL DEFAULT now(), UNIQUE(slug,locale)
);
CREATE TABLE IF NOT EXISTS translations (
 id uuid PRIMARY KEY, entity text NOT NULL CHECK(entity IN ('content','product')), entity_key text NOT NULL,
 locale text NOT NULL CHECK(locale IN ('en','ru','ko','zh')), value jsonb NOT NULL,
 UNIQUE(entity,entity_key,locale)
);
CREATE INDEX IF NOT EXISTS bookings_status_created_idx ON bookings(status,created_at DESC);
CREATE INDEX IF NOT EXISTS bookings_phone_idx ON bookings(phone);
CREATE INDEX IF NOT EXISTS articles_public_idx ON articles(locale,status,category_id);
CREATE INDEX IF NOT EXISTS requests_status_idx ON service_requests(status,created_at DESC);
INSERT INTO destinations(id,name,code) VALUES
(gen_random_uuid(),'Sân bay Cam Ranh','CXR'),(gen_random_uuid(),'Trung tâm Nha Trang','NT_CENTER'),
(gen_random_uuid(),'Bãi Dài / Cam Ranh','BAI_DAI'),(gen_random_uuid(),'Đà Lạt','DALAT'),
(gen_random_uuid(),'Dốc Lết','DOC_LET'),(gen_random_uuid(),'Tuy Hòa','TUY_HOA') ON CONFLICT(code) DO NOTHING;
INSERT INTO transfer_routes(id,code,pickup_id,dropoff_id,title)
SELECT gen_random_uuid(),a.code||'_'||b.code,a.id,b.id,a.name||' → '||b.name
FROM destinations a CROSS JOIN destinations b
WHERE a.id<>b.id AND a.code IN ('CXR','NT_CENTER','BAI_DAI','DALAT','DOC_LET','TUY_HOA') AND b.code IN ('CXR','NT_CENTER','BAI_DAI','DALAT','DOC_LET','TUY_HOA') AND EXISTS(SELECT 1 FROM transfer_fares f WHERE f.route=a.code||'_'||b.code)
ON CONFLICT(code) DO NOTHING;
INSERT INTO site_content(key,scope,label,kind,value) VALUES
('site.navigation','site','Menu website','settings','[{"href":"/","label":"Trang chủ"},{"href":"/xe-dua-don","label":"Đặt xe"},{"href":"/khach-san","label":"Khách sạn"},{"href":"/tour-hang-ngay","label":"Tour"},{"href":"/e-visa","label":"E-Visa"},{"href":"/fast-track","label":"Fast-track"},{"href":"/blog","label":"Blog"},{"href":"/dich-vu","label":"Dịch vụ"},{"href":"/lien-he","label":"Liên hệ"}]'),
('site.mobile-navigation','site','Menu điện thoại','settings','[{"href":"/","label":"Trang chủ"},{"href":"/dich-vu","label":"Xe / Phòng / Tour"},{"href":"/e-visa","label":"E-Visa"},{"href":"/fast-track","label":"Fast-track"},{"href":"/blog","label":"Blog"},{"href":"/tra-cuu","label":"Tra cứu booking"},{"href":"/lien-he","label":"Liên hệ"}]')
ON CONFLICT(key) DO NOTHING;
UPDATE site_content c SET value=c.value||COALESCE((SELECT jsonb_agg(entry) FROM jsonb_array_elements('[{"href":"/dich-vu","label":"Tất cả dịch vụ"},{"href":"/e-visa","label":"E-Visa"},{"href":"/fast-track","label":"Fast-track"},{"href":"/blog","label":"Blog"},{"href":"/tra-cuu","label":"Tra cứu booking"},{"href":"/lien-he","label":"Liên hệ"}]'::jsonb) entry WHERE NOT EXISTS(SELECT 1 FROM jsonb_array_elements(c.value) i WHERE i->>'href'=entry->>'href')),'[]'::jsonb) WHERE key='site.mobile-navigation';
