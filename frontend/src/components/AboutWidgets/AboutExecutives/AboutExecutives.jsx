import React from "react";
import styles from "./AboutExecutives.module.css";
import { Mail, GraduationCap } from "lucide-react";

export const ExecutivesSection = ({ executives }) => {
  return (
    <section className={styles["executives-section"]}>
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles["section-header"]}>
          <h2>CATCOM Executive Team</h2>
          <div className={styles.underline}></div>
          <p>
            Meet the dedicated student leaders who serve our community with passion,
            integrity, and faith.
          </p>
        </div>

        {/* Executives Grid */}
        <div className={styles["executives-grid"]}>
          {executives.map((exec, index) => (
            <div
              key={exec.name}
              className={styles["executive-card"]}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className={styles["executive-header"]}>
                <div className={styles.avatar}>
                  <img src={exec.image} alt={exec.name} className={styles["exec-img"]} />
                </div>
                <span className={styles["leader-badge"]}>Leader</span>

                <h3>{exec.name}</h3>
                <p className={styles.position}>{exec.position}</p>
                <div className={styles.course}>
                  <GraduationCap size={16} />
                  <span>{exec.course}</span>
                </div>
              </div>

              <div className={styles["executive-body"]}>
                <p className={styles.bio}>{exec.bio}</p>
                <div className={styles.achievements}>
                  {exec.achievements?.map((a) => (
                    <span key={a} className={styles.achievement}>
                      {a}
                    </span>
                  ))}
                </div>
                <div className={styles.contact}>
                  <button className={styles["contact-btn"]}>
                    <Mail size={14} /> Contact
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={styles["executives-cta"]}>
          <h3>Join Our Leadership</h3>
          <p>
            Are you passionate about serving the Catholic community? Consider joining
            our executive team and help shape the future of CATCOM at JKUAT.
          </p>
          <button className={styles["cta-btn"]}>
            Learn About Leadership Opportunities
          </button>
        </div>
      </div>
    </section>
  );
};
