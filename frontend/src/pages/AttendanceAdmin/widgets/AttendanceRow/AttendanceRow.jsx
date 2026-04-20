import React from "react";
import styles from "./AttendanceRow.module.css";

const AttendanceRow = ({ member, updateAttendance }) => {
  const isWarning = member.consecutiveAbsence >= 2;

  //  fall back to "absent" if attendance is somehow undefined
  const currentStatus = member.attendance ?? "absent";

  return (
    <tr className={isWarning ? styles.warning : ""}>
      <td>{member.name}</td>
      <td>{member.role}</td>

      <td>
        <span className={`${styles.status} ${styles[currentStatus]}`}>
          {currentStatus}
        </span>
      </td>

      <td>{member.consecutiveAbsence}</td>

      <td>
        <select
          value={currentStatus}
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
