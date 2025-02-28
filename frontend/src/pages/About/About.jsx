import React from "react";
import Header from "../../reusable-components/Header/Header";
import styles from "./About.module.css";
import Footer from "../../reusable-components/Footer/Footer";
import CommunityCard from "../../components/communitiesCards/communityCard";
import PriestPatronCard from "../../components/PriestPatronCard/PriestPatronCard";
import CatcomExecutiveCard from "../../components/catcomExecutiveCard/catcomExecutiveCard";
import { Heading, SmallText } from "../../components/Typography/Typography";
import MissionVision from "../../components/MissionVision/MissionVision";

function About() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />

        <div className={styles.aboutCatcom}>
          <Heading>About JKUAT catcom</Heading>
        </div>

        <div className={styles.heritage}>
          <Heading>Our Heritage </Heading>
          <SmallText>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi
            nulla necessitatibus eveniet voluptatum ullam? Voluptatum aliquid
            temporibus voluptatibus quod voluptate, expedita illum, excepturi
            placeat quaerat cum nesciunt vero eaque non rerum possimus! Error
            similique vel, nulla, rerum architecto numquam consectetur, suscipit
            impedit omnis cumque repellendus iure nihil? Harum magni Lorem ipsum
            dolor sit amet consectetur, adipisicing elit. Cupiditate perferendis
            sequi, nulla saepe laboriosam nobis animi, aut aliquam facilis sunt
            unde iure exercitationem recusandae. Veritatis laboriosam sunt iusto
            veniam quas! Lorem, ipsum dolor sit amet consectetur adipisicing
            elit. Possimus amet odio corrupti esse quidem. Dolore nulla unde
            quos! Quisquam dolores quibusdam quis et tenetur possimus eius
            voluptatem veritatis architecto laboriosam?
          </SmallText>
        </div>

        <div className={styles.visionMission}>
          <div className={styles.vision}>
            <MissionVision />
          </div>
          <div className={styles.mission}>
            <MissionVision />
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
          <Heading className={styles.cardTitle}>Catcom Executive </Heading>

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
