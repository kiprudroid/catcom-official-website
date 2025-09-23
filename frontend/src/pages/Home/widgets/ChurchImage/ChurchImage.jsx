import React from "react";
import styles from "./ChurchImage.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

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
            href="https://maps.google.com/maps?cid=549996087219067126"
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
