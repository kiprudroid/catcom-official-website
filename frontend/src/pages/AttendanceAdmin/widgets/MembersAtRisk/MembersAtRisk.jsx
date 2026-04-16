import React, { useState } from "react";
import styles from "./MembersAtRisk.module.css";
import { FaExclamationTriangle, FaSearch } from "react-icons/fa";

const MembersAtRisk = ({ members }) => {
  const [search, setSearch] = useState("");

  const atRisk = members.filter((m) => m.consecutiveAbsence >= 2);

  const filtered = atRisk.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()),
  );

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
              <th>Missed</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length === 0 && (
              <tr>
                <td colSpan="4" className={styles.empty}>
                  No matching members
                </td>
              </tr>
            )}

            {filtered.map((m, i) => (
              <tr key={m.id}>
                <td className={styles.idx}>{i + 1}</td>
                <td className={styles.name}>{m.name}</td>
                <td className={styles.role}>{m.role}</td>
                <td>
                  <span className={styles.absBadge}>
                    {m.consecutiveAbsence} missed
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MembersAtRisk;
