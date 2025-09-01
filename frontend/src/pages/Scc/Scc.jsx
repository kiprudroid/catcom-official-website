import React, { useState } from "react";
import styles from "./Scc.module.css";
import { SCCs } from "../../DataFiles/data";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionHeading ,Paragraph } from "../../components/Typography/Typography";
import SccLayout from "../../layouts/homepage-layout/HomepageLayout";
import JoinSccForm from "../../components/SccWidgets/JoinSccForm/JoinSccForm";
import WhatIsScc from "../../components/SccWidgets/WhatIsSCC/WhatIsScc";
import SccPictures from "../../components/SccWidgets/SccPictures/SccPictures";
import SccOverview from "../../components/SccWidgets/SccOverview/SccOverview";
import SccMemberDuties from "../../components/SccWidgets/SccMemberDuties/SccMemberDuties";

function Scc() {
  
  return (
    <SccLayout>
      <div className={styles.gridContainer}>
       <WhatIsScc />

       <SccPictures />

       <SccOverview />
        
       <SccMemberDuties />
       
        <JoinSccForm />
      </div>
    </SccLayout>
  );
}

export default Scc;
