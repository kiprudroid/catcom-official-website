-- Grant on all existing sequences
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO jkuatca1_admin;

-- Grant on all existing tables
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO jkuatca1_admin;

-- Future tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO jkuatca1_admin;

-- Future sequences
ALTER DEFAULT PRIVILEGES IN SCHEMA public
  GRANT USAGE, SELECT ON SEQUENCES TO jkuatca1_admin;