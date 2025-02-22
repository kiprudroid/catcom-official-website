import React from "react";
import styles from "./Media.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";

function Media() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />
        <div
          className={`${styles.item} ${styles.massCelebrations} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities1} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities2} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities3} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities4} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.blogsAndBooks} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>Mass Celebrations</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
        </div>
        <div
          className={`${styles.item} ${styles.musicAndVideos} ${styles.musicAndVideos}`}
        >
          <div className={styles.contentTitle}>Music and Videos</div>
          <div className={styles.col1}>x</div>
          <div className={styles.col2}>y</div>
          <div className={styles.col1}>x</div>
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default Media;
