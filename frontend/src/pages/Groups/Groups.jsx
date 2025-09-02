import React from "react";
import styles from "./Groups.module.css";
import GroupLayout from "../../layouts/group-layout/GroupLayout";
import GroupCard from "../../components/GroupWidgets/GroupCard/GroupCard";
import JoinForm from "../../components/GroupWidgets/JoinForm/JoinForm";
import InfoCard from "../../components/GroupWidgets/InfoCard/InfoCard";
import { groupCardsData } from "../../DataFiles/groupsData";

function Groups() {
  return (
    <GroupLayout>
      <div className={styles.gridContainer}>
        <div className={`${styles.infoCard}  ${styles.widget}`}>
          <InfoCard />
        </div>

        <div className={`${styles.groupsSection} ${styles.widget}`}>
          {groupCardsData.map((card, index) => {
            return <GroupCard key={index} data={card} />;
          })}
        </div>

        <div className={`${styles.joinForm} ${styles.widget}`}>
          <JoinForm />
        </div>
      </div>
    </GroupLayout>
  );
}
export default Groups;
