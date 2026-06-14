import React from "react";
import Slider from "react-slick";
import styles from "./ChurchImage.module.css";
import { Paragraph } from "@/components/Typography/Typography";

const images = [
  "/others/st_augustine.jpg",
  "/church-images/church2.jpg",
  "/church-images/church5.jpg",
  "/church-images/church1.jpg",
  "/church-images/church4.jpg",
  "/church-images/church6.jpg",
  "/church-images/church7.jpg",
];

function ChurchImage() {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    fade: true,
    speed: 1000,
  };

  return (
    <div className={styles.imgContainer}>
      <Slider {...settings}>
        {images.map((image, idx) => (
          <div key={idx}>
            <img
              className={styles.churchImage}
              src={image}
              alt="St Augustine Church Image"
            />
          </div>
        ))}
      </Slider>

      <div className={styles.imageLabel}>
        <Paragraph className={styles.imageLabelTitle}>
          St Augustine – JUJA
        </Paragraph>
        <Paragraph>
          <a
            href="https://maps.google.com/maps?cid=549996087219067126"
            target="_blank"
            rel="noopener noreferrer"
          >
            View on Map
          </a>
        </Paragraph>
      </div>
    </div>
  );
}

export default ChurchImage;
