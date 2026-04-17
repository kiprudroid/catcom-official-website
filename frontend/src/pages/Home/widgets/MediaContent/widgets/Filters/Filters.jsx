import React from "react";
import styles from "./Filters.module.css";

const Filters = ({ filters, activeFilter, onChange }) => {
  return (
    <div className={styles.filters}>
      {filters.map((f) => (
        <button
          key={f.key}
          className={`${styles.filterBtn} ${activeFilter === f.key ? styles.filterActive : ""}`}
          onClick={() => onChange(f.key)}
        >
          {f.icon && <span>{f.icon}</span>}
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default Filters;
