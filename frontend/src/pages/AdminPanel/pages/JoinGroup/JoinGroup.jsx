import React, { useState, useEffect } from "react";
import styles from "./JoinGroup.module.css";
import { fetchJoinGroups, deleteJoinGroup } from "@/api/joinGroup.api";

function JoinGroup() {
  const [submissions, setSubmissions] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [confirmId, setConfirmId] = useState(null); // ✅ tracks which row is awaiting confirm
  const PENDING_PREFIX = "PENDING: ";

  const isPendingRequest = (groupValue) =>
    typeof groupValue === "string" && groupValue.startsWith(PENDING_PREFIX);

  const getApprovedJoinGroups = (rows) =>
    rows.filter((row) => !isPendingRequest(row.group_joined));

  // ✅ Fetch on mount
  useEffect(() => {
    loadSubmissions();
  }, []);

  // ✅ Filter whenever search or submissions change
  useEffect(() => {
    const q = search.toLowerCase();
    setFiltered(
      getApprovedJoinGroups(submissions).filter(
        (s) =>
          s.full_name.toLowerCase().includes(q) ||
          s.email.toLowerCase().includes(q) ||
          s.college.toLowerCase().includes(q) ||
          s.group_joined.toLowerCase().includes(q),
      ),
    );
  }, [search, submissions]);

  const loadSubmissions = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJoinGroups();
      setSubmissions(data);
    } catch (err) {
      setError("❌ Failed to load submissions: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (id) => {
    setConfirmId(id); // ✅ show inline confirm instead of deleting immediately
  };

  const handleConfirmDelete = async (id) => {
    setDeletingId(id);
    setConfirmId(null);
    try {
      await deleteJoinGroup(id);
      setSubmissions((prev) => prev.filter((s) => s.user_id !== id));
    } catch (err) {
      setError("❌ Failed to delete: " + err.message);
    } finally {
      setDeletingId(null);
    }
  };

  const handleCancelDelete = () => {
    setConfirmId(null);
  };

  return (
    <div className={styles.adminPage}>
      {/* ── Header ── */}
      <div className={styles.header}>
        <h1 className={styles.title}>Approved Group Members</h1>
        <button className={styles.refreshBtn} onClick={loadSubmissions}>
          ↻ Refresh
        </button>
      </div>

      <p
        style={{ color: "#555", marginTop: 0, marginBottom: 12, maxWidth: 600 }}
      >
        This page shows only approved group memberships. Admins can remove
        entries here, but assignment must happen first on the Membership
        Requests page.
      </p>
      {/* ── Search ── */}
      <div className={styles.searchBar}>
        <input
          type="text"
          placeholder="Search by name, email, college or group..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={styles.searchInput}
        />
        <span className={styles.count}>
          {filtered.length} of {submissions.length} record
          {submissions.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* ── States ── */}
      {loading && <div className={styles.stateMsg}>Loading submissions...</div>}
      {error && <div className={styles.errorMsg}>{error}</div>}

      {/* ── Table ── */}
      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className={styles.stateMsg}>No submissions found.</div>
          ) : (
            <div className={styles.tableWrapper}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Gender</th>
                    <th>College</th>
                    <th>Group(s) Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((s, index) => (
                    <tr
                      key={s.user_id}
                      className={
                        deletingId === s.user_id ? styles.rowDeleting : ""
                      }
                    >
                      <td>{index + 1}</td>
                      <td>{s.full_name}</td>
                      <td>{s.phone_number}</td>
                      <td>{s.email}</td>
                      <td>{s.gender}</td>
                      <td>{s.college}</td>
                      <td>{s.group_joined}</td>
                      <td>
                        {confirmId === s.user_id ? (
                          <div className={styles.confirmInline}>
                            <span>Delete approved member?</span>
                            <button
                              className={styles.confirmYes}
                              onClick={() => handleConfirmDelete(s.user_id)}
                            >
                              Yes
                            </button>
                            <button
                              className={styles.confirmNo}
                              onClick={handleCancelDelete}
                            >
                              No
                            </button>
                          </div>
                        ) : (
                          <button
                            className={styles.deleteBtn}
                            onClick={() => handleDeleteClick(s.user_id)}
                            disabled={deletingId === s.user_id}
                          >
                            {deletingId === s.user_id
                              ? "Deleting..."
                              : "Delete"}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default JoinGroup;
