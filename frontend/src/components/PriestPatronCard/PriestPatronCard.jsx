import React from "react";
import styles from "./PriestPatronCard.module.css";

function PriestPatronCard() {
  return (
    <>
      <div className={styles.priestsPatrons}>
        <img src="/others/placeholder.jpg" alt="" />
        <p>name</p>
        <p>position</p>
      </div>
    </>
  );
}

export default PriestPatronCard;
