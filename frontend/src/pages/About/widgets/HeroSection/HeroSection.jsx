import React, { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { useNavigate } from "react-router-dom";

const slideShowImages = [
  "/church-images/church1.jpg",
  "/church-images/church2.jpg",
  "/church-images/church3.jpg",
  "/church-images/church4.jpg",
  "/church-images/church5.jpg",
  "/church-images/church6.jpg",
  "/church-images/church7.jpg",
  "/home-hero-images/hero1.jpeg",
  "/home-hero-images/hero2.jpeg",
  "/home-hero-images/hero3.jpeg",
  "/home-hero-images/hero4.jpeg",
  "/home-hero-images/hero5.jpeg",
  "/home-hero-images/hero6.jpeg",
];

export const HeroSection = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slideShowImages.length);
        setVisible(true);
      }, 600);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.heroSection}>
      <div
        className={`${styles.heroBackground} ${visible ? styles.slideVisible : styles.slideHidden}`}
        style={{ backgroundImage: `url(${slideShowImages[current]})` }}
      >
        <div className={styles.heroOverlay} />
      </div>

      <div className={styles.heroContent}>
        <div className={styles.heroHeading}>
          <SectionHeading fontSize="2.5rem" className={styles.heroTitle}>
            ABOUT JKUAT CATCOM
          </SectionHeading>
          <div className={styles.heroDivider} />
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
          <button
            className={styles.btn}
            // onClick={() => navigate("/sccs#join-form")}
          >
            Join Our Community
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
