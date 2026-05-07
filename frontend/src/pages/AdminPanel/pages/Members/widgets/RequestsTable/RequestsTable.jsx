import styles from "./RequestsTable.module.css";
import {
  SCC_OPTIONS,
  GROUP_OPTIONS,
  stripPendingPrefix,
} from "../../utils/requestHelpers";

export default function RequestsTable({
  rows,
  loading,
  error,
  filterRange,
  filterType,
  searchQuery,
  assigning,
  groupAssigning,
  onFilterRangeChange,
  onFilterTypeChange,
  onSearchChange,
  onAssigningChange,
  onGroupAssigningChange,
  onAssign,
  onAssignGroup,
  onDelete,
  onAccept,
  onReject,
  onRowClick,
}) {
  return (
    <section className={styles.section}>
      <div className={styles.filtersRow}>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Search</label>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Name or email…"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Time</label>
          <select
            className={styles.filterSelect}
            value={filterRange}
            onChange={(e) => onFilterRangeChange(e.target.value)}
          >
            <option value="all">All time</option>
            <option value="1">Last 24 hours</option>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
          </select>
        </div>
        <div className={styles.filterGroup}>
          <label className={styles.filterLabel}>Type</label>
          <select
            className={styles.filterSelect}
            value={filterType}
            onChange={(e) => onFilterTypeChange(e.target.value)}
          >
            <option value="all">All requests</option>
            <option value="joinSCC">Join SCC</option>
            <option value="joinGroup">Join Group</option>
          </select>
        </div>
        <span className={styles.resultCount}>
          {rows.length} result{rows.length !== 1 ? "s" : ""}
        </span>
      </div>

      {loading && (
        <div className={styles.stateMsg}>
          <div className={styles.spinner} /> Loading…
        </div>
      )}
      {error && <div className={styles.errorMsg}>⚠ {error}</div>}

      {!loading &&
        !error &&
        (rows.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>📭</span>
            <p>No pending requests found.</p>
          </div>
        ) : (
          <div className={styles.tableWrapper}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Details</th>
                  <th>Received</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, index) => (
                  <tr key={`${r.type}-${r.id}`}>
                    <td className={styles.indexCell}>{index + 1}</td>
                    <td className={styles.nameCell}>
                      <button
                        className={styles.memberBtn}
                        onClick={() => onRowClick(r)}
                        title="Click to view details"
                      >
                        <span className={styles.avatar}>
                          {(r.name || "?").charAt(0).toUpperCase()}
                        </span>
                        <div>
                          <div className={styles.fullName}>{r.name}</div>
                          {r.email && (
                            <div className={styles.emailSmall}>{r.email}</div>
                          )}
                        </div>
                      </button>
                    </td>
                    <td>
                      <span
                        className={`${styles.typePill} ${
                          r.type === "joinScc"
                            ? styles.typeScc
                            : r.type === "joinGroup"
                              ? styles.typeGroup
                              : styles.typeDummy
                        }`}
                      >
                        {r.type === "joinScc"
                          ? "Join SCC"
                          : r.type === "joinGroup"
                            ? "Join Group"
                            : "Pending"}
                      </span>
                    </td>
                    <td className={styles.noteCell}>{r.note}</td>
                    <td className={styles.dateCell}>
                      {new Date(r.requestedAt).toLocaleDateString()}
                    </td>
                    <td className={styles.actionsCell}>
                      {r.type === "joinScc" ? (
                        <div className={styles.inlineAssign}>
                          <select
                            value={assigning[r.id] || ""}
                            onChange={(e) =>
                              onAssigningChange(r.id, e.target.value)
                            }
                            className={styles.assignSelect}
                          >
                            <option value="">Assign SCC…</option>
                            {SCC_OPTIONS.map((s) => (
                              <option key={s} value={s}>
                                {s}
                              </option>
                            ))}
                          </select>
                          <button
                            className={styles.approveBtn}
                            onClick={() => onAssign(r.id)}
                          >
                            Assign
                          </button>
                          <button
                            className={styles.rejectBtn}
                            onClick={() => onDelete(r.id, "joinScc")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : r.type === "joinGroup" ? (
                        <div className={styles.inlineAssign}>
                          <select
                            value={
                              groupAssigning[r.id] ||
                              stripPendingPrefix(r.group_joined)
                                .split(", ")[0]
                                .trim()
                            }
                            onChange={(e) =>
                              onGroupAssigningChange(r.id, e.target.value)
                            }
                            className={styles.assignSelect}
                          >
                            {stripPendingPrefix(r.group_joined)
                              .split(", ")
                              .map((g) => (
                                <option key={g.trim()} value={g.trim()}>
                                  {g.trim()}
                                </option>
                              ))}
                            {GROUP_OPTIONS.filter(
                              (g) =>
                                !stripPendingPrefix(r.group_joined).includes(g),
                            ).map((g) => (
                              <option key={g} value={g}>
                                {g}
                              </option>
                            ))}
                          </select>
                          <button
                            className={styles.approveBtn}
                            onClick={() => onAssignGroup(r.id, r)}
                          >
                            Approve
                          </button>
                          <button
                            className={styles.rejectBtn}
                            onClick={() => onDelete(r.id, "joinGroup")}
                          >
                            Reject
                          </button>
                        </div>
                      ) : (
                        <div className={styles.inlineAssign}>
                          <button
                            className={styles.approveBtn}
                            onClick={() => onAccept(r.id)}
                          >
                            Accept
                          </button>
                          <button
                            className={styles.rejectBtn}
                            onClick={() => onReject(r.id)}
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
    </section>
  );
}
