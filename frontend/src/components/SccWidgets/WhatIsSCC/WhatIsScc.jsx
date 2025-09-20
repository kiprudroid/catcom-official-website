import React from "react";
import styles from "./WhatIsScc.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";

const WhatIsScc = ({ className }) => {
  return (
    <div className={`${styles.contentWrapper} ${className}`}>
      <div className={styles.title}>
        <SectionHeading className={styles.centeredText}>
          What is an SCC?:
        </SectionHeading>
      </div>

      <div className={styles.sideImageSection}>
        <img
          src="/others/unityCircle.png"
          alt="Small Christian Community"
          className={styles.sideSccImage}
        />
        <Paragraph
          className={styles.textContent}
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          A Small Christian Community (SCC) is the Church within the community,
          comprising of a manageable group of students, which help to promote
          communion, co-responsibility, and gives every member a sense of
          belonging to the community at large.
        </Paragraph>
      </div>
    </div>
  );
};

export default WhatIsScc;
