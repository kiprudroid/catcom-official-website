import React from "react";
import styles from "./MissionVision.module.css";

import { SectionHeading, Paragraph } from "../Typography/Typography";
function MissionVision({ heading, text }) {
  return (
    <>
      <SectionHeading className={styles.contentTitle}>{heading}</SectionHeading>
      <Paragraph className={styles.contentText}>{text}</Paragraph>
    </>
  );
}

export default MissionVision;
