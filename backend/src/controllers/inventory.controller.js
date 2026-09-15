import * as Service from "../services/inventory.service.js";

export const getInventoryGroups = async (req, res, next) => {
  try { res.json(await Service.getInventoryGroups()); } catch (err) { next(err); }
};

export const createInventoryGroup = async (req, res, next) => {
  try { res.status(201).json(await Service.createInventoryGroup(req.body)); } catch (err) { next(err); }
};

export const updateInventoryGroup = async (req, res, next) => {
  try { res.json(await Service.updateInventoryGroup({ id: req.params.id, ...req.body })); } catch (err) { next(err); }
};

export const deleteInventoryGroup = async (req, res, next) => {
  try { res.json(await Service.deleteInventoryGroup(req.params.id)); } catch (err) { next(err); }
};

export const loginInventoryAdmin = async (req, res) => {
  try {
    const result = await Service.loginInventoryAdmin(req.body);
    res.json(result);
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};

// ── Superadmin: admin per group ──
export const createInventoryAdmin = async (req, res, next) => {
  try {
    const granted_by = req.user?.userId || req.user?.id;
    res.status(201).json(await Service.createInventoryAdmin({
      group_id: req.params.group_id,
      email: req.body.email,
      password: req.body.password,
      full_name: req.body.full_name,
      granted_by,
    }));
  } catch (err) { next(err); }
};

export const getInventoryAdminByGroup = async (req, res, next) => {
  try { res.json(await Service.getInventoryAdminsByGroup(req.params.group_id)); } catch (err) { next(err); }
};

export const getAllInventoryAdmins = async (req, res, next) => {
  try { res.json(await Service.getAllInventoryAdmins()); } catch (err) { next(err); }
};

export const updateInventoryAdminPassword = async (req, res, next) => {
  try { res.json(await Service.updateInventoryAdminPassword({ group_id: req.params.group_id, password: req.body.password })); } catch (err) { next(err); }
};

export const deleteInventoryAdminGroup = async (req, res, next) => {
  try { res.json(await Service.deleteInventoryAdminGroup({ group_id: req.params.group_id })); } catch (err) { next(err); }
};

export const grantAdminGroup = async (req, res, next) => {
  try { res.status(201).json(await Service.grantAdminGroup({ admin_id: req.params.admin_id, group_id: req.body.group_id, granted_by: req.user?.userId })); } catch (err) { next(err); }
};

export const revokeAdminGroup = async (req, res, next) => {
  try { res.json(await Service.revokeAdminGroup({ admin_id: req.params.admin_id, group_id: req.params.group_id })); } catch (err) { next(err); }
};

export const deleteInventoryAdmin = async (req, res, next) => {
  try { res.json(await Service.deleteInventoryAdmin(req.params.admin_id)); } catch (err) { next(err); }
};

// ── Items ──
export const getItems = async (req, res, next) => {
  try {
    const group_id = req.params.group_id || req.user.group_ids?.[0];
    // allow superadmin to pass group_id explicitly
    const gid = req.params.group_id || req.query.group_id || req.user.group_ids?.[0];
    const { category, archived, search, bookable } = req.query;
    res.json(await Service.getItemsByGroup({ group_id: gid, category, archived, search, bookable }));
  } catch (err) { next(err); }
};

export const getItemsForRequester = async (req, res, next) => {
  try {
    const gid = req.params.group_id;
    // verify group_id in allowed list for inventory-admin
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) {
      return res.status(403).json({ message: "Forbidden: not a member of this group" });
    }
    const { category, archived, search, bookable } = req.query;
    res.json(await Service.getItemsByGroup({ group_id: gid, category, archived, search, bookable }));
  } catch (err) { next(err); }
};

export const createItem = async (req, res, next) => {
  try {
    const gid = req.params.group_id;
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) {
      return res.status(403).json({ message: "Forbidden: not a member of this group" });
    }
    const performed_by = req.user.admin_id;
    res.status(201).json(await Service.createItem({ group_id: gid, ...req.body, performed_by }));
  } catch (err) { next(err); }
};

export const updateItem = async (req, res, next) => {
  try {
    const group_ids = req.user?.group_ids;
    const patchGroup = group_ids ? group_ids[0] : "superadmin";
    // service will check ownership via id's group_id
    res.json(await Service.updateItem({ id: req.params.id, group_id: group_ids ? group_ids[0] : "superadmin", ...req.body }));
  } catch (err) { next(err); }
};

export const updateItemSecure = async (req, res, next) => {
  try {
    // fetch item to verify group ownership
    const item = await Service.getItemById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(item.group_id))) {
      return res.status(403).json({ message: "Forbidden: item belongs to another group" });
    }
    res.json(await Service.updateItem({ id: req.params.id, group_id: req.user?.group_ids ? String(item.group_id) : "superadmin", ...req.body }));
  } catch (err) { next(err); }
};

