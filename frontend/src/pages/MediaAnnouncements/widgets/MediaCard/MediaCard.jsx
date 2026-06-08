import React from "react";
import styles from "./MediaCard.module.css";
import { getImageUrl } from "@/api/media.api";
import { FaYoutube, FaBullhorn, FaImage } from "react-icons/fa";
import MediaDate from "../MediaDate/MediaDate";
import LinkCard from "../LinkCard/LinkCard";

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

const RichBody = ({ html, className }) => {
  if (!html) return null;
  return (
    <div
      className={`${styles.richBody} ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

const MediaCard = ({ item }) => {
  /* ── YouTube ── */
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

  /* ── Announcement — styled teal banner instead of blank space ── */
  if (item.type === "announcement") {
    return (
      <div className={`${styles.card} ${styles.announcementCard}`}>
        {/* Banner replaces the empty thumbnail area */}
        <div className={styles.announcementBanner}>
          <FaBullhorn className={styles.announcementBannerIcon} />
        </div>

        <div className={styles.announcementBody}>
          <div className={styles.announcementHeader}>
            <span className={styles.typeBadge} data-type="announcement">
              <FaBullhorn /> Announcement
            </span>
          </div>
          <p className={styles.announcementTitle}>{item.title}</p>
          <RichBody
            html={item.description}
            className={styles.announcementText}
          />
          <MediaDate date={item.created_at} />
        </div>
      </div>
    );
  }

  /* ── Poster — fixed-height image so it doesn't stretch the row ── */
  if (item.type === "poster") {
    return (
      <div className={`${styles.card} ${styles.posterCard}`}>
        <div className={styles.posterImageWrap}>
          <img
            src={getImageUrl(item.thumbnail)}
            alt={item.title}
            className={styles.posterImage}
          />
        </div>
        <div className={styles.cardBody}>
          <span className={styles.typeBadge} data-type="poster">
            <FaImage /> Poster
          </span>
          <p className={styles.cardTitle}>{item.title}</p>
          <RichBody html={item.description} className={styles.cardDesc} />
          <MediaDate date={item.created_at} />
        </div>
      </div>
    );
  }

  /* ── TikTok / Instagram ── */
  return <LinkCard item={item} />;
};

export default MediaCard;
