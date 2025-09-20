import React from "react";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

import styles from "./VisionCards.module.css";

const VisionCards = () => {
  return (
    <div className={styles.visionContainer}>
      <div className={styles.card}>
        <SectionHeading className={styles.cardTitle}>
          What are we?
        </SectionHeading>
        <Paragraph className={styles.textContent}>
          We are a vibrant Catholic Community that encourages healthy growth
          spiritually, socially, and academically, with the ultimate goal of
          encountering Christ in our daily lives. The community supports us in
          recognizing our inherent vocation bestowed upon us by God.
        </Paragraph>
      </div>
      <div className={styles.card}>
        <SectionHeading className={styles.cardTitle}>Our Vision</SectionHeading>
        <Paragraph className={styles.textContent}>
          A praying, believing and worshiping community for empowering young
          people to live as disciples of Jesus Christ.
        </Paragraph>
      </div>
    </div>
  );
};

export default VisionCards;
