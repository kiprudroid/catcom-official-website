import React, { useState } from "react";
import styles from "./MembersAtRisk.module.css";
import { FaExclamationTriangle, FaSearch, FaCheck } from "react-icons/fa";

const MembersAtRisk = ({ members, onFollowUp, meetingDate, groupType }) => {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null);

  const isSCC = groupType === "scc";
  const colSpan = isSCC ? 8 : 7;

  const atRisk = members.filter((m) => {
    const missed = m.consecutiveAbsence >= 3;
    const lastFollowUp = m.lastFollowUp ? new Date(m.lastFollowUp) : null;
    const meeting = meetingDate ? new Date(meetingDate) : new Date();
    return missed && (!lastFollowUp || lastFollowUp < meeting);
  });

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

  const handleClick = async (id) => {
    try {
      setLoadingId(id);
      await onFollowUp(id);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaExclamationTriangle className={styles.icon} />
        <h3 className={styles.title}>
          Members At Risk
          {atRisk.length > 0 && (
            <span className={styles.count}>{atRisk.length}</span>
          )}
        </h3>
      </div>

      {atRisk.length > 0 && (
        <div className={styles.searchBar}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      )}

      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th className={styles.thIdx}>#</th>
              <th className={styles.thName}>Name</th>
              <th className={styles.thPhone}>Phone</th>
              <th className={styles.thCenter}>Followed Up</th>
              <th className={styles.thRole}>Role</th>
              {isSCC && <th className={styles.thCenter}>Family Name</th>}
              <th className={styles.thCenter}>Consecutive Absences</th>
              <th className={styles.thCenter}>Absences (Last 60 Days)</th>
            </tr>
          </thead>

          <tbody>
            {atRisk.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className={styles.allClearRow}>
                  ✓ No members at risk — all caught up!
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={colSpan} className={styles.emptyRow}>
                  No members match your search
                </td>
              </tr>
            ) : (
              filtered.map((m, i) => (
                <tr key={m.id} className={styles.row}>
                  <td className={styles.tdIdx}>{i + 1}</td>
                  <td className={styles.tdName}>{m.name}</td>
                  <td className={styles.tdPhone}>
                    {m.phone ? (
                      <button
                        className={`${styles.phoneBtn} ${
                          copiedId === m.id ? styles.phoneCopied : ""
                        }`}
                        onClick={() => copyPhone(m.id, m.phone)}
                      >
                        {copiedId === m.id ? "Copied!" : m.phone}
                      </button>
                    ) : (
                      <span className={styles.phoneEmpty}>—</span>
                    )}
                  </td>
                  <td className={styles.tdCenter}>
                    <button
                      className={styles.dismissBtn}
                      onClick={() => handleClick(m.id)}
                      disabled={loadingId === m.id}
                    >
                      {loadingId === m.id ? (
                        "Saving..."
                      ) : (
                        <>
                          <FaCheck /> Done
                        </>
                      )}
                    </button>
                  </td>
                  <td className={styles.tdRole}>{m.role}</td>
                  {isSCC && (
                    <td className={styles.tdCenter}>
                      {m.family_name ? (
                        <span className={styles.familyBadge}>
                          {m.family_name}
                        </span>
                      ) : (
                        <span className={styles.phoneEmpty}>—</span>
                      )}
                    </td>
                  )}
                  <td className={styles.tdCenter}>
                    <span className={styles.absBadge}>
                      {m.consecutiveAbsence} missed
                    </span>
                  </td>
                  <td className={styles.tdCenter}>
                    <span className={styles.recentBadge}>
                      {m.recentAbsences ?? 0}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {atRisk.length > 0 && (
        <p className={styles.hint}>
          Marking follow-up resets the consecutive absence streak for this
          member. They will reappear if they accumulate 3+ consecutive absences
          again.
        </p>
      )}
    </div>
  );
};

export default MembersAtRisk;
