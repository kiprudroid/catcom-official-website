import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  FaEye,
  FaEyeSlash,
  FaChevronRight,
  FaClipboardList,
} from "react-icons/fa";
import { FaCross } from "react-icons/fa";
import styles from "./AttendanceLogin.module.css";
import {
  loginAttendanceAdmin,
  fetchAttendanceGroups,
} from "@/api/attendance.api";
import toast from "react-hot-toast";

const TYPE_FILTERS = ["All", "Committee", "SCC", "Group", "Other"];

const AttendanceLogin = () => {
  const { groupId } = useParams();
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceGroups()
      .then((data) => {
        const filtered = data.filter((g) => g.admin_email);
        setGroups(filtered);
        if (groupId) {
          const match = filtered.find((g) => String(g.id) === String(groupId));
          if (match) setSelectedGroup(match);
          else toast.error("Group not found");
        }
      })
      .catch(() => toast.error("Failed to load groups"))
      .finally(() => setLoadingGroups(false));
  }, [groupId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedGroup) return;
    setLoading(true);
    try {
      const data = await loginAttendanceAdmin({
        email: selectedGroup.admin_email,
        password,
      });
      localStorage.setItem("attendance_token", data.token);
      localStorage.setItem(
        "attendance_group",
        JSON.stringify({
          id: data.group_id,
          name: data.group_name,
          type: data.group_type,
        }),
      );
      navigate("/attendance-admin", { replace: true });
    } catch (err) {
      toast.error(err.message || "Invalid password");
      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  const typePillStyle = {
    committee: { bg: "#dbeafe", color: "#1d4ed8" },
    scc: { bg: "#ccfbf1", color: "#0f766e" },
    group: { bg: "#fce7f3", color: "#9d174d" },
    other: { bg: "#f3f4f6", color: "#374151" },
  };

  const filteredGroups = groups.filter((g) => {
    const matchSearch = g.name.toLowerCase().includes(search.toLowerCase());
    const matchType =
      typeFilter === "All" ||
      g.type?.toLowerCase() === typeFilter.toLowerCase();
    return matchSearch && matchType;
  });

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FaCross className={styles.logo} />
        <h1 className={styles.title}>
          {selectedGroup ? selectedGroup.name : "Group Attendance"}
        </h1>
        <p className={styles.sub}>
          {selectedGroup
            ? "Enter your group password to continue"
            : "JKUAT CATCOM — Select your group to sign in"}
        </p>

        {loadingGroups ? (
          <p className={styles.loadingText}>Loading groups…</p>
        ) : groups.length === 0 ? (
          <p className={styles.noGroups}>
            No groups available yet. Contact the system administrator.
          </p>
        ) : !selectedGroup ? (
          /* ── Step 1: pick a group ─────────────────────────── */
          <div className={styles.groupSection}>
            {/* Search */}
            <div className={styles.searchWrap}>
              <span className={styles.searchIcon}>⌕</span>
              <input
                className={styles.searchInput}
                placeholder="Search group..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            {/* Type filter chips */}
            <div className={styles.filterChips}>
              {TYPE_FILTERS.map((f) => (
                <button
                  key={f}
                  className={`${styles.chip} ${typeFilter === f ? styles.chipActive : ""}`}
                  onClick={() => setTypeFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Group list */}
            <div className={styles.groupList}>
              {filteredGroups.length === 0 ? (
                <p className={styles.noGroups}>No groups match your search.</p>
              ) : (
                filteredGroups.map((g) => {
                  const pill =
                    typePillStyle[g.type?.toLowerCase()] || typePillStyle.other;
                  return (
                    <button
                      key={g.id}
                      className={styles.groupBtn}
                      onClick={() => setSelectedGroup(g)}
                    >
                      <FaClipboardList className={styles.groupIcon} />
                      <span className={styles.groupBtnName}>{g.name}</span>
                      <span
                        className={styles.groupBtnType}
                        style={{ background: pill.bg, color: pill.color }}
                      >
                        {g.type?.toUpperCase()}
                      </span>
                      <FaChevronRight className={styles.chevron} />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* ── Step 2: enter password ── */
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.label}>Password</label>
              <div className={styles.pwWrap}>
                <input
                  className={styles.input}
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoFocus
                />
                <button
                  type="button"
                  className={styles.eyeBtn}
                  onClick={() => setShowPassword((p) => !p)}
                  tabIndex={-1}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            <button className={styles.btn} type="submit" disabled={loading}>
              {loading && <span className={styles.spinner} />}
              {loading ? "Signing in…" : "Sign In"}
            </button>

            {groupId ? (
              <Link to="/attendance-login" className={styles.backBtn}>
                ← Choose a different group
              </Link>
            ) : (
              <button
                type="button"
                className={styles.backBtn}
                onClick={() => {
                  setSelectedGroup(null);
                  setPassword("");
                }}
              >
                ← Back
              </button>
            )}
          </form>
        )}

        <Link to="/login" className={styles.adminLink}>
          Admin login →
        </Link>
      </div>
    </div>
  );
};

export default AttendanceLogin;
