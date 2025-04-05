import React from "react";
import styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { Heading } from "../../components/Typography/Typography";
import SccCard from "../../components/SccCard/SccCard";
import { SCCs } from "../../DataFiles/data";

function Community() {
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={`${styles.item} ${styles.header}`}>
          <Header />
        </div>
        <div className={`${styles.item} ${styles.sccPictures}`}>
          <Heading>Our SCCs</Heading>
          <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
            {SCCs.map((_, index) => (
              <SccCard
                key={index}
                SccName={SCCs[index].name}
                path={SCCs[index].path}
              />
            ))}
          </div>

          <Heading>SCC</Heading>
          <div className={`${styles.item} ${styles.sccExpanded}`}>
            <div className={styles.sccItem}>
              <img
                src="/others/group_photo.jpeg"
                alt="SCC group Photo"
                className={styles.groupPhoto}
              />
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
              <div className={styles.secondColumnItem}>
                Activities and Photos
              </div>
            </div>
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
      </div>
    </>
  );
}

export default Community;
