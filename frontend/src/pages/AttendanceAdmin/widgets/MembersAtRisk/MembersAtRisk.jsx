import React from "react";
import styles from "./MembersAtRisk.module.css";
import { FaExclamationTriangle } from "react-icons/fa";

const MembersAtRisk = ({ members }) => {
  const atRisk = members.filter((m) => m.consecutiveAbsence >= 2);
  if (atRisk.length === 0) return null;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaExclamationTriangle className={styles.icon} />
        <h3 className={styles.title}>
          Members At Risk
          <span className={styles.count}>{atRisk.length}</span>
        </h3>
      </div>
      <div className={styles.chips}>
        {atRisk.map((m) => (
          <div key={m.id} className={styles.chip}>
            <span className={styles.chipName}>{m.name}</span>
            <span className={styles.chipRole}>{m.role}</span>
            <span className={styles.chipAbs}>
              {m.consecutiveAbsence} missed
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MembersAtRisk;
