import React, { useState, useEffect } from "react";
import styles from "./InfoCard.module.css";

const slideShowImages = [
  "/Groups/catcomes.jpg",
  "/Groups/Catcomfc.jpg",
  "/Groups/technical.jpg",
  "/Groups/welfare.jpg",
  "/pastoral-team/Pastoral2.jpg",
];

const PILLS = ["Unity", "Service", "Shared faith", "Leadership"];

function InfoCard() {
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
          <h1 className={styles.title}>Groups in JKUAT CATCOM</h1>
          <p className={styles.subtitle}>
            The CATCOM community is built on unity, service, and shared faith.
            Our various groups bring together students with different gifts,
            passions, and callings — all working together to strengthen our
            mission and deepen our fellowship. By joining a group, members find
            belonging, purpose, and a meaningful way to live out their
            discipleship at JKUAT.
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
            src="/others/Group.jpg"
            alt="CATCOM Groups"
            className={styles.heroImg}
          />
        </div>
      </div>
    </div>
  );
}

export default InfoCard;
