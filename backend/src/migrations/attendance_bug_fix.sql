
-- ALTER TABLE attendance_members
--   ADD COLUMN IF NOT EXISTS phone VARCHAR(10);

-- ALTER TABLE attendance_members
--   ADD COLUMN IF NOT EXISTS last_follow_up TIMESTAMP;

-- --  index for performance on absence queries
-- CREATE INDEX IF NOT EXISTS idx_attendance_records_member_date
--   ON attendance_records (member_id, date DESC);


ALTER TABLE attendance_members
  ADD COLUMN IF NOT EXISTS family_name VARCHAR(150);