import React from "react";
import styles from "./GroupCard.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

const GroupCard = ({ data }) => {
  const images = Array.isArray(data.imgSrc) ? data.imgSrc : [data.imgSrc];

  return (
    <div className={styles.groupCard}>
        <div className={styles.imageSlideshow}>
        <Carousel
          showArrows={true}
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          autoPlay
          interval={3000}
          className={styles.carousel}
        >
          {images.map((src, idx) => (
            <div key={idx}>
              <img src={src} alt={data.alt || `Group image ${idx + 1}`} className={styles.cardImage} />
            </div>
          ))}
        </Carousel>
      </div>
      <div className={styles.cardText}>
        <SectionHeading className={styles.cardTitle}>
          {data.title}
        </SectionHeading>
        <Paragraph className={styles.cardDesc}>{data.description}</Paragraph>
      </div>
    </div>
  );
};

export default GroupCard;
