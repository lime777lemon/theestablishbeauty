-- Security: SECURITY DEFINER の rls_auto_enable を PostgREST (anon) から呼べないようにする。
-- シグネチャが複数ある場合はすべてに対して REVOKE する。

DO $$
DECLARE
  r RECORD;
BEGIN
  FOR r IN
    SELECT format('%I.%I(%s)',
      n.nspname,
      p.proname,
      pg_catalog.pg_get_function_identity_arguments(p.oid)
    ) AS fn
    FROM pg_catalog.pg_proc p
    JOIN pg_catalog.pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public'
      AND p.proname = 'rls_auto_enable'
  LOOP
    EXECUTE format(
      'REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated',
      r.fn
    );
  END LOOP;
END $$;
