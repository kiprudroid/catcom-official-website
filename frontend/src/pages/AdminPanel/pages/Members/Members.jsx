import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Members.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
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

export default function Members() {
  const [requests, setRequests] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("admin_pending_requests")) || [
          // sample items (if none in localStorage)
          {
            id: 1,
            name: "Alice",
            requestedAt: new Date().toISOString(),
            note: "Join SCC",
          },
          {
            id: 2,
            name: "Bob",
            requestedAt: new Date(
              Date.now() - 1000 * 60 * 60 * 24 * 3
            ).toISOString(),
            note: "Member",
          },
        ]
      );
    } catch {
      return [];
    }
  });

  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [assigning, setAssigning] = useState({});
  const [filterRange, setFilterRange] = useState("all"); // all, 1, 7, 30
  const [filterType, setFilterType] = useState("all"); // all, joinSCC

  // accept / reject actions
  const accept = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));
  const reject = (id) => setRequests((prev) => prev.filter((r) => r.id !== id));

  useEffect(() => {
    localStorage.setItem("admin_pending_requests", JSON.stringify(requests));
  }, [requests]);

  const loadJoinRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchJoinSccs();
      setJoinRequests(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadJoinRequests();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this request?")) return;
    try {
      await deleteJoinScc(id);
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
      setAssigning((prev) => { const n = { ...prev }; delete n[id]; return n; });
    } catch (err) {
      alert("Failed to assign SCC");
      console.error(err);
    }
  };

  // Filter join requests: only unassigned and by search query
  const filteredJoinRequests = joinRequests.filter((r) =>
    r.scc_name === "TBD" &&
    (r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
     r.email.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const allRequests = useMemo(() => {
    const dummy = requests.map(r => ({ ...r, type: 'dummy' }));
    const joinScc = filteredJoinRequests.map(r => ({
      id: r.user_id,
      name: r.full_name,
      requestedAt: new Date().toISOString(), 
      note: 'Join SCC',
      type: 'joinScc',
      ...r
    }));
    return [...dummy, ...joinScc];
  }, [requests, filteredJoinRequests]);

  const filteredByType = useMemo(() => {
    if (filterType === "all") return allRequests;
    if (filterType === "joinSCC") return allRequests.filter(r => r.type === 'joinScc');
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
        </div>
      </div>

      <section className={styles.section}>
        <div style={{ marginBottom: 12, display: 'flex', gap: '12px', alignItems: 'center' }}>
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
                  {r.type === 'joinScc' ? (
                    <>
                      <select
                        value={assigning[r.id] || ""}
                        onChange={(e) =>
                          setAssigning((prev) => ({ ...prev, [r.id]: e.target.value }))
                        }
                        style={{ marginRight: 8, padding: '4px' }}
                      >
                        <option value="">Assign SCC...</option>
                        {SCC_OPTIONS.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <button onClick={() => handleAssign(r.id)}>Assign</button>
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

