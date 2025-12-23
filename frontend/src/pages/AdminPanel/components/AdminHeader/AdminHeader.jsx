import React from "react";
import styles from "./AdminHeader.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaUsers,
  FaCalendarAlt,
  FaUserCheck,
  FaChartBar,
} from "react-icons/fa";

export default function AdminHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "leaders", label: "Leaders", icon: <FaUsers /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "members", label: "Membership Requests", icon: <FaUserCheck /> },
    { key: "reports", label: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <div className={styles.header}>
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

      <nav className={styles.navbar}>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`${styles.navItem} ${
              activeTab === tab.key ? styles.active : ""
            }`}
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
