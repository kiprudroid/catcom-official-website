import pool from "../config/db.config.js";

// ── Groups (reuses attendance_groups) ──
export const getInventoryGroupsQuery = () =>
  pool.query(`
    SELECT
      g.*,
      COUNT(DISTINCT i.id) FILTER (WHERE i.archived = false) AS item_count,
      COUNT(DISTINCT b.id) FILTER (WHERE b.status IN ('pending','approved','issued','overdue')) AS active_booking_count,
      ia.email AS admin_email
    FROM inventory_groups g
    LEFT JOIN inventory_items i ON i.group_id = g.id
    LEFT JOIN inventory_bookings b ON b.group_id = g.id
    LEFT JOIN inventory_admin_groups iag ON iag.group_id = g.id
    LEFT JOIN inventory_admins ia ON ia.id = iag.admin_id
    GROUP BY g.id, ia.email
    ORDER BY g.name ASC
  `);

export const getGroupByIdQuery = (id) =>
  pool.query(`SELECT * FROM inventory_groups WHERE id = $1`, [id]);

export const createInventoryGroupQuery = ({ name, type }) =>
  pool.query(`INSERT INTO inventory_groups (name, type) VALUES ($1,$2) RETURNING *`, [name, type]);

export const updateInventoryGroupQuery = ({ id, name, type }) =>
  pool.query(`UPDATE inventory_groups SET name=$1, type=$2, updated_at=NOW() WHERE id=$3 RETURNING *`, [name, type, id]);

export const deleteInventoryGroupQuery = (id) =>
  pool.query(`DELETE FROM inventory_groups WHERE id=$1 RETURNING *`, [id]);



// ── Inventory admins ──
export const getAdminByEmailQuery = (email) =>
  pool.query(`SELECT * FROM inventory_admins WHERE email = $1`, [email]);

export const getAdminByIdQuery = (id) =>
  pool.query(`SELECT id, email, full_name, created_at FROM inventory_admins WHERE id = $1`, [id]);

export const createAdminQuery = ({ email, hashedPassword, full_name }) =>
  pool.query(
    `INSERT INTO inventory_admins (email, password, full_name) VALUES ($1,$2,$3) RETURNING id, email, full_name, created_at`,
    [email, hashedPassword, full_name || null]
  );

export const updateAdminPasswordQuery = ({ id, hashedPassword }) =>
  pool.query(
    `UPDATE inventory_admins SET password = $1, updated_at = NOW() WHERE id = $2 RETURNING id, email, full_name`,
    [hashedPassword, id]
  );

export const deleteAdminQuery = (id) =>
  pool.query(`DELETE FROM inventory_admins WHERE id = $1 RETURNING *`, [id]);

export const getAdminGroupIdsQuery = (admin_id) =>
  pool.query(
    `SELECT ag.id, ag.name, ag.type
     FROM inventory_admin_groups iag
     JOIN inventory_groups ag ON ag.id = iag.group_id
     WHERE iag.admin_id = $1
     ORDER BY ag.name ASC`,
    [admin_id]
  );

export const getAdminIdsByGroupIdQuery = (group_id) =>
  pool.query(
    `SELECT ia.id, ia.email, ia.full_name, ia.created_at
     FROM inventory_admin_groups iag
     JOIN inventory_admins ia ON ia.id = iag.admin_id
     WHERE iag.group_id = $1
     ORDER BY ia.email ASC`,
    [group_id]
  );

export const getAdminGroupRowQuery = (admin_id, group_id) =>
  pool.query(
    `SELECT * FROM inventory_admin_groups WHERE admin_id = $1 AND group_id = $2`,
    [admin_id, group_id]
  );

export const addAdminGroupQuery = ({ admin_id, group_id, granted_by }) =>
  pool.query(
    `INSERT INTO inventory_admin_groups (admin_id, group_id, granted_by) VALUES ($1,$2,$3) RETURNING *`,
    [admin_id, group_id, granted_by || null]
  );

export const removeAdminGroupQuery = ({ admin_id, group_id }) =>
  pool.query(
    `DELETE FROM inventory_admin_groups WHERE admin_id = $1 AND group_id = $2 RETURNING *`,
    [admin_id, group_id]
  );

