import { useState } from "react";
import styles from "./MemberDetailModal.module.css";

function buildMemberText(m) {
  return `Name: ${m.full_name}\nPhone: ${m.phone_number}\nEmail: ${m.email}\nYear: Year ${m.year_study}\nGender: ${m.gender}\nSCC: ${m.scc_name}`;
}

export default function MemberDetailModal({ member, onClose }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(buildMemberText(member)).then(() => {
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
          {member.full_name.charAt(0).toUpperCase()}
        </div>
        <h3 className={styles.name}>{member.full_name}</h3>
        <span className={styles.sccTag}>{member.scc_name}</span>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.label}>Phone</span>
            <a href={`tel:${member.phone_number}`} className={styles.link}>
              {member.phone_number}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Email</span>
            <a href={`mailto:${member.email}`} className={styles.link}>
              {member.email}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Year of Study</span>
            <span className={styles.value}>Year {member.year_study}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.label}>Gender</span>
            <span className={styles.value}>{member.gender}</span>
          </div>
        </div>

        <div className={styles.preview}>
          <pre className={styles.preText}>{buildMemberText(member)}</pre>
        </div>

        <button className={styles.copyBtn} onClick={handleCopy}>
          {copied ? "✓ Copied!" : "📋 Copy All Details"}
        </button>
      </div>
    </div>
  );
}
