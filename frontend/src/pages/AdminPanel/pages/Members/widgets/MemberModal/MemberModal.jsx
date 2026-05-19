import React, { useState } from "react";
import styles from "./MemberModal.module.css";
import { stripPendingPrefix, buildCopyText } from "../../utils/requestHelpers";

export default function MemberModal({ member, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(buildCopyText(member)).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.close} onClick={onClose}>
          ✕
        </button>

        <div className={styles.avatar}>
          {(member.name || member.full_name || "?").charAt(0).toUpperCase()}
        </div>
        <h3 className={styles.name}>{member.name || member.full_name}</h3>

        <div className={styles.tags}>
          <span
            className={`${styles.typePill} ${
              member.type === "joinScc"
                ? styles.typeScc
                : member.type === "joinGroup"
                  ? styles.typeGroup
                  : styles.typeDummy
            }`}
          >
            {member.type === "joinScc"
              ? "Join SCC"
              : member.type === "joinGroup"
                ? "Join Group"
                : "Pending"}
          </span>
          {member.group_joined && (
            <span className={styles.groupTag}>
              {stripPendingPrefix(member.group_joined)}
            </span>
          )}
          {member.scc_name && member.scc_name !== "TBD" && (
            <span className={styles.sccTag}>{member.scc_name}</span>
          )}
        </div>

        <div className={styles.details}>
          {member.phone_number && (
            <div className={styles.detailRow}>
              <span className={styles.label}>PHONE</span>
              <a href={`tel:${member.phone_number}`} className={styles.link}>
                {member.phone_number}
              </a>
            </div>
          )}
          {member.email && (
            <div className={styles.detailRow}>
              <span className={styles.label}>EMAIL</span>
              <a href={`mailto:${member.email}`} className={styles.link}>
                {member.email}
              </a>
            </div>
          )}
          {member.gender && (
            <div className={styles.detailRow}>
              <span className={styles.label}>GENDER</span>
              <span className={styles.value}>{member.gender}</span>
            </div>
          )}
          {member.college && (
            <div className={styles.detailRow}>
              <span className={styles.label}>COLLEGE</span>
              <span className={styles.value}>{member.college}</span>
            </div>
          )}
          {member.year_study && (
            <div className={styles.detailRow}>
              <span className={styles.label}>YEAR</span>
              <span className={styles.value}>Year {member.year_study}</span>
            </div>
          )}
          <div className={styles.detailRow}>
            <span className={styles.label}>REQUEST</span>
            <span className={styles.value}>{member.note}</span>
          </div>
        </div>

        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? "✓ Copied!" : "📋 Copy All Details"}
        </button>
      </div>
    </div>
  );
}
