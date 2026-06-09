import React, { useState, useEffect, useRef } from "react";
import styles from "./HeroSection.module.css";
import { slideShowImages } from "@/data/data";


const CHURCH_IMAGES = [
  "/church-images/church1.jpg",
  "/church-images/church2.jpg",
  "/church-images/church3.jpg",
  "/church-images/church4.jpg",
  "/church-images/church5.jpg",
  "/church-images/church6.jpg",
  "/church-images/church7.jpg",
];

const PILLS = ["Praying", "Believing", "Worshiping", "Serving"];

function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const [bgIndex, setBgIndex] = useState(0);
  const timerRef = useRef(null);
  const bgTimerRef = useRef(null);

  const total = Math.ceil(slideShowImages.length / 2);

  const goTo = (index) => setCurrent(index);
  const prev = () => setCurrent((c) => (c - 1 + total) % total);
  const next = () => setCurrent((c) => (c + 1) % total);

  // Slideshow dots auto-advance
  useEffect(() => {
    if (paused) return;
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % total);
    }, 3500);
    return () => clearInterval(timerRef.current);
  }, [paused, total]);

  // Background church image slowly cycles every 6s
  useEffect(() => {
    bgTimerRef.current = setInterval(() => {
      setBgIndex((i) => (i + 1) % CHURCH_IMAGES.length);
    }, 6000);
    return () => clearInterval(bgTimerRef.current);
  }, []);

  const visibleImages = slideShowImages.slice(current * 2, current * 2 + 2);

  return (
    <section className={styles.hero}>
      <div
        className={styles.heroBg}
        style={{ backgroundImage: `url(${CHURCH_IMAGES[bgIndex]})` }}
      />
      <div className={styles.heroOverlay} />

      <div className={styles.heroContent}>
        <p className={styles.eyebrow}>JKUAT · Catholic Community</p>
        <h1 className={styles.title}>Welcome to CATCOM</h1>
        <p className={styles.subtitle}>
          A vibrant community encouraging spiritual, social, and academic growth
          — encountering Christ in everyday life.
        </p>
        <div className={styles.pills}>
          {PILLS.map((p) => (
            <span key={p} className={styles.pill}>
              {p}
            </span>
          ))}
        </div>
      </div>

      <div
        className={styles.sliderSection}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <p className={styles.sliderLabel}>Life at CATCOM ✨</p>

        <div className={styles.sliderRow}>
          <button
            className={styles.arrow}
            onClick={prev}
            aria-label="Previous photos"
          >
            &#8249;
          </button>

          <div className={styles.slides}>
            {visibleImages.map((img, i) => (
              <div key={i} className={styles.slide}>
                <img
                  src={img}
                  alt={`Community photo ${current * 2 + i + 1}`}
                  className={styles.slideImg}
                />
              </div>
            ))}
            {visibleImages.length === 1 && (
              <div className={styles.slidePlaceholder} />
            )}
          </div>

          <button
            className={styles.arrow}
            onClick={next}
            aria-label="Next photos"
          >
            &#8250;
          </button>
        </div>

        <div className={styles.dots}>
          {Array.from({ length: total }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ""}`}
              onClick={() => goTo(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
