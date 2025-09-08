import React from "react";
import styles from "./Groups.module.css";
import { SectionHeading } from "../../components/Typography/Typography";
import GroupCard from "../../components/GroupWidgets/GroupCard/GroupCard";
import JoinForm from "../../components/GroupWidgets/JoinForm/JoinForm";
import InfoCard from "../../components/GroupWidgets/InfoCard/InfoCard";
import { groupCardsData } from "../../DataFiles/groupsData";
import DashboardLayout from "../../layouts/dashboard-layout/DashboardLayout";

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
          {groupCardsData.map((card, index) => {
            return <GroupCard key={index} data={card} />;
          })}
        </div>

        <div className={`${styles.joinForm} ${styles.widget}`}>
          <JoinForm />
        </div>
      </div>
    </DashboardLayout>
  );
}
export default Groups;
