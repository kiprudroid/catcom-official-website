import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { fetchLeaders } from "@/api/leaders.api";
import { SectionHeading } from "@/components/Typography/Typography";

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
  const [leaders, setLeaders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  
  const RANK_MAP = {
    'moderator': 1,
    'Vice Moderator': 2,
    'Secretary': 3,
    'Treasurer': 4,
    'Organising Secretary': 5,
    'Pastoral Secretary': 6,
    'Choir Moderator': 7,
    'Choir Director': 8,
    'Publicity Secretary': 9,
    'Technical Secretary': 10,
    'Catering Secretary': 11,    
  };

  useEffect(() => {
    const loadLeaders = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchLeaders();
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
  
  const [rankedLeaders, setRankedLeaders] = useState([]);

  useEffect(() => {
    if (leaders.length > 0) {
      
      const normalizedRankMap = Object.fromEntries(
        Object.entries(RANK_MAP).map(([key, value]) => [key.toLowerCase(), value])
      );

      const sortedLeaders = [...leaders].sort((a, b) => {
      
        const titleA = a.post_title?.toLowerCase();
        const titleB = b.post_title?.toLowerCase();

        
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
          {error ? <p className={styles.error}>{error}</p> : null}
          {loading ? <SectionHeading className={styles.loading}>Loading...</SectionHeading> : null}
          <ExecutiveCards
            executives={rankedLeaders}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;
