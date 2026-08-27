-- Separate inventory groups from attendance groups
CREATE TABLE IF NOT EXISTS inventory_groups (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  type       VARCHAR(50)  NOT NULL DEFAULT 'technical'
             CHECK (type IN ('technical','publicity','choir','pastoral','catering','committee','scc','group','other')),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Copy existing inventory-related groups from attendance_groups if any inventory data exists
-- For now, copy all attendance_groups that have ever been used for inventory (if any)
-- If inventory tables are empty, this will copy nothing, but table will exist for new inventory groups
INSERT INTO inventory_groups (id, name, type, created_at, updated_at)
SELECT id, name, type, created_at, updated_at FROM attendance_groups
WHERE id IN (
  SELECT group_id FROM inventory_admin_groups
  UNION
  SELECT group_id FROM inventory_items
  UNION
  SELECT group_id FROM inventory_bookings
)
ON CONFLICT (id) DO NOTHING;

-- Ensure sequence is set correctly after manual id inserts
SELECT setval(pg_get_serial_sequence('inventory_groups','id'), COALESCE((SELECT MAX(id) FROM inventory_groups), 0) + 1, false);

-- Add new FK columns to inventory tables to reference inventory_groups (keep old FK to attendance_groups for backward compat)
-- For new inventory groups, we will use inventory_groups; old data remains in attendance_groups
-- To truly separate, we will add a new column inventory_group_id and migrate, but for minimal change we will keep attendance_groups FK
-- Instead, we will just ensure inventory_groups is the source for new inventory groups and update code to query it