export const removeAllGroupsForAdminQuery = (admin_id) =>
  pool.query(`DELETE FROM inventory_admin_groups WHERE admin_id = $1 RETURNING *`, [admin_id]);

export const removeAdminGroupByGroupIdQuery = (group_id) =>
  pool.query(`DELETE FROM inventory_admin_groups WHERE group_id = $1 RETURNING *`, [group_id]);

export const listAllInventoryAdminsQuery = () =>
  pool.query(`
    SELECT
      ia.id, ia.email, ia.full_name, ia.created_at,
      COALESCE(json_agg(json_build_object('id', ag.id, 'name', ag.name, 'type', ag.type) ORDER BY ag.name) FILTER (WHERE ag.id IS NOT NULL), '[]') AS groups
    FROM inventory_admins ia
    LEFT JOIN inventory_admin_groups iag ON iag.admin_id = ia.id
    LEFT JOIN inventory_groups ag ON ag.id = iag.group_id
    GROUP BY ia.id
    ORDER BY ia.email ASC
  `);

// ── Items ──
export const getItemsByGroupQuery = ({ group_id, category, archived, search, bookable }) => {
  const conditions = ["i.group_id = $1"];
  const values = [group_id];
  let idx = 2;
  if (category) {
    conditions.push(`i.category = $${idx++}`);
    values.push(category);
  }
  if (archived !== undefined && archived !== null) {
    conditions.push(`i.archived = $${idx++}`);
    values.push(archived === "true" || archived === true);
  }
  if (bookable !== undefined && bookable !== null) {
    conditions.push(`i.is_bookable = $${idx++}`);
    values.push(bookable === "true" || bookable === true);
  }
  if (search) {
    conditions.push(`(i.name ILIKE $${idx} OR i.description ILIKE $${idx})`);
    values.push(`%${search}%`);
    idx++;
  }
  return pool.query(
    `SELECT i.*, ag.name AS group_name, ag.type AS group_type
     FROM inventory_items i
     JOIN inventory_groups ag ON ag.id = i.group_id
     WHERE ${conditions.join(" AND ")}
     ORDER BY i.category ASC, i.name ASC`,
    values
  );
};

export const getItemByIdQuery = (id) =>
  pool.query(
    `SELECT i.*, ag.name AS group_name, ag.type AS group_type FROM inventory_items i JOIN inventory_groups ag ON ag.id = i.group_id WHERE i.id = $1`,
    [id]
  );

