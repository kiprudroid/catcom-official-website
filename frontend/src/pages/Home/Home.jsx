import React from "react";
import styles from "./Home.module.css";
import "@fontsource/inter";

import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

import { slideShowImages } from "../../data/data";

import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

import {
  VisionCards,
  CatcomCalendar,
  ChurchImage,
  ImageSlider,
  MassAndServices,
  MediaContent,
} from "@/pages/Home/widgets";

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

        <div className={`${styles.card} ${styles.vision}`}>
          <VisionCards />
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

        <div className={`${styles.card} ${styles.mediaContainer}`}>
          <div className={` ${styles.media}`}>
            <MediaContent />
          </div>

          <div className={` ${styles.imageSlider}`}>
            <ImageSlider images={slideShowImages} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
