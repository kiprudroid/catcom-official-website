import React from "react";
import styles from "./communityCard.module.css";
import { SectionHeading, Paragraph } from "../Typography/Typography";

function CommunityCard({ title, content }) {
  return (
    <div className={styles.communityCard}>
      <div className={styles.cardContent}>
        <SectionHeading>{title}</SectionHeading>
        <Paragraph>{content}</Paragraph>
      </div>
      <button className={styles.button}>
        <Paragraph>See more</Paragraph>
      </button>
    </div>
  );
}

export default CommunityCard;
