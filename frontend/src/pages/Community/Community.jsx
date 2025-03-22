import React from "react";
import  styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import {Heading, Paragraph, Text ,} from "../../components/Typography/Typography";
import SccCard from "../../components/SccCard/SccCard";
import {SCCs} from "../../../public/DataFiles/data"


function Community() {
return (
  <>
    <div className={styles.gridContainer}>
      <div className={`${styles.item} ${styles.header}`}>
        <Header />
      </div>
      <div className={`${styles.item} ${styles.sccDescription}`}>
        <Heading>Our People , Our Culture</Heading>
        <div className="contentWrapper">
          <Paragraph>
            Our people, Our culture Named after patron saints, Small Christian
            Communities(SCC's) are smaller closeknit families of the bigger
            CATCOM community. Meet the SCC's,the heart of catcom
          </Paragraph>
        </div>
      </div>
      <div className={`${styles.item} ${styles.sccPictures}`}>
        <Heading>Our SCCs</Heading>
        <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
          {SCCs.map((_, index) => (
            <SccCard key={index} SccName={SCCs[index].name} />
          ))}
        </div>
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
          <div className={styles.secondColumnItem}>2nd</div>
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
  </>
);
}

export default Community;
