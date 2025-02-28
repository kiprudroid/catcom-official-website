import React from "react";
import styles from "./communityCard.module.css";

function CommunityCard() {
  return (
    <>
      <div className={styles.communityCard}>
        <h2>title</h2>
        <div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit, adipisci.
          </p>
          <button>see more</button>
        </div>
      </div>
    </>
  );
}

export default CommunityCard;
