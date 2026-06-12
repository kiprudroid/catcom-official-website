import React from "react";
import styles from "./VisionMissionStrip.module.css";

const CARDS = [
  {
    id: "what",
    accent: "teal",
    title: "What are we?",
    text: "A vibrant JKUAT Catholic community that encourages healthy growth spiritually, socially, and academically, with the ultimate goal of encountering Christ in our daily lives.",
  },
  {
    id: "vision",
    accent: "gold",
    title: "Our vision",
    text: "A praying, believing and worshiping community for empowering young people to live as disciples of Jesus Christ.",
  },
];

function VisionMissionStrip() {
  return (
    <div className={styles.strip}>
      {CARDS.map((c) => (
        <div key={c.id} className={`${styles.card} ${styles[c.accent]}`}>
          <h3 className={styles.cardTitle}>{c.title}</h3>
          <p className={styles.cardText}>{c.text}</p>
        </div>
      ))}
    </div>
  );
}

export default VisionMissionStrip;
