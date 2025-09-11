import React from "react";
import styles from "./AboutPriests.module.css";

export const PriestsSection = ({ priests }) => {
  console.log(priests);
  return (
    <section className={styles["priests-section"]}>
      <div className={styles["container"]}>
        {/* Section Header */}
        <div className={`${styles["section-header"]} ${styles["fade-up"]}`}>
          <h2>Our Priests</h2>
          <div className={styles["section-divider"]}></div>
          <p>
            Meet the dedicated shepherds who guide our community in faith,
            worship, and service.
          </p>
        </div>

        {/* Priests Grid */}
        <div className={styles["priests-grid"]}>
          {priests.map((priest, index) => (
            <div
              key={priest.name}
              className={`${styles["priest-card"]} ${styles["fade-up"]}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Avatar Circle with initials */}
              <div className={styles["priest-avatar"]}>
                <img src={priest.image} alt={priest.name} className={styles["priest-img"]} />
              </div>

              <h3 className={styles["priest-name"]}>{priest.name}</h3>
              <p className={styles["priest-title"]}>{priest.title}</p>
              <p className={styles["priest-bio"]}>{priest.bio}</p>

              <div className={styles["priest-specialties"]}>
                {priest.specialties.map((specialty) => (
                  <span key={specialty} className={styles["badge"]}>
                    {specialty}
                  </span>
                ))}
              </div>

              <div className={styles["priest-footer"]}>
                <p>
                  <strong>{priest.yearsOfService}</strong> years of service
                </p>
                <p className={styles["priest-contact"]}>{priest.contact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
