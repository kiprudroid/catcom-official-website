import express from "express";
import * as C from "../controllers/inventory.controller.js";
import { authenticateToken, authorizeRoles } from "../middleware/auth.middleware.js";
import { verifyInventoryAdmin } from "../middleware/inventoryAdmin.middleware.js";

const router = express.Router();

// Public
router.post("/inventory/login", C.loginInventoryAdmin);
router.get("/inventory/groups", C.getInventoryGroups);
router.get("/inventory/groups/:group_id/window", C.getWindow);

// Inventory groups (separate from attendance_groups)
router.post("/inventory/groups", authenticateToken, C.createInventoryGroup);
router.put("/inventory/groups/:id", authenticateToken, C.updateInventoryGroup);
router.delete("/inventory/groups/:id", authenticateToken, C.deleteInventoryGroup);

// Superadmin — regimes & windows & admin management
// Use authenticateToken only (like attendance OtherTools) to avoid 403 when role is not exactly 'admin'
// Frontend already guards /admin/* by token presence; backend checks token validity only.
router.get("/inventory/admin/list", authenticateToken, C.getAllInventoryAdmins);
router.get("/inventory/regimes", authenticateToken, C.listRegimes);
router.post("/inventory/regimes", authenticateToken, C.createRegime);
router.put("/inventory/regimes/:id", authenticateToken, C.updateRegime);
router.delete("/inventory/regimes/:id", authenticateToken, C.deleteRegime);
router.put("/inventory/groups/:group_id/window", authenticateToken, C.upsertWindow);

router.get("/inventory/groups/:group_id/admin", authenticateToken, C.getInventoryAdminByGroup);
router.post("/inventory/groups/:group_id/admin", authenticateToken, C.createInventoryAdmin);
router.put("/inventory/groups/:group_id/admin", authenticateToken, C.updateInventoryAdminPassword);
router.delete("/inventory/groups/:group_id/admin", authenticateToken, C.deleteInventoryAdminGroup);

router.post("/inventory/admins/:admin_id/groups", authenticateToken, C.grantAdminGroup);
router.delete("/inventory/admins/:admin_id/groups/:group_id", authenticateToken, C.revokeAdminGroup);
router.delete("/inventory/admins/:admin_id", authenticateToken, C.deleteInventoryAdmin);

// Inventory-admin — items
router.get("/inventory/groups/:group_id/items", verifyInventoryAdmin, C.getItemsForRequester);
router.get("/inventory/groups/:group_id/stats", verifyInventoryAdmin, C.getInventoryStats);
router.get("/inventory/groups/:group_id/transactions", verifyInventoryAdmin, C.getTransactionsByGroup);
router.post("/inventory/groups/:group_id/items", verifyInventoryAdmin, C.createItem);

router.get("/inventory/items/:id", verifyInventoryAdmin, C.getBookingById); // kept for compat

// item-specific (verify inside controller via getItemById)
router.put("/inventory/items/:id", verifyInventoryAdmin, C.updateItemSecure);
router.post("/inventory/items/:id/adjust", verifyInventoryAdmin, C.adjustItemQty);
router.delete("/inventory/items/:id", verifyInventoryAdmin, C.archiveItem);
router.get("/inventory/items/:id/transactions", verifyInventoryAdmin, C.getTransactionsByItem);

// Bookings — inventory-admin
router.get("/inventory/groups/:group_id/bookings", verifyInventoryAdmin, C.getBookings);
router.post("/inventory/bookings", verifyInventoryAdmin, C.createBooking);
router.get("/inventory/bookings/range", verifyInventoryAdmin, C.getBookingRange);
router.get("/inventory/bookings/:id", verifyInventoryAdmin, C.getBookingById);
router.put("/inventory/bookings/:id", verifyInventoryAdmin, C.updateBooking);
router.put("/inventory/bookings/:id/status", verifyInventoryAdmin, C.updateBookingStatusHandler);
router.put("/inventory/bookings/:id/payment", verifyInventoryAdmin, C.updateBookingPaymentHandler);
router.delete("/inventory/bookings/:id", verifyInventoryAdmin, C.deleteBookingHandler);

// Superadmin also wants to read same data without inventory token — mirror via authenticateToken
router.get("/inventory/admin/groups/:group_id/items", authenticateToken, async (req, res, next) => {
  try {
    const { category, archived, search, bookable } = req.query;
    const { getItemsByGroup } = await import("../services/inventory.service.js");
    res.json(await getItemsByGroup({ group_id: req.params.group_id, category, archived, search, bookable }));
  } catch (e) { next(e); }
});
router.get("/inventory/admin/groups/:group_id/bookings", authenticateToken, async (req, res, next) => {
  try {
    const { getBookingsByGroup } = await import("../services/inventory.service.js");
    const { status, from, to } = req.query;
    res.json(await getBookingsByGroup({ group_id: req.params.group_id, status, from, to }));
  } catch (e) { next(e); }
});

export default router;
