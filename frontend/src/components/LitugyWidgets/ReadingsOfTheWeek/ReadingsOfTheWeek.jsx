import React, { useState } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, SmallText } from "../../Typography/Typography";
import { FaPlus, FaMinus } from "react-icons/fa";

const readings = [
  {
    title: "1st Reading",
    reference: "Mal 3:1-4",
    fullText:
      "Behold, I send my messenger to prepare the way before me... (full scripture or sermon goes here).",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "Responsorial Psalms",
    reference: "Psalms 3:1-4",
    fullText:
      "The Lord takes delight in his People... (full scripture or sermon goes here).",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "2nd Reading",
    reference: "Heb 2:14-18",
    fullText:
      "Since therefore the children share flesh and blood, he himself likewise partook of the same... (full reading).",
    image: "/litugy-images/Bible.jpg",
  },
  {
    title: "Gospel",
    reference: "Luke 2:22-40",
    fullText:
      "When the time came for their purification according to the Law of Moses, they brought him up to Jerusalem... (full gospel).",
    image: "/litugy-images/Bible.jpg",
  },
];

const ReadingOfTheWeek = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>

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
              <div className={styles.cardHeader} onClick={() => toggle(idx)}>
                <SmallText className={styles.cardTitle}>
                  <strong>{reading.title}:</strong> {reading.reference}
                </SmallText>
                {openIndex === idx ? <FaMinus /> : <FaPlus />}
              </div>
            </div>

            {openIndex === idx && (
              <div className={styles.fullText}>
                <SmallText>{reading.fullText}</SmallText>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className={styles.button}>
        <SmallText>Full Sermon</SmallText>
      </button>
    </div>
  );
};

export default ReadingOfTheWeek;
