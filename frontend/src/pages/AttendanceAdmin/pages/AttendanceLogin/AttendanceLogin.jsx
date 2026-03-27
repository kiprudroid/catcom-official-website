import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCross, FaEye, FaEyeSlash, FaChevronRight } from "react-icons/fa";
import styles from "./AttendanceLogin.module.css";
import {
  loginAttendanceAdmin,
  fetchAttendanceGroups,
} from "@/api/attendance.api";
import toast from "react-hot-toast";

const AttendanceLogin = () => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingGroups, setLoadingGroups] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceGroups()
      .then((data) => setGroups(data.filter((g) => g.admin_email)))
      .catch(() => toast.error("Failed to load groups"))
      .finally(() => setLoadingGroups(false));
  }, []);

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

  const typePillColor = {
    committee: { bg: "#dbeafe", color: "#1d4ed8" },
    scc: { bg: "#dcfce7", color: "#15803d" },
    group: { bg: "#fce7f3", color: "#9d174d" },
    other: { bg: "#f3f4f6", color: "#374151" },
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FaCross className={styles.logo} />
        <h1 className={styles.title}>Group Attendance</h1>
        <p className={styles.sub}>
          JKUAT CATCOM — Select your group to sign in
        </p>

        {loadingGroups ? (
          <p className={styles.loadingText}>Loading groups…</p>
        ) : groups.length === 0 ? (
          <p className={styles.noGroups}>
            No groups available yet. Contact the system administrator.
          </p>
        ) : !selectedGroup ? (
          /* ── Step 1: pick a group ─────────────────────────── */
          <div className={styles.groupList}>
            {groups.map((g) => {
              const pill = typePillColor[g.type] || typePillColor.other;
              return (
                <button
                  key={g.id}
                  className={styles.groupBtn}
                  onClick={() => setSelectedGroup(g)}
                >
                  <div className={styles.groupBtnLeft}>
                    <span className={styles.groupBtnName}>{g.name}</span>
                    <span
                      className={styles.groupBtnType}
                      style={{ background: pill.bg, color: pill.color }}
                    >
                      {g.type}
                    </span>
                  </div>
                  <FaChevronRight className={styles.chevron} />
                </button>
              );
            })}
          </div>
        ) : (
          /* ── Step 2: enter password ───────────────────────── */
          <form className={styles.form} onSubmit={handleSubmit}>
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

            <div className={styles.selectedGroup}>
              <span className={styles.selectedLabel}>Signing in as</span>
              <span className={styles.selectedName}>{selectedGroup.name}</span>
            </div>

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
          </form>
        )}
      </div>
    </div>
  );
};

export default AttendanceLogin;
