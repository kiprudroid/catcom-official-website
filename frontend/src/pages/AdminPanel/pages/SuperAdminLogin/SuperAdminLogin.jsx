import { useState, useEffect } from "react";
import styles from "./SuperAdminLogin.module.css";
import { FaEye, FaEyeSlash, FaCross, FaClipboardList } from "react-icons/fa";
import { API_BASE } from "@/api/apiClient";
import { fetchAttendanceGroups } from "@/api/attendance.api";
import { useNavigate } from "react-router-dom";

export default function SuperAdminLogin({ onLogin }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAttendanceGroups()
      .then((data) => setGroups(data.filter((g) => g.admin_email)))
      .catch(() => {}); // silent — links are optional
  }, []);

  const handleChange = (e) => {
    setError("");
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setForm({ email: "", password: "" });
        setError("Incorrect email or password. Please try again.");
        return;
      }
      localStorage.setItem("token", data.accessToken);
      onLogin?.();
      navigate("/admin", { replace: true });
    } catch {
      setForm({ email: "", password: "" });
      setError("Network error — make sure the server is running.");
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
        <h1 className={styles.title}>Admin Login</h1>
        <p className={styles.sub}>JKUAT CATCOM — Admin Panel</p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={`${styles.input} ${error ? styles.inputError : ""}`}
              type="email"
              name="email"
              placeholder="e.g. yourname@example.com"
              value={form.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <div className={styles.passwordWrap}>
              <input
                className={`${styles.input} ${error ? styles.inputError : ""}`}
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                required
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

          {error && (
            <div className={styles.errorBox}>
              <span className={styles.errorDot}>!</span>
              {error}
            </div>
          )}

          <button className={styles.btn} type="submit" disabled={loading}>
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? "Signing in…" : "Login"}
          </button>
        </form>

        {/* ── Group attendance quick links ─────────────────────── */}
        {groups.length > 0 && (
          <div className={styles.groupSection}>
            <div className={styles.divider}>
              <span>Group Attendance Login</span>
            </div>
            <p className={styles.groupHint}>
              Not the super admin? Go directly to your group:
            </p>
            <div className={styles.groupList}>
              {groups.map((g) => {
                const pill = typePillColor[g.type] || typePillColor.other;
                return (
                  <button
                    key={g.id}
                    className={styles.groupBtn}
                    onClick={() => navigate("/attendance-login")}
                  >
                    <FaClipboardList className={styles.groupBtnIcon} />
                    <span className={styles.groupBtnName}>{g.name}</span>
                    <span
                      className={styles.groupBtnType}
                      style={{ background: pill.bg, color: pill.color }}
                    >
                      {g.type}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
