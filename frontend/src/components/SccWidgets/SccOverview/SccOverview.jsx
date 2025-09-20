import React, { useState } from "react";
import Slider from "react-slick";
import { SectionHeading } from "../../Typography/Typography";
import styles from "./SccOverview.module.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { SCCs } from "../../../DataFiles/scc";
import { SccExecutiveCard } from "../SccExecutiveCard/SccExecutiveCard.jsx";

import {
  
  sccExecutive,
} from "../../../DataFiles/data.js";

const SccOverview = ({ className }) => {
  const [selectedScc, setSelectedScc] = useState(SCCs[0]);

  // Change SCC every 3 minutes (180000 ms)
  React.useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = SCCs.findIndex(
        (scc) => scc.name === selectedScc.name
      );
      const nextIndex = currentIndex < SCCs.length - 1 ? currentIndex + 1 : 0;
      setSelectedScc(SCCs[nextIndex]);
    }, 180000);
    return () => clearInterval(interval);
  }, [selectedScc]);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    adaptiveHeight: false,
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
      <div className={`${styles.sccExpanded} ${className}`}>
        <div className={styles.navigationButtonsAndHeading}>

         <button
            className={`${styles.sccNavigationButton} ${styles.prevButton}`}
            onClick={handlePrevScc}
            aria-label="Previous SCC"
          >
            &#8249; Previous
          </button>
        <SectionHeading className={styles.centeredText}>
          SCC OVERVIEW : {selectedScc.name}
        </SectionHeading>
        <button
            className={`${styles.sccNavigationButton} ${styles.nextButton}`}
            onClick={handleNextScc}
            aria-label="Next SCC"
          >
           Next &#8250;
          </button>
        </div>

        <div className={styles.slideshowActivityRow}>
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
        
          <div className={styles.families}>
            <SectionHeading className={styles.centeredText}>
              Families
            </SectionHeading>
            {selectedScc.families && (
              <div className={styles.familiesGrid}>
                {selectedScc.families.map((family, index) => (
                  <div className={styles.familyCard} key={index}>
                    <h1 className={styles.familyText}>{family}</h1>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className={styles.sccContentRow}>
          <div className={styles.activities}>
            <SectionHeading className={styles.centeredText}>
              Activities
            </SectionHeading>
            <ul className={styles.activitiesList}>
              {selectedScc.activities &&
                selectedScc.activities.map((activity, index) => (
                  <li key={index} className={styles.activityCard}>
                    {activity}
                  </li>
                ))}
            </ul>
          </div>
        </div>
          <SccExecutiveCard executives={sccExecutive} />
      </div>
    </>
  );
};

export default SccOverview;
