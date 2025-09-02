import React from "react";
import styles from "./GroupCard.module.css";
import { SectionHeading, Paragraph } from "../../Typography/Typography";

const groupCard = [
    {
      imgSrc: "/Groups/choir.jpg",
      alt: "Choir",
      title: "Choir",
      description: "There is the Community Choir that animates the 11:30am Mass on Sundays and takes major role during community celebrations, then there is the Students' Choir that animates the 9:00am Mass on Sundays. They always have outdoors video shootings and also have a vibrant online presence. They do meet on Tuesdays and Saturday evenings for rehearsals and events."
    },
    {
      imgSrc: "/Groups/pastoral.jpg",
      alt: "Pastoral Team",
      title: "Pastoral Team",
      description: "The pastoral team provides spiritual guidance, coordinates retreats and mass animations processes, formations, and supports the faith journey of members through teaching about the Catholic faith and prayer."
    },
    {
      imgSrc: "/Groups/welfare.jpg",
      alt: "Welfare",
      title: "Welfare",
      description: "This team consist of Catcom Catering secretaries and Project managers. They promote unity and compassion by reaching out to members in times of need, joy, or crisis be it, illnesses, or bereavement. They also support the community through various charitable initiatives. They also organize various projects and drives to assist those in need."
    },
    {
      imgSrc: "/Groups/CL.jpg",
      alt: "Communion and Liberation",
      title: "Communion and Liberation",
      description: "This is a Religious movement focused on living out the Christian faith in daily life through community, personal witness, and catechesis."
    },
    {
      imgSrc: "/Groups/catcomes.jpg",
      alt: "Catcom Enterprise",
      title: "Catcom Enterprise",
      description: "This team comprises Catcom treasurers and secretaries who oversee the planning, coordination, and execution of CATCOM projects during events. They ensure proper resource management, budgeting, and logistical support, helping to bring CATCOM’s initiatives to life with excellence and accountability."
    },
    {
      imgSrc: "/Groups/bps.jpg",
      alt: "Bible Prayer Service",
      title: "Bible Prayer Service",
      description: "This is a group that fosters spiritual growth through regular Bible study, reflections, and intercessory prayers, helping members deepen their relationship with God. They meet on Sunday evenings for prayers and fellowship, where they share spiritual experiences, insights, and support one another in their faith journeys."
    },
    {
      imgSrc: "/Groups/dancers.jpg",
      alt: "Liturgical Dancers",
      title: "Liturgical Dancers",
      description: "They express praise and worship through sacred dance, bringing energy, beauty, and meaning to liturgical celebrations and special events. They are dedicated to enhancing the worship experience through their artistic expression."
    },
    {
      imgSrc: "/Groups/technical.jpg",
      alt: "Technical Team",
      title: "Technical Team",
      description: "The Technical group handles sound, projection, and media support during services and events, ensuring smooth and impactful communication during worship and gatherings. They also engage in technical trainings such as trainings on websites development, they are responsible for maintaining the church's online presence."
    }
  ];

export default function GroupCard() {
  return (
    <div className={styles.groupsSection}>
  {groupCard.map((group, idx) => (
    <div 
      key={idx} 
      className={`${styles.groupCard} ${idx % 2 === 0 ? styles.leftAlign : styles.rightAlign}`}
 >
      <img src={group.imgSrc} alt={group.alt} className={styles.cardImage} />
      <div className={styles.cardText}>
        <SectionHeading className={styles.cardTitle}>{group.title}</SectionHeading>
        <Paragraph className={styles.cardDesc}>{group.description}</Paragraph>
      </div>
     </div>
     ))}
  </div>
  );
}


