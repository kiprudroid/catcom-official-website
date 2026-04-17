import React from "react";
import styles from "./MediaList.module.css";
import {
  FaYoutube,
  FaTiktok,
  FaInstagram,
  FaBullhorn,
  FaImage,
  FaEye,
  FaEyeSlash,
  FaEdit,
  FaTrash,
} from "react-icons/fa";
import { getImageUrl } from "@/api/media.api";

const typeIcon = {
  youtube: <FaYoutube />,
  tiktok: <FaTiktok />,
  instagram: <FaInstagram />,
  announcement: <FaBullhorn />,
  poster: <FaImage />,
};

const typeColor = {
  youtube: "#dc2626",
  tiktok: "#111",
  instagram: "#e1306c",
  announcement: "#2563eb",
  poster: "#7c3aed",
};

const MediaList = ({ items, onEdit, onDelete, onToggle }) => {
  if (items.length === 0) {
    return <div className={styles.empty}>No items yet. Add one above.</div>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => (
        <div
          key={item.id}
          className={`${styles.row} ${!item.published ? styles.unpublished : ""}`}
        >
          {item.type === "poster" && item.thumbnail ? (
            <img
              src={getImageUrl(item.thumbnail)}
              alt={item.title}
              className={styles.rowThumbnail}
            />
          ) : (
            <div
              className={styles.rowIcon}
              style={{ color: typeColor[item.type] }}
            >
              {typeIcon[item.type]}
            </div>
          )}

          <div className={styles.rowInfo}>
            <span className={styles.rowTitle}>{item.title}</span>
            {item.url && (
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.rowUrl}
              >
                {item.url}
              </a>
            )}
            {item.description && (
              <span className={styles.rowDesc}>
                {item.description.slice(0, 80)}
                {item.description.length > 80 ? "…" : ""}
              </span>
            )}
          </div>

          <div className={styles.rowMeta}>
            <span
              className={`${styles.statusBadge} ${item.published ? styles.pub : styles.draft}`}
            >
              {item.published ? "Published" : "Draft"}
            </span>
            <span className={styles.rowDate}>
              {new Date(item.created_at).toLocaleDateString()}
            </span>
          </div>

          <div className={styles.rowActions}>
            <button
              className={styles.iconBtn}
              title={item.published ? "Unpublish" : "Publish"}
              onClick={() => onToggle(item.id)}
            >
              {item.published ? <FaEyeSlash /> : <FaEye />}
            </button>
            <button
              className={styles.iconBtn}
              title="Edit"
              onClick={() => onEdit(item)}
            >
              <FaEdit />
            </button>
            <button
              className={`${styles.iconBtn} ${styles.danger}`}
              title="Delete"
              onClick={() => onDelete(item.id)}
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MediaList;
