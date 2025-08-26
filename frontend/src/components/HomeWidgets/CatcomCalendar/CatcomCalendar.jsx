import React from "react";
import styles from "./CatcomCalendar.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { FaMapMarkerAlt } from "react-icons/fa";

const events = [
  // === Activities ===
  {
    title: "Reunion & 1st Year Orientation",
    date: "2025-09-07",
    venue: "SPA/LH",
    category: "Activity",
  },
  {
    title: "Social Day",
    date: "2025-09-13",
    venue: "JKUAT Rugby Pitch",
    category: "Activity",
  },
  {
    title: "CATCOM Talk",
    date: "2025-09-28",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Retreat/Pilgrimage",
    date: "2025-10-10",
    venue: "TBD",
    category: "Activity",
  },
  {
    title: "Mega Harambee",
    date: "2025-10-19",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Tournaments",
    date: "2025-10-04",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Tournament Finals",
    date: "2025-10-20",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Karaoke Night",
    date: "2025-10-30",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Finalists Dinner",
    date: "2025-11-14",
    venue: "TBD",
    category: "Activity",
  },
  {
    title: "Alumni Reunion",
    date: "2025-11-16",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Games Night",
    date: "2025-11-20",
    venue: "JKUAT",
    category: "Activity",
  },
  {
    title: "Christmas Carols",
    date: "2025-11-30",
    venue: "JKUAT",
    category: "Activity",
  },

  // === Mass Animations ===
  {
    title: "2nd Mass Leaders",
    date: "2025-09-07",
    venue: "Main Chapel",
    category: "Mass Animation",
  },
  {
    title: "St. Mother Teresa of Calcutta SCC",
    date: "2025-09-14",
    venue: "Main Chapel",
    category: "Mass Animation",
  },
  {
    title: "St. Paul SCC",
    date: "2025-09-21",
    venue: "Main Chapel",
    category: "Mass Animation",
  },
  {
    title: "St. Therese of Child Jesus SCC",
    date: "2025-09-28",
    venue: "Main Chapel",
    category: "Mass Animation",
  },
  {
    title: "Choir & Liturgical Dancers",
    date: "2025-12-14",
    venue: "Main Chapel",
    category: "Mass Animation",
  },
];

// Sorting helper
const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.date) - new Date(b.date));

const formatDate = (dateStr) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const CatcomCalendar = () => {
  const activities = sortByDate(
    events.filter((e) => e.category === "Activity")
  );
  const masses = sortByDate(
    events.filter((e) => e.category === "Mass Animation")
  );

  return (
    <div className={styles.calendarWrapper}>
      <SectionHeading as="h2" className={styles.title}>
        JKUAT CATCOM <span>Sept – Dec 2025</span> Semester Calendar
      </SectionHeading>

      {/* Activities Section */}
      <div className={styles.subSection}>
        <h3 className={styles.subTitle}>Activities</h3>
        <div className={styles.eventGrid}>
          {activities.map((event, index) => (
            <div key={`act-${index}`} className={styles.eventCard}>
              <div className={styles.dateBadge}>{formatDate(event.date)}</div>
              <div className={styles.eventDetails}>
                <h4 className={styles.eventTitle}>{event.title}</h4>
                <Paragraph className={styles.meta}>
                  <FaMapMarkerAlt className={styles.icon} />{" "}
                  {event.venue || "Venue TBA"}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mass Animation Section */}
      <div className={styles.subSection}>
        <h3 className={styles.subTitle}>Mass Animations</h3>
        <div className={styles.eventGrid}>
          {masses.map((event, index) => (
            <div key={`mass-${index}`} className={styles.eventCard}>
              <div className={styles.dateBadge}>{formatDate(event.date)}</div>
              <div className={styles.eventDetails}>
                <h4 className={styles.eventTitle}>{event.title}</h4>
                <Paragraph className={styles.meta}>
                  <FaMapMarkerAlt className={styles.icon} />{" "}
                  {event.venue || "Venue TBA"}
                </Paragraph>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contacts */}
      <div className={styles.contacts}>
        <Paragraph>
          <strong>Stephen Mutwiwa Mutie (Moderator)</strong> – 0798715858
        </Paragraph>
        <Paragraph>
          <strong>Sophie Kathambi (V. Moderator)</strong> – 0797872432
        </Paragraph>
        <Paragraph>
          <strong>Alvin Muthoni (OS)</strong> – 0793661637
        </Paragraph>
      </div>
    </div>
  );
};

export default CatcomCalendar;
