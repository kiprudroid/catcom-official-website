import React, { useState } from "react";
import styles from "./LitanySection.module.css";
import { FaPray } from "react-icons/fa";
import { Paragraph } from "@/components/Typography/Typography";
import { litany } from "@/pages/DailyReadingsAndPrayers/widgets/RosaryPrayers/data/rosary.data";

const LitanySection = () => {
  const [showLitany, setShowLitany] = useState(false);

  const gridItems = litany.filter(
    (i) => i.type === "mercy" || i.type === "invocation",
  );
  const lambItems = litany.filter((i) => i.type === "lamb");
  const closingItems = litany.filter((i) => i.type === "closing");
  const hailHolyQueen = litany.find((i) => i.type === "hailHolyQueen");
  const memorare = litany.find((i) => i.type === "memorare");

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
            {gridItems.map((item, i) => (
              <span
                key={i}
                className={`${styles.litanyLine} ${
                  item.type === "mercy" ? styles.mercyLine : ""
                }`}
              >
                {item.text}
              </span>
            ))}
          </div>

          <div className={styles.lambBlock}>
            {lambItems.map((item, i) => (
              <Paragraph key={i} className={styles.lambLine}>
                {item.text}
              </Paragraph>
            ))}
          </div>

          <div className={styles.closingBlock}>
            {closingItems.map((item, i) => (
              <Paragraph key={i} className={styles.closingLine}>
                {item.text}
              </Paragraph>
            ))}
          </div>

          {hailHolyQueen && (
            <div className={styles.hailHolyQueenBlock}>
              <p className={styles.hailHolyQueenTitle}>{hailHolyQueen.title}</p>
              <Paragraph className={styles.hailHolyQueenText}>
                {hailHolyQueen.text}
              </Paragraph>
            </div>
          )}

          {memorare && (
            <div className={styles.memorareBlock}>
              <p className={styles.memorareTitle}>{memorare.title}</p>
              <Paragraph className={styles.memorareText}>
                {memorare.text}
              </Paragraph>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LitanySection;
