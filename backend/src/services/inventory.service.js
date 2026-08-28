import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pool from "../config/db.config.js";
import * as Model from "../models/inventory.model.js";

const VALID_CATEGORIES = ["group","scc","other","technical", "publicity", "choir", "pastoral", "catering", "committee"];
const VALID_CONDITIONS = ["new", "good", "fair", "damaged", "lost", "disposed"];
const VALID_UNITS = ["pieces", "sets", "pairs", "litres", "kg", "metres", "boxes", "other"];
const VALID_ACQ_TYPES = ["purchased", "donated", "transfer"];
const VALID_BOOKING_STATUSES = ["pending", "approved", "issued", "returned", "overdue", "cancelled"];
const VALID_BORROWER_TYPES = ["internal", "external", "group"];
const VALID_PAYMENT_STATUSES = ["unpaid", "partial", "paid", "waived"];
const KENYAN_PHONE = /^(07[0-9]\d{7}|01[01][0-9]\d{6})$/;

const validatePhone = (phone) => {
  if (phone === null || phone === undefined || phone === "") return null;
  const digits = String(phone).replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return null;
  if (!KENYAN_PHONE.test(digits))
    throw new Error("Enter a valid Kenyan number (e.g. 07XXXXXXXX or 011XXXXXXX)");
  return digits;
};

const derivePaymentStatus = (total_cost, amount_paid, current) => {
  if (current === "waived") return "waived";
  const total = Number(total_cost) || 0;
  const paid = Number(amount_paid) || 0;
  if (total === 0 && paid === 0) return "unpaid";
  if (paid >= total && total > 0) return "paid";
  if (paid > 0) return "partial";
  return "unpaid";
};

const isTransientDbError = (err) =>
  err?.code === "ETIMEDOUT" ||
  err?.code === "ENETUNREACH" ||
  err?.code === "ECONNREFUSED" ||
  err?.name === "AggregateError" ||
  (err?.message && err.message.includes("ETIMEDOUT"));

const withRetry = async (fn, retries = 1, delay = 800) => {
  try {
    return await fn();
  } catch (e) {
    if (retries > 0 && isTransientDbError(e)) {
      await new Promise((r) => setTimeout(r, delay));
      return withRetry(fn, retries - 1, delay * 1.5);
    }
    throw e;
  }
};

const assertGroupType = async (group_id) => {
  const { rows } = await withRetry(() => pool.query(`SELECT type FROM inventory_groups WHERE id = $1`, [group_id]));
  if (!rows[0]) throw new Error("Group not found");
  return rows[0].type;
};

const assertSccEditAllowed = async (group_id) => {
  const type = await assertGroupType(group_id);
  if (type !== "scc") return;
  const { rows } = await withRetry(() => Model.getWindowQuery({ group_id }));
  const win = rows[0];
  // If no window configured yet, allow edits (initial seeding)
  if (!win) return;
  if (!win.is_open) throw new Error("SCC inventory can only be updated at the beginning of the regime. Contact the superadmin.");
  const today = new Date().toISOString().split("T")[0];
  if (today < String(win.window_start).slice(0, 10) || today > String(win.window_end).slice(0, 10)) {
    throw new Error(`SCC edit window is ${String(win.window_start).slice(0, 10)} to ${String(win.window_end).slice(0, 10)}. Editing is closed.`);
  }
};

// ── Groups ──
export const getInventoryGroups = async () => {
  const { rows } = await withRetry(() => Model.getInventoryGroupsQuery());
  return rows;
};

const VALID_GROUP_TYPES = ["group","scc","other"];

export const createInventoryGroup = async ({ name, type }) => {
  if (!name?.trim()) throw new Error("Group name is required");
  if (!VALID_GROUP_TYPES.includes(type)) throw new Error(`type must be one of: ${VALID_GROUP_TYPES.join(", ")}`);
  const { rows } = await withRetry(() => Model.createInventoryGroupQuery({ name: name.trim(), type }));
  return rows[0];
};

