import React from "react";
import styles from "./ChurchImage.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";

function ChurchImage() {
  return (
    <div className={styles.imgContainer}>
      <img
        className={styles.churchImage}
        src="/others/st_augustine.jpg"
        alt="St Augustine Church Image"
      />
      <div className={styles.imageLabel}>
        <Paragraph className={styles.imageLabelTitle}>
          St Augustine – JUJA
        </Paragraph>
        <Paragraph>
          <a
            href="https://www.google.com/maps/place/St.+Augustine+Catholic+Church+Juja/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Map
          </a>
        </Paragraph>
      </div>
    </div>
  );
}

export default ChurchImage;
