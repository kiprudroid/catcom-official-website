import React from "react";
import styles from "./Liturgy.module.css";

import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout.jsx";

import {
  ReadingsOfTheWeek,
  Prayers,
  RosaryPrayers,
  WayOfTheCross,
  DivineMercy,
} from "@/pages/Liturgy/widgets";

function Liturgy() {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={`${styles.readingWeek} ${styles.widget}`}>
          <ReadingsOfTheWeek />
        </div>
        <div className={styles.widget}>
          <Prayers />
        </div>
        <div className={styles.widget}>
          <DivineMercy />
        </div>
        <div className={styles.widget}>
          <RosaryPrayers />
        </div>
        <div className={styles.widget}>
          <WayOfTheCross />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Liturgy;
