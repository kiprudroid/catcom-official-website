import React from "react";
import styles from "./PatronSaint.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

const PatronSaint= ({ image, name, aboutPatronSaint, className}) => {
  return (
        <div className={`${styles.card} ${className}`}>
    <div className={styles.patronSaintWrapper}>
      <div className={styles.patronSaintImage}>
        <img
          src={image}
          alt={`${name} Patron Saint`}
        />
      </div>
      <div className={styles.patronSaintText}>
        <SectionHeading as="h2">About {name}</SectionHeading>
        <Paragraph>{aboutPatronSaint}</Paragraph>
      </div>
    </div>
    </div>
  );
};

export default PatronSaint;
