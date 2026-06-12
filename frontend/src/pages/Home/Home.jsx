import React from "react";
import styles from "./Home.module.css";
import "@fontsource/inter";

import { SectionHeading } from "@/components/Typography/Typography";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

import {
  HeroSection,
  CatcomCalendar,
  MassAndServices,
  MediaContent,
  VisionMissionStrip,
} from "@/pages/Home/widgets";

function Home() {
  return (
    <DashboardLayout>
      <div className={styles.homeContainer}>
        <div className={`${styles.card} ${styles.heroCard}`}>
          <HeroSection />
        </div>

        <VisionMissionStrip />

        {/* Weekly schedule */}
        <div className={styles.card}>
          <MassAndServices />
        </div>

        {/* Semester calendar */}
        <div className={styles.card}>
          <CatcomCalendar />
        </div>

        {/* Media / news */}
        <div className={styles.card}>
          <MediaContent />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
