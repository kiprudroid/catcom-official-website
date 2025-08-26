import React from "react";
import styles from "./MissionVision.module.css";

import { SectionHeading, SmallText } from "../Typography/Typography";
function MissionVision({ heading, text }) {
  return (
    <>
      <SectionHeading className={styles.contentTitle}>
        {" "}
        {heading}
      </SectionHeading>
      <SmallText className={styles.contentText}>{text}</SmallText>
    </>
  );
}

export default MissionVision;
