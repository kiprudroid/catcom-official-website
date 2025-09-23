import React from "react";
import styles from "./SccInfo.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import BackButton from "../../../components/SccInfoWidgets/BackButton/BackButton";
import HeroCard from "../../../components/SccInfoWidgets/HeroCard/HeroCard";
import Activities from "../../../components/SccInfoWidgets/Activities/Activities";
import PatronSaint from "../../../components/SccInfoWidgets/PatronSaint/PatronSaint";
import Prayer from "../../../components/SccInfoWidgets/Prayer/Prayer";

import { SccExecutiveCard } from "@/components/SccInfoWidgets/SccExecutiveCard/SccExecutiveCard";
import { sccExecutive } from "@/data/data";

const SccInfo = ({
  name,
  about,
  activities,
  sccPhotos,
  aboutPatronSaint,
  prayer,
  image,
}) => {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={styles.card}>
          <HeroCard name={name} about={about} />
        </div>
        <div className={styles.card}>
          <Activities activities={activities} sccPhotos={sccPhotos} />
        </div>

        <div className={`${styles.card} ${styles.exec}`}>
          <SccExecutiveCard executives={sccExecutive} />
        </div>

        <div className={styles.card}>
          <PatronSaint
            image={image}
            name={name}
            aboutPatronSaint={aboutPatronSaint}
          />
        </div>
        <div className={styles.card}>
          <Prayer name={name} prayer={prayer} />
        </div>
        <BackButton />
      </div>
    </DashboardLayout>
  );
};

export default SccInfo;
