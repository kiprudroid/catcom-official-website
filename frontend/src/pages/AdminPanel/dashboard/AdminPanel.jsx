import React, { useEffect, useState, useRef } from "react";
import styles from "./AdminPanel.module.css";
import { AdminHeader } from "@/pages/AdminPanel/components";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { fetchJoinSccs } from "@/api/joinScc.api";
import { fetchJoinGroups } from "@/api/joinGroup.api";
import { isGroupJoinPending } from "@/pages/AdminPanel/pages/Members/utils/requestHelpers";
import LoginSummaryPopup from "@/pages/AdminPanel/components/LoginSummaryPopup/LoginSummaryPopup";

export default function AdminPanel({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname.split("/").pop();

  const [pendingCount, setPendingCount] = useState(0);
  const [sccCount, setSccCount] = useState(0);
  const [groupCount, setGroupCount] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  const hasShownPopup = useRef(false);

  useEffect(() => {
    const load = async () => {
      try {
        const [sccData, groupData] = await Promise.all([
          fetchJoinSccs(),
          fetchJoinGroups(),
        ]);
        const sccPending = (sccData || []).filter(
          (r) => r.scc_name === "TBD",
        ).length;
        const grpPending = (groupData || []).filter((r) =>
          isGroupJoinPending(r.group_joined),
        ).length;
        setSccCount(sccPending);
        setGroupCount(grpPending);
        setPendingCount(sccPending + grpPending);

        // Show popup once per login session
        if (!hasShownPopup.current && sccPending + grpPending > 0) {
          setShowPopup(true);
          hasShownPopup.current = true;
        }
      } catch {
        // silently ignore — Members page has its own error handling
      }
    };
    load();
    const interval = setInterval(load, 30000);
    return () => clearInterval(interval);
  }, []);

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
          pendingCount={pendingCount}
        />
        <div className={styles.sectionWrapper}>
          <Outlet />
        </div>
      </div>

      {showPopup && (
        <LoginSummaryPopup
          sccCount={sccCount}
          groupCount={groupCount}
          onReview={() => {
            setShowPopup(false);
            navigate("/admin/members");
          }}
          onDismiss={() => setShowPopup(false)}
        />
      )}
    </div>
  );
}
