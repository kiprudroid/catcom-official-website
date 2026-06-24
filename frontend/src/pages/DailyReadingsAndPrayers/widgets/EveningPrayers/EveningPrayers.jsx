import React, { useState } from "react";
import { FaChevronDown, FaChevronUp, FaMoon } from "react-icons/fa";
import { eveningPrayers } from "@/pages/DailyReadingsAndPrayers/data/data";
import styles from "./EveningPrayers.module.css";

function EveningPrayers() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleWidget = () => {
    setIsOpen((prev) => !prev);
    setActiveIndex(null);
  };

  const togglePrayer = (index) => {
    setActiveIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className={`${styles.card} ${isOpen ? styles.cardOpen : ""}`}>
      <div
        className={styles.imageWrap}
        onClick={toggleWidget}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleWidget()}
        aria-expanded={isOpen}
      >
        <img
          src="/liturgy-images/evening.jpg"
          alt="Evening Prayers"
          className={styles.coverImage}
        />
        <div className={styles.imageOverlay} />
        <div className={styles.imageContent}>
          <FaMoon className={styles.icon} />
          <h3 className={styles.cardTitle}>Evening Prayers</h3>
          <p className={styles.cardSubtitle}>Close your day with God</p>
        </div>
      </div>

      <div
        className={styles.cardFooter}
        onClick={toggleWidget}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleWidget()}
      >
        <span className={styles.footerLabel}>
          {eveningPrayers.length} prayers
        </span>
        <span className={styles.footerAction}>
          {isOpen ? "Close" : "Open"}
          {isOpen ? (
            <FaChevronUp className={styles.chevron} />
          ) : (
            <FaChevronDown className={styles.chevron} />
          )}
        </span>
      </div>

      {isOpen && (
        <div className={styles.prayerList}>
          {eveningPrayers.map((prayer, index) => (
            <div key={prayer.id} className={styles.prayerItem}>
              <button
                className={`${styles.prayerToggle} ${activeIndex === index ? styles.active : ""}`}
                onClick={() => togglePrayer(index)}
                type="button"
              >
                <span className={styles.prayerNumber}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className={styles.prayerTitle}>{prayer.title}</span>
                {activeIndex === index ? (
                  <FaChevronUp className={styles.prayerChevron} />
                ) : (
                  <FaChevronDown className={styles.prayerChevron} />
                )}
              </button>
              {activeIndex === index && (
                <div className={styles.prayerBody}>
                  {prayer.text.split("\n\n").map((para, i) => (
                    <p key={i} className={styles.prayerPara}>
                      {para}
                    </p>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default EveningPrayers;
