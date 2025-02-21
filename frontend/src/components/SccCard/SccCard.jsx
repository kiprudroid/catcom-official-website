import React from "react";
import styles from "./SccCard.module.css";


function SccCard({ SccName = "Scc Name" }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}
      >{SccName}</h1>

<button className={styles.button}>See More</button>
   </div>
  );
}

export default SccCard;