import React from "react";
import { FaTimes, FaBullhorn } from "react-icons/fa";
import styles from "./AnnouncementLightbox.module.css";
import { RichBody } from "@/pages/MediaAnnouncements/widgets/MediaCard/widgets";
import MediaDate from "@/pages/MediaAnnouncements/widgets/MediaDate/MediaDate";

const AnnouncementLightbox = ({ item, onClose }) => (
  <div className={styles.overlay} onClick={onClose}>
    <div className={styles.box} onClick={(e) => e.stopPropagation()}>
      <button className={styles.close} onClick={onClose} type="button">
        <FaTimes />
      </button>
      <div className={styles.banner}>
        <FaBullhorn className={styles.bannerIcon} />
      </div>
      <div className={styles.body}>
        <div className={styles.meta}>
          <FaBullhorn className={styles.metaIcon} />
          <span className={styles.metaLabel}>Announcement</span>
        </div>
        {item.title && <p className={styles.title}>{item.title}</p>}
        <RichBody html={item.description} className={styles.desc} />
        <MediaDate date={item.created_at} />
      </div>
    </div>
  </div>
);

export default AnnouncementLightbox;
