CREATE TABLE IF NOT EXISTS group_admin_logins (
  id SERIAL PRIMARY KEY,
  group_admin_id INTEGER NOT NULL REFERENCES attendance_admins(id) ON DELETE CASCADE,
  logged_in_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_group_admin_logins_admin_id ON group_admin_logins(group_admin_id);