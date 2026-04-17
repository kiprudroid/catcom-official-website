import React from "react";
import styles from "./OpeningPrayers.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaCross } from "react-icons/fa";
import { openingPrayers } from "@/pages/Liturgy/widgets/RosaryPrayers/data/rosary.data";

const OpeningPrayers = () => {
  return (
    <div className={styles.opening}>
      <FaCross className={styles.crossIcon} />
      {openingPrayers.map((prayer, i) => (
        <div key={i} className={styles.prayerBlock}>
          <SectionHeading as="h3">{prayer.title}</SectionHeading>
          <Paragraph>{prayer.text}</Paragraph>
        </div>
      ))}
    </div>
  );
};

export default OpeningPrayers;
