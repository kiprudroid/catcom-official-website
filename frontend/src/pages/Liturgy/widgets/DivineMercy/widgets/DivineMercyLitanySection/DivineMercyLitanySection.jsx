import React, { useState } from "react";
import styles from "./DivineMercyLitanySection.module.css";
import { FaHeart } from "react-icons/fa";
import { divineMercyLitany } from "@/pages/Liturgy/widgets/DivineMercy/data/divine-mercy-data";

const DivineMercyLitanySection = () => {
  const [showLitany, setShowLitany] = useState(false);

  return (
    <div className={styles.litanySection}>
      <div
        className={styles.litanySectionHeader}
        onClick={() => setShowLitany(!showLitany)}
        role="button"
        aria-expanded={showLitany}
      >
        <button className={styles.litanyToggleBtn}>
          <FaHeart className={styles.litanyIcon} />
          <span className={styles.litanyToggleText}>
            {showLitany ? "− " : "+ "}Litany of Divine Mercy
          </span>
          <span className={styles.litanySubtitle}>
            Chaplet · I Trust in You
          </span>
        </button>
      </div>

      {showLitany && (
        <div className={styles.litanyBody}>
          <div className={styles.litanyGrid}>
            {divineMercyLitany.map((line, i) => (
              <span key={i} className={styles.litanyLine}>
                {line}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DivineMercyLitanySection;
