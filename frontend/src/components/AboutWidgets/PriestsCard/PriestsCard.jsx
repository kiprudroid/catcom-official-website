import React from "react";
import styles from "./PriestsCard.module.css";
import { SectionHeading } from "../../Typography/Typography";

export const PriestsCard = ({ priests }) => {
  return (
    <section className={styles.priestsSection}>
      <div className={styles.container}>
        <div className={`${styles.sectionHeader} ${styles.fadeUp}`}>
          <SectionHeading fontSize="2.5rem">Our Priests</SectionHeading>
          <div className={styles.sectionDivider}></div>
          <p>
            Meet the dedicated shepherds who guide our community in faith,
            worship, and service.
          </p>
        </div>

        <div className={styles.priestsGrid}>
          {priests.map((priest, index) => (
            <div
              key={priest.name}
              className={`${styles.priestCard} ${styles.fadeUp}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Avatar Circle */}
              <div className={styles.priestAvatar}>
                <img
                  src={priest.image}
                  alt={priest.name}
                  className={styles.priestImg}
                />
              </div>

              <h3 className={styles.priestName}>{priest.name}</h3>
              <p className={styles.priestTitle}>{priest.title}</p>
              <p className={styles.priestBio}>{priest.bio}</p>

              <div className={styles.priestSpecialties}>
                {priest.specialties.map((specialty) => (
                  <span key={specialty} className={styles.badge}>
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
