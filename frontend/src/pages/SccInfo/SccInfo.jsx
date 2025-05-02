import React from "react";
import styles from "./SccInfo.module.css"; // Assuming you have a CSS module for styling
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { SCCs } from "../../DataFiles/data";
import {Heading ,Paragraph ,SmallText } from "../../components/Typography/Typography";
const SccInfo = ({
  name,
  about,
  activities,
  photos,
  aboutPatronSaint,
  prayer,
}) => {
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <Heading className={styles.heading} as="h1">
        <div className={styles.title}>{name}</div>
      </Heading>
      <SmallText className={styles.subTitle}>
        <div className={styles.about}>{about}</div>
      </SmallText>
      <div className={styles.activitiesAndPhotos}>
        <div className={styles.activities}>
          {activities.map((activity, index) => (
            <li>{activity}</li>
          ))}
        </div>
        <div className={styles.photos}></div>
      </div>
      <div className={styles.PatronSaint}>
        <Heading> About {name}</Heading>
        <SmallText>
          {aboutPatronSaint}
          {prayer}
        </SmallText>
      </div>
      <div className={styles.prayer}>
        <Heading> Prayer To {name}</Heading>
        <SmallText>{prayer}</SmallText>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SccInfo;
