import React from "react";
import styles from "./SccInfo.module.css"; // Assuming you have a CSS module for styling
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { SCCs } from "../../DataFiles/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {Heading ,Paragraph ,SmallText } from "../../components/Typography/Typography";
const SccInfo = ({
  name,
  about,
  activities,
  sccPhotos,
  aboutPatronSaint,
  prayer,
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
      <Heading className={styles.heading} as="h1">
        <div className={styles.title}>{name}</div>
      </Heading>
      <SmallText className={styles.subTitle}>
        <div className={styles.about}>{about}</div>
      </SmallText>
      <div className={styles.activitiesAndPhotos}>
        <div className={styles.activities}>
          <Heading>Activities</Heading>
          <ul>
            {activities.map((activity, index) => (
              <li>{activity}</li>
            ))}
          </ul>
        </div>
        <div className={styles.photos}>
          <Heading>Photos </Heading>
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
        <Heading> About {name}</Heading>
        <SmallText>
          {aboutPatronSaint}
          {prayer}
        </SmallText>
      </div>
      <div className={styles.prayer}>
        <Heading> Prayer To {name}</Heading>
        <SmallText>{prayer}</SmallText>
      </div>
      <div className={styles.footer}>
        <Footer />
      </div>
    </div>
  );
};

export default SccInfo;
