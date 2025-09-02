import React, { useState } from "react";
import styles from "./Prayers.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";
import { FaPlus, FaMinus } from "react-icons/fa";

function Prayers() {
  const prayers = [
    {
      title: "Our Father",
      content: `Our Father, Who art in heaven, hallowed be Thy name;
Thy kingdom come; Thy will be done on earth as it is in heaven.
Give us this day our daily bread; and forgive us our trespasses,
as we forgive those who trespass against us;
and lead us not into temptation, but deliver us from evil. Amen.`,
    },
    {
      title: "Hail Mary",
      content: `Hail Mary, full of grace. The Lord is with thee.
Blessed art thou amongst women,
and blessed is the fruit of thy womb, Jesus.
Holy Mary, Mother of God, pray for us sinners,
now and at the hour of our death. Amen.`,
    },
    {
      title: "Glory Be",
      content: `Glory be to the Father, and to the Son, and to the Holy Spirit,
as it was in the beginning, is now, and ever shall be,
world without end. Amen.`,
    },
    {
      title: "The Apostle's Creed",
      content: `I believe in God, the Father Almighty, Creator of Heaven and earth;
and in Jesus Christ, His only Son, Our Lord,
Who was conceived by the Holy Spirit, born of the Virgin Mary,
suffered under Pontius Pilate, was crucified, died, and was buried.
He descended into Hell. The third day He arose again from the dead;
He ascended into Heaven, sitteth at the right hand of God the Father Almighty;
from thence He shall come to judge the living and the dead.
I believe in the Holy Spirit, the holy Catholic Church,
the communion of saints, the forgiveness of sins,
the resurrection of the body, and the life everlasting. Amen.`,
    },
    {
      title: "Hail Holy Queen",
      content: `Hail, Holy Queen, Mother of mercy, our life, our sweetness and our hope.
To thee do we cry, poor banished children of Eve;
to thee do we send up our sighs, mourning and weeping in this valley of tears.
Turn then, most gracious Advocate, thine eyes of mercy toward us,
and after this our exile, show unto us the blessed fruit of thy womb, Jesus.
O clement, O loving, O sweet Virgin Mary! Amen.`,
    },
    {
      title: "Anima Christi",
      content: `Soul of Christ, make me holy
Body of Christ, be my salvation
Blood of Christ, let me drink your wine
Water flowing from the side of Christ, wash me clean
Passion of Christ, strengthen me
Kind Jesus, hear my prayer
Hide me within your wounds
And keep me close to you
Defend me from the evil enemy
And call me at the hour of my death
To the fellowship of your saints
That I might sing your praise with them for all eternity. Amen.`,
    },
    {
      title: "Memorare",
      content: `Remember, O most gracious Virgin Mary, that never was it known
that any one who fled to thy protection, implored thy help
or sought thy intercession, was left unaided.
Inspired by this confidence, we fly unto thee, O Virgin of virgins my Mother;
to thee do we come, before thee we stand, sinful and sorrowful;
O Mother of the Word Incarnate, despise not our petitions,
but in thy mercy hear and answer them. Amen.`,
    },
    {
      title: "The Angelus",
      content: `V- The Angel of the Lord declared unto Mary.
R- And she conceived by the Holy Spirit. (Hail Mary...)
V- Behold the handmaid of the Lord.
R- Be it done unto me according to thy word. (Hail Mary...)
V- And the Word was made Flesh.
R- And dwelt among us. (Hail Mary...)
V- Pray for us, O Holy Mother of God.
R- That we may be made worthy of the promises of Christ.

LET US PRAY:
Pour forth, we beseech Thee, O Lord, Thy grace into our hearts;
that, we to whom the Incarnation of Christ, Thy Son,
was made known by the message of an Angel,
may by His Passion and Cross, be brought to the glory of His Resurrection
through the same Christ our Lord. Amen.`,
    },
    {
      title: "Saint Michael Prayer",
      content: `Saint Michael, the Archangel, defend us in battle.
Be our protection against the wickedness and snares of the devil.
May God rebuke him, we humbly pray;
and do thou, O Prince of the heavenly host, by the power of God
cast into hell Satan and all the evil spirits
who prowl throughout the world seeking the ruin of souls. Amen.`,
    },
    {
      title: "Act of Contrition",
      content: `O my God, I am heartfully sorry for having offended thee,
and I detest all my sins because of Thy just punishment,
but most of all because I have offended Thee, my God,
Who is all good and deserving of all my love.
I firmly resolve, with the help of Thy grace, to sin no more,
and to avoid the near occasion of sin. Amen.`,
    },
    {
      title: "Miraculous Medal Prayer",
      content: `O Mary, conceived without sin, pray for us who have recourse to thee,
and for those who do not have recourse to thee,
especially the enemies of the Church and those recommended to thee. Amen.`,
    },
    {
      title: "Morning Offering",
      content: `Dear Lord, I do not know what will happen to me today.
I only know that nothing will happen that was not foreseen by You,
and directed to my greater good from all eternity.
I adore Your holy and unfathomable plans,
and submit to them with all my heart for love of You,
the Pope, and the Immaculate Heart of Mary. Amen.`,
    },
    {
      title: "Guardian Angel Prayer",
      content: `Angel of God, my Guardian dear, to whom God's love commits me here,
ever this day (or night) be at my side, to light and guard, to rule and guide. Amen.`,
    },
    {
      title: "Grace Before Meals",
      content: `Bless us, O Lord, and these Thy gifts,
which we are about to receive from Thy bounty,
through Christ our Lord. Amen.`,
    },
    {
      title: "Grace After Meals",
      content: `We give Thee thanks for all Thy benefits, O Almighty God,
who livest and reignest world without end. Amen.
May the souls of the faithful departed, through the mercy of God, rest in peace. Amen.`,
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

      <div className={styles.prayerSection}>
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
            <Paragraph
              className={`${styles.content} ${
                openIndex === index ? styles.show : ""
              }`}
            >
              {prayer.content}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Prayers;
