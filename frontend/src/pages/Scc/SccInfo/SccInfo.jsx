import React from "react";
import styles from "./SccInfo.module.css";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
import {
  Activities,
  BackButton,
  HeroCard,
  PatronSaint,
  Prayer,
  SccExecutiveCard,
} from "@/pages/Scc/SccInfo/widgets";

import { sccExecutive } from "@/data/data";

const SccInfo = ({
  name,
  about,
  activities,
  sccPhotos,
  aboutPatronSaint,
  prayer,
  image,
  leaders,
}) => {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        
          <HeroCard name={name} about={about} className={styles.card} />
        
       
          <Activities activities={activities} sccPhotos={sccPhotos}  className={styles.card}/>
        

       
          <SccExecutiveCard executives={leaders} className={styles.card}/>
        
       
          <PatronSaint
            image={image}
            name={name}
            aboutPatronSaint={aboutPatronSaint}
             className={styles.card}
          />
        
        
          <Prayer name={name} prayer={prayer}  className={styles.card}/>


        <BackButton />
      </div>
    </DashboardLayout>
  );
};

export default SccInfo;
