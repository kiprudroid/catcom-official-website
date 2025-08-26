import React, { useState } from "react";
import styles from "./Community.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import SccCard from "../../components/SccCard/SccCard";
import { SCCs } from "../../DataFiles/data";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SectionHeading } from "../../components/Typography/Typography";

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
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: false, // Changed to false
    fade: true,
    cssEase: "linear",
    centerMode: true,
    centerPadding: "0",
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: "0",
        },
      },
    ],
  };

  const handlePrevScc = () => {
    const currentIndex = SCCs.findIndex((scc) => scc.name === selectedScc.name);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : SCCs.length - 1;
    setSelectedScc(SCCs[prevIndex]);
  };

  const handleNextScc = () => {
    const currentIndex = SCCs.findIndex((scc) => scc.name === selectedScc.name);
    const nextIndex = currentIndex < SCCs.length - 1 ? currentIndex + 1 : 0;
    setSelectedScc(SCCs[nextIndex]);
  };

  return (
    <>
      <div className={styles.gridContainer}>
        <div className={`${styles.item} ${styles.header}`}>
          <Header />
        </div>

        <div className={`${styles.item} ${styles.whatIsScc}`}>
          <SectionHeading>What is an SCC?:</SectionHeading>
          <p
            className={styles.textContent}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            A Small Christian Community (SCC) is the Church within the
            community, comprising of a manageable group of students, which help
            to promote communion, co-responsibility, and gives every member a
            sense of belonging to the community at large.
          </p>
        </div>

        <div className={`${styles.item} ${styles.sccPictures}`}>
          <SectionHeading>Our SCCs</SectionHeading>
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
        </div>

        <SectionHeading>SCC OVERVIEW : {selectedScc.name}</SectionHeading>
        <div className={`${styles.item} ${styles.sccExpanded} contentWrapper`}>
          <button
            className={`${styles.sccNavigationButton} ${styles.prevButton}`}
            onClick={handlePrevScc}
            aria-label="Previous SCC"
          >
            &#8249;
          </button>
          <div className={styles.sccItem}>
            <div className={styles.slideShow}>
              {selectedScc.sccPhotos && selectedScc.sccPhotos.length > 0 ? (
                <Slider {...settings} className={styles.sliderContainer}>
                  {selectedScc.sccPhotos.map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
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
              {selectedScc.families &&
                selectedScc.families.map((family, index) => (
                  <div className={styles.familyCard} key={index}>
                    <h1 className={styles.familyText}>{family}</h1>
                  </div>
                ))}
            </div>
            <div className={styles.secondColumnItem}>
              <SectionHeading>Activities</SectionHeading>
              <ul className={styles.activitiesList}>
                {selectedScc.activities &&
                  selectedScc.activities.map((activity, index) => (
                    <li key={index}>{activity}</li>
                  ))}
              </ul>
            </div>
          </div>
          <button
            className={`${styles.sccNavigationButton} ${styles.nextButton}`}
            onClick={handleNextScc}
            aria-label="Next SCC"
          >
            &#8250;
          </button>
        </div>

        <div className={`${styles.item} ${styles.footer}`}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Community;
