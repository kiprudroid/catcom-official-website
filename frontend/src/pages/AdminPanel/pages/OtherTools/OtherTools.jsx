import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./OtherTools.module.css";
import { FaClipboardList, FaExternalLinkAlt } from "react-icons/fa";

const tools = [
  {
    id: "pastoral-attendance",
    title: "Pastoral Team Attendance",
    description: "Track and manage meeting attendance for the pastoral team.",
    icon: <FaClipboardList />,
    loginPath: "/pastoral-login",
    color: "#2dabb1",
  },
  // Add future tools here — just add a new object to this array
];

const OtherTools = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Other Admin Tools</h2>
        <p className={styles.sub}>
          Standalone systems for specific teams. Each has its own login.
        </p>
      </div>

      <div className={styles.grid}>
        {tools.map((tool) => (
          <div key={tool.id} className={styles.card}>
            <div
              className={styles.iconWrap}
              style={{ background: tool.color + "18", color: tool.color }}
            >
              {tool.icon}
            </div>
            <div className={styles.info}>
              <h3 className={styles.toolTitle}>{tool.title}</h3>
              <p className={styles.toolDesc}>{tool.description}</p>
            </div>
            <button
              className={styles.btn}
              style={{ background: tool.color }}
              onClick={() => navigate(tool.loginPath)}
            >
              Open <FaExternalLinkAlt style={{ fontSize: 11 }} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OtherTools;
