import React from "react";
import styles from "./PriestPatronCard.module.css";
import { SmallText } from "../Typography/Typography";

function PriestPatronCard({
  name,
  role,
  image = "/chaplain/fatherLawrence.jpg",
}) {
  return (
    <>
      <div className={styles.priestsPatrons}>
        <img className={styles.priestPatronImage} src={image} alt="" />
        <SmallText>{name}</SmallText>
        <SmallText>{role}</SmallText>
      </div>
    </>
  );
}

export default PriestPatronCard;
