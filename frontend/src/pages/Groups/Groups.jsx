import React from "react";
import styles from "./Groups.module.css";
import { SectionHeading } from "../../components/Typography/Typography";

import { groupCardsData } from "./data/data";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

import { GroupCards, JoinForm, InfoCard } from "@/pages/Groups/widgets";

function Groups() {
  return (
    <DashboardLayout>
      <div className={styles.gridContainer}>
        <div className={`${styles.infoCard}  ${styles.widget}`}>
          <InfoCard />
        </div>

        <div className={`${styles.groupsSection} ${styles.widget}`}>
          <SectionHeading as="h2" className={styles.groupsTitle}>
            Explore Groups in Catcom
          </SectionHeading>
          <GroupCards />
        </div>

        <div className={`${styles.joinForm} ${styles.widget}`}>
          <JoinForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
export default Groups;
