import React from "react";
import styles from "./EmptyState.module.css";

const EmptyState = ({ icon: Icon, message, sub }) => (
  <div className={styles.empty}>
    {Icon && <Icon className={styles.icon} aria-hidden="true" />}
    <span>{message}</span>
    {sub && <small className={styles.sub}>{sub}</small>}
  </div>
);

export default EmptyState;
