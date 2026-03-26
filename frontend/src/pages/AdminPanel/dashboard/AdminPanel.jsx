import React, { useState } from "react";
import styles from "./AdminPanel.module.css";
import { AdminHeader } from "@/pages/AdminPanel/components";
import OtherTools from "@/pages/AdminPanel/pages/OtherTools/OtherTools";

import {
  Members,
  Reports,
  LeadersSection,
  EventsSection,
  SccLeaders,
  JoinGroup,
  JoinSccsSection,
} from "@/pages/AdminPanel/pages";

export default function AdminPanel({ onLogout }) {
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
      case "SccLeaders":
        return <SccLeaders />;
<<<<<<< HEAD
      case "otherTools":
        return <OtherTools />;
=======
      case "joinGroup":
        return <JoinGroup />;
      case "joinSccs":
        return <JoinSccsSection />;
>>>>>>> b4764ad952f1064ff18c76ca33f17b4604db9b84
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
