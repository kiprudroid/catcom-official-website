import React from "react";
import styles from "./SccInfo.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import BackButton from "../../../components/SccInfoWidgets/BackButton/BackButton";
import HeroCard from "../../../components/SccInfoWidgets/HeroCard/HeroCard";
import Activities from "../../../components/SccInfoWidgets/Activities/Activities";
import PatronSaint from "../../../components/SccInfoWidgets/PatronSaint/PatronSaint";
import Prayer from "../../../components/SccInfoWidgets/Prayer/Prayer";
const SccInfo = ({ name,  about,  activities,  sccPhotos,  aboutPatronSaint, prayer, image,}) => {
  
  return (
    <DashboardLayout>
      <div className={styles.gridContainer} >
        <HeroCard name={name} about={about} />
        <Activities activities={activities} sccPhotos={sccPhotos} />
        <PatronSaint
          image={image}
          name={name}
          aboutPatronSaint={aboutPatronSaint}
        />
        <Prayer name={name} prayer={prayer} />

      <BackButton />
    </div>
    </DashboardLayout>
  );
};

export default SccInfo;
