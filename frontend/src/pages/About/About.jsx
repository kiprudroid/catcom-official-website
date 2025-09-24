import React from "react";

import styles from "./About.module.css";

import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

import {
  HeroSection,
  Heritage,
  MissionVision,
  PriestsCard,
  PatronsCard,
  ExecutiveCards,
} from "@/pages/About/widgets";

import { patrons, priests, catcomExecutive } from "@/pages/About/data/data";

const AboutPage = () => {
  return (
    <DashboardLayout>
      <div className={styles.aboutContainer}>
        <div className={styles.widget}>
          <HeroSection />
        </div>

        <div className={styles.widget}>
          <Heritage />
        </div>

        <div className={styles.widget}>
          <MissionVision />
        </div>

        <div className={styles.widget}>
          <PriestsCard priests={priests} />
        </div>

        <div className={styles.widget}>
          <PatronsCard patrons={patrons} />
        </div>

        <div className={styles.widget}>
          <ExecutiveCards executives={catcomExecutive} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;
