import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Members.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  fetchJoinGroups,
  deleteJoinGroup,
  assignJoinGroup,
} from "@/api/joinGroup.api";
import { fetchJoinSccs, deleteJoinScc, assignScc } from "@/api/joinScc.api";

function lastNDaysDate(n) {
  const d = new Date();
  d.setDate(d.getDate() - n);
  return d;
}

const SCC_OPTIONS = [
  "St. Charles SCC",
  "St. Jude SCC",
  "St. Martin SCC",
  "St. Paul SCC",
  "St. Stephen SCC",
  "St. Therese SCC",
  "St. Veronica SCC",
  "MMOG SCC",
];

const GROUP_OPTIONS = [
  "Choir",
  "Pastoral",
  "Bible Prayer Service",
  "Technical Team",
  "Liturgical Dancers",
  "Communion and Liberation",
];

const PENDING_PREFIX = "PENDING: ";

const isGroupJoinPending = (value) =>
  typeof value === "string" && value.startsWith(PENDING_PREFIX);

const stripPendingPrefix = (value) =>
  isGroupJoinPending(value) ? value.slice(PENDING_PREFIX.length) : value;

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
  const [filterRange, setFilterRange] = useState("all"); // all, 1, 7, 30
  const [filterType, setFilterType] = useState("all"); // all, joinSCC, joinGroup

  // accept / reject actions
  const accept = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const reject = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  useEffect(() => {
    localStorage.setItem("admin_pending_requests", JSON.stringify(requests));
  }, [requests]);

  const loadJoinRequests = async () => {
    try {
      setLoading(true);
      const [sccData, groupData] = await Promise.all([
        fetchJoinSccs(),
        fetchJoinGroups(),
      ]);
      setJoinRequests(sccData || []);
      setGroupJoinRequests(
        (groupData || []).filter((req) => isGroupJoinPending(req.group_joined)),
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJoinRequests();
  }, []);

  const handleDelete = async (id, type) => {
    if (!window.confirm("Are you sure you want to delete this request?"))
      return;
    try {
      if (type === "joinGroup") {
        await deleteJoinGroup(id);
      } else {
        await deleteJoinScc(id);
      }
      await loadJoinRequests();
    } catch (err) {
      alert("Failed to delete request");
      console.error(err);
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
    } catch (err) {
      alert("Failed to assign SCC");
      console.error(err);
    }
  };

  const handleAssignGroup = async (id, requestData) => {
    let group = groupAssigning[id];

    // If not explicitly selected, use the first requested group from the request
    if (!group && requestData?.group_joined) {
      const requestedGroups = stripPendingPrefix(requestData.group_joined);
      group = requestedGroups.split(", ")[0].trim();
    }

    if (!group) return alert("No group to assign.");

    try {
      await assignJoinGroup(id, group);
      await loadJoinRequests();
      setGroupAssigning((prev) => {
        const next = { ...prev };
        delete next[id];
        return next;
      });
    } catch (err) {
      alert("Failed to assign group request");
      console.error(err);
    }
  };

  // Filter join requests: only unassigned and by search query
  const filteredJoinRequests = joinRequests.filter(
    (r) =>
      r.scc_name === "TBD" &&
      (r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.email.toLowerCase().includes(searchQuery.toLowerCase())),
  );

  const allRequests = useMemo(() => {
    const dummy = requests.map((r) => ({ ...r, type: "dummy" }));
    const joinScc = filteredJoinRequests.map((r) => ({
      id: r.user_id,
      name: r.full_name,
      requestedAt: new Date().toISOString(),
      note: "Join SCC",
      type: "joinScc",
      ...r,
    }));
    const joinGroupReqs = groupJoinRequests.map((r) => ({
      id: r.user_id,
      name: r.full_name,
      requestedAt: new Date().toISOString(),
      note: `Requested: ${stripPendingPrefix(r.group_joined)} (auto-assign on approve)`,
      type: "joinGroup",
      ...r,
    }));
    return [...requests, ...joinScc, ...joinGroupReqs];
  }, [requests, filteredJoinRequests, groupJoinRequests]);

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
    const days = Number(filterRange);
    const cutoff = lastNDaysDate(days);
    return filteredByType.filter((r) => new Date(r.requestedAt) >= cutoff);
  }, [filteredByType, filterRange]);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <div className={styles.logoGroup}>
          <Link to="/admin" className={styles.backLink}>
            ← Back to Admin
          </Link>
          <SectionHeading>Membership Requests</SectionHeading>
          <p style={{ color: "#555", marginTop: 8, maxWidth: 600 }}>
            Pending join-group requests arrive here for admin review. When a
            request is approved, it will be forwarded to the Join Group page as
            an approved member.
          </p>
        </div>
      </div>

      <section className={styles.section}>
        <div
          style={{
            marginBottom: 12,
            display: "flex",
            gap: "12px",
            alignItems: "center",
          }}
        >
          <label>Show:</label>
          <select
            value={filterRange}
            onChange={(e) => setFilterRange(e.target.value)}
          >
            <option value="all">All time</option>
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="all">All requests</option>
            <option value="joinSCC">Join SCC requests</option>
            <option value="joinGroup">Join group requests</option>
          </select>

           
        </div>

        <ul className={styles.list}>
          {finalFiltered.length === 0 && <div>No requests found.</div>}
          {finalFiltered.map((r) => (
            <li key={`${r.type}-${r.id}`} className={styles.listItem}>
              <div className={styles.listRow}>
                <div>
                  <strong>{r.name}</strong>
                  <div style={{ fontSize: 12, color: "#666" }}>
                    {new Date(r.requestedAt).toLocaleString()} - {r.note}
                  </div>
                </div>
                <div className={styles.actions}>
                  {r.type === "joinScc" ? (
                    <>
                      <select
                        value={assigning[r.id] || ""}
                        onChange={(e) =>
                          setAssigning((prev) => ({
                            ...prev,
                            [r.id]: e.target.value,
                          }))
                        }
                        style={{ marginRight: 8, padding: "4px" }}
                      >
                        <option value="">Assign SCC...</option>
                        {SCC_OPTIONS.map((s) => (
                          <option key={s} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(r.id)}>Assign</button>
                    </>
                  ) : r.type === "joinGroup" ? (
                    <>
                      <select
                        value={
                          groupAssigning[r.id] ||
                          stripPendingPrefix(r.group_joined)
                            .split(", ")[0]
                            .trim()
                        }
                        onChange={(e) =>
                          setGroupAssigning((prev) => ({
                            ...prev,
                            [r.id]: e.target.value,
                          }))
                        }
                        style={{ marginRight: 8, padding: "4px" }}
                      >
                        {stripPendingPrefix(r.group_joined)
                          .split(", ")
                          .map((g) => (
                            <option key={g.trim()} value={g.trim()}>
                              {g.trim()}
                            </option>
                          ))}
                        <option value="">---</option>
                        {GROUP_OPTIONS.map((group) => (
                          <option key={group} value={group}>
                            {group}
                          </option>
                        ))}
                      </select>
                      <button onClick={() => handleAssignGroup(r.id, r)}>
                        Approve
                      </button>
                      <button onClick={() => handleDelete(r.id, "joinGroup")}>
                        Reject
                      </button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => accept(r.id)}>Accept</button>
                      <button onClick={() => reject(r.id)}>Reject</button>
                    </>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
