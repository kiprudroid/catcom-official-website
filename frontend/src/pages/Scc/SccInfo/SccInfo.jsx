import React from "react";
import styles from "./SccInfo.module.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionHeading, Paragraph,
} from "../../../components/Typography/Typography";
import DashboardLayout from "../../../layouts/dashboard-layout/DashboardLayout";
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
    <DashboardLayout>
      <div className={`${styles.gridContainer} ${styles.widget}`}>

            <div className={`${styles.hero} ${styles.widget}`} >
            <SectionHeading  as="h2">
            <div className={styles.title}>{name}</div>
          </SectionHeading>
          <Paragraph>
            <div className={styles.about}>{about}</div>
          </Paragraph>
          </div>
      <div className={styles.activitiesAndPhotos}>
        <div className={`${styles.activities} ${styles.widget}`}>
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
        <div className={`${styles.patronSaintText} ${styles.widget}`}>
          <Paragraph>
            <SectionHeading> About {name}</SectionHeading>

            {aboutPatronSaint}
          </Paragraph>
        </div>
      </div>
      <div className={`${styles.prayer} ${styles.widget}`}>
        <SectionHeading> Prayer To {name}</SectionHeading>
        <Paragraph>{prayer}</Paragraph>
      </div>
    </div>
    </DashboardLayout>
  );
};

export default SccInfo;
