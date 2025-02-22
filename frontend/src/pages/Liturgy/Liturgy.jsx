import React from "react";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import styles from "./Liturgy.module.css";

function Liturgy() {
  return (
    <>
      <div className={`${styles.gridContainer}`}>
        <Header className={styles.header} />

        <div className={`${styles.massServices}`}>
          <div className={styles.contentTitle}>
            <h3>Mass and Services</h3>
          </div>
          <div className={styles.col1}>
            <div>
              <h2>MONDAY - FRIDAY</h2>
              <p>6:00am - 7:00am</p>
              <p>Daily Mass | St Augustine Parish, Juja</p>
            </div>
            <div>
              <p>12:45pm- 1:15pm</p>
              <p>Rosary Prayers | Mango Park, JKUAT</p>
            </div>
            <div>
              <p>6:00pm - 7:00pm</p>
              <p>Rosary Prayers | SCC 008, JKUAT</p>
            </div>
          </div>

          <div className={styles.col2}>
            <div>
              <h2>EVERY TEUSDAY</h2>
              <p>6:00am - 7:00am</p>
              <p>Daily Mass | St Augustine Parish, Juja</p>
            </div>
            <div>
              <h2>EVERY WEDNESDAY</h2>
              <p>6:30pm- 8:00pm</p>
              <p>Holy Mass | SPA LH JKUAT</p>
            </div>
          </div>

          <div className={styles.col3}>
            <div>
              <h2>EVERY THURSDAY</h2>
              <p>6:45Pm - 8:00pm</p>
              <p>SCC Meetings | JKUAT</p>
            </div>
            <div>
              <h2>EVERY FRIDAY</h2>
              <p>6:45pm- 8:00pm</p>
              <p>Choir Practice | JKUAT SPA, Building</p>
            </div>
          </div>
        </div>

        <div className={styles.bibleVerse}>
          <div className={styles.contentTitle}>
            <h3>Bible Verse and Devotion</h3>
          </div>
          <div className={styles.firstReading}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!
            </p>
          </div>
          <div className={styles.psalms}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!
            </p>
          </div>
          <div className={styles.secondReading}>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dolore
              ipsum cum, voluptas voluptatibus, neque quae impedit asperiores
              rerum non aperiam, recusandae facilis necessitatibus sed voluptate
              expedita obcaecati quis placeat. Cupiditate pariatur facilis
              dolores, repellendus laboriosam consequuntur cum quidem doloribus
              facere incidunt veritatis neque deserunt, voluptatibus magnam
              minus deleniti unde quibusdam!
            </p>
          </div>
        </div>
        <div className={styles.calendar}>
          <img
            className={styles.calendarImage}
            src="/others/catcom calender.jpg"
            alt=""
          />
        </div>

        <div className={styles.prayers}>
          <div className={styles.contentTitle}>Prayers</div>
          <div className={styles.ourFather}>
            <p>Our Father</p>
          </div>
          <div className={styles.hailMary}>
            <p>Hail Mary</p>
          </div>
          <div className={styles.apostlesCreed}>
            <p>Apostles Creed </p>
          </div>
        </div>

        <div className={styles.rosary}>
          <p>Holy Rosary Prayers</p>
        </div>
        <div className={styles.divineMercy}>
          <p>Divine Mercy</p>
        </div>
        <div className={styles.wayOfCross}>
          <p> The Way Of the Cross</p>
        </div>

        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default Liturgy;
