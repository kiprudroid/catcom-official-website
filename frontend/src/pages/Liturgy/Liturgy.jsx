import React from "react";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import styles from "./Liturgy.module.css";

function Liturgy() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />

        <div className={styles.massServices}>
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
            <p> Date: 22/02/2025</p>
          </div>
          <div className={styles.firstReading}>
            <p>
              <b>Thursday of the Eighth Week in Ordinary Time</b>
            </p>
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
            <b>Responsorial Psalms</b>

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
            <b>Gospel Reading </b>

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
          <div className={styles.contentTitle}>PRAYERS</div>
          <div className={styles.ourFather}>
            <b>OUR FATHER </b>
            <p>
              Our Father, who art in heaven, hallowed be Thy name. Thy kingdom
              come, Thy will be done on earth as it is in Heaven. Give us this
              day our daily bread; and forgive us our trespasses as we forgive
              those who trespass against us. Do not lead us into tempta tation,
              but deliver us from all evil. Amen.
            </p>
          </div>
          <div className={styles.hailMary}>
            <b>HAIL MARY</b>
            <p>
              Hail Mary, full of grace, the Lord is with you, blessed are you
              among women and blessed is the fruit of your womb Jesus. Holy
              Mary, Mother of God, pray for us sinners, now and at the hour of
              our death. Amen
            </p>
          </div>
          <div className={styles.apostlesCreed}>
            <b>APOSTLES CREED </b>
            <p>
              I believe in God, the Father Almighty, Creator of heaven and
              earth; and in Jesus Christ, His only Son, our Lord: Who was
              conceived by the Holy Spirit, born of the Virgin Mary; suffered
              under Pontius Pilate, was crucified, died and was buried. He
              descended into hell; the third day He rose again from the dead; He
              ascended into heaven, is seated at the right hand of God the
              Father Almighty; from thence He shall come to judge the living and
              the dead. I believe in the Holy Spirit, the Holy Catholic Church,
              the com munion of Saints, the forgiveness of sins, the
              resurrection of the body, and life everlast ing. Amen.{" "}
            </p>
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
