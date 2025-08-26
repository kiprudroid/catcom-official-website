import React, { useState } from "react";
import styles from "./Prayers.module.css";
import { SectionHeading, SmallText } from "../../Typography/Typography";
import { FaPlus, FaMinus } from "react-icons/fa";

function Prayers() {
  const prayers = [
    {
      title: "Our Father",
      content: `Our Father, who art in heaven, hallowed be thy name;
      thy kingdom come; thy will be done on earth as it is in heaven.
      Give us this day our daily bread; and forgive us our trespasses,
      as we forgive those who trespass against us;
      and lead us not into temptation, but deliver us from evil. Amen.`,
    },
    {
      title: "Hail Mary",
      content: `Hail Mary, full of grace, the Lord is with thee;
      blessed art thou among women, and blessed is the fruit of thy womb, Jesus.
      Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen.`,
    },
    {
      title: "I believe in God",
      content: `I believe in God, the Father almighty, creator of heaven and earth,
      and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit,
      born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died, and was buried.
      He descended into hell; on the third day He rose again from the dead;
      He ascended into heaven, and is seated at the right hand of God the Father almighty;
      from there He will come to judge the living and the dead.
      I believe in the Holy Spirit, the holy catholic Church,
      the communion of saints, the forgiveness of sins,
      the resurrection of the body, and life everlasting. Amen.`,
    },
    {
      title: "Apostle Creed",
      content: `I believe in God, the Father Almighty, Creator of heaven and earth,
      and in Jesus Christ, His only Son, our Lord,
      who was conceived by the Holy Spirit, born of the Virgin Mary,
      suffered under Pontius Pilate, was crucified, died and was buried;
      He descended into hell; on the third day He rose again from the dead;
      He ascended into heaven, and is seated at the right hand of God the Father almighty;
      from there He will come to judge the living and the dead.
      I believe in the Holy Spirit, the holy catholic Church,
      the communion of saints, the forgiveness of sins,
      the resurrection of the body, and life everlasting. Amen.`,
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const togglePrayer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.container}>
      <SectionHeading as="h2" className={styles.title}>
        Common Prayers
      </SectionHeading>
      {prayers.map((prayer, index) => (
        <div
          key={index}
          className={styles.card}
          onClick={() => togglePrayer(index)}
        >
          <div className={styles.header}>
            <SectionHeading className={styles.cardTitle}>
              {prayer.title}
            </SectionHeading>
            <span className={styles.icon}>
              {openIndex === index ? (
                <FaMinus size={15} />
              ) : (
                <FaPlus size={15} />
              )}
            </span>
          </div>
          <SmallText
            className={`${styles.content} ${
              openIndex === index ? styles.show : ""
            }`}
          >
            {prayer.content}
          </SmallText>
        </div>
      ))}
    </div>
  );
}

export default Prayers;
