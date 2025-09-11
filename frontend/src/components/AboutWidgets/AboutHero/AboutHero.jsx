import React from "react";
import heroImage from "/about-images/hero-image.jpg";
import styles from "./AboutHero.module.css";

export const HeroSection = () => {
  return (
    <section className={styles["hero-section"]}>
      {/* Background Image with Overlay */}
      <div
        className={styles["hero-background"]}
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className={styles["hero-overlay"]}></div>
      </div>

      {/* Content */}
      <div className={styles["hero-content"]}>
        <div className={styles["hero-heading"]}>
          <h1 className={styles["hero-title"]}>ABOUT JKUAT CATCOM</h1>
          <div className={styles["hero-divider"]}></div>
          <p className={styles["hero-subtitle"]}>Rooted in Faith, United in Service</p>
        </div>

        <p className={styles["hero-description"]}>
          Welcome to the Catholic Community at JKUAT - a vibrant community of
          faith, fellowship, and service guided by Christ&apos;s love and the
          teachings of the Church.
        </p>

        <div className={styles["hero-buttons"]}>
          <button className={`${styles.btn} ${styles["btn-divine"]}`}>
            Discover Our Journey
          </button>
          <button className={`${styles.btn} ${styles["btn-holy"]}`}>
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};
