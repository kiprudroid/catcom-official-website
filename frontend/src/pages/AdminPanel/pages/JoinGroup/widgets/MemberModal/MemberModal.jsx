import styles from "./MemberModal.module.css";

function MemberModal({ member, copied, onClose, onCopy }) {
  if (!member) return null;

  const buildCopyText = (s) =>
    `Name: ${s.full_name}\nPhone: ${s.phone_number}\nEmail: ${s.email}\nGender: ${s.gender}\nCollege: ${s.college}\nGroup(s): ${s.group_joined}`;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>
          ✕
        </button>

        <div className={styles.avatar}>
          {member.full_name.charAt(0).toUpperCase()}
        </div>
        <h3 className={styles.name}>{member.full_name}</h3>

        <div className={styles.groupTags}>
          {member.group_joined?.split(",").map((g) => (
            <span key={g.trim()} className={styles.groupTag}>
              {g.trim()}
            </span>
          ))}
        </div>

        <div className={styles.details}>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Phone</span>
            <a
              href={`tel:${member.phone_number}`}
              className={styles.detailLink}
            >
              {member.phone_number}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Email</span>
            <a href={`mailto:${member.email}`} className={styles.detailLink}>
              {member.email}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>Gender</span>
            <span className={styles.detailValue}>{member.gender}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>College</span>
            <span className={styles.detailValue}>{member.college}</span>
          </div>
        </div>

        <div className={styles.preview}>
          <pre className={styles.previewText}>{buildCopyText(member)}</pre>
        </div>

        <button className={styles.copyBtn} onClick={() => onCopy(member)}>
          {copied ? "✓ Copied!" : "📋 Copy All Details"}
        </button>
      </div>
    </div>
  );
}

export default MemberModal;
