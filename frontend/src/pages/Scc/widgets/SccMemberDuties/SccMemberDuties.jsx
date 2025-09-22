import React from "react";
import styles from "./SccMemberDuties.module.css";
import { Paragraph, SectionHeading } from "../../../../components/Typography/Typography";
import { FaCheckCircle } from "react-icons/fa";

const SccMemberDuties = ({ className }) => {
  const duties = [
    "Attend Rosary prayers at the SCC meetings every Sunday",
    "Participate actively in SCC meetings and activities",
    "Support and encourage fellow members",
    "Engage in community outreach and service",
    "Promote unity and cooperation within the SCC",
    "Take responsibility for assigned roles and tasks",
    "Pray together and for one another",
    "Contribute ideas for SCC growth and improvement",
  ];

  return (
    <div className={`${styles.sccMembersDuties} ${className}`}>
      <SectionHeading className={styles.centeredText}>
        What SCC Members Should Do
      </SectionHeading>

      <Paragraph>
        <ul className={styles.membersDutiesList}>
          {duties.map((duty, index) => (
            <li key={index} className={styles.dutyItem}>
              <FaCheckCircle className={styles.icon} />
              <span>{duty}</span>
            </li>
          ))}
        </ul>
      </Paragraph>
    </div>
  );
};

export default SccMemberDuties;
