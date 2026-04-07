import React, { useState, useEffect } from "react";
import styles from "./ReadingsOfTheWeek.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaPlus } from "react-icons/fa";
import { fetchReadings } from "@/api/readings.api";

const ReadingOfTheWeek = () => {
  const [warning, setWarning] = useState(null);
  const [reading, setReading] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expandedIndex, setExpandedIndex] = useState(null);

  //fetchReadings
  useEffect(() => {
    const loadReadings = async () => {
      setLoading(true);
      setError("");

      try {
        const data = await fetchReadings();
        setReading(data);
      } catch (err) {
        console.error("Error fetching Readings:", err);
        setError(err?.message || "Error fetching Readings");
      } finally {
        setLoading(false);
      }
    };

    loadReadings();
  }, []);

  console.log(reading);
  const sections = Array.isArray(reading?.sections) ? reading.sections : [];

  const showWarning = (msg) => {
    setWarning(msg);
    setTimeout(() => setWarning(null), 3500);
  };

  return (
    <div className={styles.readingBox}>
      <SectionHeading as="h2">Readings of the Day</SectionHeading>
      {reading?.title && <SectionHeading>{reading.title}</SectionHeading>}

      <div className={styles.grid}>
        {sections.map((section, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img
                src="/litugy-images/Bible.jpg"
                alt={section.header}
                className={styles.image}
              />
              <div className={styles.overlay}></div>
              <div
                className={styles.cardHeader}
                onClick={() =>
                  setExpandedIndex((current) => (current === idx ? null : idx))
                }
              >
                <Paragraph className={styles.cardTitle}>
                  <strong>{section.header}</strong>
                </Paragraph>
                {Array.isArray(section.readings) &&
                  section.readings[0]?.verses?.[0]?.text && (
                    <Paragraph>{section.readings[0].verses[0].text}</Paragraph>
                  )}
                <FaPlus />
              </div>
            </div>
            {expandedIndex === idx && (
              <div className={styles.cardContent}>
                <SectionHeading>
                  <strong>{section.header}</strong>
                </SectionHeading>
                {Array.isArray(section.readings) &&
                  section.readings.map((item, itemIdx) => (
                    <div key={itemIdx}>
                      <Paragraph>{item.text}</Paragraph>
                      {Array.isArray(item.verses) &&
                        item.verses.map((verse, verseIdx) => (
                          <Paragraph key={verseIdx}>{verse.text}</Paragraph>
                        ))}
                    </div>
                  ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <button
        className={styles.button}
        onClick={() => showWarning("🚧This feature under development")}
      >
        <Paragraph>Full Sermon</Paragraph>
      </button>
    </div>
  );
};

export default ReadingOfTheWeek;
