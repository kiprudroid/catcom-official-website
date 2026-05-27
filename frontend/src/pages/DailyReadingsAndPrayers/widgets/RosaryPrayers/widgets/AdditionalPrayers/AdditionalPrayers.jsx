import React, { useState } from "react";
import styles from "./AdditionalPrayers.module.css";
import { Paragraph } from "@/components/Typography/Typography";
import { FaStar } from "react-icons/fa";
import { additionalPrayers } from "@/pages/DailyReadingsAndPrayers/widgets/RosaryPrayers/data/rosary.data";

const AdditionalPrayers = () => {
  const [show, setShow] = useState(false);

  const renderItem = (item, i) => {
    if (item.type === "saint" || item.type === "invocation") {
      return (
        <Paragraph key={i} className={styles.prayerLine}>
          {item.text}
        </Paragraph>
      );
    }

    if (item.type === "leader") {
      return (
        <div key={i} className={styles.leaderBlock}>
          <span className={styles.leaderLabel}>LEADER</span>
          <Paragraph className={styles.leaderText}>{item.text}</Paragraph>
        </div>
      );
    }

    return (
      <div key={i} className={styles.prayerBlock}>
        {item.title && <p className={styles.prayerTitle}>{item.title}</p>}
        <Paragraph className={styles.prayerText}>{item.text}</Paragraph>
      </div>
    );
  };

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionHeader}
        onClick={() => setShow(!show)}
        role="button"
        aria-expanded={show}
      >
        <button className={styles.toggleBtn}>
          <FaStar className={styles.headerIcon} />
          <span className={styles.headerText}>
            {show ? "− " : "+ "}Additional Prayers
          </span>
          <span className={styles.headerSubtitle}>
            Saints &amp; Intercessions
          </span>
        </button>
      </div>

      {show && (
        <div className={styles.body}>
          <div className={styles.prayerGrid}>
            {additionalPrayers
              .filter((p) => p.type === "saint" || p.type === "invocation")
              .map((item, i) => renderItem(item, i))}
          </div>
          <div className={styles.fullPrayers}>
            {additionalPrayers
              .filter((p) => p.type !== "saint" && p.type !== "invocation")
              .map((item, i) => renderItem(item, `full-${i}`))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalPrayers;
