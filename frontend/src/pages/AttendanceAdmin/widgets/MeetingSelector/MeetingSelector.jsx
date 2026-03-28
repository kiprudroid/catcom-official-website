import React from "react";
import styles from "./MeetingSelector.module.css";
import { FaCalendarAlt } from "react-icons/fa";

const MeetingSelector = ({ meetingDate, setMeetingDate }) => {
  return (
    <div className={styles.container}>
      <FaCalendarAlt className={styles.icon} />
      <div className={styles.inner}>
        <label className={styles.label}>Meeting Date</label>
        <input
          type="date"
          value={meetingDate}
          onChange={(e) => setMeetingDate(e.target.value)}
          className={styles.input}
        />
      </div>
    </div>
  );
};

export default MeetingSelector;
