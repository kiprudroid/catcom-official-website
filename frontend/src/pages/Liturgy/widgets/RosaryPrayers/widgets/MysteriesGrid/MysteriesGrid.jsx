import React from "react";
import styles from "./MysteriesGrid.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus, FaMinus } from "react-icons/fa";

const MysteriesGrid = ({
  mysteries,
  openIndex,
  currentMystery,
  onToggle,
  onSelectMystery,
}) => {
  return (
    <div className={styles.grid}>
      {mysteries.map((section, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.imageWrapper} onClick={() => onToggle(idx)}>
            <img
              src={section.image}
              alt={section.title}
              className={styles.image}
            />
            <div className={styles.overlay}>
              <SectionHeading className={styles.cardTitle}>
                {section.title}
              </SectionHeading>
              <Paragraph className={styles.cardDays}>{section.days}</Paragraph>
              {openIndex === idx ? <FaMinus /> : <FaPlus />}
            </div>
          </div>

          {openIndex === idx && (
            <ul className={styles.list}>
              {section.items.map((mystery, i) => {
                const isActive =
                  currentMystery.section === idx && currentMystery.item === i;
                return (
                  <li
                    key={i}
                    className={`${styles.mystery} ${isActive ? styles.activeMystery : ""}`}
                    onClick={() => onSelectMystery?.({ section: idx, item: i })}
                  >
                    <Paragraph>
                      <span className={styles.mysteryTitle}>
                        {mystery.title}
                      </span>
                      <br />
                      <span className={styles.detail}>{mystery.detail}</span>
                    </Paragraph>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default MysteriesGrid;
