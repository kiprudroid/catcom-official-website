
CREATE TABLE IF NOT EXISTS inventory_groups (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  type       VARCHAR(50)  NOT NULL DEFAULT 'group',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Enforce correct type constraint (idempotent)
DO $$ BEGIN
  ALTER TABLE inventory_groups DROP CONSTRAINT IF EXISTS inventory_groups_type_check;
  ALTER TABLE inventory_groups ADD CONSTRAINT inventory_groups_type_check
    CHECK (type IN ('group','scc','other'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Migrate any existing inventory-related groups that were still in attendance_groups
-- (only needed once, when switching from shared table)
INSERT INTO inventory_groups (id, name, type, created_at, updated_at)
SELECT id, name,
       CASE WHEN type IN ('group','scc','other') THEN type ELSE 'group' END,
       created_at, updated_at
FROM attendance_groups
WHERE id IN (
  SELECT group_id FROM inventory_admin_groups
  UNION SELECT group_id FROM inventory_items
  UNION SELECT group_id FROM inventory_bookings
)
ON CONFLICT (id) DO NOTHING;

-- Fix any legacy technical/publicity/... types that slipped in
UPDATE inventory_groups SET type = 'group' WHERE type NOT IN ('group','scc','other');

SELECT setval(pg_get_serial_sequence('inventory_groups','id'),
              COALESCE((SELECT MAX(id) FROM inventory_groups), 0) + 1, false);

-- -------------------------------------------------------------------------
-- 2. Inventory admins — one login per leader, M:N to groups
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_admins (
  id         SERIAL PRIMARY KEY,
  email      VARCHAR(150) NOT NULL UNIQUE,
  password   VARCHAR(255) NOT NULL,
  full_name  VARCHAR(150),
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- -------------------------------------------------------------------------
-- 3. Junction: which inventory groups an admin can manage
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_admin_groups (
  id         SERIAL PRIMARY KEY,
  admin_id   INTEGER NOT NULL REFERENCES inventory_admins(id) ON DELETE CASCADE,
  group_id   INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  granted_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  granted_by INTEGER REFERENCES users(id) ON DELETE SET NULL,
  UNIQUE (admin_id, group_id)
);
CREATE INDEX IF NOT EXISTS idx_inv_admin_groups_admin ON inventory_admin_groups(admin_id);
CREATE INDEX IF NOT EXISTS idx_inv_admin_groups_group ON inventory_admin_groups(group_id);

-- Ensure FK points to inventory_groups (migrate from attendance_groups if needed)
DO $$ BEGIN
  ALTER TABLE inventory_admin_groups DROP CONSTRAINT IF EXISTS inventory_admin_groups_group_id_fkey;
  ALTER TABLE inventory_admin_groups ADD CONSTRAINT inventory_admin_groups_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- -------------------------------------------------------------------------
-- 4. Inventory items — ledger (records)
--    Categories now mirror group types: group / scc / other (plus legacy technical etc for backward compat)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_items (
  id                 SERIAL PRIMARY KEY,
  group_id           INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  category           VARCHAR(50)  NOT NULL,
  name               VARCHAR(255) NOT NULL,
  description        TEXT,
  quantity_total     INTEGER      NOT NULL DEFAULT 1 CHECK (quantity_total >= 0),
  quantity_available INTEGER      NOT NULL DEFAULT 1 CHECK (quantity_available >= 0 AND quantity_available <= quantity_total),
  unit               VARCHAR(50)  NOT NULL DEFAULT 'pieces' CHECK (unit IN ('pieces','sets','pairs','litres','kg','metres','boxes','other')),
  condition          VARCHAR(20)  NOT NULL DEFAULT 'good' CHECK (condition IN ('new','good','fair','damaged','lost','disposed')),
  is_bookable        BOOLEAN      NOT NULL DEFAULT FALSE,
  unit_cost          NUMERIC(12,2) DEFAULT 0.00,
  acquisition_cost   NUMERIC(12,2) DEFAULT 0.00,
  acquisition_type   VARCHAR(20)  DEFAULT 'purchased' CHECK (acquisition_type IN ('purchased','donated','transfer')),
  acquisition_date   DATE,
  image_url          VARCHAR(255),
  archived           BOOLEAN      NOT NULL DEFAULT FALSE,
  created_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at         TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_inv_items_group    ON inventory_items(group_id);
CREATE INDEX IF NOT EXISTS idx_inv_items_category ON inventory_items(category);
CREATE INDEX IF NOT EXISTS idx_inv_items_bookable ON inventory_items(is_bookable);
CREATE INDEX IF NOT EXISTS idx_inv_items_archived ON inventory_items(archived);

-- Migrate category constraint to allow group/scc/other (keep legacy for existing rows)
DO $$ BEGIN
  ALTER TABLE inventory_items DROP CONSTRAINT IF EXISTS inventory_items_category_check;
  ALTER TABLE inventory_items ADD CONSTRAINT inventory_items_category_check
    CHECK (category IN ('group','scc','other','technical','publicity','choir','pastoral','catering','committee'));
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Ensure FK points to inventory_groups
DO $$ BEGIN
  ALTER TABLE inventory_items DROP CONSTRAINT IF EXISTS inventory_items_group_id_fkey;
  ALTER TABLE inventory_items ADD CONSTRAINT inventory_items_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- -------------------------------------------------------------------------
-- 5. Transactions / audit log
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_transactions (
  id           SERIAL PRIMARY KEY,
  item_id      INTEGER NOT NULL REFERENCES inventory_items(id) ON DELETE CASCADE,
  group_id     INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  type         VARCHAR(20) NOT NULL CHECK (type IN ('add','remove','adjust','dispose','transfer_in','transfer_out')),
  quantity     INTEGER NOT NULL CHECK (quantity != 0),
  reason       TEXT,
  performed_by INTEGER REFERENCES inventory_admins(id) ON DELETE SET NULL,
  created_at   TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_inv_tx_item  ON inventory_transactions(item_id);
CREATE INDEX IF NOT EXISTS idx_inv_tx_group ON inventory_transactions(group_id);
CREATE INDEX IF NOT EXISTS idx_inv_tx_date  ON inventory_transactions(created_at);

DO $$ BEGIN
  ALTER TABLE inventory_transactions DROP CONSTRAINT IF EXISTS inventory_transactions_group_id_fkey;
  ALTER TABLE inventory_transactions ADD CONSTRAINT inventory_transactions_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- -------------------------------------------------------------------------
-- 6. Bookings (hire at cost)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_bookings (
  id              SERIAL PRIMARY KEY,
  item_id         INTEGER NOT NULL REFERENCES inventory_items(id) ON DELETE RESTRICT,
  group_id        INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  booked_by_name  VARCHAR(255) NOT NULL,
  booked_by_phone VARCHAR(15),
  booked_by_email VARCHAR(150),
  borrower_type   VARCHAR(20)  NOT NULL DEFAULT 'internal' CHECK (borrower_type IN ('internal','external','group')),
  quantity        INTEGER NOT NULL CHECK (quantity > 0),
  status          VARCHAR(20) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','approved','issued','returned','overdue','cancelled')),
  booking_date    DATE NOT NULL,
  return_due_date DATE NOT NULL,
  return_date     DATE,
  unit_cost       NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  total_cost      NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  amount_paid     NUMERIC(12,2) NOT NULL DEFAULT 0.00,
  payment_status  VARCHAR(20) NOT NULL DEFAULT 'unpaid' CHECK (payment_status IN ('unpaid','partial','paid','waived')),
  purpose         TEXT,
  notes           TEXT,
  created_by      INTEGER REFERENCES inventory_admins(id) ON DELETE SET NULL,
  created_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (return_due_date >= booking_date),
  CHECK (return_date IS NULL OR return_date >= booking_date)
);
CREATE INDEX IF NOT EXISTS idx_inv_bookings_group  ON inventory_bookings(group_id);
CREATE INDEX IF NOT EXISTS idx_inv_bookings_item   ON inventory_bookings(item_id);
CREATE INDEX IF NOT EXISTS idx_inv_bookings_status ON inventory_bookings(status);
CREATE INDEX IF NOT EXISTS idx_inv_bookings_dates  ON inventory_bookings(booking_date, return_due_date);

DO $$ BEGIN
  ALTER TABLE inventory_bookings DROP CONSTRAINT IF EXISTS inventory_bookings_group_id_fkey;
  ALTER TABLE inventory_bookings ADD CONSTRAINT inventory_bookings_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- -------------------------------------------------------------------------
-- 7. SCC regimes — only one active at a time
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS scc_regimes (
  id         SERIAL PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  start_date DATE NOT NULL,
  end_date   DATE NOT NULL,
  is_active  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (end_date > start_date)
);
CREATE UNIQUE INDEX IF NOT EXISTS idx_scc_regimes_one_active
  ON scc_regimes((is_active = true)) WHERE is_active = true;

-- -------------------------------------------------------------------------
-- 8. Edit windows per inventory group — gates SCC edits
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_edit_windows (
  id           SERIAL PRIMARY KEY,
  group_id     INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  regime_id    INTEGER REFERENCES scc_regimes(id) ON DELETE SET NULL,
  window_start DATE NOT NULL,
  window_end   DATE NOT NULL,
  is_open      BOOLEAN NOT NULL DEFAULT FALSE,
  CHECK (window_end >= window_start),
  UNIQUE (group_id, regime_id)
);
CREATE INDEX IF NOT EXISTS idx_inv_windows_group ON inventory_edit_windows(group_id);
CREATE INDEX IF NOT EXISTS idx_inv_windows_regime ON inventory_edit_windows(regime_id);

DO $$ BEGIN
  ALTER TABLE inventory_edit_windows DROP CONSTRAINT IF EXISTS inventory_edit_windows_group_id_fkey;
  ALTER TABLE inventory_edit_windows ADD CONSTRAINT inventory_edit_windows_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- -------------------------------------------------------------------------
-- 9. Audits (optional)
-- -------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS inventory_audits (
  id         SERIAL PRIMARY KEY,
  group_id   INTEGER NOT NULL REFERENCES inventory_groups(id) ON DELETE CASCADE,
  date       DATE    NOT NULL,
  purpose    TEXT,
  findings   TEXT,
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  UNIQUE (group_id, date)
);
CREATE INDEX IF NOT EXISTS idx_inv_audits_group ON inventory_audits(group_id);

DO $$ BEGIN
  ALTER TABLE inventory_audits DROP CONSTRAINT IF EXISTS inventory_audits_group_id_fkey;
  ALTER TABLE inventory_audits ADD CONSTRAINT inventory_audits_group_id_fkey
    FOREIGN KEY (group_id) REFERENCES inventory_groups(id) ON DELETE CASCADE;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;