export const adjustItemQty = async (req, res, next) => {
  try {
    const item = await Service.getItemById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(item.group_id))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(await Service.adjustItemQuantity({ id: req.params.id, delta_total: req.body.delta_total || req.body.delta, delta_available: req.body.delta_available ?? req.body.delta_total ?? req.body.delta, reason: req.body.reason, performed_by: req.user.admin_id, group_id: req.user?.group_ids ? String(item.group_id) : "superadmin" }));
  } catch (err) { next(err); }
};

export const archiveItem = async (req, res, next) => {
  try {
    const item = await Service.getItemById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(item.group_id))) {
      return res.status(403).json({ message: "Forbidden" });
    }
    res.json(await Service.archiveItem({ id: req.params.id, group_id: req.user?.group_ids ? String(item.group_id) : "superadmin", reason: req.body.reason, performed_by: req.user.admin_id }));
  } catch (err) { next(err); }
};

export const getTransactionsByItem = async (req, res, next) => {
  try { res.json(await Service.getItemTransactions(req.params.id)); } catch (err) { next(err); }
};

export const getTransactionsByGroup = async (req, res, next) => {
  try {
    const gid = req.params.group_id;
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.getGroupTransactions(gid));
  } catch (err) { next(err); }
};

export const getInventoryStats = async (req, res, next) => {
  try {
    const gid = req.params.group_id;
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.getInventoryStats(gid));
  } catch (err) { next(err); }
};

// ── Bookings ──
export const getBookings = async (req, res, next) => {
  try {
    const gid = req.params.group_id;
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) return res.status(403).json({ message: "Forbidden" });
    const { status, from, to } = req.query;
    res.json(await Service.getBookingsByGroup({ group_id: gid, status, from, to }));
  } catch (err) { next(err); }
};

export const createBooking = async (req, res, next) => {
  try {
    const gid = req.body.group_id;
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) return res.status(403).json({ message: "Forbidden: not a member of this group" });
    res.status(201).json(await Service.createBooking({ ...req.body, created_by: req.user.admin_id }));
  } catch (err) { next(err); }
};

export const getBookingById = async (req, res, next) => {
  try { res.json(await Service.getBookingById(req.params.id)); } catch (err) { next(err); }
};

export const updateBooking = async (req, res, next) => {
  try {
    const b = await Service.getBookingById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(b.group_id))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.updateBooking({ id: req.params.id, patch: req.body, group_id: req.user?.group_ids ? String(b.group_id) : "superadmin" }));
  } catch (err) { next(err); }
};

export const updateBookingStatusHandler = async (req, res, next) => {
  try {
    const b = await Service.getBookingById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(b.group_id))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.updateBookingStatus({ id: req.params.id, status: req.body.status, return_date: req.body.return_date, group_id: req.user?.group_ids ? String(b.group_id) : "superadmin" }));
  } catch (err) { next(err); }
};

export const updateBookingPaymentHandler = async (req, res, next) => {
  try {
    const b = await Service.getBookingById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(b.group_id))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.updateBookingPayment({ id: req.params.id, amount_paid: req.body.amount_paid, payment_status: req.body.payment_status, group_id: String(b.group_id) }));
  } catch (err) { next(err); }
};

export const deleteBookingHandler = async (req, res, next) => {
  try {
    const b = await Service.getBookingById(req.params.id);
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(b.group_id))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.deleteBooking({ id: req.params.id, group_id: String(b.group_id) }));
  } catch (err) { next(err); }
};

export const getBookingRange = async (req, res, next) => {
  try {
    const { group_id, start, end } = req.query;
    const gid = group_id || req.user?.group_ids?.[0];
    if (req.user?.group_ids && !req.user.group_ids.map(String).includes(String(gid))) return res.status(403).json({ message: "Forbidden" });
    res.json(await Service.getBookingRange({ group_id: gid, start, end }));
  } catch (err) { next(err); }
};

// ── Regimes ──
export const listRegimes = async (req, res, next) => { try { res.json(await Service.listRegimes()); } catch (err) { next(err); } };
export const createRegime = async (req, res, next) => { try { res.status(201).json(await Service.createRegime(req.body)); } catch (err) { next(err); } };
export const updateRegime = async (req, res, next) => { try { res.json(await Service.updateRegime({ id: req.params.id, ...req.body })); } catch (err) { next(err); } };
export const deleteRegime = async (req, res, next) => { try { res.json(await Service.deleteRegime(req.params.id)); } catch (err) { next(err); } };
export const getWindow = async (req, res, next) => { try { res.json(await Service.getWindow({ group_id: req.params.group_id }) || { is_open: true }); } catch (err) { next(err); } };
export const upsertWindow = async (req, res, next) => { try { res.json(await Service.upsertWindow({ group_id: req.params.group_id, regime_id: req.body.regime_id, window_start: req.body.window_start, window_end: req.body.window_end, is_open: req.body.is_open })); } catch (err) { next(err); } };
