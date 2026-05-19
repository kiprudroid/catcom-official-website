import styles from "./MemberModal.module.css";

function buildCopyText(s) {
  return `Name: ${s.full_name}\nPhone: ${s.phone_number}\nEmail: ${s.email}\nGender: ${s.gender}\nCollege: ${s.college}\nGroup(s): ${s.group_joined}`;
}

function MemberModal({ member, copied, onClose, onCopy }) {
  if (!member) return null;

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
            <span className={styles.detailLabel}>PHONE</span>
            <a
              href={`tel:${member.phone_number}`}
              className={styles.detailLink}
            >
              {member.phone_number}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>EMAIL</span>
            <a href={`mailto:${member.email}`} className={styles.detailLink}>
              {member.email}
            </a>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>GENDER</span>
            <span className={styles.detailValue}>{member.gender}</span>
          </div>
          <div className={styles.detailRow}>
            <span className={styles.detailLabel}>COLLEGE</span>
            <span className={styles.detailValue}>{member.college}</span>
          </div>
        </div>

        <button className={styles.copyBtn} onClick={() => onCopy(member)}>
          {copied ? "✓ Copied!" : "📋 Copy All Details"}
        </button>
      </div>
    </div>
  );
}

export default MemberModal;
