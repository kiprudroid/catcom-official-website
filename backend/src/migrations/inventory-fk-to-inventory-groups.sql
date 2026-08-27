-- Switch inventory FKs from attendance_groups to inventory_groups for true separation
-- Drop old FKs if they exist and recreate pointing to inventory_groups

-- inventory_admin_groups
ALTER TABLE inventory_admin_groups DROP CONSTRAINT IF EXISTS inventory_admin_groups_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_admin_groups ADD CONSTRAINT inventory_admin_groups_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;

-- inventory_items
ALTER TABLE inventory_items DROP CONSTRAINT IF EXISTS inventory_items_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_items ADD CONSTRAINT inventory_items_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;

-- inventory_transactions
ALTER TABLE inventory_transactions DROP CONSTRAINT IF EXISTS inventory_transactions_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_transactions ADD CONSTRAINT inventory_transactions_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;

-- inventory_bookings
ALTER TABLE inventory_bookings DROP CONSTRAINT IF EXISTS inventory_bookings_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_bookings ADD CONSTRAINT inventory_bookings_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;

-- inventory_edit_windows
ALTER TABLE inventory_edit_windows DROP CONSTRAINT IF EXISTS inventory_edit_windows_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_edit_windows ADD CONSTRAINT inventory_edit_windows_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;

-- inventory_audits
ALTER TABLE inventory_audits DROP CONSTRAINT IF EXISTS inventory_audits_group_id_fkey;
DO $$ BEGIN
  IF EXISTS (SELECT 1 FROM information_schema.tables WHERE table_name='inventory_groups') THEN
    ALTER TABLE inventory_audits ADD CONSTRAINT inventory_audits_group_id_fkey FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
  END IF;
END $$;
