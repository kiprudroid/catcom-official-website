import React from "react";
import styles from "./SccPictures.module.css";
import { SectionHeading } from "../../Typography/Typography";
import Card from "../Card/Card.jsx";
import { sccCards } from "../../../data/scc.js";

const SccPictures = ({ className }) => {
  return (
    <div className={`${styles.sccPictures} ${className}`}>
      <SectionHeading fontSize="1.8rem" className={styles.centeredText}>
        Our SCCs
      </SectionHeading>

      <div className={styles.sccCardsWrapper}>
        {sccCards.map((card, index) => (
          <Card
            key={index}
            SccName={card.name}
            path={card.path}
            images={card.images}
          />
        ))}
      </div>
    </div>
  );
};

export default SccPictures;
