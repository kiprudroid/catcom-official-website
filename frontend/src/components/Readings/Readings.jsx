import React from "react";
import styles from "./Readings.module.css";
function Readings({ title, text, className }) {
  return (
    <div className={`${styles.readingsSection} ${className}`}>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}

export default Readings;
