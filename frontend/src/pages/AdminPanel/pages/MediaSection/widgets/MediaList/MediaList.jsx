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
  FaSpinner,
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

/** Strip HTML tags for plain-text preview */
const stripHtml = (html) => {
  if (!html) return "";
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
};

const MediaList = ({
  items,
  onEdit,
  onDelete,
  onToggle,
  deletingId = null, // id currently being deleted
  togglingId = null, // id currently being toggled
}) => {
  if (items.length === 0) {
    return <div className={styles.empty}>No items yet. Add one above.</div>;
  }

  return (
    <div className={styles.list}>
      {items.map((item) => {
        const plainDesc = stripHtml(item.description);
        const isDeleting = deletingId === item.id;
        const isToggling = togglingId === item.id;
        const isBusy = isDeleting || isToggling;

        return (
          <div
            key={item.id}
            className={`${styles.row} ${!item.published ? styles.unpublished : ""} ${isBusy ? styles.busy : ""}`}
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
              {plainDesc && (
                <span className={styles.rowDesc}>
                  {plainDesc.slice(0, 80)}
                  {plainDesc.length > 80 ? "…" : ""}
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
              {/* Toggle publish */}
              <button
                className={styles.iconBtn}
                title={item.published ? "Unpublish" : "Publish"}
                onClick={() => onToggle(item.id)}
                disabled={isBusy}
              >
                {isToggling ? (
                  <FaSpinner className={styles.spinIcon} />
                ) : item.published ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}
              </button>

              {/* Edit */}
              <button
                className={styles.iconBtn}
                title="Edit"
                onClick={() => onEdit(item)}
                disabled={isBusy}
              >
                <FaEdit />
              </button>

              {/* Delete */}
              <button
                className={`${styles.iconBtn} ${styles.danger}`}
                title="Delete"
                onClick={() => onDelete(item.id)}
                disabled={isBusy}
              >
                {isDeleting ? (
                  <FaSpinner className={styles.spinIcon} />
                ) : (
                  <FaTrash />
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MediaList;
