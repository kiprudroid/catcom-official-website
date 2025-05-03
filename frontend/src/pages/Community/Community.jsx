import React from "react";
import { useState } from "react";
import styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { Heading } from "../../components/Typography/Typography";
import SccCard from "../../components/SccCard/SccCard";
import { SCCs } from "../../DataFiles/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function Community() {
  const [selectedScc, setSelectedScc] = useState(SCCs[0]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * SCCs.length);
      setSelectedScc(SCCs[randomIndex]);
    }, 20000);

    return () => clearInterval(interval);
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    adaptiveHeight: true,
    fade: true,
  };
  return (
    <>
      <div className={styles.gridContainer}>
        <div className={`${styles.item} ${styles.header}`}>
          <Header />
        </div>
        <div className={`${styles.item} ${styles.sccPictures}`}>
          <Heading>Our SCCs</Heading>
          <div className={`contentWrapper ${styles.sccCardsWrapper}`}>
            {SCCs.map((_, index) => (
              <SccCard
                key={index}
                SccName={SCCs[index].name}
                path={SCCs[index].path}
                image={SCCs[index].image}
              />
            ))}
          </div>

          <Heading>SCC : {selectedScc.name}</Heading>
          <div className={`${styles.item} ${styles.sccExpanded}`}>
            <div className={styles.sccItem}>
              <div className={styles.slideShow}>
                {selectedScc.sccPhotos && selectedScc.sccPhotos.length > 0 ? (
                  <Slider {...settings} className={styles.sliderContainer}>
                    {selectedScc.sccPhotos.map((image, index) => (
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
            <div className={styles.sccItem}>
              <div className={styles.secondColumnItem}>
                {selectedScc.families.map((family, index) => (
                  <div className={styles.familyCard}>
                    <p>{family}</p>
                  </div>
                ))}
              </div>
              <div className={styles.secondColumnItem}>
                Activities and Photos
              </div>
            </div>
          </div>
          <Heading>Alumni</Heading>
          <div className={`${styles.item} ${styles.alumni}`}></div>
          <Heading>Choir</Heading>
          <div className={`${styles.item} ${styles.choir}`}></div>
          <Heading>Technical Team</Heading>
          <div className={`${styles.item} ${styles.technicalTeam}`}></div>
          <div className={`${styles.item} ${styles.footer}`}>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
}

export default Community;
