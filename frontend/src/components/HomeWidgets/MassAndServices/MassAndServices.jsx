import React from "react";
import styles from "./MassAndServices.module.css";
import { SectionHeading, SmallText } from "../../Typography/Typography";
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
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.00am – 7.00am : Daily
              Mass
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> St Augustine Parish,
              Juja
            </SmallText>
          </div>

          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 12.45pm – 1.15pm : Rosary
              Prayers
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> Mango Park, JKUAT
            </SmallText>
          </div>

          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.00pm – 7.00pm : Rosary
              Prayers
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SCC 008, JKUAT
            </SmallText>
          </div>
        </div>

        {/* TUESDAY + WEDNESDAY */}
        <div className={styles.card}>
          <SectionHeading as="h3">EVERY TUESDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 7.30pm : Family
              Meetings
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> JKUAT
            </SmallText>
          </div>

          <SectionHeading as="h3">EVERY WEDNESDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.30pm – 8.00pm : Holy
              Mass
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SPA LH, JKUAT
            </SmallText>
          </div>
        </div>

        {/* THURSDAY + FRIDAY */}
        <div className={styles.card}>
          <SectionHeading as="h3">EVERY THURSDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 8.00pm : SCC’s
              Meetings
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> JKUAT
            </SmallText>
          </div>

          <SectionHeading as="h3">EVERY FRIDAY</SectionHeading>
          <div className={styles.serviceItem}>
            <SmallText as="p" className={styles.activity}>
              <FaClock className={styles.iconClock} /> 6.45pm – 8.00pm : Choir
              Practice
            </SmallText>
            <SmallText as="p" className={styles.venue}>
              <FaMapMarkerAlt className={styles.iconMap} /> SPA Building, JKUAT
            </SmallText>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassAndServices;
