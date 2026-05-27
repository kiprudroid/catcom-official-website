import React, { useState } from "react";
import styles from "./RosaryPrayers.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  OpeningPrayers,
  MysteryTracker,
  MysteriesGrid,
  LitanySection,
  AdditionalPrayers,
} from "./widgets";
import { mysteries } from "@/pages/DailyReadingsAndPrayers/widgets/RosaryPrayers/data/rosary.data";

function RosaryPrayers() {
  const [openIndex, setOpenIndex] = useState(0);
  const [currentMystery, setCurrentMystery] = useState({ section: 0, item: 0 });

  const toggleMystery = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  // Called when user clicks a mystery item in the grid
  const handleSelectMystery = ({ section, item }) => {
    setCurrentMystery({ section, item });
    setOpenIndex(section);
  };

  const goNext = () => {
    const { section, item } = currentMystery;
    const currentSection = mysteries[section];
    if (item < currentSection.items.length - 1) {
      setCurrentMystery({ section, item: item + 1 });
      setOpenIndex(section);
    } else if (section < mysteries.length - 1) {
      setCurrentMystery({ section: section + 1, item: 0 });
      setOpenIndex(section + 1);
    }
  };

  const goPrev = () => {
    const { section, item } = currentMystery;
    if (item > 0) {
      setCurrentMystery({ section, item: item - 1 });
      setOpenIndex(section);
    } else if (section > 0) {
      const prevSection = mysteries[section - 1];
      setCurrentMystery({
        section: section - 1,
        item: prevSection.items.length - 1,
      });
      setOpenIndex(section - 1);
    }
  };

  return (
    <div className={styles.container}>
      <SectionHeading as="h2" className={styles.title}>
        Holy Rosary
      </SectionHeading>

      <OpeningPrayers />

      <MysteryTracker
        mysteries={mysteries}
        currentMystery={currentMystery}
        onNext={goNext}
        onPrev={goPrev}
      />

      <MysteriesGrid
        mysteries={mysteries}
        openIndex={openIndex}
        currentMystery={currentMystery}
        onToggle={toggleMystery}
        onSelectMystery={handleSelectMystery}
      />

      <LitanySection />

      <AdditionalPrayers />
    </div>
  );
}

export default RosaryPrayers;
