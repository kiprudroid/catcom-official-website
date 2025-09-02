import styles from "./Groups.module.css";
import React, { useState, useEffect } from "react";
import { SectionHeading,  Paragraph,} from "../../components/Typography/Typography";
import GroupLayout from "../../layouts/group-layout/GroupLayout";
import GroupCard from "../../components/GroupWidgets/GroupCard/GroupCard";
import JoinForm from "../../components/GroupWidgets/JoinForm/JoinForm";
import InfoCard from "../../components/GroupWidgets/InfoCard/InfoCard";


 function Groups() {
  
  return (
    <GroupLayout>
        <div className={styles.infoCard}>
          <InfoCard />          
        </div>
         <div className={styles.groupsSection}> 
        <GroupCard />
        </div>
        <div className={styles.joinForm}>
           <JoinForm />
         </div>
    </GroupLayout>
  );
}
export default Groups;