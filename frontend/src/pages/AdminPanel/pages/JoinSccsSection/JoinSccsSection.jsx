import { useState, useEffect } from "react";
import { fetchJoinSccs, deleteJoinScc } from "@/api/joinScc.api";
import styles from "./JoinSccsSection.module.css";
import {
  MemberDetailModal,
  SearchBar,
  ExportModal,
} from "@/pages/AdminPanel/pages/JoinSccsSection/widgets";

export default function JoinSccsSection() {
  const [joinRequests, setJoinRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [confirmId, setConfirmId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [expandedGroups, setExpandedGroups] = useState({});
  const [selectedMember, setSelectedMember] = useState(null);
  const [showExport, setShowExport] = useState(false);

  const loadJoinRequests = async () => {
    try {
      setLoading(true);
      const data = await fetchJoinSccs();
      const assigned = data.filter((r) => r.scc_name && r.scc_name !== "TBD");
      setJoinRequests(assigned);
      setExpandedGroups(
        assigned.reduce((acc, r) => ({ ...acc, [r.scc_name]: true }), {}),
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

  const handleConfirmDelete = async (id) => {
    setDeletingId(id);
    setConfirmId(null);
    try {
      await deleteJoinScc(id);
      await loadJoinRequests();
    } catch {
      alert("Failed to delete member");
    } finally {
      setDeletingId(null);
    }
  };

  const toggleGroup = (scc) =>
    setExpandedGroups((prev) => ({ ...prev, [scc]: !prev[scc] }));

  const filtered = joinRequests.filter(
    (r) =>
      r.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.email.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const grouped = filtered.reduce((acc, r) => {
    const key = r.scc_name || "Unassigned";
    if (!acc[key]) acc[key] = [];
    acc[key].push(r);
    return acc;
  }, {});

  const sortedGroups = Object.keys(grouped).sort((a, b) => a.localeCompare(b));

  if (loading)
    return (
      <div className={styles.stateContainer}>
        <div className={styles.spinner} />
        <span>Loading members…</span>
      </div>
    );
  if (error) return <div className={styles.errorMsg}>⚠ {error}</div>;

  return (
    <div className={styles.adminPanel}>
      <div className={styles.pageHeader}>
        <div>
          <h2 className={styles.pageTitle}>SCC Members</h2>
          <p className={styles.pageSubtitle}>
            {filtered.length} member{filtered.length !== 1 ? "s" : ""} across{" "}
            {sortedGroups.length} SCC{sortedGroups.length !== 1 ? "s" : ""}
          </p>
        </div>
        <div className={styles.headerActions}>
          <button
            className={styles.exportBtn}
            onClick={() => setShowExport(true)}
          >
            ⬇ Export PDF
          </button>
          <button className={styles.refreshBtn} onClick={loadJoinRequests}>
            ↻ Refresh
          </button>
        </div>
      </div>

      <SearchBar value={searchQuery} onChange={setSearchQuery} />

      {sortedGroups.length === 0 ? (
        <div className={styles.stateContainer}>
          <span className={styles.emptyIcon}>👥</span>
          <p>No assigned members found.</p>
        </div>
      ) : (
        sortedGroups.map((scc) => (
          <div key={scc} className={styles.sccGroup}>
            <button
              className={styles.sccGroupHeader}
              onClick={() => toggleGroup(scc)}
            >
              <div className={styles.sccGroupLeft}>
                <span className={styles.chevron}>
                  {expandedGroups[scc] ? "▾" : "▸"}
                </span>
                <span className={styles.sccName}>{scc}</span>
                <span className={styles.badge}>{grouped[scc].length}</span>
              </div>
            </button>

            {expandedGroups[scc] && (
              <div className={styles.tableWrapper}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Full Name</th>
                      <th>Phone</th>
                      <th>Email</th>
                      <th>Year</th>
                      <th>Gender</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {grouped[scc].map((request, index) => (
                      <tr
                        key={request.user_id}
                        className={
                          deletingId === request.user_id
                            ? styles.rowDeleting
                            : ""
                        }
                      >
                        <td className={styles.indexCell}>{index + 1}</td>
                        <td className={styles.nameCell}>
                          <button
                            className={styles.memberBtn}
                            onClick={() => setSelectedMember(request)}
                            title="View & copy details"
                          >
                            <span className={styles.avatar}>
                              {request.full_name.charAt(0).toUpperCase()}
                            </span>
                            <span className={styles.memberName}>
                              {request.full_name}
                            </span>
                          </button>
                        </td>
                        <td>
                          <a
                            href={`tel:${request.phone_number}`}
                            className={styles.phoneLink}
                          >
                            {request.phone_number}
                          </a>
                        </td>
                        <td>{request.email}</td>
                        <td>Year {request.year_study}</td>
                        <td>
                          <span
                            className={`${styles.genderPill} ${
                              request.gender?.toLowerCase() === "male"
                                ? styles.male
                                : styles.female
                            }`}
                          >
                            {request.gender}
                          </span>
                        </td>
                        <td>
                          {confirmId === request.user_id ? (
                            <div className={styles.confirmInline}>
                              <span>Remove?</span>
                              <button
                                className={styles.confirmYes}
                                onClick={() =>
                                  handleConfirmDelete(request.user_id)
                                }
                              >
                                Yes
                              </button>
                              <button
                                className={styles.confirmNo}
                                onClick={() => setConfirmId(null)}
                              >
                                No
                              </button>
                            </div>
                          ) : (
                            <button
                              className={styles.deleteBtn}
                              onClick={() => setConfirmId(request.user_id)}
                              disabled={deletingId === request.user_id}
                            >
                              {deletingId === request.user_id
                                ? "Removing…"
                                : "Remove"}
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ))
      )}

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}

      {showExport && (
        <ExportModal
          joinRequests={joinRequests}
          onClose={() => setShowExport(false)}
        />
      )}
    </div>
  );
}
