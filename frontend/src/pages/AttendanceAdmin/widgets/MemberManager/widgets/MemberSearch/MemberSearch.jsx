import React from "react";
import { FaSearch } from "react-icons/fa";
import styles from "./MemberSearch.module.css";

const ROLES = [
  "Catering Secretary",
  "Chairperson",
  "Coordinator",
  "Liturgist",
  "Member",
  "Moderator",
  "Organising Secretary",
  "Pastoral Secretary",
  "Project Manager",
  "Secretary",
  "Treasurer",
].sort();

const MemberSearch = ({
  search,
  filterRole,
  onSearchChange,
  onFilterChange,
}) => (
  <div className={styles.searchBar}>
    <div className={styles.searchInputWrapper}>
      <FaSearch className={styles.searchIcon} />
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search by name…"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
    </div>
    <select
      className={styles.filterSelect}
      value={filterRole}
      onChange={(e) => onFilterChange(e.target.value)}
    >
      <option value="">All Roles</option>
      {ROLES.map((r) => (
        <option key={r}>{r}</option>
      ))}
    </select>
  </div>
);

export default MemberSearch;
