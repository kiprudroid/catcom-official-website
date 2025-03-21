import React from "react";
import styles from "./MissionVision.module.css";

import { Heading, SmallText } from "../Typography/Typography";
function MissionVision({heading ,text}) {
  return (
    <>
      <Heading className={styles.contentTitle}> {heading}</Heading>
      <SmallText className={styles.contentText}>{text}
      </SmallText>
    </>
  );
}

export default MissionVision;
