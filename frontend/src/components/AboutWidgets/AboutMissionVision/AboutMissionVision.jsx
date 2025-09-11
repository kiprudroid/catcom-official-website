import React from "react";
import { Cross, Heart, Users, BookOpen } from "lucide-react";
import styles from "./AboutMissionVision.module.css";

export const MissionVisionSection = () => {
  const missions = [
    {
      title: "Our Mission",
      icon: Cross,
      content:
        "To foster spiritual growth and academic excellence among Catholic students at JKUAT, creating a community rooted in faith, love, and service to God and humanity.",
      gradient: "gradient-sacred",
    },
    {
      title: "Our Vision",
      icon: Heart,
      content:
        "To be a beacon of hope and light, forming well-rounded Catholic professionals who will transform society through Christian values and evangelical witness.",
      gradient: "gradient-divine",
    },
    {
      title: "Our Values",
      icon: Users,
      content:
        "Faith in Christ, Love for one another, Service to the community, Academic excellence, and Commitment to social justice and peace.",
      gradient: "gradient-holy",
    },
    {
      title: "Our Commitment",
      icon: BookOpen,
      content:
        "To provide spiritual formation, pastoral care, and a supportive environment where students can grow in faith while pursuing academic and personal excellence.",
      gradient: "gradient-peaceful",
    },
  ];

  return (
    <section className={styles["mv-section"]}>
      <div className={styles["mv-container"]}>
        {/* Section Header */}
        <div className={styles["mv-header"]}>
          <h2 className={styles["mv-title"]}>Mission & Vision</h2>
          <div className={styles["mv-divider"]}></div>
          <p className={styles["mv-subtitle"]}>
            Our guiding principles and aspirations that define who we are and
            where we're going as a community of faith.
          </p>
        </div>

        {/* Mission/Vision Cards */}
        <div className={styles["mv-grid"]}>
          {missions.map((item, index) => (
            <div
              key={item.title}
              className={styles["mv-card"]}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles["mv-card-header"]}>
                <div
                  className={`${styles["mv-icon-wrapper"]} ${styles[item.gradient]}`}
                >
                  <item.icon className={styles["mv-icon"]} />
                </div>
                <h3 className={styles["mv-card-title"]}>{item.title}</h3>
              </div>
              <div className={styles["mv-card-content"]}>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
