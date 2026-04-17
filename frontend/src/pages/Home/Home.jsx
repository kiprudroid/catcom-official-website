import React from "react";
import styles from "./Home.module.css";
import "@fontsource/inter";

import { SectionHeading } from "@/components/Typography/Typography";
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
        <div className={`${styles.card} ${styles.hero}`}>
          <ChurchImage />
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

        <div className={`${styles.card} ${styles.fullWidth}`}>
          <MediaContent />
        </div>

        <div className={`${styles.card} ${styles.fullWidth}`}>
          <ImageSlider images={slideShowImages} />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
