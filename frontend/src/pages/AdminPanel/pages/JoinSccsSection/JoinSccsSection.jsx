import React, { useState, useEffect } from "react";
import { SectionHeading, Paragraph } from "../../../../components/Typography/Typography";
import { fetchJoinSccs, deleteJoinScc } from "@/api/joinScc.api";
import styles from "./JoinSccsSection.module.css";

function JoinSccsSection() {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const loadJoinRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchJoinSccs();
      // Filter only assigned (not TBD)
      const assigned = data.filter(r => r.scc_name && r.scc_name !== "TBD");
      setJoinRequests(assigned);
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
    if (!window.confirm("Are you sure you want to delete this member?")) return;
    try {
      await deleteJoinScc(id);
      await loadJoinRequests();
    } catch (err) {
      alert("Failed to delete member");
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
    const key = r.scc_name || "Unassigned";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  // Sort groups alphabetically
  const sortedGroups = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  if (loading) return <Paragraph>Loading assigned members...</Paragraph>;
  if (error) return <Paragraph style={{ color: "red" }}>Error: {error}</Paragraph>;

  return (
    <div className={styles.adminPanel}>
      <SectionHeading as="h2">View SCC Members</SectionHeading>

      {/* Search Bar */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name or email"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        {searchQuery && (
          <button className={styles.clearBtn} onClick={() => setSearchQuery("")}>✕</button>
        )}
      </div>

      <Paragraph className={styles.totalCount}>
        Total members the SCCs: {filtered.length}
      </Paragraph>

      {sortedGroups.length === 0 ? (
        <Paragraph>No assigned members found.</Paragraph>
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
                    <span className={styles.assignedTag}>
                      {request.scc_name}
                    </span>
                  </div>

                  <Paragraph>📞 {request.phone_number}</Paragraph>
                  <Paragraph>✉️ {request.email}</Paragraph>
                  <Paragraph>📚 Year {request.year_study}</Paragraph>
                  <Paragraph>👤 {request.gender}</Paragraph>

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