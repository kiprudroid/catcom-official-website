import React from "react";
import styles from "./CatcomExecutiveCard.module.css";
import { SmallText } from "../Typography/Typography";

function CatcomExecutiveCard() {
  return (
    <>
      <div className={styles.catcomExecutive}>
        <img src="/others/placeholder.jpg" alt="" />
        <SmallText>name</SmallText>
        <SmallText>position</SmallText>
      </div>
    </>
  );
}

export default CatcomExecutiveCard;
