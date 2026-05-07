import styles from "./ExportModal.module.css";

function ExportModal({
  allGroups,
  exportGroup,
  exportRange,
  exportCount,
  onGroupChange,
  onRangeChange,
  onClose,
  onDownload,
}) {
  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>
        <h3 className={styles.title}>Export as PDF</h3>
        <p className={styles.desc}>Filter the report before downloading.</p>

        <div className={styles.fields}>
          <div className={styles.field}>
            <label className={styles.label}>Time Period</label>
            <select
              className={styles.select}
              value={exportRange}
              onChange={(e) => onRangeChange(e.target.value)}
            >
              <option value="all">All time</option>
              <option value="7">Last 7 days</option>
              <option value="30">Last 30 days</option>
              <option value="90">Last 90 days</option>
            </select>
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Group</label>
            <select
              className={styles.select}
              value={exportGroup}
              onChange={(e) => onGroupChange(e.target.value)}
            >
              <option value="all">All Groups</option>
              {allGroups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>
        </div>

        <p className={styles.count}>{exportCount} record(s) will be included</p>

        <button className={styles.downloadBtn} onClick={onDownload}>
          ⬇ Download PDF
        </button>
      </div>
    </div>
  );
}

export default ExportModal;
