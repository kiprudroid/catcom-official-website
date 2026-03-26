import React from "react";
import styles from "./AttendanceChart.module.css";

const AttendanceChart = ({ members }) => {
  const present = members.filter((m) => m.attendance === "present").length;
  const absent = members.filter((m) => m.attendance === "absent").length;
  const apology = members.filter((m) => m.attendance === "apology").length;
  const total = members.length || 1;

  const segments = [
    {
      key: "present",
      label: "Present",
      count: present,
      color: "#22c55e",
      pct: (present / total) * 100,
    },
    {
      key: "absent",
      label: "Absent",
      count: absent,
      color: "#ef4444",
      pct: (absent / total) * 100,
    },
    {
      key: "apology",
      label: "Apology",
      count: apology,
      color: "#f59e0b",
      pct: (apology / total) * 100,
    },
  ];

  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Attendance Breakdown</h3>

      <div className={styles.track}>
        {segments.map((s) =>
          s.pct > 0 ? (
            <div
              key={s.key}
              className={styles.segment}
              style={{ width: `${s.pct}%`, background: s.color }}
              title={`${s.label}: ${s.count}`}
            />
          ) : null,
        )}
      </div>

      <div className={styles.legend}>
        {segments.map((s) => (
          <div key={s.key} className={styles.legendItem}>
            <span className={styles.dot} style={{ background: s.color }} />
            <span className={styles.legendLabel}>{s.label}</span>
            <span className={styles.legendCount}>{s.count}</span>
            <span className={styles.legendPct}>{Math.round(s.pct)}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceChart;
