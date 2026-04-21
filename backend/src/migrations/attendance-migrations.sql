-- ─────────────────────────────────────────────────────────────────
-- DYNAMIC ATTENDANCE SYSTEM — full schema
-- Run once. Safe to re-run (IF NOT EXISTS everywhere).
-- ─────────────────────────────────────────────────────────────────

-- 1. Groups (committees, SCCs, pastoral team, etc.)
CREATE TABLE IF NOT EXISTS attendance_groups (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  type       VARCHAR(50)  NOT NULL DEFAULT 'committee'
             CHECK (type IN ('committee', 'scc', 'pastoral', 'other')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 2. Group admins — each group has its own login account
CREATE TABLE IF NOT EXISTS attendance_admins (
  id         SERIAL PRIMARY KEY,
  group_id   INTEGER NOT NULL REFERENCES attendance_groups(id) ON DELETE CASCADE,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL, -- bcrypt hashed
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 3. Members — now scoped to a group
CREATE TABLE IF NOT EXISTS attendance_members (
  id         SERIAL PRIMARY KEY,
  group_id   INTEGER NOT NULL REFERENCES attendance_groups(id) ON DELETE CASCADE,
  name       VARCHAR(255) NOT NULL,
  role       VARCHAR(255) NOT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'active'
             CHECK (status IN ('active', 'removed')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- 4. Attendance records — scoped to member (which is scoped to group)
CREATE TABLE IF NOT EXISTS attendance_records (
  id         SERIAL PRIMARY KEY,
  member_id  INTEGER NOT NULL REFERENCES attendance_members(id) ON DELETE CASCADE,
  date       DATE NOT NULL,
  status     VARCHAR(20) NOT NULL DEFAULT 'present'
             CHECK (status IN ('present', 'absent', 'apology')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (member_id, date)
);

-- 5. Indexes
CREATE INDEX IF NOT EXISTS idx_att_members_group   ON attendance_members (group_id);
CREATE INDEX IF NOT EXISTS idx_att_members_status  ON attendance_members (status);
CREATE INDEX IF NOT EXISTS idx_att_records_date    ON attendance_records (date);
CREATE INDEX IF NOT EXISTS idx_att_records_member  ON attendance_records (member_id);
CREATE INDEX IF NOT EXISTS idx_att_admins_group    ON attendance_admins (group_id);
CREATE INDEX IF NOT EXISTS idx_att_admins_email    ON attendance_admins (email);

-- ─────────────────────────────────────────────────────────────────
-- NOTE: The old pastoral_members + attendance tables can be kept or
-- dropped once you've migrated existing data to the new schema.
-- To migrate existing pastoral data, run:
--
-- INSERT INTO attendance_groups (name, type) VALUES ('Pastoral Team', 'pastoral');
-- INSERT INTO attendance_members (group_id, name, role, status, created_at)
--   SELECT 1, name, role, status, created_at FROM pastoral_members;
-- INSERT INTO attendance_records (member_id, date, status, created_at)
--   SELECT am.id, ar.date, ar.status, ar.created_at
--   FROM attendance a
--   JOIN attendance_members am ON am.name = (SELECT name FROM pastoral_members WHERE id = a.member_id)
--   WHERE am.group_id = 1;
-- ─────────────────────────────────────────────────────────────────


-- Migration: change default attendance status from 'present' to 'absent'
ALTER TABLE attendance_records
  ALTER COLUMN status SET DEFAULT 'absent';

-- Verify
-- SELECT column_name, column_default
-- FROM information_schema.columns
-- WHERE table_name = 'attendance_records' AND column_name = 'status';