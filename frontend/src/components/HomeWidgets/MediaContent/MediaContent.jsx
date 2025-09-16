import React from "react";
import styles from "./MediaContent.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { FaYoutube } from "react-icons/fa";

const mediaItems = [
  {
    type: "video",
    url: "https://youtu.be/2POCPrNa-do?si=WSkbsUQKdVhXE_PM",
    title: "KMRM Choir – Nyimbo za Ibada (Live)",
  },
  {
    type: "video",
    url: "https://youtu.be/ze9bEKCiNKk?si=GVR843V_N9BpZTgb",
    title: "CATCOM Choir – Marian Celebration",
  },
  {
    type: "video",
    url: "https://youtu.be/lOEYdC2KSHc?si=7tFJtvaOh3X0PNiY",
    title: "Youth Choir – Praise & Worship Highlights",
  },
  {
    type: "video",
    url: "https://youtu.be/d9PpupEHHwA?si=YV3SBS_j_500VMiI",
    title: "CATCOM Liturgical Dancers Performance",
  },
];

const MediaContent = () => {
  const toEmbedUrl = (url) => {
    if (url.includes("youtu.be")) {
      const videoId = url.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes("watch?v=")) {
      const videoId = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className={styles.card}>
      <SectionHeading as="h3" className={styles.cardTitle}>
        Media Content
      </SectionHeading>

      <div className={styles.mediaWrapper}>
        {mediaItems.map((item, index) => (
          <div key={index} className={styles.videoCard}>
            <div className={styles.videoWrapper}>
              <iframe
                src={toEmbedUrl(item.url)}
                title={item.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
            <Paragraph className={styles.videoTitle}>
              <FaYoutube className={styles.youtubeIcon} /> {item.title}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MediaContent;
