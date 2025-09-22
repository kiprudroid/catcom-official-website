import React from "react";
import { NavLink } from "react-router-dom";
import { FaChurch, FaArrowLeft } from "react-icons/fa";
import styles from "./NotFound.module.css";
import {
  SectionHeading,
  Paragraph,
} from "../../components/Typography/Typography";

const NotFound = () => {
  return (
    <div className={styles.container}>
      <div className={styles.contentBox}>
        <FaChurch className={styles.icon} />
        <SectionHeading className={styles.title}>404</SectionHeading>
        <Paragraph className={styles.subtitle}>Oops! Page not found</Paragraph>
        <Paragraph className={styles.description}>
          It seems you’ve wandered off the path. Let’s guide you back to the
          home page.
        </Paragraph>
        <NavLink to="/" className={styles.backButton}>
          <FaArrowLeft className={styles.backIcon} /> Back to Home
        </NavLink>
      </div>
    </div>
  );
};

export default NotFound;
