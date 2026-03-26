import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./PastoralLogin.module.css";
import { API_BASE } from "@/api/apiClient";
import { FaCross } from "react-icons/fa";
import toast from "react-hot-toast";

const PastoralLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/pastoral/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/attendance-admin", { replace: true });
    } catch {
      toast.error("Network error — is the server running?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <FaCross className={styles.logo} />
        <h1 className={styles.title}>Pastoral Admin</h1>
        <p className={styles.sub}>JKUAT CATCOM — Attendance System</p>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.field}>
            <label className={styles.label}>Email</label>
            <input
              className={styles.input}
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="pastoral@catcom.com"
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
            {loading ? <span className={styles.spinner} /> : null}
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default PastoralLogin;
