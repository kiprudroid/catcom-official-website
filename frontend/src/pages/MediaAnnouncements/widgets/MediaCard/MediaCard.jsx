import React, { useState } from "react";
import styles from "./MediaCard.module.css";
import { getImageUrl } from "@/api/media.api";
import { FaYoutube, FaBullhorn, FaImage } from "react-icons/fa";
import MediaDate from "../MediaDate/MediaDate";
import LinkCard from "../LinkCard/LinkCard";
import { RichBody, PosterLightbox, AnnouncementLightbox } from "./widgets";

const toEmbedUrl = (url) => {
  if (!url) return null;
  if (url.includes("youtu.be")) {
    const id = url.split("youtu.be/")[1].split("?")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  if (url.includes("watch?v=")) {
    const id = url.split("watch?v=")[1].split("&")[0];
    return `https://www.youtube.com/embed/${id}`;
  }
  return url;
};

const MediaCard = ({ item }) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);

  if (item.type === "youtube") {
    return (
      <div className={styles.card}>
        <div className={styles.videoWrapper}>
          <iframe
            src={toEmbedUrl(item.url)}
            title={item.title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.typeBadge} data-type="youtube">
            <FaYoutube /> YouTube
          </span>
          <p className={styles.cardTitle}>{item.title}</p>
          <RichBody html={item.description} className={styles.cardDesc} />
          <MediaDate date={item.created_at} />
        </div>
      </div>
    );
  }

  if (item.type === "announcement") {
    return (
      <>
        <div
          className={`${styles.card} ${styles.announcementCard}`}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        >
          <div className={styles.announcementBanner}>
            <FaBullhorn className={styles.announcementBannerIcon} />
          </div>
          <div className={styles.announcementBody}>
            <span className={styles.typeBadge} data-type="announcement">
              <FaBullhorn /> Announcement
            </span>
            <p className={styles.announcementTitle}>{item.title}</p>
            <RichBody
              html={item.description}
              className={styles.announcementText}
            />
            <MediaDate date={item.created_at} />
            <span className={styles.tapHint}>Tap to read more ↗</span>
          </div>
        </div>
        {lightboxOpen && (
          <AnnouncementLightbox
            item={item}
            onClose={() => setLightboxOpen(false)}
          />
        )}
      </>
    );
  }

  if (item.type === "poster") {
    return (
      <>
        <div
          className={`${styles.card} ${styles.posterCard}`}
          onClick={() => setLightboxOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && setLightboxOpen(true)}
        >
          <div className={styles.posterImageWrap}>
            <img
              src={getImageUrl(item.thumbnail)}
              alt={item.title}
              className={styles.posterImage}
            />
            <div className={styles.posterHoverOverlay}>
              <FaImage className={styles.posterHoverIcon} />
              <span>View Poster</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.typeBadge} data-type="poster">
              <FaImage /> Poster
            </span>
            <p className={styles.cardTitle}>{item.title}</p>
            <RichBody html={item.description} className={styles.cardDesc} />
            <MediaDate date={item.created_at} />
            <span className={styles.tapHint}>Tap to view poster ↗</span>
          </div>
        </div>
        {lightboxOpen && (
          <PosterLightbox item={item} onClose={() => setLightboxOpen(false)} />
        )}
      </>
    );
  }

  return <LinkCard item={item} />;
};

export default MediaCard;
