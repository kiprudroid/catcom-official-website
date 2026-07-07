import React, { useState, useEffect } from "react";
import { SectionHeading } from "./../../../../components/Typography/Typography";
import styles from "./SccOverview.module.css";
import { SCCs } from "../../data/scc";

const SccOverview = ({ className }) => {
  const [selectedScc, setSelectedScc] = useState(SCCs[0]);
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 480 : false,
  );

  // Detect mobile breakpoint
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 480);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Auto-rotate SCCs every 3 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = SCCs.findIndex(
        (scc) => scc.name === selectedScc.name,
      );
      const nextIndex = currentIndex < SCCs.length - 1 ? currentIndex + 1 : 0;
      setSelectedScc(SCCs[nextIndex]);
    }, 180000);
    return () => clearInterval(interval);
  }, [selectedScc]);

  // Reset slide index when SCC changes
  useEffect(() => {
    setSlideIndex(0);
  }, [selectedScc]);

  const photos = selectedScc.sccPhotos || [];
  const imagesPerSlide = isMobile ? 1 : 2;
  const totalSlides = Math.ceil(photos.length / imagesPerSlide);

  // Auto-advance slides every 3 seconds
  useEffect(() => {
    if (totalSlides <= 1) return;
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % totalSlides);
    }, 3000);
    return () => clearInterval(timer);
  }, [totalSlides, selectedScc]);

  // Clamp slideIndex when imagesPerSlide changes (e.g. resize mid-view)
  useEffect(() => {
    if (slideIndex >= totalSlides) setSlideIndex(0);
  }, [isMobile, totalSlides]);

  const handlePrevScc = () => {
    const currentIndex = SCCs.findIndex((scc) => scc.name === selectedScc.name);
    setSelectedScc(SCCs[currentIndex > 0 ? currentIndex - 1 : SCCs.length - 1]);
  };

  const handleNextScc = () => {
    const currentIndex = SCCs.findIndex((scc) => scc.name === selectedScc.name);
    setSelectedScc(SCCs[currentIndex < SCCs.length - 1 ? currentIndex + 1 : 0]);
  };

  const handlePrevSlide = () => {
    setSlideIndex((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const handleNextSlide = () => {
    setSlideIndex((prev) => (prev + 1) % totalSlides);
  };

  const currentPair = photos.slice(
    slideIndex * imagesPerSlide,
    slideIndex * imagesPerSlide + imagesPerSlide,
  );

  return (
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
          {photos.length > 0 ? (
            <div className={styles.sliderWrapper}>
              <button
                className={`${styles.sliderArrow} ${styles.sliderPrev}`}
                onClick={handlePrevSlide}
                aria-label="Previous slide"
              >
                &#8249;
              </button>

              <div
                className={`${styles.photoGrid} ${isMobile ? styles.photoGridSingle : ""}`}
              >
                {currentPair.map((image, index) => (
                  <div
                    key={`${slideIndex}-${index}`}
                    className={styles.imageWrapper}
                  >
                    <img
                      load="lazy"
                      src={image}
                      alt={`${selectedScc.name} photo ${slideIndex * imagesPerSlide + index + 1}`}
                      className={styles.slideshowImage}
                    />
                  </div>
                ))}
                {/* Pad to 2 columns on desktop if only 1 image in last slide */}
                {!isMobile && currentPair.length === 1 && (
                  <div className={styles.imageWrapper} />
                )}
              </div>

              <button
                className={`${styles.sliderArrow} ${styles.sliderNext}`}
                onClick={handleNextSlide}
                aria-label="Next slide"
              >
                &#8250;
              </button>

              {totalSlides > 1 && (
                <div className={styles.dots}>
                  {Array.from({ length: totalSlides }).map((_, i) => (
                    <button
                      key={i}
                      className={`${styles.dot} ${i === slideIndex ? styles.dotActive : ""}`}
                      onClick={() => setSlideIndex(i)}
                      aria-label={`Go to slide ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
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
                <div key={index} className={styles.activityCard}>
                  {activity}
                </div>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SccOverview;
