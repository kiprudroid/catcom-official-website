import React, { useState } from "react";
import styles from "./AdminPanel.module.css";
import { AdminHeader } from "@/pages/AdminPanel/components";
import OtherTools from "@/pages/AdminPanel/pages/OtherTools/OtherTools";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login", { replace: true });
  };

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
      case "otherTools":
        return <OtherTools />;
      case "joinGroup":
        return <JoinGroup />;
      case "joinSccs":
        return <JoinSccsSection />;
      default:
        return <LeadersSection />;
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <AdminHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onLogout={handleLogout}
        />
        <div className={styles.sectionWrapper}>{renderActiveTab()}</div>
      </div>
    </div>
  );
}
