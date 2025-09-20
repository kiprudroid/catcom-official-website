import React from "react";
import styles from "./Prayer.module.css";
import { SectionHeading, Paragraph } from "../../../components/Typography/Typography";

const Prayer = ({ name, prayer }) => {
  return (
    <div className={styles.card}>
      <div className={styles.prayerCard}>
        <SectionHeading as="h2">Prayer to {name}</SectionHeading>
        <Paragraph>{prayer}</Paragraph>
      </div>
    </div>
  );
};

export default Prayer;
