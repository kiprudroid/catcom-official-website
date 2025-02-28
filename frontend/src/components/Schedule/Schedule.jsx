import React from "react";
import styles from "./Schedule.module.css";

const Schedule = () => {
  console.log("Schedule component rendered");

  return (
    <div className={styles.container}>
      <div className={styles.daily}>
        <h3>MONDAY - FRIDAY</h3>
        <p>
          <strong>6.00am - 7.00am :</strong> <br />
          Daily Mass | St Augustine Parish, Juja
        </p>
        <p>
          <strong>6.00pm - 7.00pm :</strong> <br />
          Rosary Prayers | SCC 008, JKUAT
        </p>
      </div>

      <div className={styles.weeklyGrid}>
        <div className={styles.weeklyItem}>
          <h3>EVERY TUESDAY</h3>
          <p>
            <strong>6.45pm - 7.30pm :</strong> <br />
            Family Meetings, JKUAT
          </p>
        </div>
        <div className={styles.weeklyItem}>
          <h3>EVERY WEDNESDAY</h3>
          <p>
            <strong>6.30pm - 8.00pm :</strong> <br />
            Holy Mass, SPA LH JKUAT
          </p>
        </div>
        <div className={styles.weeklyItem}>
          <h3>EVERY THURSDAY</h3>
          <p>
            <strong>6.45pm - 8.00pm :</strong> <br />
            SCC's Meetings, JKUAT
          </p>
        </div>
        <div className={styles.weeklyItem}>
          <h3>EVERY FRIDAY</h3>
          <p>
            <strong>6.45pm - 8.00pm :</strong> <br />
            Choir Practice, JKUAT SPA Building
          </p>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