export const createItemQuery = ({
  group_id,
  category,
  name,
  description,
  quantity_total,
  quantity_available,
  unit,
  condition,
  is_bookable,
  unit_cost,
  acquisition_cost,
  acquisition_type,
  acquisition_date,
  image_url,
}) =>
  pool.query(
    `INSERT INTO inventory_items
      (group_id, category, name, description, quantity_total, quantity_available, unit, condition, is_bookable, unit_cost, acquisition_cost, acquisition_type, acquisition_date, image_url)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [
      group_id,
      category,
      name,
      description || null,
      quantity_total,
      quantity_available,
      unit || "pieces",
      condition || "good",
      is_bookable || false,
      unit_cost || 0,
      acquisition_cost || 0,
      acquisition_type || "purchased",
      acquisition_date || null,
      image_url || null,
    ]
  );

export const updateItemQuery = (id, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) return pool.query(`SELECT * FROM inventory_items WHERE id = $1`, [id]);
  const sets = keys.map((k, i) => `${k} = $${i + 2}`);
  const values = [id, ...Object.values(fields)];
  return pool.query(
    `UPDATE inventory_items SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $1 RETURNING *`,
    values
  );
};

export const archiveItemQuery = (id) =>
  pool.query(
    `UPDATE inventory_items SET archived = true, updated_at = NOW() WHERE id = $1 RETURNING *`,
    [id]
  );

export const adjustQuantityQuery = ({ id, deltaAvailable, deltaTotal }) => {
  const sets = [];
  const vals = [id];
  let idx = 2;
  if (deltaAvailable !== 0) {
    sets.push(`quantity_available = quantity_available + $${idx++}`);
    vals.push(deltaAvailable);
  }
  if (deltaTotal !== 0) {
    sets.push(`quantity_total = quantity_total + $${idx++}`);
    vals.push(deltaTotal);
  }
  sets.push(`updated_at = NOW()`);
  return pool.query(
    `UPDATE inventory_items SET ${sets.join(", ")} WHERE id = $1 RETURNING *`,
    vals
  );
};

// ── Transactions ──
export const addTransactionQuery = ({ item_id, group_id, type, quantity, reason, performed_by }) =>
  pool.query(
    `INSERT INTO inventory_transactions (item_id, group_id, type, quantity, reason, performed_by) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *`,
    [item_id, group_id, type, quantity, reason || null, performed_by || null]
  );

export const getTransactionsByItemQuery = (item_id) =>
  pool.query(
    `SELECT t.*, ia.email AS performed_by_email FROM inventory_transactions t LEFT JOIN inventory_admins ia ON ia.id = t.performed_by WHERE t.item_id = $1 ORDER BY t.created_at DESC`,
    [item_id]
  );

export const getTransactionsByGroupQuery = (group_id) =>
  pool.query(
    `SELECT t.*, i.name AS item_name FROM inventory_transactions t JOIN inventory_items i ON i.id = t.item_id WHERE t.group_id = $1 ORDER BY t.created_at DESC LIMIT 200`,
    [group_id]
  );

// ── Bookings ──
export const getBookingsByGroupQuery = ({ group_id, status, from, to }) => {
  const conds = ["b.group_id = $1"];
  const vals = [group_id];
  let idx = 2;
  if (status) {
    conds.push(`b.status = $${idx++}`);
    vals.push(status);
  }
  if (from) {
    conds.push(`b.booking_date >= $${idx++}`);
    vals.push(from);
  }
  if (to) {
    conds.push(`b.booking_date <= $${idx++}`);
    vals.push(to);
  }
  return pool.query(
    `SELECT b.*, i.name AS item_name, i.category AS item_category
     FROM inventory_bookings b JOIN inventory_items i ON i.id = b.item_id
     WHERE ${conds.join(" AND ")}
     ORDER BY b.booking_date DESC, b.created_at DESC`,
    vals
  );
};

export const getBookingByIdQuery = (id) =>
  pool.query(
    `SELECT b.*, i.name AS item_name, i.category AS item_category, i.quantity_available, i.quantity_total FROM inventory_bookings b JOIN inventory_items i ON i.id = b.item_id WHERE b.id = $1`,
    [id]
  );

export const createBookingQuery = ({
  item_id,
  group_id,
  booked_by_name,
  booked_by_phone,
  booked_by_email,
  borrower_type,
  quantity,
  booking_date,
  return_due_date,
  unit_cost,
  total_cost,
  purpose,
  notes,
  created_by,
}) =>
  pool.query(
    `INSERT INTO inventory_bookings
      (item_id, group_id, booked_by_name, booked_by_phone, booked_by_email, borrower_type, quantity, booking_date, return_due_date, unit_cost, total_cost, purpose, notes, created_by)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14) RETURNING *`,
    [
      item_id,
      group_id,
      booked_by_name,
      booked_by_phone || null,
      booked_by_email || null,
      borrower_type || "internal",
      quantity,
      booking_date,
      return_due_date,
      unit_cost || 0,
      total_cost || 0,
      purpose || null,
      notes || null,
      created_by || null,
    ]
  );

export const updateBookingQuery = (id, fields) => {
  const keys = Object.keys(fields);
  if (keys.length === 0) return pool.query(`SELECT * FROM inventory_bookings WHERE id = $1`, [id]);
  const sets = keys.map((k, i) => `${k} = $${i + 2}`);
  const values = [id, ...Object.values(fields)];
  return pool.query(
    `UPDATE inventory_bookings SET ${sets.join(", ")}, updated_at = NOW() WHERE id = $1 RETURNING *`,
    values
  );
};

export const deleteBookingQuery = (id) =>
  pool.query(`DELETE FROM inventory_bookings WHERE id = $1 RETURNING *`, [id]);

export const getBookingsRangeQuery = ({ group_id, start, end }) =>
  pool.query(
    `SELECT
       b.item_id,
       i.name AS item_name,
       COUNT(*) AS total_bookings,
       COUNT(*) FILTER (WHERE b.status = 'pending') AS pending_count,
       COUNT(*) FILTER (WHERE b.status = 'approved') AS approved_count,
       COUNT(*) FILTER (WHERE b.status = 'issued') AS issued_count,
       COUNT(*) FILTER (WHERE b.status = 'returned') AS returned_count,
       COUNT(*) FILTER (WHERE b.status = 'overdue') AS overdue_count,
       COUNT(*) FILTER (WHERE b.status = 'cancelled') AS cancelled_count,
       COALESCE(SUM(b.total_cost),0) AS total_revenue,
       COALESCE(SUM(b.total_cost - b.amount_paid) FILTER (WHERE b.payment_status != 'paid' AND b.payment_status != 'waived'),0) AS total_outstanding
     FROM inventory_bookings b JOIN inventory_items i ON i.id = b.item_id
     WHERE b.group_id = $1 AND b.booking_date BETWEEN $2 AND $3
     GROUP BY b.item_id, i.name
     ORDER BY i.name ASC`,
    [group_id, start, end]
  );

// ── Regimes & windows ──
export const getActiveRegimeQuery = () =>
  pool.query(`SELECT * FROM scc_regimes WHERE is_active = true LIMIT 1`);

export const listRegimesQuery = () =>
  pool.query(`SELECT * FROM scc_regimes ORDER BY start_date DESC`);

export const createRegimeQuery = ({ name, start_date, end_date, is_active }) =>
  pool.query(
    `INSERT INTO scc_regimes (name, start_date, end_date, is_active) VALUES ($1,$2,$3,$4) RETURNING *`,
    [name, start_date, end_date, is_active || false]
  );

export const updateRegimeQuery = (id, fields) => {
  const keys = Object.keys(fields);
  const sets = keys.map((k, i) => `${k} = $${i + 2}`);
  const values = [id, ...Object.values(fields)];
  return pool.query(`UPDATE scc_regimes SET ${sets.join(", ")} WHERE id = $1 RETURNING *`, values);
};

export const deleteRegimeQuery = (id) =>
  pool.query(`DELETE FROM scc_regimes WHERE id = $1 RETURNING *`, [id]);

export const getWindowQuery = ({ group_id, regime_id }) => {
  if (regime_id) return pool.query(`SELECT * FROM inventory_edit_windows WHERE group_id = $1 AND regime_id = $2`, [group_id, regime_id]);
  return pool.query(`SELECT * FROM inventory_edit_windows WHERE group_id = $1 ORDER BY window_end DESC LIMIT 1`, [group_id]);
};

export const upsertWindowQuery = ({ group_id, regime_id, window_start, window_end, is_open }) =>
  pool.query(
    `INSERT INTO inventory_edit_windows (group_id, regime_id, window_start, window_end, is_open)
     VALUES ($1,$2,$3,$4,$5)
     ON CONFLICT (group_id, regime_id) DO UPDATE SET window_start = EXCLUDED.window_start, window_end = EXCLUDED.window_end, is_open = EXCLUDED.is_open
     RETURNING *`,
    [group_id, regime_id || null, window_start, window_end, is_open]
  );

export const deleteWindowQuery = ({ group_id, regime_id }) =>
  pool.query(`DELETE FROM inventory_edit_windows WHERE group_id = $1 AND regime_id = $2 RETURNING *`, [group_id, regime_id]);

// ── Stats ──
export const getInventoryStatsQuery = (group_id) =>
  pool.query(
    `SELECT
       COUNT(*) FILTER (WHERE archived = false) AS total_items,
       COALESCE(SUM(quantity_total) FILTER (WHERE archived = false),0) AS total_qty,
       COALESCE(SUM(quantity_available) FILTER (WHERE archived = false),0) AS total_available,
       COALESCE(SUM(acquisition_cost * quantity_total) FILTER (WHERE archived = false),0) AS total_value,
       COUNT(*) FILTER (WHERE is_bookable = true AND archived = false) AS bookable_items,
       COUNT(*) FILTER (WHERE quantity_available = 0 AND archived = false) AS out_of_stock,
       COUNT(*) FILTER (WHERE quantity_available > 0 AND quantity_available <= 2 AND archived = false) AS low_stock
     FROM inventory_items WHERE group_id = $1`,
    [group_id]
  );
