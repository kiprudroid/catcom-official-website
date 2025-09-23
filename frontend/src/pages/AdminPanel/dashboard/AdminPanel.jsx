import React, { useState } from "react";
import styles from "./AdminPanel.module.css";
import { AdminHeader } from "@/pages/AdminPanel/components";

import {
  Members,
  Reports,
  LeadersSection,
  EventsSection,
} from "@/pages/AdminPanel/pages";

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState("leaders");

  const renderActiveTab = () => {
    switch (activeTab) {
      case "leaders":
        return <LeadersSection />;
      case "events":
        return <EventsSection />;
      case "members":
        return <Members />;
      case "reports":
        return <Reports />;
      default:
        return <LeadersSection />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <AdminHeader activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className={styles.sectionWrapper}>{renderActiveTab()}</div>
      </div>
    </div>
  );
}
