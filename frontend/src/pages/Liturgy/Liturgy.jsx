import React from "react";
import styles from "./Liturgy.module.css";
import LiturgyLayout from "../../layouts/liturgy-layout/LiturgyLayout.jsx";
import ReadingOfTheWeek from "../../components/LitugyWidgets/ReadingsOfTheWeek/ReadingsOfTheWeek.jsx";
import Prayers from "../../components/LitugyWidgets/Prayers/Prayers.jsx";
import RosaryPrayers from "../../components/LitugyWidgets/RosaryPrayers/RosaryPrayers.jsx";
import WayOfTheCross from "../../components/LitugyWidgets/WayOfTheCross/WayOfTheCross.jsx";
import DivineMercyRosary from "../../components/LitugyWidgets/DivineMercy/DivineMercyRosary.jsx";

function Liturgy() {
  return (
    <LiturgyLayout>
      <div className={styles.gridContainer}>
        <div className={styles.placeholders}>
          <div className={styles.readingWeek}>
            <ReadingOfTheWeek />
          </div>
          <div className={styles.placeholder}>
            <Prayers />
          </div>
          <div className={styles.placeholder}>
            <DivineMercyRosary />
          </div>
          <div className={styles.placeholder}>
            <RosaryPrayers />
          </div>
          <div className={styles.placeholder}>
            <WayOfTheCross />
          </div>
        </div>
      </div>
    </LiturgyLayout>
  );
}

export default Liturgy;
