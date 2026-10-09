import React, { useState } from "react";
import Slider from "react-slick";
import Lightbox from "yet-another-react-lightbox";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/thumbnails.css";
import styles from "./Activities.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

const ActivityItem = ({ activity }) => {
  const name = typeof activity === "string" ? activity : activity.name || "Activity";
  const dateRaw = typeof activity === "string" ? null : activity.date || null;

  const formatBadge = (d) => {
    try {
      const dt = new Date(d);
      if (isNaN(dt)) return null;
      const day = dt.getDate();
      const month = dt.toLocaleString(undefined, { month: "short" });
      return `${day} ${month}`;
    } catch {
      return null;
    }
  };
  const badge = dateRaw ? formatBadge(dateRaw) : null;

  return (
    <button
      type="button"
      className={styles.activityButton}
      aria-label={badge ? `${name} — ${badge}` : name}
      onClick={() => {
      }}
    >
      {badge && <span className={styles.dateBadge}>{badge}</span>}
      <span className={styles.activityName}>{name}</span>
    </button>
  );
};

const Activities = ({ activities = [], sccPhotos = [] ,className}) => {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    fade: true,
  };

  const slides = sccPhotos.map((src, idx) => ({
    src,
    alt: `Slide ${idx + 1}`,
  }));

  return (
    <div className={`${styles.card} ${className}`}>
      <div className={styles.cardHeader}>
        <SectionHeading as="h2">Activities & Photos</SectionHeading>
      </div>

      <div className={styles.cardBody}>
        <div className={styles.activitiesColumn}>
          <div className={styles.activitiesInner}>
            {activities.length ? (
              activities.map((act, i) => (
                <ActivityItem activity={act} key={act.id ?? `${i}-${String(act)}`} />
              ))
            ) : (
              <div className={styles.empty}>No activities yet</div>
            )}
          </div>
        </div>

        <div className={styles.photosColumn}>
          <div className={styles.photosInner}>
            {sccPhotos && sccPhotos.length > 0 ? (
              <>
                <Slider {...settings} className={styles.sliderContainer}>
                  {sccPhotos.map((img, idx) => (
                    <div key={idx} className={styles.slide}>
                      <button
                        type="button"
                        className={styles.slideButton}
                        onClick={() => setLightboxIndex(idx)}
                        aria-label={`Open photo ${idx + 1} in viewer`}
                      >
                        <img src={img} alt={`Slide ${idx + 1}`} className={styles.slideshowImage} />
                      </button>
                    </div>
                  ))}
                </Slider>
                <Lightbox
                  open={lightboxIndex >= 0}
                  index={lightboxIndex}
                  close={() => setLightboxIndex(-1)}
                  slides={slides}
                  plugins={[Thumbnails, Zoom]}
                  thumbnails={{ position: "bottom" }}
                  on={{ view: ({ index }) => setLightboxIndex(index) }}
                />
              </>
            ) : (
              <div className={styles.noImages}>No photos available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Activities;