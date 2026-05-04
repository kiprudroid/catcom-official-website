import React from "react";
import styles from "./AttendanceRow.module.css";

const STATUS_OPTIONS = ["present", "absent", "apology"];

const statusMeta = {
  present: { label: "Present", cls: styles.statusPresent },
  absent: { label: "Absent", cls: styles.statusAbsent },
  apology: { label: "Apology", cls: styles.statusApology },
};

const AttendanceRow = ({
  member,
  idx,
  locked,
  meetingDate,
  copiedId,
  onCopyPhone,
  onUpdateAttendance,
}) => {
  const meta = statusMeta[member.attendance] ?? statusMeta.absent;
  const isAtRisk =
    member.consecutiveAbsence >= 3 &&
    (!member.lastFollowUp ||
      new Date(member.lastFollowUp) < new Date(meetingDate));

  return (
    <tr className={`${styles.row} ${isAtRisk ? styles.riskRow : ""}`}>
      <td className={styles.idx}>{idx + 1}</td>

      <td className={styles.nameCell}>
        <span className={styles.name}>
          {member.name}
          {isAtRisk && <span className={styles.riskBadge}>At Risk</span>}
        </span>
      </td>

      <td className={styles.markCell}>
        {locked ? (
          <span className={styles.lockedCell}>Locked</span>
        ) : (
          <div className={styles.toggle}>
            {STATUS_OPTIONS.map((s) => (
              <button
                key={s}
                className={`${styles.toggleBtn} ${member.attendance === s ? styles[`active_${s}`] : ""}`}
                onClick={() => onUpdateAttendance(member.id, s)}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
        )}
      </td>

      <td className={styles.phoneCell}>
        {member.phone ? (
          <button
            className={`${styles.phoneBtn} ${copiedId === member.id ? styles.phoneCopied : ""}`}
            onClick={() => onCopyPhone(member.id, member.phone)}
          >
            {copiedId === member.id ? "Copied!" : member.phone}
          </button>
        ) : (
          <span className={styles.phoneEmpty}>—</span>
        )}
      </td>

      <td className={styles.roleCell}>{member.role}</td>

      <td>
        <span className={`${styles.statusBadge} ${meta.cls}`}>
          {meta.label}
        </span>
      </td>

      <td className={styles.absCount}>
        <span className={isAtRisk ? styles.absHigh : ""}>
          {member.consecutiveAbsence}
        </span>
      </td>

      <td className={styles.absCount}>
        <span
          className={(member.recentAbsences ?? 0) >= 5 ? styles.absHigh : ""}
        >
          {member.recentAbsences ?? 0}
        </span>
      </td>
    </tr>
  );
};

export default AttendanceRow;
