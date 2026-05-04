import React from "react";
import styles from "./AdminPanel.module.css";
import { AdminHeader } from "@/pages/AdminPanel/components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

export default function AdminPanel({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const activeTab = location.pathname.split("/").pop();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

  const handleTabChange = (tabKey) => {
    navigate(`/admin/${tabKey}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <AdminHeader
          activeTab={activeTab}
          setActiveTab={handleTabChange}
          onLogout={handleLogout}
        />
        <div className={styles.sectionWrapper}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
