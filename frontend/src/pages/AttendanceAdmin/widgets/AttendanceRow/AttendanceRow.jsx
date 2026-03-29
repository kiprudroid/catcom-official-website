import React from "react";
import styles from "./AttendanceRow.module.css";

const AttendanceRow = ({ member, updateAttendance }) => {
  const isWarning = member.consecutiveAbsence >= 2;

  return (
    <tr className={isWarning ? styles.warning : ""}>
      <td>{member.name}</td>
      <td>{member.role}</td>

      <td>
        <span className={`${styles.status} ${styles[member.attendance]}`}>
          {member.attendance}
        </span>
      </td>

      <td>{member.consecutiveAbsence}</td>

      <td>
        <select
          value={member.attendance}
          onChange={(e) => updateAttendance(member.id, e.target.value)}
          className={styles.select}
        >
          <option value="present">Present</option>
          <option value="absent">Absent</option>
          <option value="apology">Apology</option>
        </select>
      </td>
    </tr>
  );
};

export default AttendanceRow;
