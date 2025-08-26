import React from "react";
import styles from "./Home.module.css";
import "@fontsource/inter";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CatcomCalendar from "../../components/HomeWidgets/CatcomCalendar/CatcomCalendar";
import { SectionHeading } from "../../components/Typography/Typography";
import MediaContent from "../../components/HomeWidgets/MediaContent/MediaContent";
import MassAndServices from "../../components/HomeWidgets/MassAndServices/MassAndServices";
import { slideShowImages } from "../../DataFiles/data";
import HomepageLayout from "../../layouts/homepage-layout/HomepageLayout";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    adaptiveHeight: true,
  };

  return (
    <HomepageLayout>
      <div className={styles.homeContainer}>
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>What are we?</h3>
          <p className={styles.textContent}>
            We are a vibrant Catholic Community that encourages healthy growth
            spiritually, socially, and academically, with the ultimate goal of
            encountering Christ in our daily lives. The community supports us in
            recognizing our inherent vocation bestowed upon us by God...
          </p>
        </div>
        {/* Vision */}
        <div className={styles.card}>
          <h3 className={styles.cardTitle}>Our Vision</h3>
          <p className={styles.textContent}>
            A praying, believing and worshiping community for empowering young
            people to live as disciples of Jesus Christ...
          </p>
        </div>
        <div className={`${styles.card} ${styles.calendar}`}>
          <MassAndServices />
        </div>
        <div className={`${styles.card} ${styles.calendar}`}>
          <SectionHeading className={styles.cardTitle}>
            CATCOM Semester Calendar
          </SectionHeading>
          <CatcomCalendar />
        </div>
        <div className={styles.card}>
          <MediaContent />
        </div>
        <div className={styles.card}>
          <Slider {...settings} className={styles.sliderContainer}>
            {slideShowImages.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  srcSet={`${image}?w=800 800w, ${image}?w=1600 1600w, ${image}?w=2400 2400w`}
                  sizes="(max-width: 768px) 100vw, 60vw"
                  alt={`Slide ${index + 1}`}
                  className={styles.slideshowImage}
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </HomepageLayout>
  );
}

export default Home;
