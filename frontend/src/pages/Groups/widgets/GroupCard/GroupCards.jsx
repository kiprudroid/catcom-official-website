import React from "react";
import { SectionHeading, Paragraph } from "../../../../components/Typography/Typography";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./GroupCards.module.css";
import { groupCardsData } from "../../data/groupsData";

const GroupCards = () => {
  return (
    <div className={styles.groupGrid}>
      {groupCardsData.map((group, idx) => {
        const images = Array.isArray(group.imgSrc)
          ? group.imgSrc
          : [group.imgSrc];

        return (
          <div key={idx} className={styles.groupCard}>
            <div className={styles.imageWrapper}>
              <Carousel
                showArrows
                showThumbs={false}
                showStatus={false}
                infiniteLoop
                autoPlay
                interval={3500}
                className={styles.carousel}
              >
                {images.map((src, i) => (
                  <div key={i}>
                    <img
                      src={src}
                      alt={group.alt || `Group image ${i + 1}`}
                      className={styles.cardImage}
                    />
                  </div>
                ))}
              </Carousel>
            </div>

            <div className={styles.cardContent}>
              <SectionHeading className={styles.cardTitle}>
                {group.title}
              </SectionHeading>
              <Paragraph className={styles.cardDesc}>
                {group.description}
              </Paragraph>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GroupCards;
