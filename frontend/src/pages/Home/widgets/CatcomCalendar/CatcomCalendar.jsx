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
    title: "Finalists Dinner ",
    date: "2026-01-16",
    venue: "Rainbow Ruiru Resort",
    category: "Activity",
  },
  {
    title: "Reunion ",
    date: "2026-02-26",
    venue: "SCC 100",
    category: "Activity",
  },
  {
    title: "Social Day",
    date: "2026-02-28",
    venue: "JKUAT Rugby Pitch",
    category: "Activity",
  },
  {
    title: "CATCOM Talk",
    date: "2026-03-08",
    venue: "SPA/LH",
    category: "Activity",
  },
  {
    title: "Retreat",
    date: "2026-03-14",
    venue: "To Be Determined",
    category: "Activity",
  },
  {
    title: "Tournament Day 1",
    date: "2026-03-20",
    venue: "JKUAT Main Pitch",
    category: "Activity",
  },
  {
    title: "Tournament Day 2",
    date: "2026-03-21",
    venue: "JKUAT Main Pitch",
    category: "Activity",
  },
  {
    title: "Karaoke Night",
    date: "2026-03-26",
    venue: "SCC 100",
    category: "Activity",
  },
  {
    title: "Tournament Finals",
    date: "2026-04-04",
    venue: "JKUAT Main Pitch",
    category: "Activity",
  },
  {
    title: "KMRM Choir Mini Concert",
    date: "2026-04-05",
    venue: "To Be Determined",
    category: "Activity",
  },
  {
    title: "Games Night",
    date: "2026-04-16",
    venue: "NCLB 1st Floor",
    category: "Activity",
  },
  {
    title: "Hike",
    date: "2026-04-25",
    venue: "To Be Determined",
    category: "Activity",
  },
  {
    title: "Surprise Event",
    date: "2026-05-02",
    venue: "To Be Determined",
    category: "Activity",
  },
  {
    title: "Talents Night",
    date: "2026-05-15",
    venue: "Assembly Hall",
    category: "Activity",
  },

  // === Mass Animations ===
  {
    title: "2nd Mass Leaders",
    date: "2026-01-11",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Finalists",
    date: "2026-01-18",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Mother Teresa of Calcutta SCC",
    date: "2026-01-25",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Callistus SCC",
    date: "2026-02-01",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Agatha SCC",
    date: "2026-02-08",
    venue: "St Augustine",
    category: "Mass Animation",
  },
  {
    title: "International Students",
    date: "2026-02-15",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "CATCOMES & Welfare Teams",
    date: "2026-02-22",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "CL, Technical & Pastoral Teams",
    date: "2026-03-01",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Charles Lwanga SCC",
    date: "2026-03-08",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Therese of the Child Jesus SCC",
    date: "2026-03-15",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Paul SCC",
    date: "2026-03-22",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Padre Pio SCC",
    date: "2026-03-29",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Choir & liturgical dancers",
    date: "2026-04-05",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Martin de Porres SCC",
    date: "2026-04-12",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Stephen SCC",
    date: "2026-04-19",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Jude Thaddeus SCC",
    date: "2026-04-26",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "Mary Mother of God SCC",
    date: "2026-05-03",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Veronica SCC",
    date: "2026-05-10",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "The CATCOM Executive",
    date: "2026-05-17",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "St. Charbel SCC",
    date: "2026-05-24",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "2nd Mass Men",
    date: "2026-05-31",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "2nd Mass Ladies",
    date: "2026-06-07",
    venue: "St. Augustine",
    category: "Mass Animation",
  },
  {
    title: "2nd Mass Leaders",
    date: "2026-06-14",
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
        JKUAT CATCOM <span>Jan – June 2026</span> Semester Calendar
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
