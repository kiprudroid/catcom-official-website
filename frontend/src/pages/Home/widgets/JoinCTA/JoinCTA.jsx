import React from "react";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import styles from "./JoinCTA.module.css";

const joinCardsData = [
  {
    id: "small-christian-communities",
    title: "Join a Small Christian Community",
    description:
      "SCCs are the basic units of the Church — small groups of Catholic students who meet regularly to pray together, read and reflect on Scripture, share their lives, and support one another in living the faith on campus.",
    buttonText: "Join SCC",
    buttonLink: "/scc#join-form",
  },
  {
    id: "liturgical-sub-groups",
    title: "Join a Group",
    description:
      "Our various groups bring together students with different gifts, passions, and callings — all working together to strengthen our mission and deepen our fellowship.",
    buttonText: "Join a Group",
    buttonLink: "/groups#join-form",
  }
];

const JoinCTA = () => {
  return (
    <div className={styles.joinCtaContainer}>
      {joinCardsData.map((card) => (
        <div key={card.id} className={styles.card}>
          <SectionHeading className={styles.cardTitle}>
            {card.title}
          </SectionHeading>
          <Paragraph className={styles.textContent}>
            {card.description}
          </Paragraph>
          <a href={card.buttonLink} className={styles.actionButton}>
            {card.buttonText}
          </a>
        </div>
      ))}
    </div>
  );
};

export default JoinCTA;
