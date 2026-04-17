import React, { useState } from "react";
import styles from "./LitanySection.module.css";
import { FaPray } from "react-icons/fa";
import { litany } from "@/pages/Liturgy/widgets/RosaryPrayers/data/rosary.data";

const LitanySection = () => {
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
          <FaPray className={styles.litanyIcon} />
          <span className={styles.litanyToggleText}>
            {showLitany ? "− " : "+ "}The Litany of Our Lady
          </span>
          <span className={styles.litanySubtitle}>
            Loreto Litany · Ora Pro Nobis
          </span>
        </button>
      </div>

      {showLitany && (
        <div className={styles.litanyBody}>
          <div className={styles.litanyGrid}>
            {litany.map((line, i) => (
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

export default LitanySection;
