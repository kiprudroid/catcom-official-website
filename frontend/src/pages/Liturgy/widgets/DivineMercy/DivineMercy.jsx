import React from "react";
import styles from "./DivineMercy.module.css";
import { FaPrayingHands } from "react-icons/fa";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

function DivineMercy() {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <FaPrayingHands className={styles.icon} />
        <SectionHeading as="h2">Divine Mercy Chaplet</SectionHeading>
      </div>

      <div className={styles.section}>
        <SectionHeading>Opening</SectionHeading>
        <Paragraph>
          Begin with: <em>Our Father, Hail Mary, Apostles’ Creed</em>
        </Paragraph>
      </div>

      <div className={styles.section}>
        <SectionHeading>On the Large Beads</SectionHeading>
        <Paragraph>
          “Eternal Father, I offer You the Body and Blood, Soul and Divinity of
          Your dearly beloved Son, our Lord Jesus Christ, in atonement for our
          sins and those of the whole world.”
        </Paragraph>
      </div>

      <div className={styles.section}>
        <SectionHeading>On the Small Beads</SectionHeading>
        <Paragraph>
          “For the sake of His sorrowful Passion, have mercy on us and on the
          whole world.”
        </Paragraph>
      </div>

      <div className={styles.section}>
        <SectionHeading>Closing Prayer (3×)</SectionHeading> <h3></h3>
        <Paragraph>
          “Holy God, Holy Mighty One, Holy Immortal One, have mercy on us and on
          the whole world.”
        </Paragraph>
      </div>
    </div>
  );
}

export default DivineMercy;
