import React, { useState } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus } from "react-icons/fa";

const readings = [
  {
    title: "1st Reading",
    reference: "Mal 3:1-4",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "Responsorial Psalms",
    reference: "Psalms 3:1-4",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "2nd Reading",
    reference: "Heb 2:14-18",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "Gospel",
    reference: "Luke 2:22-40",
    image: "/litugy-images/Bible.jpg",
  },
];

const ReadingOfTheWeek = () => {
  const [warning, setWarning] = useState(null);

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(null), 3500);
  };

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>

      {warning && <div className={styles.warningBox}>{warning}</div>}

      <div className={styles.grid}>
        {readings.map((reading, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src={reading.image}
                alt={reading.title}
                className={styles.image}
              />
              <div className={styles.overlay}></div>
              <div
                className={styles.cardHeader}
                onClick={() =>
                  showWarning(`🚧 This Feature is under development`)
                }
              >
                <Paragraph className={styles.cardTitle}>
                  <strong>{reading.title}:</strong> {reading.reference}
                </Paragraph>
                <FaPlus />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        className={styles.button}
        onClick={() => showWarning("🚧This feature under development")}
      >
        <Paragraph>Full Sermon</Paragraph>
      </button>
    </div>
  );
};

export default ReadingOfTheWeek;
