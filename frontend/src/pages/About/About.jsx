import React from "react";
import Header from "../../reusable-components/Header/Header";
import styles from "./About.module.css";
import Footer from "../../reusable-components/Footer/Footer";
import CommunityCard from "../../components/communitiesCards/communityCard";
import PriestPatronCard from "../../components/PriestPatronCard/PriestPatronCard";
import CatcomExecutiveCard from "../../components/catcomExecutiveCard/catcomExecutiveCard";
import { Heading, Text } from "../../components/Typography/Typography";

function About() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />
        <div className={styles.aboutCatcom}>
          <Heading>About JKUAT catcom</Heading>
        </div>
        <div className={styles.heritage}>
          <Heading>Our Heritage</Heading>
          <Text>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas
            magnam magni non dolore architecto, harum eaque explicabo quibusdam
            quod facere. Praesentium quod tempora expedita animi, culpa optio
            delectus, cupiditate asperiores recusandae quos velit, iusto
            blanditiis officiis nemo illo cumque id. Rem aspernatur deleniti
            dolor illo? Totam eveniet, odit quae labore architecto facilis ex
            non sint natus illum delectus quis praesentium debitis eaque
            suscipit, vitae eos obcaecati ad. Dolor voluptatum nihil sapiente,
            iure at fuga asperiores possimus unde hic maiores modi culpa,
            adipisci sequi quasi quo tempore excepturi ipsa fugiat numquam quae
            fugit atque id! Consequatur, porro. Magnam esse temporibus eaque
            autem id molestias dicta aut error molestiae corrupti? Sint totam
            maiores cupiditate accusantium saepe quis molestias itaque fugit,
            odio fuga corrupti deserunt excepturi ab, dolore eos id perspiciatis
            nemo. Iste ipsam quaerat inventore. Molestiae officiis amet
            quibusdam autem ratione odit cupiditate mollitia facilis, atque
            possimus. Possimus repellendus nihil doloremque eum?
          </Text>
        </div>
        <div className={styles.visionMission}>
          <div className={styles.vision}>
            <Heading>Our Vision</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              nulla necessitatibus eveniet voluptatum ullam? Voluptatum aliquid
              temporibus voluptatibus quod voluptate, expedita illum, excepturi
              placeat quaerat cum nesciunt vero eaque non rerum possimus! Error
              similique vel, nulla, rerum architecto numquam consectetur,
              suscipit impedit omnis cumque repellendus iure nihil? Harum magni
              delectus est quos sunt voluptates quis fugiat voluptate porro
              cumque molestiae, maxime cupiditate rerum nihil dolorum itaque
              amet neque. Facilis maiores libero quia numquam cumque natus
              cupiditate nihil mollitia sequi eius saepe, nulla illo vero dicta
              quos, expedita aut quo alias magnam quibusdam at accusamus earum!
              Cum aliquam modi vitae dolorem.
            </Text>
          </div>
          <div className={styles.mission}>
            <Heading>Our Mission</Heading>
            <Text>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
              nulla necessitatibus eveniet voluptatum ullam? Voluptatum aliquid
              temporibus voluptatibus quod voluptate, expedita illum, excepturi
              placeat quaerat cum nesciunt vero eaque non rerum possimus! Error
              similique vel, nulla, rerum architecto numquam consectetur,
              suscipit impedit omnis cumque repellendus iure nihil? Harum magni
              delectus est quos sunt voluptates quis fugiat voluptate porro
              cumque molestiae, maxime cupiditate rerum nihil dolorum itaque
              amet neque. Facilis maiores libero quia numquam cumque natus
              cupiditate nihil mollitia sequi eius saepe, nulla illo vero dicta
              quos, expedita aut quo alias magnam quibusdam at accusamus earum!
              Cum aliquam modi vitae dolorem.
            </Text>
          </div>
        </div>
        <div className={styles.communities}>
          {[...Array(9)].map((index) => (
            <CommunityCard key={index} />
          ))}
        </div>
        <div className={styles.priests}>
          <Heading className={styles.cardTitle}>Our Priests</Heading>
          {[...Array(3)].map((index) => (
            <PriestPatronCard key={index} />
          ))}
        </div>
        <div className={styles.patrons}>
          <Heading className={styles.cardTitle}>Our Patrons</Heading>
          {[...Array(2)].map((index) => (
            <PriestPatronCard key={index} />
          ))}
        </div>
        <div className={styles.leaders}>
          <h2 className={styles.cardTitle}>Catcom Executive </h2>

          {[...Array(11)].map((index) => (
            <CatcomExecutiveCard key={index} />
          ))}
        </div>
        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default About;
