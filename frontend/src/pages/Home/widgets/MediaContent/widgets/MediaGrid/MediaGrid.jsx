import React from "react";
import styles from "./MediaGrid.module.css";
import MediaCard from "../MediaCard/MediaCard";

const MediaGrid = ({ items }) => {
  return (
    <div className={styles.gridScrollArea}>
      <div className={styles.grid}>
        {items.map((item) => (
          <MediaCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MediaGrid;
