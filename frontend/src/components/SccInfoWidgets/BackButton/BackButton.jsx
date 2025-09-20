import React from "react";
import { Link } from "react-router-dom";
import styles from "./BackButton.module.css";
import { Paragraph } from "../../../components/Typography/Typography";

const BackButton = () => {
  return (
    <div className={styles.backButtonContainer}>
      <Link to="/scc" className={styles.backButton}>
        <Paragraph>Back to SCC</Paragraph>
      </Link>
    </div>
  );
};

export default BackButton;
