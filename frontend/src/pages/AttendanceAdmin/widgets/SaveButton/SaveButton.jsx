import React from "react";
import styles from "./SaveButton.module.css";
import { FaSave } from "react-icons/fa";

const SaveButton = ({ onClick, loading }) => (
  <button className={styles.btn} onClick={onClick} disabled={loading}>
    {loading ? <span className={styles.spinner} /> : <FaSave />}
    {loading ? "Saving…" : "Save Attendance"}
  </button>
);

export default SaveButton;
