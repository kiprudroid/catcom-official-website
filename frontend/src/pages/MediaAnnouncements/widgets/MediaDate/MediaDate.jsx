import React from "react";
import styles from "./MediaDate.module.css";

const MediaDate = ({ date }) => {
  if (!date) return null;

  const formatted = new Date(date).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return <span className={styles.date}>{formatted}</span>;
};

export default MediaDate;
