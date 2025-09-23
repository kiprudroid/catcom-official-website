import React from "react";
import styles from "./AdminHeader.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

export default function AdminHeader({ activeTab, setActiveTab }) {
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
        {[
          { key: "leaders", label: "Leaders" },
          { key: "events", label: "Events" },
          { key: "members", label: "Membership Requests" },
          { key: "reports", label: "Reports" },
        ].map((tab) => (
          <button
            key={tab.key}
            className={`${styles.navItem} ${
              activeTab === tab.key ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </nav>
    </div>
  );
}
