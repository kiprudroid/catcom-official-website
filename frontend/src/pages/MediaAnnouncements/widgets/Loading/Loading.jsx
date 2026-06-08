import React from "react";
import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.wrap}>
    <div className={styles.spinner} />
    <p className={styles.text}>Loading content…</p>
  </div>
);

export default Loading;
