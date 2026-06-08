import React from "react";
import styles from "./RichBody.module.css";

const RichBody = ({ html, className }) => {
  if (!html) return null;
  return (
    <div
      className={`${styles.richBody} ${className ?? ""}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

export default RichBody;
