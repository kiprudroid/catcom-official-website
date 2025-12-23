import React, { useState } from "react";
import styles from "./WayOfTheCross.module.css";
import { SectionHeading, Paragraph } from "@/components/Typography/Typography";
import { FaCross } from "react-icons/fa";

const concludingPrayers = (
  <div className={styles.concludingPrayers}>
    <Paragraph as="p">
      <strong>Our Father…</strong>
    </Paragraph>
    <Paragraph as="p">
      <strong>Hail Mary…</strong>
    </Paragraph>
    <Paragraph as="p">
      <strong>Glory be…</strong>
    </Paragraph>

    <Paragraph as="p">
      <strong>L.</strong> Have mercy on us, O Lord. <br />
      <strong>R.</strong> Have mercy on us.
    </Paragraph>

    <Paragraph as="p">
      May the souls of all the faithfully departed, through the mercy of God,
      rest in peace. <strong>Amen.</strong>
    </Paragraph>
  </div>
);

const stations = [
  {
    title: "The First Station",
    subtitle: "Pilate Condemns Jesus to Die",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how Jesus Christ, after being scourged and crowned with thorns, was unjustly condemned by Pilate to die on the Cross.",
    prayer:
      "All: My Adorable Jesus, it was not Pilate, it was my sins that condemned You to die. I beg You, by the merits of this sorrowful journey, to assist my soul on its journey to eternity. I love You, Jesus, my love; I repent of ever having offended You.",
    hymn: `Umekosa Nini we Yesu, kushtakiwa bure kwa Pilato
           Wenye kustahili hukumu, si wewe, si wewe, Bwana ni sisi.`,
  },
  {
    title: "The Second Station",
    subtitle: "Jesus Accepts His Cross",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how Jesus, in making this journey with the Cross on His shoulders, thought of us, and offered for us to His Father the death He was about to undergo.",
    prayer:
      "All: My most beloved Jesus, I embrace all the tribulations You have destined for me until death. I beg You, by the merits of the pain You suffered carrying Your Cross, to give me the necessary help to carry mine with perfect patience.",
    hymn: `Ole msalaba huo mzito, apagazwa Mwana Mpenzi wa Mungu
           Mwili waenea mateso, alipa, alipa madhambi yetu`,
  },
  {
    title: "The Third Station",
    subtitle: "Jesus Falls the First Time",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider this first fall of Jesus under His Cross. His flesh was torn by scourges, His head crowned with thorns; He had lost a great quantity of blood. So weakened He could scarcely walk, and yet He had to carry this great load upon His shoulders.",
    prayer:
      "All: My beloved Jesus, it was not the weight of the Cross, but the weight of my sins which made You suffer so much. By the merits of this first fall, deliver me from the misfortune of falling into mortal sin.",
    hymn: `Ona Mumba Mbingu na nchi, yupo chini mzigo wamwelemea
            Na mtu kiumbe chake kwa ukali, ampiga, ampiga bila huruma`,
  },
  {
    title: "The Fourth Station",
    subtitle: "Jesus Meets His Afflicted Mother",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider the meeting of the Son and the Mother, which took place on this journey. Jesus and Mary looked at each other, and their looks became as so many arrows to wound those hearts, which loved each other so tenderly.",
    prayer:
      "All: My most loving Jesus, by the sorrow You experienced in this meeting, grant me the grace of a truly devoted love for Your most holy Mother. And you, my Queen, who were overwhelmed with sorrow, obtain for me by your intercession a continual remembrance of the Passion of your Son.",
    hymn: `Huko njiani we Maria, waonaje hali ya mwanao
            Ni damu tupu na vidonda, machozi, machozi yamfumba macho`,
  },
  {
    title: "The Fifth Station",
    subtitle: "Simon Helps Jesus Carry the Cross",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how weak and weary Jesus was at each step, when His executioners, fearing that He would die on the way, compelled Simon of Cyrene to carry the Cross behind Our Lord.",
    prayer:
      "All: My most beloved Jesus, I will not refuse the Cross as Simon did. I accept it; I embrace it. I accept in particular the death You have destined for me, with all the pains which may accompany it. I unite it to Your death; I offer it to You.",
    hymn: `Kwa Simoni heri ya kweli, mimi pia Yesu nisaidie
            Kuchukua mzigo wa ukombozi, kuteswa, kuteswa pamoja nawe`,
  },
  {
    title: "The Sixth Station",
    subtitle: "Veronica Wipes the Face of Jesus",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider the compassion of the holy woman Veronica. Seeing Jesus in such distress, His face bathed in sweat and blood, she presented Him with her veil. Jesus wiped His face, and left upon the cloth the image of His sacred countenance.",
    prayer:
      "All: My beloved Jesus, Your face was beautiful before, but in this journey it has lost all its beauty, and wounds and blood disfigured it. Alas! my soul also was once beautiful when it received Your grace in Baptism, but I have disfigured it since by my sins. Restore it to Your former beauty.",
    hymn: `Uso wa Yesu malaika, Bethlehemu wakuabudu
            Bahati yake Veronika, kupangusa, kupangusa mfalme wa mbingu`,
  },
  {
    title: "The Seventh Station",
    subtitle: "Jesus Falls the Second Time",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider the second fall of Jesus under the Cross—a fall which renews all the pain of the wounds of the head and body of our afflicted Lord.",
    prayer:
      "All: My most gentle Jesus, how many times You have pardoned me, and how many times I have fallen again, and begun again to offend You! By the merits of this second fall, give me the grace to persevere in Your love until death. Grant that in all my temptations I may always commend myself to You.",
    hymn: `Wakimvuta huku na huku, wauaji wakamchokesha bure
            Chini wamtupa bado kwa nguvu, aibu, aibu yao milele`,
  },
  {
    title: "The Eighth Station",
    subtitle: "Jesus Speaks to the Women of Jerusalem",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how the women wept with compassion at seeing Jesus so distressed and dripping with blood as He walked along. But Jesus said to them, 'Weep not for Me, but for your children.'",
    prayer:
      "All: My Jesus, laden with sorrows, I weep for the offenses I have committed against You because of the pains they have deserved, and still more because of the displeasure they have caused You, Who have loved me so much. It is Your love more than the fear of hell which causes me to weep for my sins.",
    hymn: `Wanawake wa Israeli, msilie kwa sababu hiyo
            Muwalilie hao kwa dhambi, upanga, upanga ni juu yao`,
  },
  {
    title: "The Ninth Station",
    subtitle: "Jesus Falls the Third Time",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider the third fall of Jesus Christ. His weakness was extreme, and the cruelty of His executioners was excessive. They tried to hasten His steps, though He hardly had strength to move.",
    prayer:
      "All: My outraged Jesus, by the weakness You suffered in going to Calvary, give me enough strength to conquer all human respect, and all my wicked passions, which have led me to despise Your friendship.",
    hymn: `Mwokozi sasa ni ya tatu, kuanguka chini ya msalaba
          Katika dhambi za ulegevu, nijue, nijue kutubu hima`,
  },
  {
    title: "The Tenth Station",
    subtitle: "Jesus Is Stripped of His Garments",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how Jesus was violently stripped of His clothes by His executioners. The inner garments adhered to His torn flesh, and the soldiers tore them off so roughly that the skin came with them.",
    prayer:
      "All: My innocent Jesus, by the torment You suffered in being stripped of Your garments, help me to strip myself of all attachment for the things of earth, that I may place all my love in You.",
    hymn: `Muje malaika wa Mbingu, funikeni mwiliwe kwa huruma
          Vidonda vyake na utupu, askari, askari wamvulia`,
  },
  {
    title: "The Eleventh Station",
    subtitle: "Jesus Is Nailed to the Cross",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider Jesus, thrown down upon the Cross. He stretched out His arms, and offered to His eternal Father the sacrifice of His life for our salvation. The executioners fastened Him with nails, and then raised the Cross to let Him die in anguish.",
    prayer:
      "All: My Jesus, loaded with contempt, nail my heart to Your feet, that it may ever remain there, to love You and never leave You again.",
    hymn: `Hapo mkristu ushike moyo, Bwana wako alazwa msalabani
            Mara miguu na mikono, yafungwa, yafungwa kwa misumari`,
  },
  {
    title: "The Twelfth Station",
    subtitle: "Jesus Dies on the Cross",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how Jesus, after three hours of agony on the Cross, consumed at length with anguish, abandoned Himself to the weight of His body, bowed His head, and died.",
    prayer:
      "All: My dying Jesus, I devoutly kiss the Cross on which You died for love of me. I deserve, because of my sins, to die a miserable death; but Your death is my hope. By the merits of Your death, give me grace to die embracing Your feet and burning with love for You.",
    hymn: `Yesu mpenzi nakuabudu, msalabani unapohangaika
            Nchi yatetemeka kwa hofu, na jua, na jua linafifia`,
  },
  {
    title: "The Thirteenth Station",
    subtitle: "Jesus Is Taken Down from the Cross",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how, after Our Lord had expired, two of His disciples, Joseph and Nicodemus, took Him down from the Cross and placed Him in the arms of His afflicted Mother, who received Him with tenderness and pressed Him to her bosom.",
    prayer:
      "All: O Mother of Sorrow, for the love of your Son, accept me for your servant and pray to Him for me. And You, my Redeemer, since You have died for me, permit me to love You; for I wish but You, my Jesus, and nothing more.",
    hymn: `Mama Maria mtakatifu, upokee maiti ya mwanao
            Tumemwua kwa dhambi zetu, twatubu, twatubu kwake na kwako`,
  },
  {
    title: "The Fourteenth Station",
    subtitle: "Jesus Is Laid in the Tomb",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross, You have redeemed the world.",
    meditation:
      "Priest: Consider how the disciples carried the body of Jesus to its burial, while His holy Mother went with them, and arranged it in the sepulcher with her own hands. Then they closed the tomb, and all departed.",
    prayer:
      "All: My buried Jesus, I kiss the stone that encloses You. But I glory more in my heart, where I keep You as long as I shall live. By Your burial, give me the grace to rise again at the last day, to be always with You in glory.",
    hymn: `Pamoja naye kaburini, zika dhambi na ubaya wa moyo
            Yesu tuwe wakristu wa kweli, twakupa, twakupa sasa mapendo`,
  },
  {
    title: "The Fifteenth Station",
    subtitle: "The Resurrection of Jesus",
    acclamation:
      "We adore You, O Christ, and we praise You, because by Your Holy Cross and Resurrection, You have redeemed the world.",
    meditation:
      "Priest: Consider how Jesus Christ, having triumphed over death, rose glorious and immortal on the third day, bringing us the promise of eternal life.",
    prayer:
      "All: My Risen Jesus, by Your victory over death, make me rise glorious with You on the last day, to be united with You in heaven, to praise You forever and ever.",
    hymn: `Katika roho yangu Bwana, chora mateso niliyokutesa
            Nisiyasahau madeni, na kazi, na kazi ya kuokoa`,
  },
];

