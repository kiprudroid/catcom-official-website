import React from "react";
import styles from "./Spinner.module.css";

const Spinner = () => (
  <div className={styles.container}>
    <div className={styles.ring} />
    <span className={styles.text}>Loading attendance…</span>
  </div>
);

export default Spinner;
