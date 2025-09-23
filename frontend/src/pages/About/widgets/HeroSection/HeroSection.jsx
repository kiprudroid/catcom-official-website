import React from "react";
import heroImage from "/about-images/hero-image.jpg";
import churchImage from "/church-images/church5.jpg";

import styles from "./HeroSection.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";

export const HeroSection = () => {
  return (
    <section className={styles.heroSection}>
      <div
        className={styles.heroBackground}
        style={{ backgroundImage: `url(${churchImage})` }}
      >
        <div className={styles.heroOverlay}></div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroHeading}>
          <SectionHeading className={styles.heroTitle}>
            ABOUT JKUAT CATCOM
          </SectionHeading>
          <div className={styles.heroDivider}></div>
          <Paragraph fontSize="2rem" className={styles.heroSubtitle}>
            Rooted in Faith, United in Service
          </Paragraph>
        </div>

        <Paragraph fontSize="1.2rem" className={styles.heroDescription}>
          Welcome to the Catholic Community at JKUAT - a vibrant community of
          faith, fellowship, and service guided by Christ&apos;s love and the
          teachings of the Church.
        </Paragraph>

        <div className={styles.heroBtns}>
          <button className={`${styles.btn}`}>Join Our Community</button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
