import React, { useState } from "react";
import styles from "./Prayers.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus, FaMinus } from "react-icons/fa";
import Select from "react-select";
import { prayers } from "@/pages/Liturgy/data/data";

function Prayers() {
  const [openIndex, setOpenIndex] = useState(null);

  const togglePrayer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const sortedPrayers = [...prayers].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  // react-select options
  const options = sortedPrayers.map((prayer, index) => ({
    value: index,
    label: prayer.title,
  }));

  return (
    <div className={styles.container}>
      <div className={styles.headerRow}>
        <SectionHeading as="h2">Common Prayers</SectionHeading>
        <Select
          options={options}
          placeholder="Search or select a Prayer..."
          onChange={(selected) => {
            if (selected) {
              setOpenIndex(selected.value);
              document
                .getElementById(`prayer-${selected.value}`)
                ?.scrollIntoView({ behavior: "smooth" });
            }
          }}
          className={styles.dropdown}
          classNamePrefix="react-select"
        />
      </div>

      <div className={styles.prayerSection}>
        {sortedPrayers.map((prayer, index) => (
          <div
            id={`prayer-${index}`}
            key={index}
            className={styles.card}
            onClick={() => togglePrayer(index)}
          >
            <div className={styles.header}>
              <SectionHeading className={styles.cardTitle}>
                {prayer.title}
              </SectionHeading>
              <span className={styles.icon}>
                {openIndex === index ? (
                  <FaMinus size={15} />
                ) : (
                  <FaPlus size={15} />
                )}
              </span>
            </div>
            <div
              className={`${styles.content} ${
                openIndex === index ? styles.show : ""
              }`}
            >
              <Paragraph>{prayer.content}</Paragraph>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prayers;
