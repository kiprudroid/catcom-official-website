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
} from "./../../DataFiles/data";

function About() {
  return (
    <>
      <Header className={styles.header} />

      <div className={styles.hero}>
        <Heading>About JKUAT catcom</Heading>
      </div>

      <div className={styles.heritage}>
        <h2>Our Heritage</h2>
        <p>
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
        </p>
      </div>

      <div className={styles.visionMission}>
        <div className={styles.vision}>
          <h2>Our Vision</h2>
          <p>A praying, believing and worshiping community
            for empowering young people to live as disciples of Jesus Christ;
            drawing them into responsible participation in the Catholic Church;
            fostering their personal and spiritual growth.</p>
        </div>
        <div className={styles.mission}>
          <h2>Our Mission</h2>
          <p>To help people find God, grow their faith,
            discover their purpose, and make a difference.
            We exist to make Heaven more crowded."</p>
        </div>
      </div>

      <div className={styles.communities}>
        <h2>Meet Our Communities</h2>
        {communities.map((community, index) => (
          <div className={styles.community} key={index}>
            <h3>{community.title}</h3>
            <p>{community.content}</p>
            <button>Learn More</button>
          </div>
        ))}
      </div>

      <div className={styles.leaders}>
        <h2>Our Priests</h2>
        {priests.map((priest, index) => (
          <div className={styles.leader} key={index}>
            <img src={priest.image} alt={priest.name} />
            <h3>{priest.name}</h3>
            <p>{priest.role}</p>
          </div>
        ))}
      </div>

      <div className={styles.leaders}>
        <h2>Our Patrons</h2>
        {patrons.map((patron, index) => (
          <div className={styles.leader} key={index}>
            <img src={patron.image} alt={patron.name} />
            <h3>{patron.name}</h3>
            <p>{patron.role}</p>
          </div>
        ))}
      </div>

      <div className={styles.leaders}>
        <h2>Catcom Executive </h2>

        {catcomExecutive.map((executive, index) => (
          <div className={styles.leader} key={index}>
            <img src={executive.image} alt={executive.name} />
            <h3>{executive.name}</h3>
            <p>{executive.role}</p>
          </div>
        ))}
      </div>

      <Footer className={styles.footer} />
    </>
  );
}

export default About;
