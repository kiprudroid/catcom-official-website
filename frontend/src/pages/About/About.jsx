import React, { useEffect, useState } from "react";
import styles from "./About.module.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import { fetchLeaders } from "@/api/leaders.api";

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
          {loading ? <p>Loading...</p> : null}
          <ExecutiveCards
            executives={leaders}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AboutPage;
