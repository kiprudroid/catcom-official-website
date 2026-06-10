import React, { useState, useEffect } from "react";
import { FaCalendarCheck, FaPrayingHands, FaCalendarAlt } from "react-icons/fa";
import { EventSection, ContactsBar } from "./widgets";
import { fetchEvents } from "@/api/events.api";
import styles from "./CatcomCalendar.module.css";
import { SectionHeading } from "@/components/Typography/Typography";

const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.event_date) - new Date(b.event_date));

const filterUpcoming = (arr) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return arr.filter((e) => new Date(e.event_date) >= today);
};

const deriveDateRange = (events) => {
  if (!events.length) return null;
  const dates = events.map((e) => new Date(e.event_date)).filter(Boolean);
  const min = new Date(Math.min(...dates));
  const max = new Date(Math.max(...dates));
  const fmt = (d) =>
    d.toLocaleDateString("en-GB", { month: "long", year: "numeric" });
  return min.getMonth() === max.getMonth() &&
    min.getFullYear() === max.getFullYear()
    ? fmt(min)
    : `${fmt(min)} – ${fmt(max)}`;
};

const CatcomCalendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEvents()
      .then(setEvents)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className={styles.stateMsg}>Loading events…</p>;
  if (error) return <p className={styles.stateError}>Error: {error}</p>;

  const upcoming = filterUpcoming(events);
  const activities = sortByDate(
    upcoming.filter((e) => e.category === "Activity"),
  );
  const masses = sortByDate(
    upcoming.filter((e) => e.category === "Mass Animation"),
  );

  const dateRange = deriveDateRange(upcoming);

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <FaCalendarAlt className={styles.headingIcon} />
        <SectionHeading as="h2" className={styles.eyebrow}>
          UPCOMING CATCOM EVENTS &amp; MASS ANIMATION CALENDAR
        </SectionHeading>
      </div>
      {dateRange && <p className={styles.dateRange}>{dateRange}</p>}

      <div className={styles.sections}>
        <EventSection
          title="Upcoming Activities"
          events={activities}
          accentVariant="gold"
          borderAccent="teal"
          searchPlaceholder="Search by title or venue…"
          emptyIcon={FaCalendarCheck}
          emptyMsg="All caught up — new activities coming soon 🎉"
        />
        <EventSection
          title="Mass Animations Schedule"
          events={masses}
          accentVariant="navy"
          borderAccent="navy"
          searchPlaceholder="Search by SCC name…"
          emptyIcon={FaPrayingHands}
          emptyMsg="Mass animations will be announced soon 🙏"
          fallbackVenue="St. Augustine Parish"
          fallbackTime="9:00 AM"
        />
      </div>

      <ContactsBar />
    </div>
  );
};

export default CatcomCalendar;
