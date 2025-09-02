import React from "react";
import styles from "./GroupCard.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";

const GroupCard = ({ data }) => {
  return (
    <div className={styles.groupCard}>
      <img src={data.imgSrc} alt={data.alt} className={styles.cardImage} />
      <div className={styles.cardText}>
        <SectionHeading className={styles.cardTitle}>
          {data.title}
        </SectionHeading>
        <Paragraph className={styles.cardDesc}>{data.description}</Paragraph>
      </div>
    </div>
  );
};

export default GroupCard;
