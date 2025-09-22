import React from "react";
import styles from "./HeroCard.module.css";
import {
  SectionHeading,
  Paragraph,
} from "@/components/Typography/Typography";

const HeroCard = ({ name, about }) => {
  return (
    <div className={styles.hero}>
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
