import React from "react";
import styles from "./Prayer.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

const Prayer = ({ name, prayer, className = '' }) => {
  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.prayerCard}>
        <SectionHeading as="h2">Prayer to {name}</SectionHeading>
        <Paragraph>{prayer}</Paragraph>
      </div>
    </div>
  );
};

export default Prayer;
