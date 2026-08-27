import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InventoryAdmin.module.css";
import toast from "react-hot-toast";
import { FaSignOutAlt, FaPlus, FaExchangeAlt } from "react-icons/fa";
import {
  fetchInventoryItems,
  createInventoryItem,
  updateInventoryItem,
  archiveInventoryItem,
  adjustInventoryItem,
  fetchInventoryStats,
  fetchBookings,
  createBooking,
  updateBookingStatus,
  updateBookingPayment,
  deleteBooking,
  fetchInventoryWindowPublic,
} from "@/api/inventory.api";

const CATEGORIES = ["technical", "publicity", "choir", "pastoral", "catering", "committee", "scc"];
const BOOKABLE_CATS = ["technical", "publicity", "catering", "choir"];

const InventoryAdmin = () => {
  const navigate = useNavigate();
  const storedGroups = JSON.parse(localStorage.getItem("inventory_groups") || "[]");
  const storedGroup = JSON.parse(localStorage.getItem("inventory_group") || "null");
  const [selectedGroup, setSelectedGroup] = useState(storedGroup || storedGroups[0] || null);
  const [items, setItems] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("records"); // records | bookings
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [bookingFilter, setBookingFilter] = useState("all");
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({ category: "technical", name: "", quantity_total: 1, unit: "pieces", condition: "good", is_bookable: false, unit_cost: 0, acquisition_cost: 0, description: "" });
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({ item_id: "", quantity: 1, booked_by_name: "", booked_by_phone: "", booked_by_email: "", booking_date: new Date().toISOString().split("T")[0], return_due_date: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0], purpose: "" });
  const [windowLocked, setWindowLocked] = useState(false);
  const [windowInfo, setWindowInfo] = useState(null);

  const loadAll = useCallback(async () => {
    if (!selectedGroup) return;
    setLoading(true);
    try {
      const [its, bks, st, win] = await Promise.all([
        fetchInventoryItems(selectedGroup.id),
        fetchBookings(selectedGroup.id),
        fetchInventoryStats(selectedGroup.id),
        fetchInventoryWindowPublic(selectedGroup.id),
      ]);
      setItems(its);
      setBookings(bks);
      setStats(st);
      setWindowInfo(win);
      if (selectedGroup.type === "scc" && win && win.is_open === false) setWindowLocked(true);
      else if (selectedGroup.type === "scc" && win && win.window_start && win.window_end) {
        const today = new Date().toISOString().split("T")[0];
        const s = String(win.window_start).slice(0, 10);
        const e = String(win.window_end).slice(0, 10);
        setWindowLocked(today < s || today > e || win.is_open === false);
      } else setWindowLocked(false);
    } catch (e) { toast.error(e.message || "Failed to load"); } finally { setLoading(false); }
  }, [selectedGroup]);

  useEffect(() => { loadAll(); }, [loadAll]);

  const handleGroupSwitch = (gid) => {
    const g = storedGroups.find((x) => String(x.id) === String(gid));
    if (!g) return;
    setSelectedGroup(g);
    localStorage.setItem("inventory_group", JSON.stringify(g));
  };

  const handleLogout = () => {
    localStorage.removeItem("inventory_token");
    localStorage.removeItem("inventory_groups");
    localStorage.removeItem("inventory_group");
    navigate("/inventory-login", { replace: true });
    toast.success("Signed out");
  };

  const handleCreateItem = async (e) => {
    e.preventDefault();
    if (windowLocked) return toast.error("SCC inventory locked — outside regime window");
    setSaving(true);
    try {
      if (editingItem) {
        const upd = await updateInventoryItem(editingItem.id, { name: itemForm.name, category: itemForm.category, unit: itemForm.unit, condition: itemForm.condition, is_bookable: itemForm.is_bookable, unit_cost: Number(itemForm.unit_cost), acquisition_cost: Number(itemForm.acquisition_cost), description: itemForm.description });
        setItems((p) => p.map((x) => x.id === upd.id ? upd : x));
        toast.success("Item updated");
      } else {
        const created = await createInventoryItem(selectedGroup.id, { ...itemForm, quantity_total: Number(itemForm.quantity_total), unit_cost: Number(itemForm.unit_cost), acquisition_cost: Number(itemForm.acquisition_cost) });
        setItems((p) => [...p, created]);
        toast.success("Item created");
      }
      setShowItemModal(false); setEditingItem(null);
    } catch (e) { toast.error(e.message); } finally { setSaving(false); }
  };

  const handleArchive = async (id) => {
    if (!window.confirm("Archive this item? It will be hidden but history kept.")) return;
    try { await archiveInventoryItem(id); setItems((p) => p.filter((x) => x.id !== id)); toast.success("Archived"); } catch (e) { toast.error(e.message); }
  };

  const handleBookingCreate = async (e) => {
    e.preventDefault();
    try {
      const b = await createBooking({ group_id: selectedGroup.id, item_id: Number(bookingForm.item_id), quantity: Number(bookingForm.quantity), booked_by_name: bookingForm.booked_by_name, booked_by_phone: bookingForm.booked_by_phone, booked_by_email: bookingForm.booked_by_email, booking_date: bookingForm.booking_date, return_due_date: bookingForm.return_due_date, purpose: bookingForm.purpose });
      setBookings((p) => [b, ...p]);
      setShowBookingModal(false);
      toast.success("Booking created (pending)");
      loadAll();
    } catch (e) { toast.error(e.message); }
  };

  const handleStatus = async (id, status) => {
    try { const upd = await updateBookingStatus(id, { status }); setBookings((p) => p.map((x) => x.id === upd.id ? upd : x)); toast.success(`Booking ${status}`); loadAll(); } catch (e) { toast.error(e.message); }
  };

  const handlePayment = async (id) => {
    const amt = window.prompt("Enter amount paid (KES):");
    if (amt === null) return;
    try { const upd = await updateBookingPayment(id, { amount_paid: Number(amt) }); setBookings((p) => p.map((x) => x.id === upd.id ? upd : x)); toast.success("Payment updated"); } catch (e) { toast.error(e.message); }
  };

  const filteredItems = items.filter((it) => {
    const mSearch = !search || it.name.toLowerCase().includes(search.toLowerCase()) || (it.description && it.description.toLowerCase().includes(search.toLowerCase()));
    const mCat = categoryFilter === "all" || it.category === categoryFilter;
    const mArch = !it.archived;
    return mSearch && mCat && mArch;
  });

  const filteredBookings = bookings.filter((b) => bookingFilter === "all" || b.status === bookingFilter);

  if (!selectedGroup) {
    return (
      <div className={styles.page}>
        <div className={styles.banner}>No group selected. <button className={styles.miniBtn} onClick={handleLogout}>Login again</button></div>
      </div>
    );
  }

  if (loading) return <div className={styles.page}><p style={{ color: "#9ca3af" }}>Loading inventory…</p></div>;

  return (
    <div className={styles.page}>
      <div className={styles.topBar}>
        <div className={styles.titleBlock}>
          <span className={styles.eyebrow}>JKUAT CATCOM</span>
          <h1 className={styles.title}>{selectedGroup.name} Inventory</h1>
          <span className={styles.typeBadge}>{selectedGroup.type}</span>
        </div>
        <div className={styles.topActions}>
          {storedGroups.length > 1 && (
            <select className={styles.switcher} value={selectedGroup.id} onChange={(e) => handleGroupSwitch(e.target.value)}>
              {storedGroups.map((g) => <option key={g.id} value={g.id}>{g.name} ({g.type})</option>)}
            </select>
          )}
          <button className={styles.logoutBtn} onClick={handleLogout}><FaSignOutAlt /> Sign Out</button>
        </div>
      </div>

      {windowLocked && <div className={styles.banner}>⚠️ SCC inventory is locked — can only be updated at the beginning of the regime. Window: {windowInfo?.window_start?.slice(0, 10)} → {windowInfo?.window_end?.slice(0, 10)}. Contact superadmin.</div>}

      {stats && (
        <div className={styles.statsRow}>
          <div className={styles.statCard}><span className={styles.statLabel}>Total Items</span><span className={styles.statValue}>{stats.total_items}</span><span className={styles.statSub}>{stats.total_qty} total qty</span></div>
          <div className={styles.statCard}><span className={styles.statLabel}>Available</span><span className={styles.statValue}>{stats.total_available}</span><span className={styles.statSub}>out of {stats.total_qty}</span></div>
          <div className={styles.statCard}><span className={styles.statLabel}>Value (KES)</span><span className={styles.statValue}>{Number(stats.total_value).toLocaleString()}</span><span className={styles.statSub}>acquisition</span></div>
          <div className={styles.statCard}><span className={styles.statLabel}>Bookings</span><span className={styles.statValue}>{stats.active_bookings || 0} active</span><span className={styles.statSub}>{stats.pending_bookings || 0} pending • {stats.overdue_bookings || 0} overdue</span></div>
          <div className={styles.statCard}><span className={styles.statLabel}>Low/Out</span><span className={styles.statValue}>{Number(stats.low_stock) + Number(stats.out_of_stock)}</span><span className={styles.statSub}>{stats.low_stock} low • {stats.out_of_stock} out</span></div>
        </div>
      )}

      <div className={styles.tabs}>
        <button className={`${styles.tabBtn} ${activeTab === "records" ? styles.tabActive : ""}`} onClick={() => setActiveTab("records")}>Records (Ledger)</button>
        <button className={`${styles.tabBtn} ${activeTab === "bookings" ? styles.tabActive : ""}`} onClick={() => setActiveTab("bookings")}>Bookings ({bookings.length})</button>
      </div>

      {activeTab === "records" ? (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Records — {CATEGORIES.map((c) => c.charAt(0).toUpperCase() + c.slice(1)).join(" • ")}</h3>
            <button className={styles.primaryBtn} onClick={() => { setEditingItem(null); setItemForm({ category: "technical", name: "", quantity_total: 1, unit: "pieces", condition: "good", is_bookable: false, unit_cost: 0, acquisition_cost: 0, description: "" }); setShowItemModal(true); }} disabled={windowLocked}><FaPlus /> Add Item</button>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <input className={styles.searchInput} placeholder="Search items…" value={search} onChange={(e) => setSearch(e.target.value)} />
            <select className={styles.select} value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="all">All Categories</option>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          {filteredItems.length === 0 ? <p style={{ color: "#9ca3af", textAlign: "center", padding: 20 }}>No items. Add one to get started.</p> : (
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr><th>Item</th><th>Category</th><th>Qty (avail/total)</th><th>Unit</th><th>Condition</th><th>Bookable</th><th>Cost</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredItems.map((it) => (
                    <tr key={it.id}>
                      <td><strong>{it.name}</strong>{it.description && <div style={{ fontSize: 11, color: "#6b7280" }}>{it.description}</div>}</td>
                      <td><span className={`${styles.pill} ${styles["pill" + it.category.charAt(0).toUpperCase() + it.category.slice(1)] || ""}`}>{it.category}</span></td>
                      <td>{it.quantity_available} / {it.quantity_total} {Number(it.quantity_available) <= 2 && <span style={{ color: "#ef4444", fontWeight: 700 }}> • low</span>}</td>
                      <td>{it.unit}</td>
                      <td>{it.condition}</td>
                      <td>{it.is_bookable ? "✓" : "—"} {BOOKABLE_CATS.includes(it.category) && !it.is_bookable && <span style={{ color: "#9ca3af" }}>(can enable)</span>}</td>
                      <td>{Number(it.unit_cost) > 0 ? `KES ${Number(it.unit_cost).toLocaleString()}` : "—"}</td>
                      <td>
                        <div className={styles.actionsCell}>
                          <button className={styles.miniBtn} onClick={() => { setEditingItem(it); setItemForm({ category: it.category, name: it.name, quantity_total: it.quantity_total, unit: it.unit, condition: it.condition, is_bookable: it.is_bookable, unit_cost: it.unit_cost, acquisition_cost: it.acquisition_cost, description: it.description || "" }); setShowItemModal(true); }}>Edit</button>
                          <button className={styles.miniBtn} onClick={async () => { const d = window.prompt("Adjust available qty by (e.g. 2 or -1):"); if (d === null) return; try { const upd = await adjustInventoryItem(it.id, { delta_available: Number(d), delta_total: Number(d), reason: "Manual adjust" }); setItems((p) => p.map((x) => x.id === upd.id ? upd : x)); toast.success("Adjusted"); } catch (e) { toast.error(e.message); } }}><FaExchangeAlt /> Adjust</button>
                          <button className={`${styles.miniBtn} ${styles.danger}`} onClick={() => handleArchive(it.id)}>Archive</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3 className={styles.sectionTitle}>Bookings — hire at a cost (Technical & Publicity, Catering, Choir)</h3>
            <button className={styles.primaryBtn} onClick={() => { setBookingForm({ item_id: "", quantity: 1, booked_by_name: "", booked_by_phone: "", booked_by_email: "", booking_date: new Date().toISOString().split("T")[0], return_due_date: new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0], purpose: "" }); setShowBookingModal(true); }}><FaPlus /> New Booking</button>
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            <select className={styles.select} value={bookingFilter} onChange={(e) => setBookingFilter(e.target.value)}>
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="issued">Issued</option>
              <option value="returned">Returned</option>
              <option value="cancelled">Cancelled</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          {filteredBookings.length === 0 ? <p style={{ color: "#9ca3af", textAlign: "center", padding: 20 }}>No bookings yet.</p> : (
            <div className={styles.tableWrap}>
              <table>
                <thead>
                  <tr><th>Item</th><th>Borrower</th><th>Qty</th><th>Dates</th><th>Cost (paid/total)</th><th>Status</th><th>Payment</th><th>Actions</th></tr>
                </thead>
                <tbody>
                  {filteredBookings.map((b) => (
                    <tr key={b.id}>
                      <td><strong>{b.item_name || b.item_id}</strong><div style={{ fontSize: 11, color: "#6b7280" }}>{b.item_category}</div></td>
                      <td>{b.booked_by_name}<div style={{ fontSize: 11, color: "#6b7280" }}>{b.booked_by_phone || ""} {b.borrower_type}</div></td>
                      <td>{b.quantity}</td>
                      <td>{String(b.booking_date).slice(0, 10)} → {String(b.return_due_date).slice(0, 10)}{b.return_date && <div style={{ fontSize: 11, color: "#059669" }}>returned {String(b.return_date).slice(0, 10)}</div>}{b.is_overdue && <div style={{ color: "#dc2626", fontWeight: 700, fontSize: 11 }}>OVERDUE</div>}</td>
                      <td>KES {Number(b.amount_paid).toLocaleString()} / {Number(b.total_cost).toLocaleString()}<div style={{ fontSize: 11, color: "#6b7280" }}>unit {Number(b.unit_cost).toLocaleString()}</div></td>
                      <td><span className={`${styles.pill} ${styles["status" + b.status.charAt(0).toUpperCase() + b.status.slice(1)] || ""}`}>{b.status}</span></td>
                      <td><span className={`${styles.pill} pill`}>{b.payment_status}</span></td>
                      <td>
                        <div className={styles.actionsCell}>
                          {b.status === "pending" && <button className={styles.miniBtn} onClick={() => handleStatus(b.id, "approved")}>Approve</button>}
                          {b.status === "approved" && <button className={styles.miniBtn} onClick={() => handleStatus(b.id, "issued")}>Issue</button>}
                          {(b.status === "issued" || b.status === "approved" || b.status === "overdue") && <button className={styles.miniBtn} onClick={() => handleStatus(b.id, "returned")}>Mark Returned</button>}
                          {b.status !== "returned" && b.status !== "cancelled" && <button className={`${styles.miniBtn} ${styles.danger}`} onClick={() => handleStatus(b.id, "cancelled")}>Cancel</button>}
                          <button className={styles.miniBtn} onClick={() => handlePayment(b.id)}>Payment</button>
                          <button className={`${styles.miniBtn} ${styles.danger}`} onClick={async () => { if (!window.confirm("Delete booking? Stock will be restored if approved/issued.")) return; try { await deleteBooking(b.id); setBookings((p) => p.filter((x) => x.id !== b.id)); loadAll(); toast.success("Deleted"); } catch (e) { toast.error(e.message); } }}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {showItemModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowItemModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>{editingItem ? "Edit Item" : "Add Item"} — {selectedGroup.name}</h3>
            <form className={styles.formGrid} onSubmit={handleCreateItem}>
              <input placeholder="Item name *" value={itemForm.name} onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })} required />
              <select value={itemForm.category} onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
              <input type="number" min="0" placeholder="Qty total" value={itemForm.quantity_total} onChange={(e) => setItemForm({ ...itemForm, quantity_total: e.target.value })} required />
              <select value={itemForm.unit} onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}>
                <option value="pieces">pieces</option><option value="sets">sets</option><option value="pairs">pairs</option><option value="boxes">boxes</option><option value="litres">litres</option><option value="kg">kg</option><option value="other">other</option>
              </select>
              <select value={itemForm.condition} onChange={(e) => setItemForm({ ...itemForm, condition: e.target.value })}>
                <option value="new">new</option><option value="good">good</option><option value="fair">fair</option><option value="damaged">damaged</option><option value="lost">lost</option>
              </select>
              <label style={{ display: "flex", gap: 6, alignItems: "center", fontSize: 13 }}><input type="checkbox" checked={itemForm.is_bookable} onChange={(e) => setItemForm({ ...itemForm, is_bookable: e.target.checked })} /> Bookable (for hire)</label>
              <input type="number" step="0.01" placeholder="Hire cost per unit (KES)" value={itemForm.unit_cost} onChange={(e) => setItemForm({ ...itemForm, unit_cost: e.target.value })} />
              <input type="number" step="0.01" placeholder="Acquisition cost" value={itemForm.acquisition_cost} onChange={(e) => setItemForm({ ...itemForm, acquisition_cost: e.target.value })} />
              <textarea className={styles.full} placeholder="Description" value={itemForm.description} onChange={(e) => setItemForm({ ...itemForm, description: e.target.value })} rows={2} />
              <div className={styles.formActions} style={{ gridColumn: "1 / -1" }}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowItemModal(false)}>Cancel</button>
                <button type="submit" className={styles.primaryBtn} disabled={saving}>{saving ? "Saving…" : editingItem ? "Update" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showBookingModal && (
        <div className={styles.modalBackdrop} onClick={() => setShowBookingModal(false)}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h3 className={styles.modalTitle}>New Booking</h3>
            <form className={styles.formGrid} onSubmit={handleBookingCreate}>
              <select value={bookingForm.item_id} onChange={(e) => setBookingForm({ ...bookingForm, item_id: e.target.value })} required>
                <option value="">Select bookable item…</option>
                {items.filter((it) => it.is_bookable && !it.archived && it.quantity_available > 0).map((it) => <option key={it.id} value={it.id}>{it.name} — {it.quantity_available} avail @ KES {Number(it.unit_cost).toLocaleString()}</option>)}
              </select>
              <input type="number" min="1" placeholder="Qty" value={bookingForm.quantity} onChange={(e) => setBookingForm({ ...bookingForm, quantity: e.target.value })} required />
              <input placeholder="Borrower name *" value={bookingForm.booked_by_name} onChange={(e) => setBookingForm({ ...bookingForm, booked_by_name: e.target.value })} required />
              <input placeholder="Phone (07…)" value={bookingForm.booked_by_phone} onChange={(e) => setBookingForm({ ...bookingForm, booked_by_phone: e.target.value })} />
              <input type="email" placeholder="Borrower email" value={bookingForm.booked_by_email} onChange={(e) => setBookingForm({ ...bookingForm, booked_by_email: e.target.value })} />
              <input type="date" value={bookingForm.booking_date} onChange={(e) => setBookingForm({ ...bookingForm, booking_date: e.target.value })} required />
              <input type="date" value={bookingForm.return_due_date} onChange={(e) => setBookingForm({ ...bookingForm, return_due_date: e.target.value })} required />
              <textarea className={styles.full} placeholder="Purpose / notes" value={bookingForm.purpose} onChange={(e) => setBookingForm({ ...bookingForm, purpose: e.target.value })} rows={2} />
              <div className={styles.formActions} style={{ gridColumn: "1 / -1" }}>
                <button type="button" className={styles.cancelBtn} onClick={() => setShowBookingModal(false)}>Cancel</button>
                <button type="submit" className={styles.primaryBtn}>Create Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryAdmin;