export const updateInventoryGroup = async ({ id, name, type }) => {
  if (!name?.trim()) throw new Error("Group name is required");
  if (!VALID_GROUP_TYPES.includes(type)) throw new Error(`type must be one of: ${VALID_GROUP_TYPES.join(", ")}`);
  const { rows } = await withRetry(() => Model.updateInventoryGroupQuery({ id, name: name.trim(), type }));
  if (!rows[0]) throw new Error("Group not found");
  return rows[0];
};

export const deleteInventoryGroup = async (id) => {
  const { rows } = await withRetry(() => Model.deleteInventoryGroupQuery(id));
  if (!rows[0]) throw new Error("Group not found");
  return rows[0];
};

// ── Admin auth ──
export const loginInventoryAdmin = async ({ email, password }) => {
  if (!email || !password) throw new Error("Email and password required");
  const { rows } = await Model.getAdminByEmailQuery(email.trim().toLowerCase());
  const admin = rows[0];
  if (!admin) throw new Error("Invalid credentials");
  const match = await bcrypt.compare(password, admin.password);
  if (!match) throw new Error("Invalid credentials");
  const { rows: groupRows } = await Model.getAdminGroupIdsQuery(admin.id);
  if (groupRows.length === 0) throw new Error("No groups assigned to this account. Contact superadmin.");
  const token = jwt.sign(
    {
      admin_id: admin.id,
      email: admin.email,
      full_name: admin.full_name,
      group_ids: groupRows.map((g) => g.id),
      groups: groupRows,
      role: "inventory-admin",
    },
    process.env.JWT_SECRET,
    { expiresIn: "8h" }
  );
  return {
    token,
    admin_id: admin.id,
    email: admin.email,
    full_name: admin.full_name,
    group_ids: groupRows.map((g) => g.id),
    groups: groupRows,
  };
};

export const createInventoryAdmin = async ({ group_id, email, password, full_name, granted_by }) => {
  if (!group_id || !email || !password) throw new Error("group_id, email, and password are required");
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  const { rows: grp } = await withRetry(() => pool.query(`SELECT id FROM inventory_groups WHERE id = $1`, [group_id]));
  if (!grp[0]) throw new Error("Group not found");
  const email_lc = email.trim().toLowerCase();
  const hashedPassword = await bcrypt.hash(password, 10);
  let admin_id;
  const { rows: existing } = await Model.getAdminByEmailQuery(email_lc);
  if (existing[0]) {
    admin_id = existing[0].id;
    const { rows: already } = await Model.getAdminGroupRowQuery(admin_id, group_id);
    if (already[0]) throw new Error("Admin already has access to this group");
    if (full_name?.trim() && !existing[0].full_name) {
      await pool.query(`UPDATE inventory_admins SET full_name = $1, updated_at = NOW() WHERE id = $2`, [full_name.trim(), admin_id]);
    }
  } else {
    const { rows } = await Model.createAdminQuery({ email: email_lc, hashedPassword, full_name: full_name?.trim() || null });
    admin_id = rows[0].id;
  }
  await Model.addAdminGroupQuery({ admin_id, group_id, granted_by });
  const { rows: admin } = await Model.getAdminByIdQuery(admin_id);
  const { rows: groups } = await Model.getAdminGroupIdsQuery(admin_id);
  return { ...admin[0], groups };
};

export const getInventoryAdminsByGroup = async (group_id) => {
  const { rows } = await Model.getAdminIdsByGroupIdQuery(group_id);
  return rows;
};

export const getAllInventoryAdmins = async () => {
  const { rows } = await Model.listAllInventoryAdminsQuery();
  return rows;
};

export const updateInventoryAdminPassword = async ({ group_id, password }) => {
  if (password.length < 6) throw new Error("Password must be at least 6 characters");
  const { rows: admins } = await Model.getAdminIdsByGroupIdQuery(group_id);
  if (!admins[0]) throw new Error("No admin found for this group");
  const admin = admins[0];
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await Model.updateAdminPasswordQuery({ id: admin.id, hashedPassword });
  return rows[0];
};

