import React from "react";
import styles from "./EventTable.module.css";
import { FaSpinner } from "react-icons/fa";

const formatDate = (raw) => {
  if (!raw) return "";
  const d = new Date(raw);
  return isNaN(d)
    ? raw
    : d.toLocaleDateString("en-KE", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
};

const formatTime = (raw) => {
  if (!raw) return "";
  const [h, m] = raw.split(":");
  const d = new Date();
  d.setHours(+h, +m);
  return d.toLocaleTimeString("en-KE", { hour: "2-digit", minute: "2-digit" });
};

const EventTable = ({ events, deletingId, onEdit, onDelete }) => (
  <div className={styles.tableWrap}>
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Category</th>
          <th>Date</th>
          <th>Time</th>
          <th>Venue</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {events.map((event) => (
          <tr key={event.id}>
            <td>{event.title}</td>
            <td>
              <span
                className={`${styles.categoryBadge} ${event.category === "Mass Animation" ? styles.mass : styles.activity}`}
              >
                {event.category}
              </span>
            </td>
            <td>{formatDate(event.event_date)}</td>
            <td>{formatTime(event.event_time)}</td>
            <td>{event.venue}</td>
            <td className={styles.actions}>
              <button className={styles.editBtn} onClick={() => onEdit(event)}>
                Edit
              </button>
              <button
                className={styles.deleteBtn}
                onClick={() => onDelete(event.id)}
                disabled={deletingId === event.id}
              >
                {deletingId === event.id ? (
                  <FaSpinner className={styles.btnSpinner} />
                ) : (
                  "Delete"
                )}
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default EventTable;
