import React from "react";
import styles from "./AdminHeader.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaUser,
  FaUsers,
  FaCalendarAlt,
  FaUserCheck,
  FaChartBar,
<<<<<<< HEAD
  FaTools,
=======
  FaUserPlus,
>>>>>>> b4764ad952f1064ff18c76ca33f17b4604db9b84
} from "react-icons/fa";

export default function AdminHeader({ activeTab, setActiveTab }) {
  const tabs = [
    { key: "leaders", label: "Leaders", icon: <FaUser /> },
    { key: "SccLeaders", label: "Scc Leaders", icon: <FaUsers /> },
    { key: "events", label: "Events", icon: <FaCalendarAlt /> },
    { key: "members", label: "Membership Requests", icon: <FaUserCheck /> },
    { key: "joinSccs", label: "Join SCCs", icon: <FaUserPlus /> },
    { key: "reports", label: "Reports", icon: <FaChartBar /> },
<<<<<<< HEAD
    { key: "otherTools", label: "Other Tools", icon: <FaTools /> },
=======
    { key: "joinGroup", label: "Join Group", icon: <FaUserCheck /> },
>>>>>>> b4764ad952f1064ff18c76ca33f17b4604db9b84
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
