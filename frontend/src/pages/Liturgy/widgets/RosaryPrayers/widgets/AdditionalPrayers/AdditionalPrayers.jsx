import React, { useState } from "react";
import styles from "./AdditionalPrayers.module.css";
import { Paragraph } from "@/components/Typography/Typography";
import { FaStar } from "react-icons/fa";
import { additionalPrayers } from "@/pages/Liturgy/widgets/RosaryPrayers/data/rosary.data";

const AdditionalPrayers = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.section}>
      <div
        className={styles.sectionHeader}
        onClick={() => setShow(!show)}
        role="button"
        aria-expanded={show}
      >
        <button className={styles.toggleBtn}>
          <FaStar className={styles.headerIcon} />
          <span className={styles.headerText}>
            {show ? "− " : "+ "}Additional Prayers
          </span>
          <span className={styles.headerSubtitle}>
            Saints &amp; Intercessions
          </span>
        </button>
      </div>

      {show && (
        <div className={styles.body}>
          <div className={styles.prayerGrid}>
            {additionalPrayers.map((line, i) => (
              <Paragraph key={i} className={styles.prayerLine}>
                {line}
              </Paragraph>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdditionalPrayers;
