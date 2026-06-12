import React, { useState, useEffect } from "react";
import styles from "./WhatIsScc.module.css";

const slideShowImages = [
  "/sccPictures/stPaul/picture1.png",
  "/sccPictures/stStephen/picture3.jpg",
  "/sccPictures/stTherese/Picture3.png",
  "/sccPictures/stTherese/Picture2.png",
  "/sccPictures/stCharles/picture2.png",
  "/sccPictures/stPaul/picture2.png",
  "/home-hero-images/hero1.jpeg",
  "/home-hero-images/hero2.jpeg",
  "/home-hero-images/hero3.jpeg",
  "/home-hero-images/hero4.jpeg",
  "/home-hero-images/hero5.jpeg",
  "/home-hero-images/hero6.jpeg",
  "/home-hero-images/hero7.jpeg",
  "/home-hero-images/hero8.jpeg",
];

const PILLS = ["Prayer", "Scripture", "Community", "Growth"];

function WhatIsScc() {
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
    <div className={styles.hero}>
      {/* slideshow layers */}
      <div
        className={`${styles.slideBg} ${visible ? styles.slideVisible : styles.slideHidden}`}
        style={{ backgroundImage: `url(${slideShowImages[current]})` }}
        aria-hidden="true"
      />
      <div className={styles.overlay} aria-hidden="true" />

      {/* content */}
      <div className={styles.content}>
        <div className={styles.text}>
          <span className={styles.eyebrow}>JKUAT · CATCOM</span>
          <h1 className={styles.title}>Small Christian Communities</h1>
          <p className={styles.subtitle}>
            SCCs are the basic units of the Church — small groups of Catholic
            students who meet regularly to pray together, read and reflect on
            Scripture, share their lives, and support one another in living the
            faith on campus. They are the heartbeat of CATCOM at JKUAT.
          </p>
          <div className={styles.pills}>
            {PILLS.map((p) => (
              <span key={p} className={styles.pill}>
                {p}
              </span>
            ))}
          </div>
        </div>

        <div className={styles.imageCol}>
          <img
            src="/others/unityCircle.png"
            alt="Small Christian Community"
            className={styles.heroImg}
          />
        </div>
      </div>
    </div>
  );
}

export default WhatIsScc;
