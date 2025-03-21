import React from "react";
import Header from "../../reusable-components/Header/Header";
import styles from "./About.module.css";
import Footer from "../../reusable-components/Footer/Footer";
import CommunityCard from "../../components/communitiesCards/communityCard";
import PriestPatronCard from "../../components/PriestPatronCard/PriestPatronCard";
import CatcomExecutiveCard from "../../components/catcomExecutiveCard/CatcomExecutiveCard";
import { Heading, SmallText } from "../../components/Typography/Typography";
import MissionVision from "../../components/MissionVision/MissionVision";
import {
  communities,
  patrons,
  priests,
  catcomExecutive,
} from "../../../public/DataFiles/data";

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
            We are a vibrant Catholic Community that encourages healthy growth
            spiritually, socially, and academically, with the ultimate goal of
            encountering Christ in our daily lives. The community supports us in
            recognizing our inherent vocation bestowed upon us by God, which
            involves the task of exploring our talents and capabilities and
            utilizing them for the betterment of others. This friendship grants
            us the opportunity to cultivate our freedom, allowing us to lead
            lives that are dedicated to Christ, with Christ, and for Christ. It
            is a genuine bond that empowers every member to develop love for
            themselves as well as for others.
          </SmallText>
        </div>

        <div className={styles.visionMission}>
          <div className={styles.vision}>
            <MissionVision
              heading="Our Vision"
              text="A praying, believing and worshiping community
             for empowering young people to live as disciples of Jesus Christ;
             drawing them into responsible participation in the Catholic Church;
             fostering their personal and spiritual growth."
            />
          </div>
          <div className={styles.mission}>
            <MissionVision
              heading="Our Mission"
              text="
           To help people find God, grow their faith,
           discover their purpose, and make a difference.
           We exist to make Heaven more crowded."
            />
          </div>
        </div>

        <div className={styles.communities}>
          {console.log(communities)}
          {communities.map((community, index) => (
            <CommunityCard
              key={index}
              title={community.title}
              content={community.content}
            />
          ))}
        </div>

        <div className={styles.priests}>
          <Heading className={styles.cardTitle}>Our Priests</Heading>
          {priests.map((priest, index) => (
            <PriestPatronCard
              key={index}
              image={priest.image}
              name={priest.name}
              role={priest.role}
            />
          ))}
        </div>

        <div className={styles.patrons}>
          <Heading className={styles.cardTitle}>Our Patrons</Heading>
          {patrons.map((patron, index) => (
            <PriestPatronCard
              key={index}
              name={patron.name}
              position={patron.role}
              image={patron.image}
            />
          ))}
        </div>

        <div className={styles.leaders}>
          <Heading className={styles.cardTitle}>Catcom Executive </Heading>

          {catcomExecutive.map((executive, index) => (
            <CatcomExecutiveCard
              key={index}
              name={executive.name}
              role={executive.role}
              image={executive.image}
            />
          ))}
        </div>

        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default About;
