import React from "react";
import styles from "./HeroCard.module.css";
import {
  SectionHeading,
  Paragraph,
} from "@/components/Typography/Typography";

const HeroCard = ({ name, about, className }) => {
  return (
    <div className={`${styles.hero} ${className || ''}`}>
      <SectionHeading as="h1">
        <div className={styles.title}>{name}</div>
      </SectionHeading>
      <Paragraph>
        <div className={styles.about}>{about}</div>
      </Paragraph>
    </div>
  );
};

export default HeroCard;
