import React from "react";
import Header from "../../reusable-components/Header/Header";
import styles from "./About.module.css";
import Footer from "../../reusable-components/Footer/Footer";

function About() {
  return (
    <>
      <h1>About</h1>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />
        <div className={styles.aboutCatcom}></div>
        <div className={styles.heritage}></div>
        <div className={styles.visionMission}></div>
        <div className={styles.communities}></div>
        <div className={styles.priests}></div>
        <div className={styles.patrons}></div>
        <div className={styles.leaders}></div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default About;
