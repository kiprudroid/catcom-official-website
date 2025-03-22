import React from "react";
import styles from "./communityCard.module.css";
import { Heading, SmallText } from "../Typography/Typography";

function CommunityCard({ title, content }) {
  return (
    <>
      <div className={styles.communityCard}>
        <Heading>{title}</Heading>
        <div>
          <SmallText>{content}</SmallText>
          <button>
            <SmallText>see more about {title}</SmallText>
          </button>
        </div>
      </div>
    </>
  );
}

export default CommunityCard;
