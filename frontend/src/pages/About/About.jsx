import React from "react";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import {
  communities,
  patrons,
  priests,
  catcomExecutive,
} from  "../../DataFiles/data"
import styles from "./About.module.css";

import { HeroSection } from "../../components/AboutWidgets/HeroSection/HeroSection";
import { Heritage } from "../../components/AboutWidgets/Heritage/Heritage";
import { MissionVision } from "../../components/AboutWidgets/MissionVision/MissionVision";

import { PriestsCard } from "../../components/AboutWidgets/PriestsCard/PriestsCard";
import { PatronsCard } from "../../components/AboutWidgets/PatronsCard/PatronsCard";
import { ExecutiveCards } from "../../components/AboutWidgets/ExecutiveCards/ExecutiveCards";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

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
