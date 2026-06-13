import React, { useState, useEffect } from "react";
import styles from "./LinkCard.module.css";
import { FaTiktok, FaInstagram } from "react-icons/fa";
import MediaDate from "../MediaDate/MediaDate";

const useTikTokThumbnail = (url) => {
  const [thumbnail, setThumbnail] = useState(null);

  useEffect(() => {
    if (!url) return;
    const oEmbedUrl = `https://www.tiktok.com/oembed?url=${encodeURIComponent(url)}`;
    fetch(oEmbedUrl)
      .then((res) => res.json())
      .then((data) => {
        if (data.thumbnail_url) setThumbnail(data.thumbnail_url);
      })
      .catch(() => {});
  }, [url]);

  return thumbnail;
};

const LinkCard = ({ item }) => {
  const isTikTok = item.type === "tiktok";
  const thumbnail = isTikTok ? useTikTokThumbnail(item.url) : null;

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.card}
    >
      <div className={styles.thumbnailWrap}>
        {thumbnail ? (
          <img src={thumbnail} alt={item.title} className={styles.thumbnail} />
        ) : (
          <div className={styles.iconFallback}>
            {isTikTok ? <FaTiktok /> : <FaInstagram />}
          </div>
        )}
      </div>

      <div className={styles.body}>
        <span className={styles.badge} data-type={item.type}>
          {isTikTok ? <FaTiktok /> : <FaInstagram />}
          {isTikTok ? "TikTok" : "Instagram"}
        </span>

        <p className={styles.title}>{item.title}</p>

        {item.description && <p className={styles.desc}>{item.description}</p>}

        <MediaDate date={item.created_at} />

        <span className={styles.hint}>Tap to open ↗</span>
      </div>
    </a>
  );
};

export default LinkCard;
