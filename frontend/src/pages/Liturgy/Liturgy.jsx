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
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quibusdam
            suscipit culpa, minima possimus fuga deserunt nulla harum!
            Cupiditate consectetur veritatis quo optio totam deserunt rerum
            molestiae esse aut voluptate saepe voluptates doloremque odio
            voluptas explicabo ut delectus quos assumenda laboriosam voluptatem
            itaque, distinctio eum! Cupiditate doloremque similique nihil ea
            facilis.
          </p>
        </div>
        <div className={styles.bibleVerse}></div>
        <div className={styles.calendar}></div>
        <div className={styles.prayers}></div>
        <div className={styles.rosary}></div>
        <div className={styles.divineMercy}> </div>
        <div className={styles.wayOfCross}></div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default Liturgy;
