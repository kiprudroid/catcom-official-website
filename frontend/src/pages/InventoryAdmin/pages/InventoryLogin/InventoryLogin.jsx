import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaChevronRight, FaBoxes } from "react-icons/fa";
import { FaCross } from "react-icons/fa";
import styles from "./InventoryLogin.module.css";
import { loginInventoryAdmin, fetchInventoryGroups } from "@/api/inventory.api";
import toast from "react-hot-toast";

const TYPE_FILTERS = ["All", "Group", "SCC", "Other"];

const InventoryLogin = () => {
  const { groupId } = useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchInventoryGroups()
      .then((data) => {
        const filtered = data.filter((g) => g.admin_email);
        setGroups(filtered);
        if (groupId) {
          const match = filtered.find((g) => String(g.id) === String(groupId));
          if (match) {
            setSelectedGroup(match);
            setEmail(match.admin_email || "");
          } else toast.error("Group not found");
        }
      })
      .catch(() => toast.error("Failed to load groups"))
      .finally(() => setLoadingGroups(false));
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const useEmail = email || selectedGroup?.admin_email;
    if (!useEmail) return toast.error("Enter email");
    setLoading(true);
    try {
      const data = await loginInventoryAdmin({ email: useEmail, password });
      localStorage.setItem("inventory_token", data.token);
      localStorage.setItem("inventory_groups", JSON.stringify(data.groups));
      const defaultGroup = data.groups?.[0] || null;
      if (defaultGroup) localStorage.setItem("inventory_group", JSON.stringify(defaultGroup));
      // if selectedGroup mismatched, prefer it if in list
      if (selectedGroup && data.groups?.some((g) => String(g.id) === String(selectedGroup.id))) {
        localStorage.setItem("inventory_group", JSON.stringify(selectedGroup));
      }
      navigate("/inventory-admin", { replace: true });
      toast.success("Signed in");
    } catch (err) {
      toast.error(err.message || "Invalid credentials");
      setPassword("");
    } finally { setLoading(false); }
  };

  const filteredGroups = groups.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || g.type?.toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  const pillStyle = {
    technical: { bg: "#ede9fe", color: "#6d28d9" },
    publicity: { bg: "#fef3c7", color: "#92400e" },
    choir: { bg: "#fce7f3", color: "#9d174d" },
    pastoral: { bg: "#dbeafe", color: "#1d4ed8" },
    catering: { bg: "#fef9c3", color: "#a16207" },
    committee: { bg: "#dbeafe", color: "#1d4ed8" },
    scc: { bg: "#dcfce7", color: "#15803d" },
    group: { bg: "#fce7f3", color: "#9d174d" },
    other: { bg: "#f3f4f6", color: "#374151" },
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FaCross className={styles.logo} />
        <h1 className={styles.title}>{selectedGroup ? selectedGroup.name : "Inventory Login"}</h1>
        <p className={styles.sub}>{selectedGroup ? "Enter your inventory password" : "JKUAT CATCOM — Select your group to sign in"}</p>

        <div className={styles.hintBox}>
          <FaBoxes /> Inventory records & bookings — Technical, Publicity, Choir, Pastoral, Catering, Committee & SCCs.
        </div>

        {loadingGroups ? <p className={styles.loadingText}>Loading groups…</p> : groups.length === 0 ? (
          <p className={styles.noGroups}>No inventory groups with accounts yet. Contact superadmin.</p>
        ) : !selectedGroup ? (
          <div className={styles.groupSection}>
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>⌕</span>
              <input className={styles.searchInput} placeholder="Search group..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
            <div className={styles.filterChips}>
              {TYPE_FILTERS.map((f) => (
                <button key={f} className={`${styles.chip} ${typeFilter === f ? styles.chipActive : ""}`} onClick={() => setTypeFilter(f)}>{f}</button>
              ))}
            </div>
            <div className={styles.groupList}>
              {filteredGroups.length === 0 ? <p className={styles.noGroups}>No groups match.</p> : filteredGroups.map((g) => {
                const pill = pillStyle[g.type?.toLowerCase()] || pillStyle.other;
                return (
                  <button key={g.id} className={styles.groupBtn} onClick={() => { setSelectedGroup(g); setEmail(g.admin_email || ""); }}>
                    <FaBoxes className={styles.groupIcon} />
                    <span className={styles.groupBtnName}>{g.name}</span>
                    <span className={styles.groupBtnType} style={{ background: pill.bg, color: pill.color }}>{g.type?.toUpperCase()}</span>
                    <FaChevronRight className={styles.chevron} />
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Email</label>
              <input className={styles.input} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your email" required />
            </div>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.pwWrap}>
                <input className={styles.input} type={showPassword ? "text" : "password"} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" required autoFocus />
                <button type="button" className={styles.eyeBtn} onClick={() => setShowPassword((p) => !p)} tabIndex={-1}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
              </div>
            </div>
            <button className={styles.btn} type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>
            {groupId ? <Link to="/inventory-login" className={styles.backBtn}>← Choose a different group</Link> : <button type="button" className={styles.backBtn} onClick={() => { setSelectedGroup(null); setPassword(""); }}>← Back</button>}
          </form>
        )}
        <Link to="/login" className={styles.adminLink}>Superadmin login →</Link>
        <Link to="/attendance-login" className={styles.adminLink}>Attendance login →</Link>
      </div>
    </div>
  );
};

export default InventoryLogin;
