import React, { useState } from "react";
import { FaChevronDown, FaSearch } from "react-icons/fa";
import EmptyState from "@/pages/Home/widgets/CatcomCalendar/widgets/EmptyState";
import EventCard from "@/pages/Home/widgets/CatcomCalendar/widgets/EventCard";
import styles from "./EventSection.module.css";

const EventSection = ({
  title,
  events,
  accentVariant,
  searchPlaceholder,
  emptyIcon,
  emptyMsg,
  fallbackVenue,
  fallbackTime,
  borderAccent = "teal",
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = events.filter((e) =>
    `${e.title} ${e.venue}`.toLowerCase().includes(search.toLowerCase()),
  );

  const noResults = filtered.length === 0 && search.trim() !== "";
  const isEmpty = events.length === 0;

  return (
    <div className={`${styles.section} ${styles[`border_${borderAccent}`]}`}>
      <button
        className={styles.header}
        onClick={() => setOpen((p) => !p)}
        aria-expanded={open}
      >
        <span className={styles.title}>{title}</span>
        <FaChevronDown
          className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <div className={styles.body}>
          <label className={styles.searchWrapper}>
            <FaSearch className={styles.searchIcon} aria-hidden="true" />
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </label>

          <div className={styles.list}>
            {isEmpty ? (
              <EmptyState icon={emptyIcon} message={emptyMsg} />
            ) : noResults ? (
              <EmptyState
                icon={emptyIcon}
                message="No results found"
                sub="Try another search term"
              />
            ) : (
              filtered.map((event) => (
                <EventCard
                  key={event.id}
                  event={event}
                  accentVariant={accentVariant}
                  fallbackVenue={fallbackVenue}
                  fallbackTime={fallbackTime}
                />
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EventSection;
