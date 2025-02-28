import React from "react";
import styles from "./PriestPatronCard.module.css";
import { SmallText } from "../Typography/Typography";

function PriestPatronCard() {
  return (
    <>
      <div className={styles.priestsPatrons}>
        <img src="/others/placeholder.jpg" alt="" />
        <SmallText>name</SmallText>
        <SmallText>position</SmallText>
      </div>
    </>
  );
}

export default PriestPatronCard;
