import React from "react";
import styles from "./SccInfo.module.css"; // Assuming you have a CSS module for styling
import Header from "../../reusable-components/Header";
import Footer from "../../reusable-components/Footer";
import { SCCs } from "../../DataFiles/data";
const SccInfo = ({
  name,
  about,
  activities,
  photos,
  aboutPatronSaint,
  prayer,
}) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.title}>{name}</div>
      <div className={styles.about}>{about}</div>
      <div className={styles.activitiesAndPhotos}>
        <div className="activities"></div>
        <div className="photos"></div>
      </div>
      <div className={styles.PatronSaint}>{aboutPatronSaint}</div>
      <div className={styles.prayer}> {prayer}</div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SccInfo;
