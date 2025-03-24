import React from "react";
import styles from "./Home.module.css";
import Header from "../../reusable-components/Header/Header";
import "@fontsource/inter";
import Footer from "../../reusable-components/Footer/Footer";
import Schedule from "../../components/Schedule/Schedule";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../../../public/DataFiles/data";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />

        {/* SlideShow */}
        <div className={styles.slideShow}>
          <Slider {...settings} className={styles.sliderContainer}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={styles.slideshowImage}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Weekly Program */}
        <div className={styles.weeklyProgram}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Weekly Program
          </h3>

          <div className={styles.contentWrapper}>
            <Schedule />
          </div>
        </div>

        {/* Media content */}
        <div className={styles.mediaContent}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Media Content
          </h3>
          <div className={styles.mediaWrapper}>
            {[
              "/others/Beyond-Century-of-Endeavour-A-History-of-the-Catholic-Church-in-Kenya.jpg",
              "/others/placeholder.jpg",
              "/others/placeholder.jpg",
              "/others/placeholder.jpg",
              "/others/kmrm_logo.jpg",
            ].map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`media-content-${index}`}
                className={styles.mediaImage}
              />
            ))}
          </div>
        </div>

        <div className={styles.whatAreWe}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What are we ?
          </h3>
          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are a vibrant Catholic Community that encourages healthy growth
              spiritually, socially, and academically, with the ultimate goal of
              encountering Christ in our daily lives. The community supports us
              in recognizing our inherent vocation bestowed upon us by God,
              which involves the task of exploring our talents and capabilities
              and utilizing them for the betterment of others. This friendship
              grants us the opportunity to cultivate our freedom, allowing us to
              lead lives that are dedicated to Christ, with Christ, and for
              Christ. It is a genuine bond that empowers every member to develop
              love for themselves as well as for others.
            </p>
          </div>
        </div>
        <div className={styles.vision}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Vision
          </h3>
          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              A praying, believing and worshiping community for empowering young
              people to live as disciples of Jesus Christ; drawing them into
              responsible participation in the Catholic Church; fostering their
              personal and spiritual growth.
            </p>
          </div>
        </div>

        <div className={styles.mission}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Mission
          </h3>
          <div className={styles.contentWrapper}>
            <p style={{ color: "#E3D879" }} className={styles.contentTitle}>
              What we do, everyday
            </p>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              To help people find God, grow their faith, discover their purpose,
              and make a difference.We exist to make Heaven more crowded.
            </p>
          </div>
        </div>

        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
