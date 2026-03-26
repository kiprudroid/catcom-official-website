import React from "react";
import styles from "./AttendanceWidgets.module.css";
import {
  FaUsers,
  FaCheckCircle,
  FaTimesCircle,
  FaHandPaper,
} from "react-icons/fa";

const AttendanceWidgets = ({ members }) => {
  const present = members.filter((m) => m.attendance === "present").length;
  const absent = members.filter((m) => m.attendance === "absent").length;
  const apology = members.filter((m) => m.attendance === "apology").length;
  const total = members.length;
  const rate = total > 0 ? Math.round((present / total) * 100) : 0;

  const cards = [
    {
      label: "Total Members",
      value: total,
      icon: <FaUsers />,
      accent: "#2dabb1",
    },
    {
      label: "Present",
      value: present,
      icon: <FaCheckCircle />,
      accent: "#22c55e",
    },
    {
      label: "Absent",
      value: absent,
      icon: <FaTimesCircle />,
      accent: "#ef4444",
    },
    {
      label: "Apologies",
      value: apology,
      icon: <FaHandPaper />,
      accent: "#f59e0b",
    },
  ];

  return (
    <div className={styles.grid}>
      {cards.map((card) => (
        <div
          key={card.label}
          className={styles.card}
          style={{ "--accent": card.accent }}
        >
          <div className={styles.icon}>{card.icon}</div>
          <div className={styles.info}>
            <span className={styles.value}>{card.value}</span>
            <span className={styles.label}>{card.label}</span>
          </div>
          <div
            className={styles.bar}
            style={{ width: `${(card.value / (total || 1)) * 100}%` }}
          />
        </div>
      ))}
      <div className={styles.rateCard}>
        <span className={styles.rateLabel}>Attendance Rate</span>
        <div className={styles.rateTrack}>
          <div className={styles.rateFill} style={{ width: `${rate}%` }} />
        </div>
        <span className={styles.rateValue}>{rate}%</span>
      </div>
    </div>
  );
};

export default AttendanceWidgets;
