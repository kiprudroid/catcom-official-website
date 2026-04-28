import React, { useState } from "react";
import styles from "./OpeningPrayers.module.css";
import { openingPrayers } from "@/pages/Liturgy/widgets/RosaryPrayers/data/rosary.data";

const RoleTag = ({ role }) => (
  <span className={`${styles.roleTag} ${styles[`role_${role}`]}`}>{role}</span>
);

const PrayerCard = ({ prayer, index }) => {
  const [expanded, setExpanded] = useState(true);

  if (prayer.type === "all") {
    return (
      <div className={`${styles.card} ${styles.cardCentered}`}>
        <h3 className={styles.cardTitle}>{prayer.title}</h3>
        <p className={styles.prayerText}>{prayer.text}</p>
      </div>
    );
  }

  if (prayer.type === "leader-all") {
    return (
      <div className={styles.card}>
        <h3 className={styles.cardTitle}>{prayer.title}</h3>
        <div className={styles.dialogueBlock}>
          <div className={styles.dialogueLine}>
            <RoleTag role="Leader" />
            <p className={styles.prayerText}>{prayer.leader}</p>
          </div>
          {prayer.pause && <p className={styles.pauseNote}>{prayer.pause}</p>}
          <div className={styles.dialogueLine}>
            <RoleTag role="All" />
            <p className={styles.prayerText}>{prayer.response}</p>
          </div>
        </div>
      </div>
    );
  }

  if (prayer.type === "prayers-list") {
    return (
      <div className={styles.card}>
        <button
          className={styles.cardTitleBtn}
          onClick={() => setExpanded((v) => !v)}
          aria-expanded={expanded}
        >
          <h3 className={styles.cardTitle}>{prayer.title}</h3>
          {prayer.subtitle && (
            <span className={styles.subtitle}>{prayer.subtitle}</span>
          )}
          <span className={styles.chevron}>{expanded ? "▲" : "▼"}</span>
        </button>

        {expanded && (
          <div className={styles.prayersList}>
            {prayer.prayers.map((p, i) => (
              <div key={i} className={styles.prayerItem}>
                <span className={styles.prayerLabel}>{p.label}</span>
                <p className={styles.prayerText}>{p.text}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
};

const OpeningPrayers = () => {
  return (
    <section className={styles.opening} aria-label="Opening Prayers">
      <div className={styles.header}>
        <div className={styles.crossWrap} aria-hidden="true">
          <svg
            viewBox="0 0 40 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles.crossSvg}
          >
            <rect
              x="17"
              y="0"
              width="6"
              height="50"
              rx="2"
              fill="currentColor"
            />
            <rect
              x="4"
              y="14"
              width="32"
              height="6"
              rx="2"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className={styles.sectionTitle}>Opening Prayers</h2>
        <p className={styles.sectionSubtitle}>
          The Holy Rosary — St. Augustine Parish &amp; University Chaplaincy
        </p>
      </div>

      <div className={styles.cardList}>
        {openingPrayers.map((prayer, i) => (
          <PrayerCard key={i} prayer={prayer} index={i} />
        ))}
      </div>
    </section>
  );
};

export default OpeningPrayers;
