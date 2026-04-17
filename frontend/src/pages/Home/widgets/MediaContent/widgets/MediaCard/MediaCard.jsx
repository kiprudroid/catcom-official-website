import React from "react";
import styles from "./MediaCard.module.css";
import { getImageUrl } from "@/api/media.api";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaBullhorn,
  FaImage,
} from "react-icons/fa";
import MediaDate from "../MediaDate/MediaDate";

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

          {item.description && (
            <p className={styles.cardDesc}>{item.description}</p>
          )}

          <MediaDate date={item.created_at} />
        </div>
      </div>
    );
  }

  if (item.type === "announcement") {
    return (
      <div className={`${styles.card} ${styles.announcementCard}`}>
        <div className={styles.announcementHeader}>
          <FaBullhorn className={styles.announcementIcon} />

          <span className={styles.typeBadge} data-type="announcement">
            Announcement
          </span>
        </div>

        <p className={styles.announcementTitle}>{item.title}</p>

        {item.description && (
          <p className={styles.announcementBody}>{item.description}</p>
        )}

        <MediaDate date={item.created_at} />
      </div>
    );
  }

  if (item.type === "poster") {
    const imageUrl = getImageUrl(item.thumbnail);

    return (
      <div className={`${styles.card} ${styles.posterCard}`}>
        <div className={styles.posterImageWrap}>
          <img src={imageUrl} alt={item.title} className={styles.posterImage} />
        </div>

        <div className={styles.cardBody}>
          <span className={styles.typeBadge} data-type="poster">
            <FaImage /> Poster
          </span>

          <p className={styles.cardTitle}>{item.title}</p>

          {item.description && (
            <p className={styles.cardDesc}>{item.description}</p>
          )}

          <MediaDate date={item.created_at} />
        </div>
      </div>
    );
  }

  const isTikTok = item.type === "tiktok";

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`${styles.card} ${styles.linkCard}`}
    >
      <div className={styles.linkCardIcon}>
        {isTikTok ? <FaTiktok /> : <FaInstagram />}
      </div>

      <div className={styles.cardBody}>
        <span className={styles.typeBadge} data-type={item.type}>
          {isTikTok ? <FaTiktok /> : <FaInstagram />}
          {isTikTok ? "TikTok" : "Instagram"}
        </span>

        <p className={styles.cardTitle}>{item.title}</p>

        {item.description && (
          <p className={styles.cardDesc}>{item.description}</p>
        )}

        <MediaDate date={item.created_at} />

        <span className={styles.linkHint}>Tap to open ↗</span>
      </div>
    </a>
  );
};

export default MediaCard;
