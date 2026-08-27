import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./InventoryManagement.module.css";
import toast from "react-hot-toast";
import { FaPlus, FaSearch, FaBoxes } from "react-icons/fa";
import {
  fetchInventoryGroups,
  fetchInventoryGroupAdmin,
  createInventoryGroupAdmin,
  updateInventoryGroupAdminPassword,
  deleteInventoryGroupAdmin,
  fetchAllInventoryAdmins,
  grantInventoryAdminGroup,
  revokeInventoryAdminGroup,
  deleteInventoryAdminById,
  fetchRegimes,
  createRegime,
  updateRegime,
  deleteRegime,
  upsertEditWindow,
  fetchEditWindow,
  createInventoryGroup,
  updateInventoryGroup,
  deleteInventoryGroup,
} from "@/api/inventory.api";
import InventoryAdminPanel from "./widgets/InventoryAdminPanel/InventoryAdminPanel";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "technical", label: "Technical" },
  { key: "publicity", label: "Publicity" },
  { key: "choir", label: "Choir" },
  { key: "pastoral", label: "Pastoral" },
  { key: "catering", label: "Catering" },
  { key: "committee", label: "Committee" },
  { key: "scc", label: "SCC" },
];

const InventoryManagement = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [groupAdmins, setGroupAdmins] = useState({});
  const [adminForms, setAdminForms] = useState({});
  const [showPasswords, setShowPasswords] = useState({});
  const [adminSaving, setAdminSaving] = useState({});
  const [allAdmins, setAllAdmins] = useState([]);
  const [showGroupForm, setShowGroupForm] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);
  const [groupForm, setGroupForm] = useState({ name: "", type: "technical" });
  const [savingGroup, setSavingGroup] = useState(false);
  const [regimes, setRegimes] = useState([]);
  const [showRegimeForm, setShowRegimeForm] = useState(false);
  const [regimeForm, setRegimeForm] = useState({ name: "", start_date: "", end_date: "", is_active: false });
  const [windowForms, setWindowForms] = useState({});
  const navigate = useNavigate();

  useEffect(() => { loadGroups(); loadRegimes(); loadAllAdmins(); }, []);

  const loadGroups = async () => {
    try {
      const data = await fetchInventoryGroups();
      setGroups(data);
    } catch { toast.error("Failed to load groups"); } finally { setLoading(false); }
  };
  const loadRegimes = async () => {
    try { setRegimes(await fetchRegimes()); } catch {}
  };
  const loadAllAdmins = async () => {
    try { setAllAdmins(await fetchAllInventoryAdmins()); } catch {}
  };
  const loadGroupAdmin = async (group_id) => {
    try {
      const admins = await fetchInventoryGroupAdmin(group_id);
      setGroupAdmins((p) => ({ ...p, [group_id]: admins }));
      // also load window for SCC
      const w = await fetchEditWindow(group_id);
      setWindowForms((p) => ({ ...p, [group_id]: w }));
    } catch { setGroupAdmins((p) => ({ ...p, [group_id]: [] })); }
  };

  const handleExpand = (gid) => {
    if (expandedGroup === gid) setExpandedGroup(null);
    else { setExpandedGroup(gid); loadGroupAdmin(gid); }
  };

  const handleGroupSubmit = async (e) => {
    e.preventDefault();
    setSavingGroup(true);
    try {
      if (editingGroup) {
        const upd = await updateInventoryGroup(editingGroup.id, groupForm);
        setGroups((p) => p.map((g) => g.id === upd.id ? upd : g));
        toast.success("Group updated");
      } else {
        const ng = await createInventoryGroup(groupForm);
        setGroups((p) => [...p, ng]);
        toast.success("Group created");
      }
      setGroupForm({ name: "", type: "technical" }); setEditingGroup(null); setShowGroupForm(false);
    } catch (e) { toast.error(e.message || "Failed"); } finally { setSavingGroup(false); }
  };

  const handleDeleteGroup = async (id) => {
    if (!window.confirm("Delete this group and all its inventory/bookings?")) return;
    try { await deleteInventoryGroup(id); setGroups((p) => p.filter((g) => g.id !== id)); toast.success("Deleted"); } catch (e) { toast.error(e.message); }
  };

  const handleAdminChange = (gid, field, value) => setAdminForms((p) => ({ ...p, [gid]: { ...(p[gid] || { email: "", password: "", full_name: "" }), [field]: value } }));
  const togglePw = (k) => setShowPasswords((p) => ({ ...p, [k]: !p[k] }));

  const handleCreateAdmin = async (gid) => {
    const f = adminForms[gid] || {};
    if (!f.email || !f.password) return toast.error("Email & password required");
    if (f.password.length < 6) return toast.error("Min 6 chars");
    setAdminSaving((p) => ({ ...p, [gid]: "creating" }));
    try {
      await createInventoryGroupAdmin(gid, { email: f.email, password: f.password, full_name: f.full_name });
      setAdminForms((p) => ({ ...p, [gid]: { email: "", password: "", full_name: "" } }));
      loadGroupAdmin(gid); loadAllAdmins(); toast.success("Inventory admin created");
    } catch (e) { toast.error(e.message); } finally { setAdminSaving((p) => ({ ...p, [gid]: null })); }
  };
  const handleUpdatePw = async (gid) => {
    const f = adminForms[gid] || {};
    if (!f.password || f.password.length < 6) return toast.error("Min 6 chars");
    setAdminSaving((p) => ({ ...p, [gid]: "updating" }));
    try { await updateInventoryGroupAdminPassword(gid, f.password); setAdminForms((p) => ({ ...p, [gid]: { ...p[gid], password: "" } })); toast.success("Password updated"); } catch (e) { toast.error(e.message); } finally { setAdminSaving((p) => ({ ...p, [gid]: null })); }
  };
  const handleDeleteAdmin = async (gid) => {
    if (!window.confirm("Remove inventory admin for this group?")) return;
    try { await deleteInventoryGroupAdmin(gid); setGroupAdmins((p) => ({ ...p, [gid]: [] })); loadAllAdmins(); toast.success("Removed"); } catch (e) { toast.error(e.message); }
  };
  const handleGrant = async (admin_id, group_id) => {
    try { await grantInventoryAdminGroup(admin_id, group_id); loadAllAdmins(); toast.success("Granted"); } catch (e) { toast.error(e.message); }
  };
  const handleRevoke = async (admin_id, group_id) => {
    try { await revokeInventoryAdminGroup(admin_id, group_id); loadAllAdmins(); toast.success("Revoked"); } catch (e) { toast.error(e.message); }
  };

  const handleRegimeSubmit = async (e) => {
    e.preventDefault();
    try {
      await createRegime(regimeForm); setRegimeForm({ name: "", start_date: "", end_date: "", is_active: false }); setShowRegimeForm(false); loadRegimes(); toast.success("Regime created");
    } catch (e) { toast.error(e.message); }
  };
  const handleWindowSave = async (gid) => {
    const w = windowForms[gid];
    if (!w) return;
    try { await upsertEditWindow(gid, { regime_id: w.regime_id || null, window_start: w.window_start, window_end: w.window_end, is_open: !!w.is_open }); toast.success("Window saved"); } catch (e) { toast.error(e.message); }
  };

  const filtered = groups.filter((g) => {
    const mSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const mType = activeFilter === "all" || g.type === activeFilter || g.type?.toLowerCase() === activeFilter;
    return mSearch && mType;
  });

  if (loading) return <p className={styles.loading}>Loading inventory…</p>;

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}><FaBoxes style={{ marginRight: 8 }} />Inventory Management</h2>
          <p className={styles.sub}>Manage groups, inventory accounts (M:N), and SCC regime windows. Mirrors Attendance Other Tools.</p>
        </div>
        <button className={styles.newBtn} onClick={() => { setShowGroupForm(!showGroupForm); setEditingGroup(null); setGroupForm({ name: "", type: "technical" }); }}>
          <FaPlus /> New Group
        </button>
      </div>

      {showGroupForm && (
        <form className={styles.groupForm} onSubmit={handleGroupSubmit}>
          <input className={styles.input} placeholder="Group name" value={groupForm.name} onChange={(e) => setGroupForm({ ...groupForm, name: e.target.value })} required />
          <select className={styles.input} value={groupForm.type} onChange={(e) => setGroupForm({ ...groupForm, type: e.target.value })}>
            {FILTERS.filter((f) => f.key !== "all").map((f) => <option key={f.key} value={f.key}>{f.label}</option>)}
            <option value="group">Group</option>
            <option value="other">Other</option>
          </select>
          <button className={styles.saveBtn} type="submit" disabled={savingGroup}>{savingGroup ? "Saving…" : editingGroup ? "Update Group" : "Create Group"}</button>
          <button className={styles.cancelBtn} type="button" onClick={() => { setShowGroupForm(false); setEditingGroup(null); }}>Cancel</button>
        </form>
      )}

      <div className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input className={styles.searchInput} placeholder="Search groups…" value={search} onChange={(e) => setSearch(e.target.value)} />
          {search && <button className={styles.clearBtn} onClick={() => setSearch("")}>×</button>}
        </div>
        <div className={styles.filters}>
          {FILTERS.map((f) => (
            <button key={f.key} className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ""}`} onClick={() => setActiveFilter(f.key)}>{f.label}</button>
          ))}
        </div>
      </div>

      {filtered.length === 0 ? <div className={styles.empty}>No groups match.</div> : (
        <div className={styles.groupListWrap}>
          <div className={styles.groupList}>
            {filtered.map((group) => (
              <div key={group.id} className={styles.card}>
                <div className={styles.row}>
                  <div className={styles.info}>
                    <span className={styles.name}>{group.name}</span>
                    <div className={styles.meta}>
                      <span className={styles.typePill}>{group.type?.toUpperCase()}</span>
                      <span className={styles.counts}>{group.item_count || 0} items • {group.active_booking_count || 0} active bookings</span>
                      {group.admin_email && <span className={styles.adminEmail}>{group.admin_email}</span>}
                    </div>
                  </div>
                  <div className={styles.actions}>
                    <button className={styles.iconBtn} onClick={() => navigate(`/inventory-login/${group.id}`)}>Open Login →</button>
                    <button className={styles.iconBtn} onClick={() => { setEditingGroup(group); setGroupForm({ name: group.name, type: group.type }); setShowGroupForm(true); }}>Edit</button>
                    <button className={`${styles.iconBtn} ${styles.danger}`} onClick={() => handleDeleteGroup(group.id)}>Delete</button>
                    <button className={`${styles.iconBtn} ${expandedGroup === group.id ? styles.active : ""}`} onClick={() => handleExpand(group.id)}>{expandedGroup === group.id ? "Hide" : "Manage"} Admin</button>
                  </div>
                </div>
                {expandedGroup === group.id && (
                  <InventoryAdminPanel
                    groupId={group.id}
                    admins={groupAdmins[group.id] || []}
                    adminForm={adminForms[group.id] || { email: "", password: "", full_name: "" }}
                    showPasswords={showPasswords}
                    onFormChange={handleAdminChange}
                    onTogglePassword={togglePw}
                    onCreateAdmin={handleCreateAdmin}
                    onUpdatePassword={handleUpdatePw}
                    onDeleteAdmin={handleDeleteAdmin}
                    adminSaving={adminSaving[group.id]}
                    windowForm={windowForms[group.id] || {}}
                    onWindowChange={(field, val) => setWindowForms((p) => ({ ...p, [group.id]: { ...p[group.id], [field]: val } }))}
                    onWindowSave={() => handleWindowSave(group.id)}
                    groupType={group.type}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multi-group grants */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Inventory Admins (multi-group)</h3>
        <p className={styles.sub}>Superadmin can grant an admin access to additional groups/SCCs after initial creation.</p>
        {allAdmins.length === 0 ? <p className={styles.empty}>No inventory admins yet.</p> : allAdmins.map((a) => (
          <div key={a.id} className={styles.adminRow}>
            <div className={styles.adminInfo}>
              <strong>{a.email}</strong> {a.full_name && <span>— {a.full_name}</span>}
              <div className={styles.groupPills}>
                {(a.groups || []).map((g) => (
                  <span key={g.id} className={styles.groupPill}>
                    {g.name} <button className={styles.xBtn} onClick={() => handleRevoke(a.id, g.id)}>×</button>
                  </span>
                ))}
              </div>
            </div>
            <div className={styles.grantRow}>
              <select className={styles.miniSelect} id={`grant-${a.id}`} defaultValue="">
                <option value="" disabled>Add group…</option>
                {groups.filter((g) => !(a.groups || []).some((ag) => ag.id === g.id)).map((g) => <option key={g.id} value={g.id}>{g.name} ({g.type})</option>)}
              </select>
              <button className={styles.miniBtn} onClick={() => {
                const sel = document.getElementById(`grant-${a.id}`);
                if (!sel.value) return toast.error("Select a group");
                handleGrant(a.id, Number(sel.value));
              }}>Grant</button>
              <button className={`${styles.miniBtn} ${styles.dangerBtn}`} onClick={async () => { if (!window.confirm("Delete this inventory account entirely?")) return; try { await deleteInventoryAdminById(a.id); await loadAllAdmins(); toast.success("Deleted"); } catch (e) { toast.error(e.message); } }}>Delete Account</button>
            </div>
          </div>
        ))}
      </div>

      {/* Regimes */}
      <div className={styles.section}>
        <div className={styles.sectionHeader}>
          <h3 className={styles.sectionTitle}>SCC Regimes (edit windows)</h3>
          <button className={styles.newBtn} onClick={() => setShowRegimeForm(!showRegimeForm)}><FaPlus /> {showRegimeForm ? "Close" : "New Regime"}</button>
        </div>
        <p className={styles.sub}>SCC inventory can only be updated at the beginning of a regime. Create regimes and open windows per SCC.</p>
        {showRegimeForm && (
          <form className={styles.groupForm} onSubmit={handleRegimeSubmit}>
            <input className={styles.input} placeholder="Regime name (e.g. 2026/1)" value={regimeForm.name} onChange={(e) => setRegimeForm({ ...regimeForm, name: e.target.value })} required />
            <input className={styles.input} type="date" value={regimeForm.start_date} onChange={(e) => setRegimeForm({ ...regimeForm, start_date: e.target.value })} required />
            <input className={styles.input} type="date" value={regimeForm.end_date} onChange={(e) => setRegimeForm({ ...regimeForm, end_date: e.target.value })} required />
            <label className={styles.checkLabel}><input type="checkbox" checked={regimeForm.is_active} onChange={(e) => setRegimeForm({ ...regimeForm, is_active: e.target.checked })} /> Active</label>
            <button className={styles.saveBtn} type="submit">Create</button>
          </form>
        )}
        {regimes.length === 0 ? <p className={styles.empty}>No regimes yet.</p> : (
          <div className={styles.regimeList}>
            {regimes.map((r) => (
              <div key={r.id} className={styles.regimeCard}>
                <span><strong>{r.name}</strong> {r.start_date?.slice(0, 10)} → {r.end_date?.slice(0, 10)} {r.is_active && <span className={styles.activePill}>ACTIVE</span>}</span>
                <div className={styles.regimeActions}>
                  {!r.is_active && <button className={styles.miniBtn} onClick={async () => { await updateRegime(r.id, { is_active: true }); loadRegimes(); toast.success("Activated"); }}>Activate</button>}
                  <button className={`${styles.miniBtn} ${styles.dangerBtn}`} onClick={async () => { if (window.confirm("Delete regime?")) { await deleteRegime(r.id); loadRegimes(); toast.success("Deleted"); } }}>Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default InventoryManagement;
