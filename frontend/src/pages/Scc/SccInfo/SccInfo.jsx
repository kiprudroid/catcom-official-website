import React from "react";
import styles from "./SccInfo.module.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
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
        <div className={`${styles.hero} ${styles.widget}`} style={{ backgroundColor: "#fff" }}>
            <SectionHeading as="h2">
              <div className={styles.title}>{name}</div>
            </SectionHeading>
          <Paragraph>
            <div className={styles.about}>{about}</div>
          </Paragraph>
          </div>
      <div className={styles.activitiesAndPhotos}>
        <div className={`${styles.activities} ${styles.widget}`} style={{ backgroundColor: "#fff" }}>
          <SectionHeading>Activities</SectionHeading>
          <ul className={styles.activitiesList}>
            {activities.map((activity, index) => (
              <li>{activity}</li>
            ))}
          </ul>
        </div>
        <div className={styles.photos}>
          {/* <SectionHeading>Photos </SectionHeading> */}
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
        <div className={`${styles.patronSaintText} ${styles.widget}`} style={{ backgroundColor: "#fff" }}>
          <Paragraph>
            <SectionHeading> About {name}</SectionHeading>

            {aboutPatronSaint}
          </Paragraph>
        </div>
      </div>
      <div className={`${styles.prayer} ${styles.widget}`} >
        <SectionHeading> Prayer To {name}</SectionHeading>
        <Paragraph>{prayer}</Paragraph>
      </div>
    </div>
    <div className={styles.backButtonContainer}>
  <Link to="/scc" className={styles.backButton}>
    <Paragraph>
    Back to SCC
    </Paragraph>
  </Link>
</div>
    </DashboardLayout>
  );
};

export default SccInfo;
