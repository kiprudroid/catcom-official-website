import React from "react";
import styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import {
  Heading,
  Paragraph,
  Text,
} from "../../components/Typography/Typography";
import SccCard from "../../components/SccCard/SccCard";
import {SCCs} from "../../../public/DataFiles/data"


function Community() {
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={`${styles.item} ${styles.header}`}>
          <Header />
        </div>
      </div>
      <div className={`${styles.item} ${styles.sccPictures}`}>
        <Heading>Our SCCs</Heading>
        <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
          {SCCs.map((_, index) => (
            <SccCard key={index} SccName={SCCs[index].name} />
          ))}
        </div>
        <div className={`${styles.item} ${styles.sccPictures}`}>
          <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
            {[...Array(4)].map((index) => (
              <SccCard key={index} />
            ))}
          </div>
        </div>
        <div className={styles.sccItem}>
          <div className={styles.secondColumnItem}>
            <div className={styles.familyCard}>
              <p>Family of Mary and Joseph</p>
            </div>
            <div className={styles.familyCard}>
              <p>Family of Mary and Joseph</p>
            </div>
            <div className={styles.familyCard}>
              <p>Family of Mary and Joseph</p>
            </div>
            <div className={styles.familyCard}>
              <p>Family of Mary and Joseph</p>
            </div>
          </div>
          <div className={styles.secondColumnItem}>2nd</div>
        </div>
        <Heading>Alumni</Heading>
        <div className={`${styles.item} ${styles.alumni}`}></div>
        <Heading>Choir</Heading>

        <div className={`${styles.item} ${styles.choir}`}></div>
        <Heading>Technical Team</Heading>

        <div className={`${styles.item} ${styles.technicalTeam}`}></div>
        <div className={`${styles.item} ${styles.footer}`}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Community;
