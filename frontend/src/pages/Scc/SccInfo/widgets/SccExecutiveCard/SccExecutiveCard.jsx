import React from "react";
import styles from "./SccExecutiveCard.module.css";
import { Phone } from "lucide-react";
import { SectionHeading } from "@/components/Typography/Typography";
import { FaUserCircle } from "react-icons/fa";

export const SccExecutiveCard = ({ executives }) => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionHeader}>
        <SectionHeading fontSize="2.5rem">SCC Executive Team</SectionHeading>
      </div>

      <div className={styles.executivesGrid}>
        {executives.map((exec, index) => (
          <div
            key={exec.name}
            className={styles.executiveCard}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={styles.executiveHeader}>
              <div className={styles.avatar}>
                <img
                  src={exec.image}
                  alt={exec.name}
                  className={styles.execImg}
                />
                {/* <FaUserCircle className={styles.avatarIcon} /> */}
              </div>

              <h3>{exec.name}</h3>

              <p className={styles.position}>{exec.role}</p>

            </div>

            <div className={styles.executiveBody}>
              {/* <div className={styles.contact}>
                <h3 className={styles.contactBtn}>
                  <Phone size={14} />
                  {exec.contact}
                </h3>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
