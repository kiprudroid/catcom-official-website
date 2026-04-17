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
  
  const RANK_MAP = {
    'moderator': 1,
    'coordinator': 2,
    'Secretary': 3,
    'Treasurer': 4,
    'Project Manager': 5,
    'Catering Secretary': 6,    
  };

  useEffect(() => {
    const loadLeaders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchSpecificSccLeaders(path);
        setLeaders(Array.isArray(data) ? data : []);
        console.log(path);
      } catch (err) {
        console.error("Error fetching leaders:", err);
        setError(err?.message || "Error fetching leaders");
      } finally {
        setLoading(false);
      }
    };

    loadLeaders();
  }, []);
  const [rankedLeaders, setRankedLeaders] = useState([]);

  useEffect(() => {
    if (leaders.length > 0) {
      
      const normalizedRankMap = Object.fromEntries(
        Object.entries(RANK_MAP).map(([key, value]) => [key.toLowerCase(), value])
      );

      const sortedLeaders = [...leaders].sort((a, b) => {
      
        const titleA = a.position?.toLowerCase();
        const titleB = b.position?.toLowerCase();

        
        const rankA = normalizedRankMap[titleA] ?? Number.MAX_SAFE_INTEGER;
        const rankB = normalizedRankMap[titleB] ?? Number.MAX_SAFE_INTEGER;

        if (rankA < rankB) {
          return -1;
        }
        if (rankA > rankB) {
          return 1;
        }       
        return 0;
      });
      setRankedLeaders(sortedLeaders);
    } else {
     
      setRankedLeaders([]);
    }
  }, [leaders]); 
  
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        
          <HeroCard name={name} about={about} className={styles.card} />
        
       
          <Activities activities={activities} sccPhotos={sccPhotos}  className={styles.card}/>
        

       
          <SccExecutiveCard executives={rankedLeaders} className={styles.card}/>
        
       
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