const openingPrayer = `My Lord, Jesus Christ, You have made this journey to die
for me with unspeakable love; and I have so many times
ungratefully abandoned You. | But now I love You with all my
heart; and, because I love You, I am sincerely sorry for ever
having offended You. Pardon me, my God, and permit me to
accompany You on this journey. You go to die for love of me;
I want, my beloved Redeemer, to die for love of You. My Jesus,
I will live and die always united to You. Amen.`;

const closingPrayer = `Lord Jesus Christ,
your passion and death is the sacrifice that unites earth
and heaven and reconciles all people to you.
May we who have faithfully reflected on these
mysteries follow in your steps and so come to share
your glory in heaven where you live and reign with the
Father and the Holy Spirit one God, for ever and ever. Amen.`;

const actOfContrition = ` O My God, I am heartily sorry for having offended Thee, and I
detest all my sins because of Thy just punishments, but most
of all because they offend Thee, my God, Who art all-good and
deserving of all my love. I firmly resolve, with the help of Thy
grace, to sin no more and to avoid the near occasions of sin. Amen.`;

function WayOfTheCross() {
  const [current, setCurrent] = useState(0);
  const total = stations.length;

  const nextStation = () => setCurrent((prev) => Math.min(prev + 1, total - 1));
  const prevStation = () => setCurrent((prev) => Math.max(prev - 1, 0));

  return (
    <div className={styles.container}>
      <SectionHeading className={styles.title}>
        The Way of the Cross
      </SectionHeading>

      {current === 0 && (
        <div className={styles.prayerBlock}>
          <div className={styles.invocation}>
            <FaCross className={styles.crossIcon} />
            <Paragraph as="p">
              In the name of the Father, and of the Son, and of the Holy Spirit.
              Amen.
            </Paragraph>
          </div>

          <SectionHeading as="h3">Act Of Contrition</SectionHeading>
          <Paragraph>{actOfContrition}</Paragraph>

          <SectionHeading as="h3">Opening Prayer</SectionHeading>
          <Paragraph>{openingPrayer}</Paragraph>
        </div>
      )}

      <div className={styles.progressWrapper}>
        <div className={styles.progressText}>
          Station {current + 1} of {total}
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${((current + 1) / total) * 100}%` }}
          />
        </div>
      </div>

      <div className={styles.card}>
        {stations[current].hymn && (
          <div className={styles.hymn}>
            <Paragraph as="p">
              <em>{stations[current].hymn}</em>
            </Paragraph>
          </div>
        )}

        <SectionHeading as="h2" className={styles.stationTitle}>
          {stations[current].title}
        </SectionHeading>
        <Paragraph as="p" className={styles.subtitle}>
          {stations[current].subtitle}
        </Paragraph>

        <div className={styles.acclamation}>
          <Paragraph as="p">{stations[current].acclamation}</Paragraph>
        </div>

        <div className={styles.meditation}>
          <Paragraph as="p">{stations[current].meditation}</Paragraph>
        </div>

        {stations[current].prayer && (
          <div className={styles.prayer}>
            <Paragraph as="p">{stations[current].prayer}</Paragraph>
          </div>
        )}

        {concludingPrayers}
      </div>

      <div className={styles.navButtons}>
        <button onClick={prevStation} disabled={current === 0}>
          ⬅ Prev
        </button>
        <button onClick={nextStation} disabled={current === total - 1}>
          Next ➡
        </button>
      </div>

      {current === total - 1 && (
        <div className={styles.prayerBlock}>
          <SectionHeading as="h3">Closing Prayer</SectionHeading>
          <Paragraph>{closingPrayer}</Paragraph>
        </div>
      )}
    </div>
  );
}

export default WayOfTheCross;
