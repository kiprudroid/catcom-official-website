CREATE TABLE IF NOT EXISTS attendance_visitors (
  id         SERIAL PRIMARY KEY,
  group_id   INTEGER NOT NULL REFERENCES attendance_groups(id) ON DELETE CASCADE,
  date       DATE    NOT NULL,
  name       VARCHAR(255) NOT NULL,
  phone      VARCHAR(10),
  type       VARCHAR(20) NOT NULL DEFAULT 'visitor'
             CHECK (type IN ('visitor', 'alumni')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_att_visitors_group ON attendance_visitors (group_id);
CREATE INDEX IF NOT EXISTS idx_att_visitors_date  ON attendance_visitors (date);