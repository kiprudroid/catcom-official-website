import React from "react";
import styles from "./EmptyState.module.css";
import { FaBullhorn } from "react-icons/fa";

const EmptyState = ({ type, search }) => (
  <div className={styles.wrap}>
    <FaBullhorn className={styles.icon} />
    <p className={styles.text}>
      {search
        ? `No results for "${search}"`
        : `No ${type !== "all" ? type : ""} content yet.`}
    </p>
  </div>
);

export default EmptyState;
