import React from "react";
import heritageImage from "/about-images/Sacred-Heritage.webp";
import styles from "./AboutHeritage.module.css";

export const HeritageSection = () => {
  return (
    <section className={styles["heritage-section"]}>
      <div className={styles["heritage-container"]}>
        <div className={styles["heritage-grid"]}>
          {/* Text Content */}
          <div className={styles["heritage-text"]}>
            <div>
              <h2 className={styles["heritage-title"]}>Our Sacred Heritage</h2>
              <div className={styles["heritage-divider"]}></div>
            </div>

            <div className={styles["heritage-prose"]}>
              <p>
                Founded with the vision of creating a spiritual home for Catholic
                students at JKUAT, our community has grown from a small prayer
                group to a thriving family of faith. Since our establishment, we
                have been dedicated to fostering spiritual growth, academic
                excellence, and social responsibility.
              </p>

              <p>
                Through decades of service, CATCOM has been a beacon of hope,
                providing guidance, support, and fellowship to thousands of
                students. Our heritage is built on the foundation of Christ&apos;s
                teachings, the wisdom of the Church, and the commitment of
                generations of faithful students and clergy.
              </p>

              <p>
                Today, we continue this sacred tradition, embracing both our
                rich history and our vision for the future - always guided by
                our core values of faith, service, and community.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className={styles["heritage-image-wrapper"]}>
            <div className={styles["heritage-image-container"]}>
              <img
                src={heritageImage}
                alt="CATCOM Heritage - Catholic community tradition and faith"
                className={styles["heritage-image"]}
              />
            </div>

            {/* Floating elements */}
            <div className={`${styles["floating-circle"]} ${styles["circle-top-right"]}`}></div>
            <div
              className={`${styles["floating-circle"]} ${styles["circle-bottom-left"]}`}
              style={{ animationDelay: "2s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  );
};
