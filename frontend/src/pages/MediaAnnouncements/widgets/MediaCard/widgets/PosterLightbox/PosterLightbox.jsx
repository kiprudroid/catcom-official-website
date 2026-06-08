import React from "react";
import { FaTimes, FaImage } from "react-icons/fa";
import { getImageUrl } from "@/api/media.api";
import styles from "./PosterLightbox.module.css";
import { RichBody } from "@/pages/MediaAnnouncements/widgets/MediaCard/widgets";
import MediaDate from "@/pages/MediaAnnouncements/widgets/MediaDate/MediaDate";

const PosterLightbox = ({ item, onClose }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.box} onClick={(e) => e.stopPropagation()}>
      <button className={styles.close} onClick={onClose} type="button">
        <FaTimes />
      </button>
      <img
        src={getImageUrl(item.thumbnail)}
        alt={item.title}
        className={styles.image}
      />
      {(item.title || item.description) && (
        <div className={styles.body}>
          <div className={styles.meta}>
            <FaImage className={styles.metaIcon} />
            <span className={styles.metaLabel}>Poster</span>
          </div>
          {item.title && <p className={styles.title}>{item.title}</p>}
          <RichBody html={item.description} className={styles.desc} />
          <MediaDate date={item.created_at} />
        </div>
      )}
    </div>
  </div>
);

export default PosterLightbox;
