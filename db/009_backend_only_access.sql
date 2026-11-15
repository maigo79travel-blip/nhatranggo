-- This app uses server-side PostgreSQL connections; Supabase Data API roles
-- must not read application data or admin credentials directly.
DO $$
DECLARE
  table_name text;
  api_role text;
BEGIN
  FOREACH table_name IN ARRAY ARRAY[
    'admin_sessions','admin_users','article_categories','articles',
    'booking_history','bookings','contacts','customers','departures',
    'destinations','favorites','information_pages','partners','products',
    'request_limits','rooms','schema_migrations','service_requests',
    'site_content','subscribers','transfer_fares','transfer_routes','translations'
  ] LOOP
    IF to_regclass(format('public.%I',table_name)) IS NOT NULL THEN
      EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY',table_name);
      EXECUTE format('REVOKE ALL ON TABLE public.%I FROM PUBLIC',table_name);
      FOREACH api_role IN ARRAY ARRAY['anon','authenticated'] LOOP
        IF EXISTS(SELECT 1 FROM pg_roles WHERE rolname=api_role) THEN
          EXECUTE format('REVOKE ALL ON TABLE public.%I FROM %I',table_name,api_role);
        END IF;
      END LOOP;
    END IF;
  END LOOP;
END $$;
