import React from "react";
import styles from "./communityCard.module.css";
import { SectionHeading, SmallText } from "../Typography/Typography";

function CommunityCard({ title, content }) {
  return (
    <div className={styles.communityCard}>
      <div className={styles.cardContent}>
        <SectionHeading>{title}</SectionHeading>
        <SmallText>{content}</SmallText>
      </div>
      <button className={styles.button}>
        <SmallText>See more</SmallText>
      </button>
    </div>
  );
}

export default CommunityCard;
