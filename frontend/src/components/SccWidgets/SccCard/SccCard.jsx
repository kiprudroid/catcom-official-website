import React from "react";
import styles from "./SccCard.module.css";
import { SectionHeading } from "../../Typography/Typography";

function SccCard({ SccName = "Scc Name", path, image }) {
  const handleClick = () => {
    // Check if path exists, then navigate to it
    if (path) {
      window.location.href = path;
    } else {
      console.log("No path provided for", SccName);
    }
  };
  return (
    <div className={styles.card}>
      <img
        src={image}
        alt={SccName}
        className={styles.cardImage}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div className={styles.overlay}>
        <SectionHeading className={styles.title}>{SccName}</SectionHeading>
        <div className={styles.cardActions}>
          <button className={styles.button} onClick={handleClick}>View More</button>
        </div>
      </div>
    </div>
  );
}

export default SccCard;
