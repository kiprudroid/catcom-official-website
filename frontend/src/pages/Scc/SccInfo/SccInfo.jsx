import React, { useState, useEffect } from "react";
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
import { fetchSpecificSccLeaders } from "@/api/sccLeaders.api";


const SccInfo = ({
  name,
  about,
  activities,
  sccPhotos,
  aboutPatronSaint,
  prayer,
  image,
  path,
}) => {
  
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadLeaders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchSpecificSccLeaders(path);
        setLeaders(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching leaders:", err);
        setError(err?.message || "Error fetching leaders");
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);
  
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
