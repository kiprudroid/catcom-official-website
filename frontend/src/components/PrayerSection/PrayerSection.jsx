import React from "react";
import styles from "./PrayerSection.module.css";

function PrayerSection({ title, text, className }) {
  return (
    <div className={`${styles.prayerSection} ${className}`}>
      <b>{title}</b>
      <p>{text}</p>
    </div>
  );
}

export default PrayerSection;
