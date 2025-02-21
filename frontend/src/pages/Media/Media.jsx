import React from "react";
import styles from './Media.module.css';

function Media() {
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={`${styles.item} ${styles.header}`}>Header</div>
        <div className={`${styles.item} ${styles.massCelebrations}`}>Mass Celebrations</div>
        <div className={`${styles.item} ${styles.eventsAndActivities1}`}>Events and Activities 1</div>
        <div className={`${styles.item} ${styles.eventsAndActivities2}`}>Events and Activities 2</div>
        <div className={`${styles.item} ${styles.eventsAndActivities3}`}>Events and Activities 3</div>
        <div className={`${styles.item} ${styles.eventsAndActivities4}`}>Events and Activities 4</div>
        <div className={`${styles.item} ${styles.blogsAndBooks}`}>Blogs and Books</div>
        <div className={`${styles.item} ${styles.musicAndVideos}`}>Music and Videos</div>
        <div className={`${styles.item} ${styles.footer}`}>Footer</div>
      </div>
    </>
  )
}

export default Media;
