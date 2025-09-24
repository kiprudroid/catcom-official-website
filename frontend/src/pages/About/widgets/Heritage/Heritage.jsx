import React from "react";
import heritageImage from "/about-images/Sacred-Heritage.webp";
import styles from "./Heritage.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

const Heritage = () => {
  return (
    <div className={styles.heritageContainer}>
      <div className={styles.heritageText}>
        <div>
          <SectionHeading className={styles.heritageTitle}>
            Our Sacred Heritage
          </SectionHeading>
          <div className={styles.heritageDivider}></div>
        </div>

        <div className={styles.heritageProse}>
          <p>
            Founded with the vision of creating a spiritual home for Catholic
            students at JKUAT, our community has grown from a small prayer group
            to a thriving family of faith. Since our establishment, we have been
            dedicated to fostering spiritual growth, academic excellence, and
            social responsibility.
          </p>

          <p>
          Our heritage is built on the foundation of Christ&apos;s
            teachings, the wisdom of the Church, and the commitment of
            generations of faithful students and clergy.
          </p>
        </div>
      </div>

      <div className={styles.heritageImageWrapper}>
        <div className={styles.heritageImageContainer}>
          <img
            src={heritageImage}
            alt="CATCOM Heritage - Catholic community tradition and faith"
            className={styles.heritageImage}
          />
        </div>
      </div>
    </div>
  );
};

export default Heritage;
