import React from "react";
import styles from "./TableToolbar.module.css";
import { FaSearch } from "react-icons/fa";

const TableToolbar = ({
  search,
  onSearchChange,
  roleFilter,
  onRoleFilterChange,
  roles,
  onDownloadCSV,
  onDownloadPDF,
  onShowRange,
  locked,
  groupName,
  meetingDate,
  familyFilter,
  onFamilyFilterChange,
  groupType,
}) => {
  const isSCC = groupType === "scc";

  return (
    <div className={styles.toolbar}>
      <div className={styles.headerRow}>
        <div>
          <h3 className={styles.heading}>Attendance Register</h3>
          {locked && (
            <p className={styles.lockedNotice}>
              🔒 Locked — more than 12 hours since this date was saved.
            </p>
          )}
        </div>
        <div className={styles.actions}>
          <button className={styles.rangeBtn} onClick={onShowRange}>
            ↓ Range Report
          </button>
          <button className={styles.downloadBtn} onClick={onDownloadCSV}>
            ↓ CSV
          </button>
          <button className={styles.downloadBtn} onClick={onDownloadPDF}>
            ↓ PDF
          </button>
        </div>
      </div>

      <div className={styles.searchBar}>
        <div className={styles.searchWrap}>
          <FaSearch className={styles.searchIcon} />
          <input
            className={styles.searchInput}
            placeholder="Search member..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        {isSCC && (
          <input
            className={styles.familyInput}
            placeholder="Filter by family name…"
            value={familyFilter}
            onChange={(e) => onFamilyFilterChange(e.target.value)}
          />
        )}
        <select
          className={styles.roleFilter}
          value={roleFilter}
          onChange={(e) => onRoleFilterChange(e.target.value)}
        >
          <option value="">All Roles</option>
          {roles.map((r) => (
            <option key={r} value={r}>
              {r}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default TableToolbar;
