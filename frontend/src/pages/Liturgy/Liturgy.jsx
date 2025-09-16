import React from "react";
import styles from "./Liturgy.module.css";
import ReadingOfTheWeek from "../../components/LitugyWidgets/ReadingsOfTheWeek/ReadingsOfTheWeek.jsx";
import Prayers from "../../components/LitugyWidgets/Prayers/Prayers.jsx";
import RosaryPrayers from "../../components/LitugyWidgets/RosaryPrayers/RosaryPrayers.jsx";
import WayOfTheCross from "../../components/LitugyWidgets/WayOfTheCross/WayOfTheCross.jsx";
import DivineMercyRosary from "../../components/LitugyWidgets/DivineMercy/DivineMercyRosary.jsx";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout.jsx";

function Liturgy() {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={`${styles.readingWeek} ${styles.widget}`}>
          <ReadingOfTheWeek />
        </div>
        <div className={styles.widget}>
          <Prayers />
        </div>
        <div className={styles.widget}>
          <DivineMercyRosary />
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
