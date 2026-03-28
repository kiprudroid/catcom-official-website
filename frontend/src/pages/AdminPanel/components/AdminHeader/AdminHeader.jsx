import React from "react";
import styles from "./AdminHeader.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserCheck,
  FaChartBar,
  FaTools,
  FaUserPlus,
  FaSignOutAlt,
  FaPhotoVideo,
} from "react-icons/fa";

export default function AdminHeader({ activeTab, setActiveTab, onLogout }) {
  const tabs = [
    { key: "leaders", label: "Leaders", icon: <FaUser /> },
    { key: "SccLeaders", label: "Scc Leaders", icon: <FaUsers /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "members", label: "Membership Requests", icon: <FaUserCheck /> },
    { key: "joinSccs", label: "Join SCCs", icon: <FaUserPlus /> },
    { key: "reports", label: "Reports", icon: <FaChartBar /> },
    { key: "otherTools", label: "Other Tools", icon: <FaTools /> },
    { key: "joinGroup", label: "Join Group", icon: <FaUserCheck /> },
    { key: "media", label: "Media", icon: <FaPhotoVideo /> },
  ];

  return (
    <div className={styles.header}>
      <div className={styles.topRow}>
        <div className={styles.logoGroup}>
          <img
            src="/others/catcom-logo.png"
            alt="CATCOM Logo"
            className={styles.logo}
          />
          <SectionHeading className={styles.title}>
            JKUAT CATCOM ADMIN PANEL
          </SectionHeading>
        </div>

        <button className={styles.signOutBtn} onClick={onLogout}>
          <FaSignOutAlt />
          Sign Out
        </button>
      </div>

      <nav className={styles.navbar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.navItem} ${activeTab === tab.key ? styles.active : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            <span className={styles.icon}>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
