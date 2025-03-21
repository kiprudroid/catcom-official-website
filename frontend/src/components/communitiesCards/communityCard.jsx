import React from "react";
import styles from "./communityCard.module.css";
import { Heading, SmallText } from "../Typography/Typography";

function CommunityCard() {
  return (
    <>
      <div className={styles.communityCard}>
        <Heading>SCC</Heading>
        <div>
          <SmallText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, adipisci.
          </SmallText>
          <button>
            <SmallText>see more</SmallText>
          </button>
        </div>
      </div>
    </>
  );
}

export default CommunityCard;
