import React, { useState } from "react";
import styles from "./RosaryPrayers.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { FaPlus, FaMinus, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const mysteries = [
  {
    title: "Joyful Mysteries",
    days: "Monday and Saturday",
    image: "/litugy-images/rosary.jpg",
    items: [
      {
        title: "1. The Annunciation of the Lord to Mary",
        detail: "Mary is chosen to be the mother of Jesus",
      },
      {
        title: "2. The Visitation of Mary to Elizabeth",
        detail: "Elizabeth recognizes Mary as the mother of our Lord.",
      },
      {
        title: "3. The Nativity of our Lord Jesus Christ",
        detail: "Jesus is born and laid in a manger.",
      },
      {
        title: "4. The Presentation of our Lord",
        detail: "Jesus is presented in the Temple of Jerusalem.",
      },
      {
        title: "5. Finding Jesus in the Temple at age 12",
        detail: "Jesus is found discussing God’s laws in the temple.",
      },
    ],
  },
  {
    title: "Sorrowful Mysteries",
    days: "Tuesday and Friday",
    image: "/litugy-images/rosary.jpg",

    items: [
      {
        title: "1. The Agony in the Garden",
        detail: "Jesus prays in Gethsemane on the night before His death.",
      },
      {
        title: "2. The Scourging at the Pillar",
        detail: "Christ is scourged by the soldiers at Pilate’s command.",
      },
      {
        title: "3. The Crowning with Thorns",
        detail:
          "Soldiers weave a crown of thorns and shove it into Christ’s head.",
      },
      {
        title: "4. The Carrying of the Cross",
        detail:
          "Jesus struggles up Calvary with His own cross on His shoulders.",
      },
      {
        title: "5. The Crucifixion",
        detail: "Jesus is nailed to the cross and dies.",
      },
    ],
  },
  {
    title: "Luminous Mysteries",
    days: "Thursday",
    image: "/litugy-images/rosary.jpg",

    items: [
      {
        title: "1. The Baptism of the Lord",
        detail: "Jesus is baptized by John in the Jordan River.",
      },
      {
        title: "2. The Wedding Feast at Cana",
        detail: "Christ changes water into wine at Mary’s request.",
      },
      {
        title: "3. The Proclamation of the Kingdom",
        detail: "Jesus announces the coming of the Kingdom and forgives sins.",
      },
      {
        title: "4. The Transfiguration",
        detail: "Jesus is transfigured, dazzling white, on Mount Tabor.",
      },
      {
        title: "5. The Institution of the Eucharist",
        detail:
          "At the Last Supper, Christ changes bread and wine into His Body and Blood.",
      },
    ],
  },
  {
    title: "Glorious Mysteries",
    days: "Sunday and Wednesday",
    image: "/litugy-images/rosary.jpg",

    items: [
      {
        title: "1. The Resurrection",
        detail:
          "Jesus rises from the dead on the third day after His Crucifixion.",
      },
      {
        title: "2. The Ascension",
        detail: "Forty days after rising, Christ ascends into Heaven.",
      },
      {
        title: "3. The Descent of the Holy Spirit",
        detail: "The Holy Spirit comes upon Mary and the Apostles.",
      },
      {
        title: "4. The Assumption",
        detail:
          "At the end of her life, Mary is taken body and soul into Heaven.",
      },
      {
        title: "5. The Coronation",
        detail: "Mary is crowned Queen of Heaven and Earth.",
      },
    ],
  },
];

function RosaryPrayers() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentMystery, setCurrentMystery] = useState({ section: 0, item: 0 });

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  const goNext = () => {
    const { section, item } = currentMystery;
    const currentSection = mysteries[section];

    if (item < currentSection.items.length - 1) {
      setCurrentMystery({ section, item: item + 1 });
    } else if (section < mysteries.length - 1) {
      setCurrentMystery({ section: section + 1, item: 0 });
      setOpenIndex(section + 1); // auto open next section
    }
  };

  const goPrev = () => {
    const { section, item } = currentMystery;

    if (item > 0) {
      setCurrentMystery({ section, item: item - 1 });
    } else if (section > 0) {
      const prevSection = mysteries[section - 1];
      setCurrentMystery({
        section: section - 1,
        item: prevSection.items.length - 1,
      });
      setOpenIndex(section - 1); // auto open previous section
    }
  };

  return (
    <div className={styles.container}>
      <SectionHeading as="h2" className={styles.title}>
        Holy Rosary Prayers
      </SectionHeading>

      {/* Tracker Controls */}
      <div className={styles.tracker}>
        <button onClick={goPrev} className={styles.navBtn}>
          <FaChevronLeft /> Previous
        </button>
        <div className={styles.current}>
          <Paragraph>
            {mysteries[currentMystery.section].title} –{" "}
            {mysteries[currentMystery.section].items[currentMystery.item].title}
          </Paragraph>
        </div>
        <button onClick={goNext} className={styles.navBtn}>
          Next <FaChevronRight />
        </button>
      </div>

      <div className={styles.grid}>
        {mysteries.map((section, idx) => (
          <div key={idx} className={styles.card}>
            <div className={styles.imageWrapper} onClick={() => toggle(idx)}>
              <img
                src={section.image}
                alt={section.title}
                className={styles.image}
              />
              <div className={styles.overlay}>
                <SectionHeading className={styles.cardTitle}>
                  {section.title}
                </SectionHeading>
                <Paragraph className={styles.cardDays}>
                  {section.days}
                </Paragraph>
                {openIndex === idx ? <FaMinus /> : <FaPlus />}
              </div>
            </div>

            {openIndex === idx && (
              <ul className={styles.list}>
                {section.items.map((mystery, i) => (
                  <li
                    key={i}
                    className={`${styles.mystery} ${
                      currentMystery.section === idx &&
                      currentMystery.item === i
                        ? styles.activeMystery
                        : ""
                    }`}
                  >
                    <Paragraph>
                      <span className={styles.mysteryTitle}>
                        {mystery.title}
                      </span>
                      <br />
                      <span className={styles.detail}>{mystery.detail}</span>
                    </Paragraph>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RosaryPrayers;