export const deleteInventoryAdminGroup = async ({ group_id }) => {
  const { rows } = await Model.removeAdminGroupByGroupIdQuery(group_id);
  // optionally delete orphan admins
  const { rows: admins } = await Model.getAdminIdsByGroupIdQuery(group_id);
  // admins now empty but check all
  const { rows: allAdmins } = await pool.query(`SELECT id FROM inventory_admins WHERE id NOT IN (SELECT admin_id FROM inventory_admin_groups)`);
  for (const a of allAdmins) await Model.deleteAdminQuery(a.id);
  return rows[0] || null;
};

export const grantAdminGroup = async ({ admin_id, group_id, granted_by }) => {
  const { rows: admin } = await Model.getAdminByIdQuery(admin_id);
  if (!admin[0]) throw new Error("Admin not found");
  const { rows: grp } = await withRetry(() => pool.query(`SELECT id FROM inventory_groups WHERE id = $1`, [group_id]));
  if (!grp[0]) throw new Error("Group not found");
  const { rows: existing } = await withRetry(() => Model.getAdminGroupRowQuery(admin_id, group_id));
  if (existing[0]) throw new Error("Admin already has access to this group");
  const { rows } = await Model.addAdminGroupQuery({ admin_id, group_id, granted_by });
  return rows[0];
};

export const revokeAdminGroup = async ({ admin_id, group_id }) => {
  const { rows } = await Model.removeAdminGroupQuery({ admin_id, group_id });
  if (!rows[0]) throw new Error("Admin did not have access to this group");
  const { rows: remaining } = await Model.getAdminGroupIdsQuery(admin_id);
  if (remaining.length === 0) await Model.deleteAdminQuery(admin_id);
  return rows[0];
};

export const deleteInventoryAdmin = async (admin_id) => {
  const { rows } = await Model.deleteAdminQuery(admin_id);
  if (!rows[0]) throw new Error("Admin not found");
  return rows[0];
};

// ── Items ──
export const getItemsByGroup = async ({ group_id, category, archived, search, bookable }) => {
  if (category && !VALID_CATEGORIES.includes(category)) throw new Error(`Invalid category: ${category}`);
  const { rows } = await withRetry(() => Model.getItemsByGroupQuery({ group_id, category, archived, search, bookable }));
  return rows;
};

export const getItemById = async (id) => {
  const { rows } = await withRetry(() => Model.getItemByIdQuery(id));
  if (!rows[0]) throw new Error("Item not found");
  return rows[0];
};

export const createItem = async ({ group_id, category, name, description, quantity_total, quantity_available, unit, condition, is_bookable, unit_cost, acquisition_cost, acquisition_type, acquisition_date, image_url, performed_by }) => {
  if (!group_id || !category || !name) throw new Error("group_id, category, and name are required");
  if (!VALID_CATEGORIES.includes(category)) throw new Error(`category must be one of: ${VALID_CATEGORIES.join(", ")}`);
  if (condition && !VALID_CONDITIONS.includes(condition)) throw new Error(`Invalid condition`);
  if (unit && !VALID_UNITS.includes(unit)) throw new Error(`Invalid unit`);
  if (acquisition_type && !VALID_ACQ_TYPES.includes(acquisition_type)) throw new Error(`Invalid acquisition_type`);
  const qty = Number(quantity_total);
  if (!Number.isFinite(qty) || qty < 0) throw new Error("quantity_total must be a non-negative number");
  const avail = quantity_available !== undefined ? Number(quantity_available) : qty;
  if (!Number.isFinite(avail) || avail < 0 || avail > qty) throw new Error("quantity_available must be between 0 and quantity_total");
  await assertSccEditAllowed(group_id);
  const { rows } = await Model.createItemQuery({
    group_id,
    category,
    name: name.trim(),
    description: description?.trim() || null,
    quantity_total: Math.floor(qty),
    quantity_available: Math.floor(avail),
    unit: unit || "pieces",
    condition: condition || "good",
    is_bookable: !!is_bookable,
    unit_cost: Number(unit_cost) || 0,
    acquisition_cost: Number(acquisition_cost) || 0,
    acquisition_type: acquisition_type || "purchased",
    acquisition_date: acquisition_date || null,
    image_url: image_url || null,
  });
  const item = rows[0];
  await Model.addTransactionQuery({ item_id: item.id, group_id, type: "add", quantity: Math.floor(qty) || 1, reason: "Initial stock", performed_by });
  return item;
};

