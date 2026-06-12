import React from "react";
import styles from "./PageHeroSection.module.css";

/**
 * Shared hero banner for inner pages (Groups, SCC, etc.)
 *
 * Props:
 *  - eyebrow     string   small label above the title  e.g. "JKUAT · CATCOM"
 *  - title       string   main heading
 *  - subtitle    string   body paragraph
 *  - accent      string   hex colour for the left border + icon tint (default #2dabb1)
 *  - imageSrc    string   URL for the right-side illustration / icon
 *  - imageAlt    string   alt text for the image
 *  - pills       string[] optional pill tags shown below the subtitle
 */

function PageHeroSection({
  eyebrow = "JKUAT · CATCOM",
  title,
  subtitle,
  accent = "#2dabb1",
  imageSrc,
  imageAlt = "",
  pills = [],
}) {
  return (
    <div className={styles.hero} style={{ "--hero-accent": accent }}>
      <div className={styles.left}>
        {eyebrow && <p className={styles.eyebrow}>{eyebrow}</p>}
        <h1 className={styles.title}>{title}</h1>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {pills.length > 0 && (
          <div className={styles.pills}>
            {pills.map((p) => (
              <span key={p} className={styles.pill}>
                {p}
              </span>
            ))}
          </div>
        )}
      </div>

      {imageSrc && (
        <div className={styles.right}>
          <img src={imageSrc} alt={imageAlt} className={styles.image} />
        </div>
      )}
    </div>
  );
}

export default PageHeroSection;
