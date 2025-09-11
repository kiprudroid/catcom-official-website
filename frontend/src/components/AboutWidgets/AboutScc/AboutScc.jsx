import React from "react";
import { Users, MapPin, Calendar, Star } from "lucide-react";
import styles from "./AboutScc.module.css";

export const SccSection = ({ communities }) => {
  return (
    <section className={styles["communities-section"]}>
      <div className={styles["communities-container"]}>
        {/* Section Header */}
        <div className={styles["communities-header"]}>
          <h2>Our Small Christian Communities</h2>
          <div className={styles["divider"]}></div>
          <p>
            Experience faith in intimate communities where every member matters
            and grows together in Christ.
          </p>
        </div>

        {/* Grid */}
        <div className={styles["communities-grid"]}>
          {communities.map((scc, index) => (
            <div
              key={scc.name}
              className={`${styles["community-card"]} ${styles["fade-up"]}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles["community-header"]}>
                <span
                  className={`${styles["badge"]} ${styles[scc.gradient]}`}
                >
                  {scc.specialty}
                </span>
                <Star className={styles["icon-star"]} />
              </div>

              <h3 className={styles["community-title"]}>{scc.title}</h3>
              <p className={styles["community-description"]}>
                {scc.description}
              </p>

              <div className={styles["community-meta"]}>
                <div className={styles["meta-item"]}>
                  <Users className={styles["meta-icon"]} />
                  <span>{scc.members} active members</span>
                </div>
                <div className={styles["meta-item"]}>
                  <Calendar className={styles["meta-icon"]} />
                  <span>Meets {scc.meetingDay}</span>
                </div>
                <div className={styles["meta-item"]}>
                  <MapPin className={styles["meta-icon"]} />
                  <span>{scc.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
