import React from "react";
import  styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";



function Community() {
return (
  <>
    <div className={styles.gridContainer}>
      <div className={`${styles.item} ${styles.header}`}>
        <Header />
      </div>
      <div className={`${styles.item} ${styles.sccDescription}`}>Our Sccs</div>
      <div className={`${styles.item} ${styles.sccPictures}`}>Our Sccs</div>
      <div className={`${styles.item} ${styles.sccPictures}`}></div>
      <div className={`${styles.item} ${styles.sccExpanded}`}></div>
      <div className={`${styles.item} ${styles.alumni}`}></div>
      <div className={`${styles.item} ${styles.choir}`}></div>
      <div className={`${styles.item} ${styles.technicalTeam}`}></div>
      <div className={`${styles.item} ${styles.footer}`}>
        <Footer />
      </div>
    </div>
  </>
);
}

export default Community;
