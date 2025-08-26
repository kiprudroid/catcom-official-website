import React from "react";
import styles from "./CatcomExecutiveCard.module.css";
import { Paragraph } from "../Typography/Typography";

function CatcomExecutiveCard({
  name,
  role,
  image = "/leadersImages/manSaint.webp",
}) {
  return (
    <>
      <div className={styles.catcomExecutive}>
        <img className={styles.executiveImage} src={image} alt="" />
        <Paragraph>{name}</Paragraph>
        <Paragraph>{role}</Paragraph>
      </div>
    </>
  );
}

export default CatcomExecutiveCard;
