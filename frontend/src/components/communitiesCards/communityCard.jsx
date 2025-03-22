import React from "react";
import styles from "./communityCard.module.css";
import { Heading, SmallText } from "../Typography/Typography";

function CommunityCard({ title, content }) {
  return (
    <div className={styles.communityCard}>
      <div className={styles.cardContent}>
        <Heading>{title}</Heading>
        <SmallText>{content}</SmallText>
      </div>
      <button className={styles.button}>
        <SmallText>see more about {title}</SmallText>
      </button>
    </div>
  );
}

export default CommunityCard;
