import React, { useState } from "react";
import styles from "./WayOfTheCross.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaCross } from "react-icons/fa";
import {
  concludingPrayers,
  stations,
  openingPrayer,
  closingPrayer,
  actOfContrition,
} from "@/pages/Liturgy/widgets/WayOfTheCross/data/way-of-cross.data.jsx";

function WayOfTheCross() {
  const [current, setCurrent] = useState(0);
  const total = stations.length;

  const nextStation = () => setCurrent((prev) => Math.min(prev + 1, total - 1));
  const prevStation = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <div className={styles.container}>
      <SectionHeading className={styles.title}>
        The Way of the Cross
      </SectionHeading>

      {current === 0 && (
        <div className={styles.prayerBlock}>
          <div className={styles.invocation}>
            <FaCross className={styles.crossIcon} />
            <Paragraph as="p">
              In the name of the Father, and of the Son, and of the Holy Spirit.
              Amen.
            </Paragraph>
          </div>

          <SectionHeading as="h3">Act Of Contrition</SectionHeading>
          <Paragraph>{actOfContrition}</Paragraph>

          <SectionHeading as="h3">Opening Prayer</SectionHeading>
          <Paragraph>{openingPrayer}</Paragraph>
        </div>
      )}

      <div className={styles.progressWrapper}>
        <div className={styles.progressText}>
          Station {current + 1} of {total}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.card}>
        {stations[current].hymn && (
          <div className={styles.hymn}>
            <Paragraph as="p">
              <em>{stations[current].hymn}</em>
            </Paragraph>
          </div>
        )}

        <SectionHeading as="h2" className={styles.stationTitle}>
          {stations[current].title}
        </SectionHeading>
        <Paragraph as="p" className={styles.subtitle}>
          {stations[current].subtitle}
        </Paragraph>

        <div className={styles.acclamation}>
          <Paragraph as="p">{stations[current].acclamation}</Paragraph>
        </div>

        <div className={styles.meditation}>
          <Paragraph as="p">{stations[current].meditation}</Paragraph>
        </div>

        {stations[current].prayer && (
          <div className={styles.prayer}>
            <Paragraph as="p">{stations[current].prayer}</Paragraph>
          </div>
        )}

        {concludingPrayers}
      </div>

      <div className={styles.navButtons}>
        <button onClick={prevStation} disabled={current === 0}>
          ⬅ Prev
        </button>
        <button onClick={nextStation} disabled={current === total - 1}>
          Next ➡
        </button>
      </div>

      {current === total - 1 && (
        <div className={styles.prayerBlock}>
          <SectionHeading as="h3">Closing Prayer</SectionHeading>
          <Paragraph>{closingPrayer}</Paragraph>
        </div>
      )}
    </div>
  );
}

export default WayOfTheCross;
