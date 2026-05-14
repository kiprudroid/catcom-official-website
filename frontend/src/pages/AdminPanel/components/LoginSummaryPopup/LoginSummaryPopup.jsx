import React from "react";
import { FaUserCheck } from "react-icons/fa";
import styles from "./LoginSummaryPopup.module.css";

export default function LoginSummaryPopup({
  sccCount,
  groupCount,
  onReview,
  onDismiss,
}) {
  return (
    <div className={styles.overlay} onClick={onDismiss}>
      <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
        <button
          className={styles.closeX}
          onClick={onDismiss}
          aria-label="Dismiss"
        >
          ✕
        </button>

        <div className={styles.iconCircle}>
          <FaUserCheck size={26} />
        </div>

        <h2 className={styles.title}>Welcome back, Admin</h2>
        <p className={styles.sub}>You have pending requests awaiting review.</p>

        <div className={styles.statGrid}>
          {sccCount > 0 && (
            <div className={styles.statCard}>
              <span className={styles.num}>{sccCount}</span>
              <span className={styles.lbl}>
                Join SCC request{sccCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
          {groupCount > 0 && (
            <div className={styles.statCard}>
              <span className={styles.num}>{groupCount}</span>
              <span className={styles.lbl}>
                Join Group request{groupCount !== 1 ? "s" : ""}
              </span>
            </div>
          )}
        </div>

        <div className={styles.btnRow}>
          <button className={styles.btnPrimary} onClick={onReview}>
            Review requests →
          </button>
          <button className={styles.btnSecondary} onClick={onDismiss}>
            Dismiss
          </button>
        </div>
      </div>
    </div>
  );
}
