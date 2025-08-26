import React from "react";
import styles from "./SccInfo.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { SCCs } from "../../DataFiles/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  SectionHeading,
  Paragraph,
} from "../../components/Typography/Typography";
const SccInfo = ({
  name,
  about,
  activities,
  sccPhotos,
  aboutPatronSaint,
  prayer,
  image,
}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    fade: true,
  };
  return (
    <div className={styles.gridContainer}>
      <div className={styles.header}>
        <Header />
      </div>
      <SectionHeading className={styles.heading} as="h1">
        <div className={styles.title}>{name}</div>
      </SectionHeading>
      <Paragraph className={styles.subTitle}>
        <div className={styles.about}>{about}</div>
      </Paragraph>
      <div className={styles.activitiesAndPhotos}>
        <div className={styles.activities}>
          <SectionHeading>Activities</SectionHeading>
          <ul class={styles.activitiesList}>
            {activities.map((activity, index) => (
              <li>{activity}</li>
            ))}
          </ul>
        </div>
        <div className={styles.photos}>
          <SectionHeading>Photos </SectionHeading>
          {/* SlideShow */}
          <div className={styles.slideShow}>
            {sccPhotos && sccPhotos.length > 0 ? (
              <Slider {...settings} className={styles.sliderContainer}>
                {sccPhotos.map((image, index) => (
                  <div key={index}>
                    <img
                      src={image}
                      alt={`Slide ${index + 1}`}
                      className={styles.slideshowImage}
                    />
                  </div>
                ))}
              </Slider>
            ) : (
              <div className={styles.noImages}>No photos available</div>
            )}
          </div>
        </div>
      </div>
      <div className={styles.PatronSaint}>
        <div className={styles.PatronSaintImage}>
          <img
            src={image}
            alt="Patron Saint"
            className={styles.patronSaintImage}
          ></img>
        </div>
        <div className={styles.patronSaintText}>
          <Paragraph>
            <SectionHeading> About {name}</SectionHeading>

            {aboutPatronSaint}
          </Paragraph>
        </div>
      </div>
      <div className={styles.prayer}>
        <SectionHeading> Prayer To {name}</SectionHeading>
        <Paragraph>{prayer}</Paragraph>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SccInfo;
