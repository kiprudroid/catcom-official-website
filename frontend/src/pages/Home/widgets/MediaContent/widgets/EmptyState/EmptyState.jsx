import React from "react";
import styles from "./EmptyState.module.css";

const EmptyState = ({ type }) => {
  return (
    <div className={styles.empty}>
      No {type === "all" ? "media" : type} content yet.
    </div>
  );
};

export default EmptyState;
