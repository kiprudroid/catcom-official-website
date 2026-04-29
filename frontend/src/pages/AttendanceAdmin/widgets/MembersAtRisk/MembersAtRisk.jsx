import React, { useState } from "react";
import styles from "./MembersAtRisk.module.css";
import { FaExclamationTriangle, FaSearch, FaCheck } from "react-icons/fa";

const MembersAtRisk = ({ members }) => {
  const [search, setSearch] = useState("");
  const [dismissed, setDismissed] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);

  const atRisk = members.filter(
    (m) => m.consecutiveAbsence >= 2 && !dismissed.has(m.id),
  );

  const filtered = atRisk.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

  const copyPhone = (id, phone) => {
    if (!phone) return;
    navigator.clipboard.writeText(phone).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1800);
    });
  };

  const dismiss = (id) => {
    setDismissed((prev) => new Set([...prev, id]));
  };

  if (atRisk.length === 0) return null;

  return (
    <div className={styles.container}>
      {/* HEADER */}
      <div className={styles.header}>
        <FaExclamationTriangle className={styles.icon} />
        <h3 className={styles.title}>
          Members At Risk
          <span className={styles.count}>{atRisk.length}</span>
        </h3>
      </div>

      {/* SEARCH */}
      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* TABLE */}
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Phone</th>
              <th>Missed</th>
              <th>Followed Up</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="6" className={styles.empty}>
                  No matching members
                </td>
              </tr>
            )}

            {filtered.map((m, i) => (
              <tr key={m.id}>
                <td className={styles.idx}>{i + 1}</td>
                <td className={styles.name}>{m.name}</td>
                <td className={styles.role}>{m.role}</td>

                {/* Phone — click to copy */}
                <td className={styles.phoneCell}>
                  {m.phone ? (
                    <button
                      className={`${styles.phoneBtn} ${copiedId === m.id ? styles.phoneCopied : ""}`}
                      onClick={() => copyPhone(m.id, m.phone)}
                      title="Click to copy"
                    >
                      {copiedId === m.id ? "Copied!" : m.phone}
                    </button>
                  ) : (
                    <span className={styles.phoneEmpty}>—</span>
                  )}
                </td>

                <td>
                  <span className={styles.absBadge}>
                    {m.consecutiveAbsence} missed
                  </span>
                </td>

                {/* Followed up — removes from list for this session */}
                <td>
                  <button
                    className={styles.dismissBtn}
                    onClick={() => dismiss(m.id)}
                    title="Mark as followed up — removes from this list"
                  >
                    <FaCheck /> Done
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.hint}>
        "Followed Up" hides the member from this list until the page reloads.
        Their absence count resets automatically once they attend a meeting.
      </p>
    </div>
  );
};

export default MembersAtRisk;
