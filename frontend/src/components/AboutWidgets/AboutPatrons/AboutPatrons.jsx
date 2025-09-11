import React from "react";
import styles from "./AboutPatrons.module.css";
// import patronsImage from '@/assets/patron-saints.jpg';

export const PatronsSection = ({ patrons }) => {
  return (
    <section className={styles["patrons-section"]}>
      {/* Background Image */}
      <div
        className={styles["patrons-bg"]}
        // style={{ backgroundImage: `url(${patronsImage})` }}
      ></div>

      <div className={styles["container"]}>
        {/* Section Header */}
        <div className={`${styles["section-header"]} ${styles["fade-up"]}`}>
          <h2>Our Heavenly Patrons</h2>
          <div className={styles["section-divider"]}></div>
          <p>
            Saints who intercede for us and inspire our journey of faith,
            learning, and service.
          </p>
        </div>

        {/* Patrons Grid */}
        <div className={styles["patrons-grid"]}>
          {patrons.map((patron, index) => (
            <div
              key={patron.name}
              className={`${styles["patron-card"]} ${styles["fade-up"]}`}
              style={{ animationDelay: `${index * 0.3}s` }}
            >
              <div className={styles["patron-halo"]}></div>
              <div className={styles["patron-symbol"]}>
                <img src={patron.image} alt={patron.name} className={styles["patron-img"]} />
              </div>
              <h3 className={styles["patron-name"]}>{patron.name}</h3>
              <p className={styles["patron-title"]}>{patron.title}</p>

              <p className={styles["patron-desc"]}>“{patron.description}”</p>

              <div className={styles["patron-meta"]}>
                <p>
                  <strong>Feast Day:</strong> {patron.feastDay}
                </p>
                <div className={styles["patron-prayer"]}>
                  <p>“{patron.prayer}”</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Prayer */}
        <div className={`${styles["prayer-box"]} ${styles["fade-up"]}`}>
          <h3>Prayer to Our Patrons</h3>
          <p>
            “Holy patrons, intercede for us as we strive to follow Christ in our
            studies, work, and daily lives. Help us to grow in wisdom, faith,
            and love, always seeking to serve God and our neighbors with humble
            hearts.”
          </p>
        </div>
      </div>
    </section>
  );
};
