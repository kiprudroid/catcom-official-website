import React from "react";
import styles from "./SccCard.module.css";

function SccCard({ SccName = "Scc Name", path , image }) {
  const handleClick = () => {
    // Check if path exists, then navigate to it
    if (path) {
      window.location.href = path;
    } else {
      console.log("No path provided for", SccName);
    }
  };
  return (
    <div
      className={styles.card}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className={styles.overlay}>
      <h1 className={styles.title}>{SccName}</h1>
      </div>

      <button className={styles.button} onClick={handleClick}>
        See More
      </button>
    </div>
  );
}

export default SccCard;
