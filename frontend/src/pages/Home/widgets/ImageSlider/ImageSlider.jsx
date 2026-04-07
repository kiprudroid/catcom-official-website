import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ImageSlider.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

function ImageSlider({ images, title = "Life at CATCOM ✨📸" }) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 3500,
    pauseOnHover: true,
    adaptiveHeight: false,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className={styles.sliderContainer}>
      <SectionHeading as="h3" className={styles.sliderTitle}>
        {title}
      </SectionHeading>

      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index} className={styles.slide}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className={styles.slideshowImage}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ImageSlider;
