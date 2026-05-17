-- -- Fix all sequences including the new ones
-- GRANT USAGE, SELECT, UPDATE ON ALL SEQUENCES IN SCHEMA public TO jkuatca1;

-- -- Fix all tables including the new ones
-- GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO jkuatca1_admin;


-- GRANT USAGE, SELECT, UPDATE ON SEQUENCE attendance_meetings_id_seq TO jkuatca1_admin;
-- GRANT USAGE, SELECT, UPDATE ON SEQUENCE attendance_visitors_id_seq TO jkuatca1_admin;


ALTER TABLE attendance_members
  ADD COLUMN IF NOT EXISTS in_session BOOLEAN NOT NULL DEFAULT TRUE;