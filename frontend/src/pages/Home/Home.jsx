import React from "react";
import styles from "./Home.module.css";
import "@fontsource/inter";
import CatcomCalendar from "../../components/HomeWidgets/CatcomCalendar/CatcomCalendar";
import {
  SectionHeading,
  Paragraph,
} from "../../components/Typography/Typography";
import MediaContent from "../../components/HomeWidgets/MediaContent/MediaContent";
import MassAndServices from "../../components/HomeWidgets/MassAndServices/MassAndServices";
import { slideShowImages } from "../../DataFiles/data";
import ImageSlider from "../../components/HomeWidgets/ImageSlider/ImageSlider";
import ChurchImage from "../../components/HomeWidgets/ChurchImage/ChurchImage";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

function Home() {
  return (
    <DashboardLayout>
      <div className={styles.homeContainer}>
        <div className={`${styles.card} ${styles.imageSection}`}>
          <ChurchImage />

          <div className={styles.quoteWrapper}>
            <Paragraph className={styles.quoteText}>
              “For where two or three are gathered in my name, there am I with
              them.”
              <span className={styles.quoteRef}>– Matthew 18:20</span>
            </Paragraph>

            <Paragraph className={styles.quoteText}>
              “I can do all things through Christ who strengthens me.”
              <span className={styles.quoteRef}>– Philippians 4:13</span>
            </Paragraph>
          </div>
        </div>

        <div className={styles.card}>
          <SectionHeading className={styles.cardTitle}>
            What are we?
          </SectionHeading>
          <Paragraph className={styles.textContent}>
            We are a vibrant Catholic Community that encourages healthy growth
            spiritually, socially, and academically, with the ultimate goal of
            encountering Christ in our daily lives. The community supports us in
            recognizing our inherent vocation bestowed upon us by God.
          </Paragraph>
        </div>

        <div className={styles.card}>
          <SectionHeading className={styles.cardTitle}>
            Our Vision
          </SectionHeading>
          <Paragraph className={styles.textContent}>
            A praying, believing and worshiping community for empowering young
            people to live as disciples of Jesus Christ.
          </Paragraph>
        </div>

        <div className={`${styles.card} ${styles.calendar}`}>
          <MassAndServices />
        </div>

        <div className={`${styles.card} ${styles.calendar}`}>
          <SectionHeading className={styles.cardTitle}>
            CATCOM Semester Calendar
          </SectionHeading>
          <CatcomCalendar />
        </div>

        <div className={styles.card}>
          <MediaContent />
        </div>

        <div className={styles.card}>
          <ImageSlider images={slideShowImages} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
