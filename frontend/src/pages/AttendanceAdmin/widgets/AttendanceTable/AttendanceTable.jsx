import React from "react";
import styles from "./AttendanceTable.module.css";

const STATUS_OPTIONS = ["present", "absent", "apology"];

const statusMeta = {
  present: { label: "Present", color: "#22c55e", bg: "#dcfce7" },
  absent: { label: "Absent", color: "#ef4444", bg: "#fee2e2" },
  apology: { label: "Apology", color: "#f59e0b", bg: "#fef3c7" },
};

const AttendanceTable = ({ members, updateAttendance }) => {
  if (members.length === 0) {
    return (
      <div className={styles.empty}>
        No members yet. Add members using the panel above.
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <h3 className={styles.heading}>Attendance Register</h3>
      <div className={styles.tableScroll}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Role</th>
              <th>Status</th>
              <th>Consec. Absences</th>
              <th>Mark</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member, idx) => {
              const meta = statusMeta[member.attendance] || statusMeta.present;
              const isAtRisk = member.consecutiveAbsence >= 2;
              return (
                <tr key={member.id} className={isAtRisk ? styles.riskRow : ""}>
                  <td className={styles.idx}>{idx + 1}</td>
                  <td className={styles.name}>
                    {member.name}
                    {isAtRisk && (
                      <span className={styles.riskBadge}>At Risk</span>
                    )}
                  </td>
                  <td className={styles.role}>{member.role}</td>
                  <td>
                    <span
                      className={styles.statusBadge}
                      style={{ color: meta.color, background: meta.bg }}
                    >
                      {meta.label}
                    </span>
                  </td>
                  <td className={styles.absCount}>
                    <span className={isAtRisk ? styles.absHigh : ""}>
                      {member.consecutiveAbsence}
                    </span>
                  </td>
                  <td>
                    <div className={styles.toggle}>
                      {STATUS_OPTIONS.map((s) => (
                        <button
                          key={s}
                          className={`${styles.toggleBtn} ${member.attendance === s ? styles.active : ""}`}
                          data-status={s}
                          onClick={() => updateAttendance(member.id, s)}
                        >
                          {s.charAt(0).toUpperCase() + s.slice(1)}
                        </button>
                      ))}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceTable;
