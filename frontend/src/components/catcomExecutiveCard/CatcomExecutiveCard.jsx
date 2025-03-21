import React from "react";
import styles from "./CatcomExecutiveCard.module.css";
import { SmallText } from "../Typography/Typography";

function CatcomExecutiveCard({
  name,
  role,
  image = "/leadersImages/wandera.jpg",
}) {
  return (
    <>
      <div className={styles.catcomExecutive}>
        <img
          className={styles.executiveImage}
          src="/leadersImages/mutwiwa.jpg"
          alt=""
        />
        <SmallText>{name}</SmallText>
        <SmallText>{role}</SmallText>
      </div>
    </>
  );
}

export default CatcomExecutiveCard;
