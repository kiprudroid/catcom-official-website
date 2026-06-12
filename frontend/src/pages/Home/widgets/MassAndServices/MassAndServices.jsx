import React, { useState } from "react";
import styles from "./MassAndServices.module.css";
import { SectionHeading } from "@/components/Typography/Typography";
import {
  FaClock,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaChevronDown,
} from "react-icons/fa";

const SCHEDULE = [
  {
    id: "mon-fri",
    day: "Mon",
    dayRange: "— Fri",
    label: "Daily",
    borderClass: "teal",
    title: "Daily mass & rosary prayers",
    tags: ["Daily", "3 activities"],
    activities: [
      {
        time: "6:15 AM – 7:00 AM",
        name: "Daily Mass",
        venue: "St Augustine Parish, Juja",
      },
      {
        time: "6:00 PM – 7:00 PM",
        name: "Rosary Prayers",
        venue: "SCC 008, JKUAT",
      },
      {
        time: "9:00 PM – 10:00 PM",
        name: "Rosary Prayers",
        venue: "Outside Cafeteria, JKUAT",
      },
    ],
  },
  {
    id: "tue",
    day: "Tue",
    dayRange: "Every",
    label: "Weekly",
    borderClass: "gold",
    title: "Family meetings",
    tags: ["Weekly", "6:45 PM"],
    activities: [
      { time: "6:45 PM – 7:30 PM", name: "Family Meetings", venue: "JKUAT" },
    ],
  },
  {
    id: "wed",
    day: "Wed",
    dayRange: "Every",
    label: "Weekly",
    borderClass: "teal",
    title: "Confessions & holy mass",
    tags: ["Weekly", "6:00 PM"],
    activities: [
      {
        time: "6:00 PM – 8:00 PM",
        name: "Confessions, thereafter Holy Mass",
        venue: "SPA LH, JKUAT",
      },
    ],
  },
  {
    id: "thu",
    day: "Thu",
    dayRange: "Every",
    label: "Weekly",
    borderClass: "navy",
    title: "SCC meetings",
    tags: ["Weekly", "6:45 PM"],
    activities: [
      { time: "6:45 PM – 8:00 PM", name: "SCC's Meetings", venue: "JKUAT" },
    ],
  },
  {
    id: "fri",
    day: "Fri",
    dayRange: "Every",
    label: "Weekly",
    borderClass: "gold",
    title: "Choir practice",
    tags: ["Weekly", "6:45 PM"],
    activities: [
      {
        time: "6:45 PM – 8:00 PM",
        name: "Choir Practice",
        venue: "SPA Building, JKUAT",
      },
    ],
  },
  {
    id: "sat",
    day: "Sat",
    dayRange: "Every",
    label: "Weekly",
    borderClass: "teal",
    title: "Holy mass & confessions",
    tags: ["Weekly", "7:00 AM"],
    activities: [
      {
        time: "7:00 AM – 8:00 AM",
        name: "Holy Mass, thereafter Confessions",
        venue: "St Augustine Parish, Juja",
      },
    ],
  },
];

const MassAndServices = () => {
  const [openId, setOpenId] = useState(null);

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section className={styles.massServices}>
      <SectionHeading as="h2" className={styles.heading}>
        <FaCalendarAlt className={styles.headingIcon} />
        CATCOM WEEKLY SCHEDULE: MASS &amp; ACTIVITIES
      </SectionHeading>

      <div className={styles.list}>
        {SCHEDULE.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`${styles.card} ${styles[`border_${item.borderClass}`]}`}
            >
              {/* ── Header (clickable) ── */}
              <button
                className={styles.cardHeader}
                onClick={() => toggle(item.id)}
                aria-expanded={isOpen}
                aria-controls={`body-${item.id}`}
              >
                <div className={styles.dayBadge}>
                  <span className={styles.dayNum}>{item.day}</span>
                  <span className={styles.dayRange}>{item.dayRange}</span>
                </div>

                <div className={styles.cardMeta}>
                  <p className={styles.cardTitle}>{item.title}</p>
                  <div className={styles.tags}>
                    {item.tags.map((t) => (
                      <span key={t} className={styles.tag}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <FaChevronDown
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`}
                  aria-hidden="true"
                />
              </button>

              {/* ── Body (accordion) ── */}
              {isOpen && (
                <div id={`body-${item.id}`} className={styles.cardBody}>
                  {item.activities.map((act, i) => (
                    <div key={i} className={styles.activityRow}>
                      <p className={styles.actTime}>
                        <FaClock className={styles.iconClock} />
                        {act.time} &nbsp;·&nbsp; {act.name}
                      </p>
                      <p className={styles.actVenue}>
                        <FaMapMarkerAlt className={styles.iconMap} />
                        {act.venue}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default MassAndServices;
