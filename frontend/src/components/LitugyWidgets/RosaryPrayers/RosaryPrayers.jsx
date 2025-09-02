import React, { useState } from "react";
import styles from "./RosaryPrayers.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import {
  FaPlus,
  FaMinus,
  FaChevronLeft,
  FaChevronRight,
  FaCross,
} from "react-icons/fa";

const openingPrayers = [
  {
    title: "Invocation",
    text: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen.",
  },
  {
    title: "Penitential Rite",
    text: `Leader: Brethren, to prepare ourselves to meditate on the Holy Rosary, let us acknowledge our failures and ask the Lord for pardon and strength.
    
All: I confess to Almighty God and to you, my brothers and sisters... through my fault, through my fault, through my most grievous fault... Therefore I ask Blessed Mary ever Virgin, all the Angels and Saints, and you, my brothers and sisters, to pray for me to the Lord our God.`,
  },
];

const mysteries = [
  {
    title: "Joyful Mysteries",
    days: "Monday and Saturday",
    image: "/litugy-images/rosary.jpg",
    items: [
      {
        title: "1. The Annunciation",
        detail: "Mary is chosen to be the mother of Jesus.",
      },
      {
        title: "2. The Visitation",
        detail: "Elizabeth recognizes Mary as the mother of our Lord.",
      },
      {
        title: "3. The Nativity",
        detail: "Jesus is born and laid in a manger.",
      },
      {
        title: "4. The Presentation",
        detail: "Jesus is presented in the Temple of Jerusalem.",
      },
      {
        title: "5. Finding in the Temple",
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
        detail: "Jesus prays in Gethsemane before His Passion.",
      },
      {
        title: "2. The Scourging at the Pillar",
        detail: "Jesus is scourged by soldiers.",
      },
      {
        title: "3. The Crowning with Thorns",
        detail: "Jesus is mocked and crowned with thorns.",
      },
      {
        title: "4. The Carrying of the Cross",
        detail: "Jesus carries the cross to Calvary.",
      },
      {
        title: "5. The Crucifixion",
        detail: "Jesus dies on the cross for our salvation.",
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
        detail: "Christ changes water into wine.",
      },
      {
        title: "3. The Proclamation of the Kingdom",
        detail: "Jesus preaches the Good News and forgives sins.",
      },
      {
        title: "4. The Transfiguration",
        detail: "Jesus is transfigured on Mount Tabor.",
      },
      {
        title: "5. The Institution of the Eucharist",
        detail: "At the Last Supper, Christ gives His Body and Blood.",
      },
    ],
  },
  {
    title: "Glorious Mysteries",
    days: "Sunday and Wednesday",
    image: "/litugy-images/rosary.jpg",
    items: [
      { title: "1. The Resurrection", detail: "Jesus rises from the dead." },
      { title: "2. The Ascension", detail: "Jesus ascends into Heaven." },
      {
        title: "3. The Descent of the Holy Spirit",
        detail: "The Spirit descends on the Apostles.",
      },
      {
        title: "4. The Assumption",
        detail: "Mary is assumed body and soul into Heaven.",
      },
      {
        title: "5. The Coronation",
        detail: "Mary is crowned Queen of Heaven and Earth.",
      },
    ],
  },
];

const litany = [
  "Lord have mercy, Lord have mercy.",
  "Christ have mercy, Christ have mercy.",
  "Lord have mercy, Lord have mercy.",
  "Christ hear us, Christ graciously hear us.",
  "God, the Father of heaven, have mercy on us.",
  "God, the Son, Redeemer of the world, have mercy on us.",
  "God, the Holy Spirit, have mercy on us.",
  "Holy Trinity, one God, have mercy on us.",
  "Holy Mary, pray for us.",
  "Holy Mother of God, pray for us.",
  "Holy Virgin of Virgins, pray for us.",
  "Mother of Christ, pray for us.",
  "Mother of the Church, pray for us.",
  "Mother of Divine Grace, pray for us.",
  "Mother of Hope, pray for us.",
  "Mother most pure, pray for us.",
  "Mother most chaste, pray for us.",
  "Mother inviolate, pray for us.",
  "Mother undefiled, pray for us.",
  "Mother most amiable, pray for us.",
  "Mother admirable, pray for us.",
  "Mother of good counsel, pray for us.",
  "Mother of our Creator, pray for us.",
  "Mother of our Savior, pray for us.",
  "Mother of Mercy, pray for us.",
  "Virgin most prudent, pray for us.",
  "Virgin most venerable, pray for us.",
  "Virgin most renowned, pray for us.",
  "Virgin most powerful, pray for us.",
  "Virgin most merciful, pray for us.",
  "Virgin most faithful, pray for us.",
  "Mirror of justice, pray for us.",
  "Seat of wisdom, pray for us.",
  "Cause of our joy, pray for us.",
  "Spiritual vessel, pray for us.",
  "Vessel of honour, pray for us.",
  "Singular vessel of devotion, pray for us.",
  "Mystical rose, pray for us.",
  "Tower of David, pray for us.",
  "Tower of ivory, pray for us.",
  "House of gold, pray for us.",
  "Ark of the covenant, pray for us.",
  "Gate of heaven, pray for us.",
  "Morning star, pray for us.",
  "Health of the sick, pray for us.",
  "Refuge of sinners, pray for us.",
  "Solace of migrants, pray for us.",
  "Comfort of the afflicted, pray for us.",
  "Help of Christians, pray for us.",
  "Queen of angels, pray for us.",
  "Queen of patriarchs, pray for us.",
  "Queen of prophets, pray for us.",
  "Queen of Apostles, pray for us.",
  "Queen of martyrs, pray for us.",
  "Queen of confessors, pray for us.",
  "Queen of virgins, pray for us.",
  "Queen of all saints, pray for us.",
  "Queen conceived without original sin, pray for us.",
  "Queen assumed into heaven, pray for us.",
  "Queen of the most holy rosary, pray for us.",
  "Queen of families, pray for us.",
  "Queen of peace, pray for us.",
  "Lamb of God, who takes away the sins of the world, spare us O Lord.",
  "Lamb of God, who takes away the sins of the world, graciously hear us O Lord.",
  "Lamb of God, who takes away the sins of the world, have mercy on us.",
  "Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ.",
  "Let us pray. Grant that we your servants Lord, may enjoy unfailing health of mind and body, and through the prayers and intercession of Blessed Virgin Mary, in her glory, free us from the sorrows in this world and give us eternal happiness in the next, through Christ our Lord. Amen.",
];

