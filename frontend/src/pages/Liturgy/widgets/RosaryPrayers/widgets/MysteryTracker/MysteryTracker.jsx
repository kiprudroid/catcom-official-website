import React from "react";
import styles from "./MysteryTracker.module.css";
import { Paragraph } from "@/components/Typography/Typography";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const MysteryTracker = ({ mysteries, currentMystery, onNext, onPrev }) => {
  return (
    <div className={styles.tracker}>
      <button onClick={onPrev} className={styles.navBtn}>
        <FaChevronLeft /> Previous
      </button>

      <div className={styles.current}>
        <Paragraph>
          {mysteries[currentMystery.section].title} –{" "}
          {mysteries[currentMystery.section].items[currentMystery.item].title}
        </Paragraph>
      </div>

      <button onClick={onNext} className={styles.navBtn}>
        Next <FaChevronRight />
      </button>
    </div>
  );
};

export default MysteryTracker;
