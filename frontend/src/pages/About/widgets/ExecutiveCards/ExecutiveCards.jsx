import React from "react";
import styles from "./ExecutiveCards.module.css";
import { Phone } from "lucide-react";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { BACKEND_URL } from "@/data/urlClient";

const ExecutiveCards = ({ executives }) => {
  return (
    <section className={styles.executivesSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <SectionHeading fontSize="2.5rem">
            CATCOM Executive Team
          </SectionHeading>
          <div className={styles.underline}></div>
          <p>
            Meet the dedicated student leaders who serve our community with
            passion, integrity, and faith.
          </p>
        </div>

        <div className={styles.executivesGrid}>
          {executives.map((exec, index) => (
            <div
              key={exec.full_name}
              className={styles.executiveCard}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles.executiveHeader}>
                <div className={styles.avatar}>
                  <img
                    src={`${BACKEND_URL}${exec.image_url}`}
                    alt={exec.full_name}
                    className={styles.execImg}
                  />
                </div>

                <h3>{exec.full_name}</h3>
                <p className={styles.position}>{exec.post_title}</p>
              </div>

              <div className={styles.executiveBody}>
                <p className={styles.bio}>{exec.exec_description}</p>

                {/* <div className={styles.contact}>
                  <h3 className={styles.contactBtn}>
                    <Phone size={14} />
                    {exec.phone}
                  </h3>
                </div> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExecutiveCards;
