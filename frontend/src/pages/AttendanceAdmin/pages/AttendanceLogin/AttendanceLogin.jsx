import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaCross } from "react-icons/fa";
import styles from "./AttendanceLogin.module.css";
import { loginAttendanceAdmin } from "@/api/attendance.api";
import toast from "react-hot-toast";

const AttendanceLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await loginAttendanceAdmin({ email, password });
      // Use a separate token key so it doesn't conflict with main admin token
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
      toast.error(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FaCross className={styles.logo} />
        <h1 className={styles.title}>Group Attendance</h1>
        <p className={styles.sub}>JKUAT CATCOM — Sign in to your group</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your-group@catcom.com"
              required
              autoFocus
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label}>Password</label>
            <input
              className={styles.input}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <button className={styles.btn} type="submit" disabled={loading}>
            {loading && <span className={styles.spinner} />}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AttendanceLogin;
