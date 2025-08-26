import React, { useState } from "react";
import styles from "./WayOfTheCross.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";

const openingPrayer = `God of power and mercy, in love you sent your Son
that we might be cleansed of sin and live with you forever.
Bless us as we gather to reflect on his suffering and death
that we may learn from his example the way we should go.
We ask this through that same Christ, our Lord. Amen.`;

const closingPrayer = `Lord Jesus Christ,
your passion and death is the sacrifice that unites earth
and heaven and reconciles all people to you.
May we who have faithfully reflected on these
mysteries follow in your steps and so come to share
your glory in heaven where you live and reign with the
Father and the Holy Spirit one God, for ever and ever. Amen.`;

const stations = [
  {
    text: "Jesus is condemned to death.",
    meditation: `Lord, grant us your righteousness...`,
  },
  {
    text: "Jesus is made to bear his cross.",
    meditation: `Lord, grant us the courage of our convictions...`,
  },
  {
    text: "Jesus falls the first time.",
    meditation: `Lord, grant us perseverance...`,
  },
  {
    text: "Jesus meets his mother.",
    meditation: `Lord, grant us loyal friends...`,
  },
  {
    text: "Simon of Cyrene helps carry the cross.",
    meditation: `Lord, grant us willing hearts...`,
  },
  {
    text: "Veronica wipes the face of Jesus.",
    meditation: `Lord, grant us merciful hearts...`,
  },
  {
    text: "Jesus falls the second time.",
    meditation: `Lord, grant us strength...`,
  },
  {
    text: "The women of Jerusalem weep over Jesus.",
    meditation: `Lord, grant us compassion...`,
  },
  {
    text: "Jesus falls the third time.",
    meditation: `Lord, grant us patience...`,
  },
  {
    text: "Jesus is stripped of his garments.",
    meditation: `Lord, grant us humility...`,
  },
  {
    text: "Jesus is nailed to the cross.",
    meditation: `Lord, grant us forgiveness...`,
  },
  {
    text: "Jesus dies on the cross.",
    meditation: `Lord, grant us faith in your love...`,
  },
  {
    text: "Jesus is taken down from the cross.",
    meditation: `Lord, grant us tender hearts...`,
  },
  { text: "Jesus is laid in the tomb.", meditation: `Lord, grant us hope...` },
  {
    text: "The Resurrection of Jesus.",
    meditation: `Lord, grant us joy in your triumph...`,
  }, // optional 15th
];

const acclamation =
  "We adore you, O Christ, and we bless you, because by your holy cross you have redeemed the world.";
const response = "Lord Jesus, help us walk in your steps.";

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
          <SectionHeading as="h3">Opening Prayer</SectionHeading>
          <Paragraph as="p">{openingPrayer}</Paragraph>
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
        <div className={styles.stationLabel}>
          <SectionHeading>Station {current + 1}</SectionHeading>
        </div>
        <div className={styles.stationText}>
          <Paragraph as="p">{stations[current].text}</Paragraph>
        </div>
        <div className={styles.acclamation}>
          <Paragraph as="p">{acclamation}</Paragraph>
        </div>
        <div className={styles.meditation}>
          <Paragraph as="p">{stations[current].meditation}</Paragraph>
        </div>
        <div className={styles.response}>
          <Paragraph as="p">{response}</Paragraph>
        </div>
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
          <Paragraph as="p">{closingPrayer}</Paragraph>
        </div>
      )}
    </div>
  );
}

export default WayOfTheCross;