const additionalPrayers = [
  "The Memorare – Remember, O most gracious Virgin Mary, that never was it known that anyone who fled to your protection, implored your help, or sought your intercession was left unaided...",
  "Glory be to the Father and to the Son and to the Holy Spirit… (x3).",
  "Sacred Heart of Jesus, have mercy on us (x3).",
  "Immaculate Heart of Mary, pray for us.",
  "Chaste heart of St. Joseph, pray for us.",
  "St. Augustine our Parish Saint, pray for us.",
  "St. Therese of the Child Jesus, pray for us.",
  "St. Jude Thaddeus, pray for us.",
  "St. Veronica, pray for us.",
  "St. Paul, pray for us.",
  "St. Martin De Porres, pray for us.",
  "St. Mary’s, pray for us.",
  "St. Stephen, pray for us.",
  "St. Charles Lwanga, pray for us.",
  "St. Agatha, pray for us.",
  "St. Andrew, pray for us.",
  "St. Josemaria Escriva, pray for us.",
  "St. Padre Pio, pray for us.",
  "And all you Holy Angels and Saints in Heaven, pray for us.",
  "Prayer for the Beatification of the Servant of God Maurice Michael Cardinal Otunga – O God, you granted your servant Maurice Michael Cardinal Otunga the grace to be an exemplary pastor at the service of the church...",
  "For the intentions of the Holy Father – Our Father… Hail Mary…",
  "For the intercession of the Church against the scourges of the Devil – St. Michael the Archangel, defend us in battle...",
];

function RosaryPrayers() {
  const [openIndex, setOpenIndex] = useState(null);
  const [currentMystery, setCurrentMystery] = useState({ section: 0, item: 0 });

  const [showLitany, setShowLitany] = useState(false);
  const [showAdditional, setShowAdditional] = useState(false);

  const toggle = (idx) => setOpenIndex(openIndex === idx ? null : idx);

  const goNext = () => {
    const { section, item } = currentMystery;
    const currentSection = mysteries[section];

    if (item < currentSection.items.length - 1) {
      setCurrentMystery({ section, item: item + 1 });
    } else if (section < mysteries.length - 1) {
      setCurrentMystery({ section: section + 1, item: 0 });
      setOpenIndex(section + 1);
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
      setOpenIndex(section - 1);
    }
  };

  return (
    <div className={styles.container}>
      <SectionHeading as="h2" className={styles.title}>
        Holy Rosary
      </SectionHeading>

      {/* Opening Prayers */}
      <div className={styles.opening}>
        <FaCross className={styles.crossIcon} />
        {openingPrayers.map((prayer, i) => (
          <div key={i} className={styles.prayerBlock}>
            <SectionHeading as="h3">{prayer.title}</SectionHeading>
            <Paragraph>{prayer.text}</Paragraph>
          </div>
        ))}
      </div>

      {/* Tracker */}
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

      {/* Mysteries */}
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

      {/* Litany */}
      <div className={styles.section}>
        <button
          className={styles.toggleButton}
          onClick={() => setShowLitany(!showLitany)}
        >
          <SectionHeading as="span" className={styles.toggleText}>
            {showLitany ? "−" : "+"} The Litany of Our Lady
          </SectionHeading>
        </button>
        {showLitany && (
          <div className={styles.gridList}>
            {litany.map((line, i) => (
              <Paragraph key={i} className={styles.litany}>
                {line}
              </Paragraph>
            ))}
          </div>
        )}
      </div>

      {/* Additional Prayers */}
      <div className={styles.section}>
        <button
          className={styles.toggleButton}
          onClick={() => setShowAdditional(!showAdditional)}
        >
          <SectionHeading as="span" className={styles.toggleText}>
            {showAdditional ? "−" : "+"} Additional Prayers
          </SectionHeading>
        </button>
        {showAdditional && (
          <div className={styles.gridList}>
            {additionalPrayers.map((line, i) => (
              <Paragraph key={i} className={styles.additional}>
                {line}
              </Paragraph>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default RosaryPrayers;
