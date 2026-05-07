import styles from "./Toolbar.module.css";

function Toolbar({
  search,
  onSearch,
  groupFilter,
  onGroupFilter,
  allGroups,
  filteredCount,
  totalCount,
}) {
  return (
    <div className={styles.toolbar}>
      <div className={styles.searchWrap}>
        <span className={styles.searchIcon}>🔍</span>
        <input
          type="text"
          placeholder="Search by name, email, college or group…"
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          className={styles.searchInput}
        />
        {search && (
          <button className={styles.clearBtn} onClick={() => onSearch("")}>
            ✕
          </button>
        )}
      </div>

      <div className={styles.groupFilterWrap}>
        <label className={styles.filterLabel}>Group</label>
        <select
          className={styles.groupSelect}
          value={groupFilter}
          onChange={(e) => onGroupFilter(e.target.value)}
        >
          <option value="all">All Groups</option>
          {allGroups.map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </select>
      </div>

      <span className={styles.count}>
        {filteredCount} of {totalCount} record{totalCount !== 1 ? "s" : ""}
      </span>
    </div>
  );
}

export default Toolbar;
