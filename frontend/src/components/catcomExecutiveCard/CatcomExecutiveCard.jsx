import React from "react";
import styles from "./CatcomExecutiveCard.module.css";

function CatcomExecutiveCard() {
  return (
    <>
      <div className={styles.catcomExecutive}>
        <img src="/others/placeholder.jpg" alt="" />
        <p>name</p>
        <p>position</p>
      </div>
    </>
  );
}

export default CatcomExecutiveCard;