export const updateItem = async ({ id, group_id, ...patch }) => {
  const { rows: existingRows } = await Model.getItemByIdQuery(id);
  if (!existingRows[0]) throw new Error("Item not found");
  const existing = existingRows[0];
  // enforce group ownership if group_id supplied by caller (from auth)
  if (group_id && Number(existing.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden: item belongs to another group");
  await assertSccEditAllowed(existing.group_id);
  const allowed = ["name", "description", "category", "unit", "condition", "is_bookable", "unit_cost", "acquisition_cost", "acquisition_type", "acquisition_date", "image_url"];
  const fields = {};
  for (const k of allowed) if (patch[k] !== undefined) fields[k] = patch[k];
  if (fields.name !== undefined) {
    if (!fields.name?.trim()) throw new Error("name cannot be empty");
    fields.name = fields.name.trim();
  }
  if (fields.category !== undefined && !VALID_CATEGORIES.includes(fields.category)) throw new Error("Invalid category");
  if (fields.condition !== undefined && !VALID_CONDITIONS.includes(fields.condition)) throw new Error("Invalid condition");
  if (fields.unit !== undefined && !VALID_UNITS.includes(fields.unit)) throw new Error("Invalid unit");
  if (fields.acquisition_type !== undefined && !VALID_ACQ_TYPES.includes(fields.acquisition_type)) throw new Error("Invalid acquisition_type");
  // quantity fields handled via dedicated adjust, but allow unit_cost etc.
  if (Object.keys(fields).length === 0) return existing;
  const { rows } = await Model.updateItemQuery(id, fields);
  return rows[0];
};

export const adjustItemQuantity = async ({ id, delta_total, delta_available, reason, performed_by, group_id }) => {
  const { rows: existingRows } = await Model.getItemByIdQuery(id);
  if (!existingRows[0]) throw new Error("Item not found");
  const existing = existingRows[0];
  if (group_id && Number(existing.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  await assertSccEditAllowed(existing.group_id);
  const dt = Number(delta_total) || 0;
  const da = Number(delta_available) || 0;
  if (dt === 0 && da === 0) throw new Error("delta_total or delta_available required");
  // check invariants after apply
  const newTotal = Number(existing.quantity_total) + dt;
  const newAvail = Number(existing.quantity_available) + da;
  if (newTotal < 0) throw new Error("quantity_total cannot go negative");
  if (newAvail < 0 || newAvail > newTotal) throw new Error("quantity_available must stay between 0 and quantity_total");
  const { rows } = await Model.adjustQuantityQuery({ id, deltaAvailable: da, deltaTotal: dt });
  const type = dt > 0 || da > 0 ? "add" : "remove";
  await Model.addTransactionQuery({ item_id: id, group_id: existing.group_id, type: type === "add" ? "add" : "remove", quantity: da || dt, reason: reason || "Quantity adjustment", performed_by });
  return rows[0];
};

export const archiveItem = async ({ id, group_id, reason, performed_by }) => {
  const { rows: existingRows } = await Model.getItemByIdQuery(id);
  if (!existingRows[0]) throw new Error("Item not found");
  const existing = existingRows[0];
  if (group_id && Number(existing.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  await assertSccEditAllowed(existing.group_id);
  const { rows } = await Model.archiveItemQuery(id);
  await Model.addTransactionQuery({ item_id: id, group_id: existing.group_id, type: "dispose", quantity: -Number(existing.quantity_available) || -1, reason: reason || "Archived", performed_by });
  return rows[0];
};

export const getItemTransactions = async (item_id) => {
  const { rows } = await withRetry(() => Model.getTransactionsByItemQuery(item_id));
  return rows;
};

export const getGroupTransactions = async (group_id) => {
  const { rows } = await withRetry(() => Model.getTransactionsByGroupQuery(group_id));
  return rows;
};

// ── Bookings ──
export const getBookingsByGroup = async ({ group_id, status, from, to }) => {
  if (status && !VALID_BOOKING_STATUSES.includes(status)) throw new Error("Invalid status");
  const { rows } = await withRetry(() => Model.getBookingsByGroupQuery({ group_id, status, from, to }));
  // compute overdue flag
  const today = new Date().toISOString().split("T")[0];
  return rows.map((r) => ({
    ...r,
    is_overdue: (r.status === "approved" || r.status === "issued") && r.return_due_date && String(r.return_due_date).slice(0, 10) < today,
  }));
};

export const getBookingById = async (id) => {
  const { rows } = await withRetry(() => Model.getBookingByIdQuery(id));
  if (!rows[0]) throw new Error("Booking not found");
  return rows[0];
};

export const createBooking = async ({ item_id, group_id, booked_by_name, booked_by_phone, booked_by_email, borrower_type, quantity, booking_date, return_due_date, purpose, notes, created_by, unit_cost: overrideUnitCost, total_cost: overrideTotal }) => {
  if (!item_id || !group_id || !booked_by_name || !booking_date || !return_due_date) throw new Error("item_id, group_id, booked_by_name, booking_date, return_due_date are required");
  if (borrower_type && !VALID_BORROWER_TYPES.includes(borrower_type)) throw new Error("Invalid borrower_type");
  const qty = Number(quantity) || 1;
  if (qty <= 0) throw new Error("quantity must be > 0");
  const { rows: itemRows } = await Model.getItemByIdQuery(item_id);
  if (!itemRows[0]) throw new Error("Item not found");
  const item = itemRows[0];
  if (Number(item.group_id) !== Number(group_id)) throw new Error("Item does not belong to this group");
  if (item.archived) throw new Error("Cannot book an archived item");
  if (!item.is_bookable) throw new Error("Item is not bookable");
  if (qty > Number(item.quantity_available)) throw new Error(`Cannot book more than available (${item.quantity_available} in stock)`);
  const cleanPhone = validatePhone(booked_by_phone);
  if (new Date(return_due_date) < new Date(booking_date)) throw new Error("return_due_date must be >= booking_date");
  const uc = overrideUnitCost !== undefined ? Number(overrideUnitCost) : Number(item.unit_cost) || 0;
  const tc = overrideTotal !== undefined ? Number(overrideTotal) : uc * qty;
  const { rows } = await Model.createBookingQuery({
    item_id,
    group_id,
    booked_by_name: booked_by_name.trim(),
    booked_by_phone: cleanPhone,
    booked_by_email: booked_by_email?.trim() || null,
    borrower_type: borrower_type || "internal",
    quantity: Math.floor(qty),
    booking_date,
    return_due_date,
    unit_cost: uc,
    total_cost: tc,
    purpose: purpose?.trim() || null,
    notes: notes?.trim() || null,
    created_by,
  });
  return rows[0];
};

export const updateBooking = async ({ id, patch, group_id }) => {
  const { rows: existingRows } = await Model.getBookingByIdQuery(id);
  if (!existingRows[0]) throw new Error("Booking not found");
  const existing = existingRows[0];
  if (group_id && Number(existing.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  if (existing.status === "returned" || existing.status === "cancelled") throw new Error(`Cannot edit a ${existing.status} booking`);
  const allowed = ["booked_by_name", "booked_by_phone", "booked_by_email", "borrower_type", "purpose", "notes", "booking_date", "return_due_date"];
  const fields = {};
  for (const k of allowed) if (patch[k] !== undefined) fields[k] = patch[k];
  if (fields.booked_by_phone !== undefined) fields.booked_by_phone = validatePhone(fields.booked_by_phone);
  if (fields.borrower_type && !VALID_BORROWER_TYPES.includes(fields.borrower_type)) throw new Error("Invalid borrower_type");
  if (fields.booking_date && fields.return_due_date && new Date(fields.return_due_date) < new Date(fields.booking_date)) throw new Error("return_due_date must be >= booking_date");
  if (Object.keys(fields).length === 0) return existing;
  const { rows } = await Model.updateBookingQuery(id, fields);
  return rows[0];
};

export const updateBookingStatus = async ({ id, status, return_date, group_id }) => {
  if (!status || !VALID_BOOKING_STATUSES.includes(status)) throw new Error(`status must be one of: ${VALID_BOOKING_STATUSES.join(", ")}`);
  const { rows: existingRows } = await Model.getBookingByIdQuery(id);
  if (!existingRows[0]) throw new Error("Booking not found");
  const b = existingRows[0];
  if (group_id && Number(b.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  const from = b.status;
  const allowed = {
    pending: ["approved", "cancelled"],
    approved: ["issued", "returned", "cancelled", "overdue"],
    issued: ["returned", "overdue"],
    overdue: ["returned", "cancelled"],
    cancelled: [],
    returned: [],
  };
  // allow overdue as auto, but permit manual overdue->cancelled etc.
  // also allow pending->issued via approved implicitly? no, require approved first
  if (!allowed[from].includes(status) && !(from === "overdue" && status === "returned")) {
    // allow direct pending->issued? no
    if (from === "pending" && status === "issued") throw new Error("Booking must be approved before issuing");
    if (!allowed[from].includes(status)) throw new Error(`Cannot transition from ${from} to ${status}`);
  }
  // quantity side effects via transaction
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    if (from === "pending" && status === "approved") {
      const { rows: itemRows } = await client.query(`SELECT quantity_available FROM inventory_items WHERE id = $1 FOR UPDATE`, [b.item_id]);
      const avail = itemRows[0]?.quantity_available ?? 0;
      if (Number(avail) < Number(b.quantity)) throw new Error(`Insufficient stock: only ${avail} available`);
      await client.query(`UPDATE inventory_items SET quantity_available = quantity_available - $1, updated_at = NOW() WHERE id = $2`, [b.quantity, b.item_id]);
    } else if (status === "cancelled" && (from === "approved" || from === "issued" || from === "overdue")) {
      await client.query(`UPDATE inventory_items SET quantity_available = LEAST(quantity_total, quantity_available + $1), updated_at = NOW() WHERE id = $2`, [b.quantity, b.item_id]);
    } else if (status === "returned" && (from === "issued" || from === "overdue" || from === "approved")) {
      await client.query(`UPDATE inventory_items SET quantity_available = LEAST(quantity_total, quantity_available + $1), updated_at = NOW() WHERE id = $2`, [b.quantity, b.item_id]);
    }
    const updates = { status };
    if (status === "returned") updates.return_date = return_date || new Date().toISOString().split("T")[0];
    const setClause = Object.keys(updates).map((k, i) => `${k} = $${i + 2}`).join(", ");
    const vals = [id, ...Object.values(updates)];
    const { rows } = await client.query(`UPDATE inventory_bookings SET ${setClause}, updated_at = NOW() WHERE id = $1 RETURNING *`, vals);
    await client.query("COMMIT");
    return rows[0];
  } catch (e) {
    await client.query("ROLLBACK");
    throw e;
  } finally {
    client.release();
  }
};

export const updateBookingPayment = async ({ id, amount_paid, payment_status, group_id }) => {
  const { rows: existingRows } = await Model.getBookingByIdQuery(id);
  if (!existingRows[0]) throw new Error("Booking not found");
  const b = existingRows[0];
  if (group_id && Number(b.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  const fields = {};
  if (amount_paid !== undefined) {
    const amt = Number(amount_paid);
    if (!Number.isFinite(amt) || amt < 0) throw new Error("amount_paid must be >= 0");
    fields.amount_paid = amt;
  }
  if (payment_status !== undefined) {
    if (!VALID_PAYMENT_STATUSES.includes(payment_status)) throw new Error("Invalid payment_status");
    fields.payment_status = payment_status;
  } else if (amount_paid !== undefined) {
    fields.payment_status = derivePaymentStatus(b.total_cost, amount_paid, b.payment_status);
  }
  if (Object.keys(fields).length === 0) return b;
  const { rows } = await Model.updateBookingQuery(id, fields);
  return rows[0];
};

export const deleteBooking = async ({ id, group_id }) => {
  const { rows: existingRows } = await Model.getBookingByIdQuery(id);
  if (!existingRows[0]) throw new Error("Booking not found");
  const b = existingRows[0];
  if (group_id && Number(b.group_id) !== Number(group_id) && group_id !== "superadmin") throw new Error("Forbidden");
  if (b.status === "approved" || b.status === "issued") {
    await pool.query(`UPDATE inventory_items SET quantity_available = LEAST(quantity_total, quantity_available + $1), updated_at = NOW() WHERE id = $2`, [b.quantity, b.item_id]);
  }
  const { rows } = await Model.deleteBookingQuery(id);
  return rows[0];
};

export const getBookingRange = async ({ group_id, start, end }) => {
  if (!start || !end) throw new Error("start and end are required");
  if (start > end) throw new Error("start must be before end");
  const { rows } = await Model.getBookingsRangeQuery({ group_id, start, end });
  return rows;
};

export const getInventoryStats = async (group_id) => {
  const { rows } = await withRetry(() => Model.getInventoryStatsQuery(group_id));
  const { rows: bookingRows } = await withRetry(() => pool.query(
     `SELECT COUNT(*) FILTER (WHERE status = 'pending') AS pending_bookings,
            COUNT(*) FILTER (WHERE status IN ('approved','issued')) AS active_bookings,
            COUNT(*) FILTER (WHERE status = 'overdue' OR (status IN ('approved','issued') AND return_due_date < CURRENT_DATE)) AS overdue_bookings,
            COALESCE(SUM(amount_paid),0) AS total_paid,
            COALESCE(SUM(total_cost - amount_paid) FILTER (WHERE payment_status != 'paid' AND payment_status != 'waived'),0) AS outstanding
      FROM inventory_bookings WHERE group_id = $1`,
     [group_id]
   ));
   return { ...rows[0], ...bookingRows[0] };
};

// ── Regimes/windows ──
export const listRegimes = async () => {
  const { rows } = await withRetry(() => Model.listRegimesQuery());
  return rows;
};
export const createRegime = async ({ name, start_date, end_date, is_active }) => {
  if (!name?.trim() || !start_date || !end_date) throw new Error("name, start_date, end_date are required");
  if (new Date(end_date) <= new Date(start_date)) throw new Error("end_date must be after start_date");
  if (is_active) await pool.query(`UPDATE scc_regimes SET is_active = false WHERE is_active = true`);
  const { rows } = await Model.createRegimeQuery({ name: name.trim(), start_date, end_date, is_active: !!is_active });
  return rows[0];
};
export const updateRegime = async ({ id, ...patch }) => {
  if (patch.is_active) await pool.query(`UPDATE scc_regimes SET is_active = false WHERE is_active = true AND id != $1`, [id]);
  const fields = {};
  for (const k of ["name", "start_date", "end_date", "is_active"]) if (patch[k] !== undefined) fields[k] = patch[k];
  if (Object.keys(fields).length === 0) throw new Error("No fields to update");
  const { rows } = await Model.updateRegimeQuery(id, fields);
  if (!rows[0]) throw new Error("Regime not found");
  return rows[0];
};
export const deleteRegime = async (id) => {
  const { rows } = await Model.deleteRegimeQuery(id);
  if (!rows[0]) throw new Error("Regime not found");
  return rows[0];
};
export const getWindow = async ({ group_id }) => {
  const { rows } = await Model.getWindowQuery({ group_id });
  return rows[0] || null;
};
export const upsertWindow = async ({ group_id, regime_id, window_start, window_end, is_open }) => {
  if (!group_id || !window_start || !window_end) throw new Error("group_id, window_start, window_end are required");
  if (new Date(window_end) < new Date(window_start)) throw new Error("window_end must be >= window_start");
  const { rows } = await Model.upsertWindowQuery({ group_id, regime_id, window_start, window_end, is_open: !!is_open });
  return rows[0];
};
export const deleteWindow = async ({ group_id, regime_id }) => {
  const { rows } = await Model.deleteWindowQuery({ group_id, regime_id });
  return rows[0] || null;
};
