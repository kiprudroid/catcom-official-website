import React from "react";
import styles from "./MissionVision.module.css";

import { Heading, SmallText } from "../Typography/Typography";
function MissionVision() {
  return (
    <>
      <Heading className={styles.contentTitle}> Title</Heading>
      <SmallText className={styles.contentText}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas magnam
        magni non dolore architecto, harum eaque explicabo quibusdam quod
        facere. Praesentium quod tempora expedita animi, culpa optio delectus,
        cupiditate asperiores recusandae quos velit, iusto blanditiis officiis
        nemo illo cumque id. Rem aspernatur deleniti dolor illo? Totam eveniet,
      </SmallText>
    </>
  );
}

export default MissionVision;
