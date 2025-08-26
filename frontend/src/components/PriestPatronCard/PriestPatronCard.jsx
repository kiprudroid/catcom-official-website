import React from "react";
import styles from "./PriestPatronCard.module.css";
import { Paragraph } from "../Typography/Typography";

function PriestPatronCard({ name, role, image }) {
  return (
    <>
      <div className={styles.priestsPatrons}>
        <img className={styles.priestPatronImage} src={image} alt="" />
        <Paragraph>{name}</Paragraph>
        <Paragraph>{role}</Paragraph>
      </div>
    </>
  );
}

export default PriestPatronCard;
