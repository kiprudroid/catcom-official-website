import React from "react";
import styles from "./EventToolbar.module.css";
import { FaSearch } from "react-icons/fa";

const FILTERS = [
  { key: "all", label: "All" },
  { key: "Activity", label: "Activity" },
  { key: "Mass Animation", label: "Mass Animation" },
];

const EventToolbar = ({
  search,
  onSearch,
  activeFilter,
  onFilter,
  totalCount,
  filteredCount,
}) => (
  <div>
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <FaSearch className={styles.searchIcon} />
        <input
          className={styles.searchInput}
          placeholder="Search by title or venue…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearch("")}>
            ×
          </button>
        )}
      </div>
      <div className={styles.filters}>
        {FILTERS.map((f) => (
          <button
            key={f.key}
            className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ""}`}
            onClick={() => onFilter(f.key)}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
    {totalCount > 0 && (
      <p className={styles.resultCount}>
        {filteredCount} of {totalCount} event{totalCount !== 1 ? "s" : ""}
      </p>
    )}
  </div>
);

export default EventToolbar;
