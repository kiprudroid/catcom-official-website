import React from "react";
import styles from "./PatronsCard.module.css";
import { Mail } from "lucide-react";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

const PatronsCard = ({ patrons }) => {
  return (
    <section className={styles.patronsSection}>
      <div className={styles.patronsBg}></div>

      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.fadeUp}`}>
          <SectionHeading fontSize="2.5rem">Our Patrons</SectionHeading>
          <p>
            Meet the dedicated student leaders who serve our community with
            passion, integrity, and faith.
          </p>
          <div className={styles.sectionDivider}></div>
        </div>

        <div className={styles.patronsGrid}>
          {patrons.map((patron, index) => (
            <div
              key={patron.name}
              className={`${styles.patronCard} ${styles.fadeUp}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className={styles.patronSymbol}>
                <img
                  src={patron.image}
                  alt={patron.name}
                  className={styles.patronImg}
                />
              </div>
              <h3 className={styles.patronName}>{patron.name}</h3>
              <p className={styles.patronTitle}>{patron.title}</p>

              <p className={styles.patronDesc}>“{patron.description}”</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PatronsCard;
