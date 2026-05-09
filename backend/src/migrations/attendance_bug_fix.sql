 CREATE TABLE IF NOT EXISTS attendance_meetings (
   id          SERIAL PRIMARY KEY,
   group_id    INTEGER NOT NULL REFERENCES attendance_groups(id) ON DELETE CASCADE,
  date        DATE    NOT NULL,
  purpose     TEXT,
  activities  TEXT,
  created_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
   updated_at  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (group_id, date)
);
 CREATE INDEX IF NOT EXISTS idx_att_meetings_group ON attendance_meetings (group_id);
 CREATE INDEX IF NOT EXISTS idx_att_meetings_date  ON attendance_meetings (date);