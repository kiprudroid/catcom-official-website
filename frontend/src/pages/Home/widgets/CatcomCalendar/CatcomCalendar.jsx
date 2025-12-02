import React, { useState } from "react";
import styles from "./CatcomCalendar.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import {
  FaMapMarkerAlt,
  FaChevronDown,
  FaPrayingHands,
  FaChevronUp,
  FaCalendarCheck,
} from "react-icons/fa";

let events = [
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
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Mother Teresa of Calcutta SCC",
    date: "2025-09-14",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Paul SCC",
    date: "2025-09-21",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Therese of The Child Jesus SCC",
    date: "2025-09-28",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Charles Lwanga SCC",
    date: "2025-10-05",
    venue: "St Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Agatha SCC",
    date: "2025-10-12",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Veronica SCC",
    date: "2025-10-19",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Jude Thaddeus SCC",
    date: "2025-10-26",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "CATCOM Executive",
    date: "2025-11-02",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Martine de Porres SCC",
    date: "2025-11-09",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "CATCOM Alumni",
    date: "2025-11-16",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Pastoral, CL & Technical team",
    date: "2025-11-23",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Stephen SCC",
    date: "2025-11-30",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Mary Mother Of God SCC",
    date: "2025-12-07",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Choir & liturgical dancers",
    date: "2025-12-14",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Charbel SCC",
    date: "2025-12-21",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Padre Pio SCC",
    date: "2025-12-28",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Agatha SCC",
    date: "2026-01-04",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "2nd Mass Leaders",
    date: "2026-01-11",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
];

// events = [];

const sortByDate = (arr) =>
  [...arr].sort((a, b) => new Date(a.date) - new Date(b.date));

const filterUpcoming = (arr) => {
  const today = new Date();
  return arr.filter((event) => new Date(event.date) >= today);
};

const formatDate = (dateStr) => {
  const options = { month: "short", day: "numeric" };
  return new Date(dateStr).toLocaleDateString(undefined, options);
};

const CatcomCalendar = () => {
  const activities = sortByDate(
    filterUpcoming(events.filter((e) => e.category === "Activity"))
  );

  const masses = sortByDate(
    filterUpcoming(events.filter((e) => e.category === "Mass Animation"))
  );

  const [showActivities, setShowActivities] = useState(false);
  const [showMasses, setShowMasses] = useState(false);

  return (
    <div className={styles.calendarWrapper}>
      <SectionHeading as="h2" className={styles.title}>
        JKUAT CATCOM <span>Sept – Dec 2025</span> Semester Calendar
      </SectionHeading>

      <div className={styles.subSection}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setShowActivities((prev) => !prev)}
        >
          <h3 className={styles.subTitle}>Upcoming Activities</h3>
          {showActivities ? (
            <FaChevronUp className={styles.chevron} />
          ) : (
            <FaChevronDown className={styles.chevron} />
          )}
        </button>

        {showActivities && (
          <div className={styles.eventGrid}>
            {activities.length === 0 ? (
              <p className={styles.emptyMsg}>
                <FaCalendarCheck className={styles.emptyIcon} />
                <span>All caught up — new activities coming soon 🎉</span>
                <small className={styles.subMsg}>
                  Be sure to check back here or on our website!
                </small>
              </p>
            ) : (
              activities.map((event, index) => (
                <div key={`act-${index}`} className={styles.eventCard}>
                  <div className={styles.dateBadge}>
                    {formatDate(event.date)}
                  </div>
                  <div className={styles.eventDetails}>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <Paragraph className={styles.meta}>
                      <FaMapMarkerAlt className={styles.icon} />{" "}
                      {event.venue || "Venue TBA"}
                    </Paragraph>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.subSection}>
        <button
          className={styles.dropdownHeader}
          onClick={() => setShowMasses((prev) => !prev)}
        >
          <h3 className={styles.subTitle}>Mass Animations Schedule</h3>
          {showMasses ? (
            <FaChevronUp className={styles.chevron} />
          ) : (
            <FaChevronDown className={styles.chevron} />
          )}
        </button>

        {showMasses && (
          <div className={styles.eventGrid}>
            {masses.length === 0 ? (
              <p className={styles.emptyMsg}>
                <FaPrayingHands className={styles.emptyIcon} />
                <span>Mass animations will be announced soon 🙏</span>
                <small className={styles.subMsg}>
                  Be sure to check back here or on our website!
                </small>
              </p>
            ) : (
              masses.map((event, index) => (
                <div key={`mass-${index}`} className={styles.eventCard}>
                  <div className={styles.dateBadge}>
                    {formatDate(event.date)}
                  </div>
                  <div className={styles.eventDetails}>
                    <h4 className={styles.eventTitle}>{event.title}</h4>
                    <Paragraph className={styles.meta}>
                      <FaMapMarkerAlt className={styles.icon} />{" "}
                      {event.venue || "Venue TBA"}
                    </Paragraph>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>

      <div className={styles.contacts}>
        <Paragraph>
          <strong>Wilfred Wandera (Organising Secretary)</strong> – 0715115907
        </Paragraph>
        <Paragraph>
          <strong>Hillary Kasaine (Publicity Secretary)</strong> – 0743382152
        </Paragraph>
      </div>
    </div>
  );
};

export default CatcomCalendar;
