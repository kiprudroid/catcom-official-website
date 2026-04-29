import React, { useState } from "react";
import styles from "./MembersAtRisk.module.css";
import { FaExclamationTriangle, FaSearch, FaCheck } from "react-icons/fa";

const MembersAtRisk = ({ members, onFollowUp, meetingDate }) => {
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const [loadingId, setLoadingId] = useState(null); // 👈 key fix

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

  if (members.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaExclamationTriangle className={styles.icon} />
        <h3 className={styles.title}>
          Members At Risk
          <span className={styles.count}>{atRisk.length}</span>
        </h3>
      </div>

      <div className={styles.searchBar}>
        <FaSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search member..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

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

                <td className={styles.name}>
                  <span>{m.name}</span>
                </td>

                <td className={styles.role}>{m.role}</td>

                <td className={styles.phoneCell}>
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

                <td className={styles.missedCell}>
                  <span className={styles.absBadge}>
                    {m.consecutiveAbsence} missed
                  </span>
                </td>

                <td className={styles.followedCell}>
                  <button
                    className={`${styles.dismissBtn} ${
                      loadingId === m.id ? styles.loadingBtn : ""
                    }`}
                    onClick={() => handleClick(m.id)}
                    disabled={loadingId === m.id}
                  >
                    <span className={styles.btnContent}>
                      {loadingId === m.id ? (
                        <span className={styles.spinner}></span>
                      ) : (
                        <>
                          <FaCheck />
                          <span>Done</span>
                        </>
                      )}
                    </span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className={styles.hint}>
        Members remain at risk until marked as followed up for this meeting.
      </p>
    </div>
  );
};

export default MembersAtRisk;
