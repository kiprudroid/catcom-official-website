import React, { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./Members.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  fetchJoinGroups,
  deleteJoinGroup,
  assignJoinGroup,
} from "@/api/joinGroup.api";
import { fetchJoinSccs, deleteJoinScc, assignScc } from "@/api/joinScc.api";

import {
  ToastNotification,
  MemberModal,
  RequestsTable,
} from "@/pages/AdminPanel/pages/Members/widgets";
import {
  lastNDaysDate,
  isGroupJoinPending,
  stripPendingPrefix,
} from "./utils/requestHelpers";

export default function Members() {
  const [requests, setRequests] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("admin_pending_requests")) || [];
    } catch {
      return [];
    }
  });
  const [joinRequests, setJoinRequests] = useState([]);
  const [groupJoinRequests, setGroupJoinRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [assigning, setAssigning] = useState({});
  const [groupAssigning, setGroupAssigning] = useState({});
  const [filterRange, setFilterRange] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [toastMsg, setToastMsg] = useState(null);
  const [showNotifDot, setShowNotifDot] = useState(false);
  const prevTotalRef = useRef(null);
  const toastTimer = useRef(null);

  const [selectedMember, setSelectedMember] = useState(null);

  const accept = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const reject = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  useEffect(() => {
    localStorage.setItem("admin_pending_requests", JSON.stringify(requests));
  }, [requests]);

  const showToast = (msg) => {
    setToastMsg(msg);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMsg(null), 4000);
  };

  const loadJoinRequests = async () => {
    try {
      setLoading(true);
      const [sccData, groupData] = await Promise.all([
        fetchJoinSccs(),
        fetchJoinGroups(),
      ]);
      setJoinRequests(sccData || []);
      const pendingGroups = (groupData || []).filter((r) =>
        isGroupJoinPending(r.group_joined),
      );
      setGroupJoinRequests(pendingGroups);

      const sccPending = (sccData || []).filter(
        (r) => r.scc_name === "TBD",
      ).length;
      const total = sccPending + pendingGroups.length + requests.length;
      if (prevTotalRef.current !== null && total > prevTotalRef.current) {
        const diff = total - prevTotalRef.current;
        setShowNotifDot(true);
        showToast(`${diff} new request${diff > 1 ? "s" : ""} arrived`);
      }
      prevTotalRef.current = total;
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJoinRequests();
    const interval = setInterval(loadJoinRequests, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      if (type === "joinGroup") await deleteJoinGroup(id);
      else await deleteJoinScc(id);
      await loadJoinRequests();
    } catch {
      alert("Failed to delete request");
    }
  };

  const handleAssign = async (id) => {
    const scc = assigning[id];
    if (!scc) return alert("Please select an SCC first.");
    try {
      await assignScc(id, scc);
      await loadJoinRequests();
      setAssigning((prev) => {
        const n = { ...prev };
        delete n[id];
        return n;
      });
    } catch {
      alert("Failed to assign SCC");
    }
  };

  const handleAssignGroup = async (id, requestData) => {
    let group = groupAssigning[id];
    if (!group && requestData?.group_joined) {
      group = stripPendingPrefix(requestData.group_joined)
        .split(", ")[0]
        .trim();
    }
    if (!group) return alert("No group to assign.");
    try {
      await assignJoinGroup(id, group);
      await loadJoinRequests();
      setGroupAssigning((prev) => {
        const n = { ...prev };
        delete n[id];
        return n;
      });
    } catch {
      alert("Failed to assign group request");
    }
  };

  const filteredJoinRequests = joinRequests.filter(
    (r) =>
      r.scc_name === "TBD" &&
      (r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const allRequests = useMemo(() => {
    const joinScc = filteredJoinRequests.map((r) => ({
      id: r.user_id,
      name: r.full_name,
      requestedAt: r.date_joined, 
      note: "Join SCC",
      type: "joinScc",
      ...r,
    }));
    const joinGroupReqs = groupJoinRequests
      .filter(
        (r) =>
          r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          r.email?.toLowerCase().includes(searchQuery.toLowerCase()),
      )
      .map((r) => ({
        id: r.user_id,
        name: r.full_name,
        requestedAt: r.date_joined,
        note: `Join Group: ${stripPendingPrefix(r.group_joined)}`,
        type: "joinGroup",
        ...r,
      }));
    const localReqs = requests.filter(
      (r) =>
        (r.name || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.email || "").toLowerCase().includes(searchQuery.toLowerCase()),
    );
    return [...localReqs, ...joinScc, ...joinGroupReqs];
  }, [requests, filteredJoinRequests, groupJoinRequests, searchQuery]);

  const filteredByType = useMemo(() => {
    if (filterType === "all") return allRequests;
    if (filterType === "joinSCC")
      return allRequests.filter((r) => r.type === "joinScc");
    if (filterType === "joinGroup")
      return allRequests.filter((r) => r.type === "joinGroup");
    return allRequests;
  }, [allRequests, filterType]);

  const finalFiltered = useMemo(() => {
    if (filterRange === "all") return filteredByType;
    const cutoff = lastNDaysDate(Number(filterRange));
    return filteredByType.filter((r) => new Date(r.requestedAt) >= cutoff);
  }, [filteredByType, filterRange]);

  const totalPending = allRequests.length;

  return (
    <div className={styles.container}>
      <ToastNotification message={toastMsg} />

      <div className={styles.topbar}>
        <div className={styles.logoGroup}>
          <Link to="/admin" className={styles.backLink}>
            ← Back to Admin
          </Link>
          <div className={styles.titleRow}>
            <SectionHeading>Join Requests</SectionHeading>
            {totalPending > 0 && (
              <button
                className={styles.notifBadge}
                onClick={() => setShowNotifDot(false)}
                title="Click to dismiss"
              >
                {showNotifDot && <span className={styles.notifPulse} />}
                {totalPending}
              </button>
            )}
          </div>
          <p className={styles.pageDesc}>
            Pending join requests arrive here for admin review. Approved
            requests are forwarded to the Join Group page.
          </p>
        </div>
        <button
          className={styles.refreshBtn}
          onClick={() => {
            loadJoinRequests();
            setShowNotifDot(false);
          }}
        >
          ↻ Refresh
        </button>
      </div>

      <RequestsTable
        rows={finalFiltered}
        loading={loading}
        error={error}
        filterRange={filterRange}
        filterType={filterType}
        searchQuery={searchQuery}
        assigning={assigning}
        groupAssigning={groupAssigning}
        onFilterRangeChange={setFilterRange}
        onFilterTypeChange={setFilterType}
        onSearchChange={setSearchQuery}
        onAssigningChange={(id, val) =>
          setAssigning((prev) => ({ ...prev, [id]: val }))
        }
        onGroupAssigningChange={(id, val) =>
          setGroupAssigning((prev) => ({ ...prev, [id]: val }))
        }
        onAssign={handleAssign}
        onAssignGroup={handleAssignGroup}
        onDelete={handleDelete}
        onAccept={accept}
        onReject={reject}
        onRowClick={setSelectedMember}
      />

      {selectedMember && (
        <MemberModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  );
}
