import styles from "./PageHeader.module.css";

function PageHeader({ onExport, onRefresh }) {
  return (
    <div className={styles.header}>
      <div>
        <h1 className={styles.title}>Group Members</h1>
        <p className={styles.subtitle}>
          Approved group memberships. Remove entries here; assignment happens on
          the Join Requests page.
        </p>
      </div>
      <div className={styles.actions}>
        <button className={styles.exportBtn} onClick={onExport}>
          ⬇ Export PDF
        </button>
        <button className={styles.refreshBtn} onClick={onRefresh}>
          ↻ Refresh
        </button>
      </div>
    </div>
  );
}

export default PageHeader;
