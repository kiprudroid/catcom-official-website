import React, { useState } from "react";
import styles from "./Scc.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";
import JoinSccForm from "../../components/SccWidgets/JoinSccForm/JoinSccForm";
import WhatIsScc from "../../components/SccWidgets/WhatIsSCC/WhatIsScc";
import SccPictures from "../../components/SccWidgets/SccPictures/SccPictures";
import SccOverview from "../../components/SccWidgets/SccOverview/SccOverview";
import SccMemberDuties from "../../components/SccWidgets/SccMemberDuties/SccMemberDuties";

function Scc() {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={styles.card}>
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
        <div className={`${styles.card}`}>
          <JoinSccForm />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Scc;
