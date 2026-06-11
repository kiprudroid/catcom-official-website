import React, { useState } from "react";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarCheck,
  FaChevronDown,
} from "react-icons/fa";
import styles from "./EventCard.module.css";

const formatDay = (dateStr) => {
  if (!dateStr) return "--";
  return new Date(dateStr).getDate();
};

const formatMonthYear = (dateStr) => {
  if (!dateStr) return { month: "", year: "" };
  const d = new Date(dateStr);
  return {
    month: d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase(),
    year: d.getFullYear(),
  };
};

const formatFullDate = (dateStr) => {
  if (!dateStr) return "TBA";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const formatTime = (timeStr) => {
  if (!timeStr) return null;
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${h12}:${String(m).padStart(2, "0")} ${ampm}`;
};

const EventCard = ({
  event,
  accentVariant = "gold",
  fallbackVenue,
  fallbackTime,
}) => {
  const [open, setOpen] = useState(false);
  const time = formatTime(event.event_time) ?? fallbackTime ?? null;
  const { month, year } = formatMonthYear(event.event_date);
  const venue = event.venue || fallbackVenue || "Venue TBA";

  return (
    <div
      className={`${styles.card} ${styles[`accent_${accentVariant}`]} ${open ? styles.cardOpen : ""}`}
    >
      <button
        className={styles.cardHeader}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <div className={styles.dateCol}>
          <span className={styles.dateDay}>{formatDay(event.event_date)}</span>
          <span className={styles.dateMonth}>{month}</span>
          <span className={styles.dateYear}>{year}</span>
        </div>

        <div className={styles.cardMeta}>
          <p className={styles.cardTitle}>{event.title}</p>
          <div className={styles.tags}>
            {time && (
              <span className={styles.tag}>
                <FaClock className={styles.tagIcon} />
                {time}
              </span>
            )}
            <span className={styles.tag}>
              <FaMapMarkerAlt className={styles.tagIconMap} />
              {venue}
            </span>
          </div>
        </div>

        <FaChevronDown
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className={styles.cardBody}>
          <div className={styles.activityRow}>
            <p className={styles.fullDate}>
              <FaCalendarCheck className={styles.bodyIcon} />
              {formatFullDate(event.event_date)}
            </p>
            {time && (
              <p className={styles.bodyRow}>
                <FaClock className={styles.bodyIconClock} />
                {time}
              </p>
            )}
            <p className={styles.bodyRow}>
              <FaMapMarkerAlt className={styles.bodyIcon} />
              {venue}
            </p>
            {event.description && (
              <p className={styles.description}>{event.description}</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventCard;
