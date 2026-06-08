import React from "react";
import styles from "./MediaGrid.module.css";
import MediaCard from "@/pages/MediaAnnouncements/widgets/MediaCard/MediaCard";

const MediaGrid = ({ items }) => {
  return (
    <div className={styles.grid}>
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default MediaGrid;
