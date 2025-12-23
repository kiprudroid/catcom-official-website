import React, { useState } from "react";
import styles from "./Card.module.css";
import { FaArrowRight } from "react-icons/fa";

function Card({ SccName = "Scc Name", path, images = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleClick = () => {
    if (path) {
      window.location.href = path;
    } else {
      console.log("No path provided for", SccName);
    }
  };

  // Just pick the first image for now
  const displayImage = images[currentIndex] || "/placeholder.png";

  return (
    <div className={styles.card}>
      <img src={displayImage} alt={SccName} className={styles.cardImage} />

      <div className={styles.cardContent}>
        <h2 className={styles.title}>{SccName}</h2>
        <button className={styles.button} onClick={handleClick}>
          Learn More <FaArrowRight style={{ marginLeft: "6px" }} />
        </button>
      </div>
    </div>
  );
}

export default Card;
