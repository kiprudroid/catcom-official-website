import React, { useState, useEffect } from "react";
import styles from "./CatcomCalendar.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaPrayingHands,
  FaChevronUp,
  FaCalendarCheck,
  FaSearch,
  FaClock,
} from "react-icons/fa";

import { fetchEvents } from "@/api/events.api";

/* ── helpers ── */
const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

const filterUpcoming = (arr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return arr.filter((e) => new Date(e.event_date) >= today);
};

/**
 * Full date: "10 May 2026"
 */
const formatFullDate = (dateStr) => {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

/**
 * Short badge date: "10 May"
 */
const formatBadgeDate = (dateStr) => {
  if (!dateStr) return "TBA";
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
};

/**
 * Format time string from backend (HH:MM:SS or HH:MM) → "9:00 AM"
 */
const formatTime = (timeStr) => {
  if (!timeStr) return null;
  // Handle "HH:MM:SS" or "HH:MM"
  const [hStr, mStr] = timeStr.split(":");
  const h = parseInt(hStr, 10);
  const m = parseInt(mStr, 10);
  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 === 0 ? 12 : h % 12;
  const mm = String(m).padStart(2, "0");
  return `${h12}:${mm} ${ampm}`;
};

/* ── Component ── */
const CatcomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showActivities, setShowActivities] = useState(false);
  const [showMasses, setShowMasses] = useState(false);

  const [searchActivities, setSearchActivities] = useState("");
  const [searchMasses, setSearchMasses] = useState("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const data = await fetchEvents();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadEvents();
  }, []);

  const activities = sortByDate(
    filterUpcoming(events.filter((e) => e.category === "Activity")),
  );

  const masses = sortByDate(
    filterUpcoming(events.filter((e) => e.category === "Mass Animation")),
  );

  const filteredActivities = activities.filter((event) =>
    `${event.title} ${event.venue}`
      .toLowerCase()
      .includes(searchActivities.toLowerCase()),
  );

  const filteredMasses = masses.filter((event) =>
    `${event.title} ${event.venue}`
      .toLowerCase()
      .includes(searchMasses.toLowerCase()),
  );

  if (loading)
    return (
      <p style={{ color: "#fff", textAlign: "center" }}>Loading events…</p>
    );
  if (error)
    return <p style={{ color: "#f66", textAlign: "center" }}>Error: {error}</p>;

  return (
    <div className={styles.calendarWrapper}>
      {/* ── Title ── */}
      <SectionHeading as="h2" className={styles.title}>
        JKUAT CATCOM Calendar
      </SectionHeading>
      <span className={styles.titleSub}>January – June 2026</span>

      {/* ══════════════ ACTIVITIES ══════════════ */}
      <div className={styles.subSection}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setShowActivities((prev) => !prev)}
          aria-expanded={showActivities}
        >
          <h3 className={styles.subTitle}>Upcoming Activities</h3>
          {showActivities ? (
            <FaChevronUp className={styles.chevron} />
          ) : (
            <FaChevronDown className={styles.chevron} />
          )}
        </button>

        {showActivities && (
          <div className={styles.sectionBody}>
            {/* Search */}
            <label className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search activity by title or venue…"
                value={searchActivities}
                onChange={(e) => setSearchActivities(e.target.value)}
                className={styles.searchInput}
                aria-label="Search activities"
              />
            </label>

            {/* Cards */}
            <div className={styles.eventGrid}>
              {activities.length === 0 ? (
                <div className={styles.emptyMsg}>
                  <FaCalendarCheck className={styles.emptyIcon} />
                  <span>All caught up — new activities coming soon 🎉</span>
                  <small className={styles.subMsg}>
                    Check back here or on our website!
                  </small>
                </div>
              ) : filteredActivities.length === 0 &&
                searchActivities.trim() !== "" ? (
                <div className={styles.emptyMsg}>
                  <FaCalendarCheck className={styles.emptyIcon} />
                  <span>No matching activities found</span>
                  <small className={styles.subMsg}>
                    Try another search term
                  </small>
                </div>
              ) : (
                filteredActivities.map((event) => {
                  const time = formatTime(event.event_time);
                  return (
                    <div key={event.id} className={styles.eventCard}>
                      {/* Date badge */}
                      <div className={styles.dateBadge}>
                        {formatBadgeDate(event.event_date)}
                      </div>

                      <div className={styles.eventDetails}>
                        <h4 className={styles.eventTitle}>{event.title}</h4>

                        {/* Full date */}
                        <Paragraph className={styles.meta}>
                          <FaCalendarCheck className={styles.icon} />
                          {formatFullDate(event.event_date)}
                        </Paragraph>

                        {/* Time — from backend if available */}
                        {time && (
                          <Paragraph className={styles.timeMeta}>
                            <FaClock className={styles.icon} />
                            {time}
                          </Paragraph>
                        )}

                        {/* Venue */}
                        <Paragraph className={styles.meta}>
                          <FaMapMarkerAlt className={styles.icon} />
                          {event.venue || "Venue TBA"}
                        </Paragraph>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}
      </div>

      {/* ══════════════ MASS ANIMATIONS ══════════════ */}
      <div className={styles.subSection}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setShowMasses((prev) => !prev)}
          aria-expanded={showMasses}
        >
          <h3 className={styles.subTitle}>Mass Animations Schedule</h3>
          {showMasses ? (
            <FaChevronUp className={styles.chevron} />
          ) : (
            <FaChevronDown className={styles.chevron} />
          )}
        </button>

        {showMasses && (
          <div className={styles.sectionBody}>
            {/* Search */}
            <label className={styles.searchWrapper}>
              <FaSearch className={styles.searchIcon} aria-hidden="true" />
              <input
                type="text"
                placeholder="Search mass animation by typing your SCC name…"
                value={searchMasses}
                onChange={(e) => setSearchMasses(e.target.value)}
                className={styles.searchInput}
                aria-label="Search mass animations"
              />
            </label>

            {/* Cards */}
            <div className={styles.eventGrid}>
              {masses.length === 0 ? (
                <div className={styles.emptyMsg}>
                  <FaPrayingHands className={styles.emptyIcon} />
                  <span>Mass animations will be announced soon 🙏</span>
                  <small className={styles.subMsg}>
                    Check back here or on our website!
                  </small>
                </div>
              ) : filteredMasses.length === 0 && searchMasses.trim() !== "" ? (
                <div className={styles.emptyMsg}>
                  <FaPrayingHands className={styles.emptyIcon} />
                  <span>No matching mass animations</span>
                  <small className={styles.subMsg}>
                    Try searching by SCC name
                  </small>
                </div>
              ) : (
                filteredMasses.map((event) => (
                  <div key={event.id} className={styles.eventCard}>
                    {/* Date badge */}
                    <div className={styles.dateBadge}>
                      {formatBadgeDate(event.event_date)}
                    </div>

                    <div className={styles.eventDetails}>
                      <h4 className={styles.eventTitle}>{event.title}</h4>

                      {/* Full date */}
                      <Paragraph className={styles.meta}>
                        <FaCalendarCheck className={styles.icon} />
                        {formatFullDate(event.event_date)}
                      </Paragraph>

                      {/* Mass time is always 9:00 AM — use backend if provided, else fallback */}
                      <Paragraph className={styles.timeMeta}>
                        <FaClock className={styles.icon} />
                        {formatTime(event.event_time) ?? "9:00 AM"}
                      </Paragraph>

                      {/* Venue — default to St. Augustine for masses */}
                      <Paragraph className={styles.meta}>
                        <FaMapMarkerAlt className={styles.icon} />
                        {event.venue || "St. Augustine Parish"}
                      </Paragraph>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Contacts ── */}
      <div className={styles.contacts}>
        <Paragraph>
          <strong>Wilfred Wandera</strong> (Organising Secretary) — 0715 115 907
        </Paragraph>
        <Paragraph>
          <strong>Hillary Kasaine</strong> (Publicity Secretary) — 0743 382 152
        </Paragraph>
      </div>
    </div>
  );
};

export default CatcomCalendar;
