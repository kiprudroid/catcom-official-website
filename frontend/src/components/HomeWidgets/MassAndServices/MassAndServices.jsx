import React from "react";
import styles from "./MassAndServices.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { FaClock, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";

const MassAndServices = () => {
  return (
    <section className={styles.massServices}>
      <SectionHeading as="h2">
        <FaCalendarAlt style={{ color: "#2dabb1", marginRight: "0.5rem" }} />
        CATCOM Weekly Schedule: Mass & Activities
      </SectionHeading>

      <div className={styles.servicesGrid}>
        {/* MONDAY - FRIDAY */}
        <div className={styles.card}>
          <SectionHeading as="h3">MONDAY – FRIDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.15am – 7.00am : Daily
              Mass
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> St Augustine Parish,
              Juja
            </Paragraph>
          </div>

          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.00pm – 7.00pm : Rosary
              Prayers
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SCC 008, JKUAT
            </Paragraph>
          </div>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 9.00pm – 10.00pm : Rosary
              Prayers
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> Outside Cafeteria ,
              JKUAT
            </Paragraph>
          </div>
        </div>

        {/* TUESDAY + WEDNESDAY */}
        <div className={styles.card}>
          <SectionHeading as="h3">EVERY TUESDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 7.30pm : Family
              Meetings
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> JKUAT
            </Paragraph>
          </div>

          <SectionHeading as="h3">EVERY WEDNESDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.00pm – 8.00pm :
              Confessions, thereafter Holy Mass
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SPA LH, JKUAT
            </Paragraph>
          </div>
        </div>

        {/* THURSDAY + FRIDAY */}
        <div className={styles.card}>
          <SectionHeading as="h3">EVERY THURSDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 8.00pm : SCC’s
              Meetings
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> JKUAT
            </Paragraph>
          </div>

          <SectionHeading as="h3">EVERY FRIDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 8.00pm : Choir
              Practice
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SPA Building, JKUAT
            </Paragraph>
          </div>
          <SectionHeading as="h3">EVERY SATURDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <Paragraph as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 7:00am – 8.00am : Holy
              Mass, thereafter Confessions
            </Paragraph>
            <Paragraph as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> St Augustine Parish,
              Juja
            </Paragraph>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassAndServices;
