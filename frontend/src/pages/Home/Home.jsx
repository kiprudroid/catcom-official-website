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
        <MassAndServices />

        {/* Semester calendar */}
        <CatcomCalendar />

        {/* Media / news */}
        <div className={styles.card}>
          <MediaContent />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Home;
