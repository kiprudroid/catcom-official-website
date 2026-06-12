import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./Scc.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DashboardLayout from "@/layouts/dashboard-layout/DashboardLayout";

import {
  JoinSccForm,
  SccMemberDuties,
  SccOverview,
  SccPictures,
  WhatIsScc,
} from "@/pages/Scc/widgets";

function Scc() {
  //for navigating to the join form section
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  }, [hash]);

  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={`${styles.card} ${styles.heroCard}`}>
          <WhatIsScc />
        </div>
        <div className={styles.card}>
          <SccPictures />
        </div>
        <div className={styles.card}>
          <SccOverview />
        </div>
        <div className={styles.card}>
          <SccMemberDuties />
        </div>
        <div id="join-form" className={styles.card}>
          <JoinSccForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Scc;
