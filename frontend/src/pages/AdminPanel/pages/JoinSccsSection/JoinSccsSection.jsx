import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "../../../../components/Typography/Typography";
import { fetchJoinSccs, deleteJoinScc, assignScc } from "@/api/joinScc.api";
import styles from "./JoinSccsSection.module.css";

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

function JoinSccsSection() {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [assigning, setAssigning] = useState({}); 

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

  // Filter by search query
  const filtered = joinRequests.filter((r) =>
    r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Group by scc_name
  const grouped = filtered.reduce((acc, r) => {
    const key = r.scc_name || "TBD";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  // Show TBD group first, then alphabetical
  const sortedGroups = Object.keys(grouped).sort((a, b) => {
    if (a === "TBD") return -1;
    if (b === "TBD") return 1;
    return a.localeCompare(b);
  });

  if (loading) return <Paragraph>Loading join requests...</Paragraph>;
  if (error) return <Paragraph style={{ color: "red" }}>Error: {error}</Paragraph>;

  return (
    <div className={styles.adminPanel}>
      <SectionHeading as="h2">Join SCC Requests</SectionHeading>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name "
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      <Paragraph className={styles.totalCount}>
        Total requests: {filtered.length}
      </Paragraph>

      {sortedGroups.length === 0 ? (
        <Paragraph>No join requests found.</Paragraph>
      ) : (
        sortedGroups.map((scc) => (
          <div key={scc} className={styles.sccGroup}>
            <div className={styles.sccGroupHeader}>
              <SectionHeading as="h3">{scc}</SectionHeading>
              <span className={styles.badge}>{grouped[scc].length}</span>
            </div>

            <div className={styles.requestsGrid}>
              {grouped[scc].map((request) => (
                <div key={request.user_id} className={styles.requestCard}>
                  <div className={styles.cardHeader}>
                    <strong>{request.full_name}</strong>
                    <span className={`${styles.sccTag} ${request.scc_name === "TBD" ? styles.tbdTag : styles.assignedTag}`}>
                      {request.scc_name}
                    </span>
                  </div>

                  <Paragraph>📞 {request.phone_number}</Paragraph>
                  <Paragraph>✉️ {request.email}</Paragraph>
                  <Paragraph>📚 Year {request.year_study}</Paragraph>
                  <Paragraph>👤 {request.gender}</Paragraph>

                  {/* Assign SCC */}
                  <div className={styles.assignRow}>
                    <select
                      value={assigning[request.user_id] || ""}
                      onChange={(e) =>
                        setAssigning((prev) => ({ ...prev, [request.user_id]: e.target.value }))
                      }
                      className={styles.assignSelect}
                    >
                      <option value="">Assign SCC...</option>
                      {SCC_OPTIONS.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                    <button
                      className={styles.assignBtn}
                      onClick={() => handleAssign(request.user_id)}
                    >
                      Assign
                    </button>
                  </div>

                  <button
                    className={styles.deleteBtn}
                    onClick={() => handleDelete(request.user_id)}
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JoinSccsSection;