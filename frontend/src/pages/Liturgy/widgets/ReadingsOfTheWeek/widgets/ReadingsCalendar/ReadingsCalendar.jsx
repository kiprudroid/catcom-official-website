import React, { useState } from "react";
import styles from "./ReadingsCalendar.module.css";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ReadingsCalendar = ({ selectedDate, onSelect, onFetch }) => {
  const today = new Date();
  const [viewYear, setViewYear] = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11);
      setViewYear((y) => y - 1);
    } else setViewMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0);
      setViewYear((y) => y + 1);
    } else setViewMonth((m) => m + 1);
  };

  const formatDate = (day) => {
    const mm = String(viewMonth + 1).padStart(2, "0");
    const dd = String(day).padStart(2, "0");
    return `${viewYear}-${mm}-${dd}`;
  };

  const isTodayDay = (day) =>
    today.getFullYear() === viewYear &&
    today.getMonth() === viewMonth &&
    today.getDate() === day;

  const isSelected = (day) => selectedDate === formatDate(day);

  const cells = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(d);

  return (
    <div className={styles.calendar}>
      <div className={styles.calHeader}>
        <button className={styles.navBtn} onClick={prevMonth} type="button">
          <FaChevronLeft size={12} color="#1c3a3a" />
        </button>
        <span className={styles.monthLabel}>
          {MONTHS[viewMonth]} {viewYear}
        </span>
        <button className={styles.navBtn} onClick={nextMonth} type="button">
          <FaChevronRight size={12} color="#1c3a3a" />
        </button>
      </div>

      <div className={styles.dayNames}>
        {DAYS.map((d) => (
          <span key={d} className={styles.dayName}>
            {d}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {cells.map((day, i) => (
          <button
            key={i}
            type="button"
            className={[
              styles.cell,
              !day ? styles.empty : "",
              day && isTodayDay(day) ? styles.today : "",
              day && isSelected(day) ? styles.selected : "",
            ].join(" ")}
            onClick={() => day && onSelect(formatDate(day))}
            disabled={!day}
          >
            {day || ""}
          </button>
        ))}
      </div>

      <button className={styles.fetchBtn} onClick={onFetch} type="button">
        Fetch Readings
      </button>
    </div>
  );
};

export default ReadingsCalendar;
