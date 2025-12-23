import React from "react";
import { Cross, Heart, Users, BookOpen } from "lucide-react";
import styles from "./MissionVision.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

const MissionVision = () => {
  const missions = [
    {
      title: "Our Mission",
      icon: Cross,
      content:
        "To foster spiritual growth and academic excellence among Catholic students at JKUAT, creating a community rooted in faith, love, and service to God and humanity.",
      gradient: "gradientSacred",
    },
    {
      title: "Our Vision",
      icon: Heart,
      content:
        "To be a beacon of hope and light, forming well-rounded Catholic professionals who will transform society through Christian values and evangelical witness.",
      gradient: "gradientDivine",
    },
    {
      title: "Our Values",
      icon: Users,
      content:
        "Faith in Christ, Love for one another, Service to the community, Academic excellence, and Commitment to social justice and peace.",
      gradient: "gradientHoly",
    },
    {
      title: "Our Commitment",
      icon: BookOpen,
      content:
        "To provide spiritual formation, pastoral care, and a supportive environment where students can grow in faith while pursuing academic and personal excellence.",
      gradient: "gradientPeaceful",
    },
  ];

  return (
    <section className={styles.mvSection}>
      <div className={styles.mvContainer}>
        <div className={styles.mvHeader}>
          <SectionHeading className={styles.mvTitle}>
            Mission & Vision
          </SectionHeading>
          <div className={styles.mvDivider}></div>
          <p className={styles.mvSubtitle}>
            Our guiding principles and aspirations that define who we are and
            where we're going as a community of faith.
          </p>
        </div>

        <div className={styles.mvGrid}>
          {missions.map((item, index) => (
            <div
              key={item.title}
              className={styles.mvCard}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className={styles.mvCardHeader}>
                <div
                  className={`${styles.mvIconWrapper} ${styles[item.gradient]}`}
                >
                  <item.icon className={styles.mvIcon} />
                </div>
                <h3 className={styles.mvCardTitle}>{item.title}</h3>
              </div>
              <div className={styles.mvCardContent}>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MissionVision;
