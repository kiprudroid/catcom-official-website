import styles from "./Groups.module.css";
import Header from "../../reusable-components/Header/Header";
import React, { useState, useEffect } from "react";
import Footer from "../../reusable-components/Footer/Footer";

function GroupCard({ imgSrc, alt, title, description }) {
  const [expanded, setExpanded] = useState(false);
  const maxLength = 120; // Number of characters to show when collapsed

  const isLong = description.length > maxLength;
  const displayText =
    expanded || !isLong ? description : description.slice(0, maxLength) + "...";

  return (
    <div className={styles.groupCard}>
      <img src={imgSrc} alt={alt} />
      <h3>{title}</h3>
      <p>
        {displayText}
        {isLong && (
          <button
            className={styles.showMoreBtn}
            onClick={() => setExpanded((e) => !e)}
            type="button"
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        )}
      </p>
    </div>
  );
}

export default function Groups() {
  const verses = [
    {
      title: " FRUITS OF THE HOLY SPIRIT (GALATIANS 5:22-23)",
      text: "But the fruit of the Spirit is love, joy, peace, longsuffering, gentleness, goodness, faith, meekness, temperance: against such there is no law."
    },
    {
      title: "GIFTS OF THE HOLY SPIRIT(ACTS 2:38)",
      text: "Then Peter said unto them, Repent, and be baptized and ye shall receive the gift of the Holy Spirit: Wisdom, Understanding, Counsel, Fortitude, Knowledge, Piety, and Fear of the Lord."
    }
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % verses.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div>
        <Header />
        <div>
          <div className={styles.infoCard}>
            <div className={styles.infoHeader}>
              <img
                src="/others/Group.jpg"
                alt="Church Group Icon"
                className={styles.infoIcon}
                style={{ width: "100px", height: "100px", marginRight: "1rem" }}
              />
              <h1 style={{ fontFamily: "Inter, sans-serif" }}>
                Groups in Jkuat Catcom
              </h1>
            </div>
            <div>
              {/* <h2>Groups in St Augustine</h2> */}

              <p
                className={styles.textContent}
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                The CATCOM community is built on unity, service, and shared
                faith. Our various groups bring together students with different
                gifts, passions, and callings all working together to strengthen
                our mission and deepen our fellowship. These groups are the
                lifeblood of our ministry, creating opportunities for active
                participation, leadership, and growth within the Catholic faith.
                By joining a group, members find belonging, purpose, and a
                meaningful way to live out their discipleship at JKUAT.
              </p>
            </div>
          </div>
        </div>

         <div className={styles.container}>
        
          <div className={styles.cardsOverlap}>
         <div className={styles.cardBase}>
          <img
            src="/Groups/fruits.webp"
            alt="Fruit of the Spirit"
            className={styles.cardImage}
          />
          <h2 className={styles.title}>GALATIANS 5:22-23</h2> 
          
        </div>
        

  <div className={`${styles.cardBase} ${styles.cardOverlapBottom}`}>
          <img
            src="/Groups/gifts.jpg"
            alt="Gift of the Holy Spirit"
            className={styles.cardImage}
          />
          <h2 className={styles.title}>Gift of the Holy Spirit<br />Acts 2:38</h2>
          
        </div>
      </div>

      <div className={styles.carouselContainer}>
        <div key={index} className={styles.carouselText}>
          <h2>{verses[index].title}</h2>
          <p>{verses[index].text}</p>
        </div>
      </div>
    </div>

        <div className={styles.groupsGrid}>
          <GroupCard
            imgSrc="/Groups/choir.jpg"
            alt="Choir"
            title="Choir"
            description="There is the Community Choir that animates the 11:30am Mass on
              Sundays and takes major role during community celebrations, then
              there is the Students' Choir that animates the 9:00am Mass on
              Sundays. It's perhaps one of the most popular choirs in the
              region."
          />
          <GroupCard
            imgSrc="/Groups/pastoral.jpg"
            alt="Pastoral Team"
            title="Pastoral Team"
            description="Provides spiritual guidance, coordinates retreats and mass animations processes,
             formations, and supports the faith journey of members through teaching about the Catholic faith and prayer."
          />
          <GroupCard
            imgSrc="/Groups/welfare.jpg"
            alt="Welfare"
            title="Welfare "
            description="Promotes unity and compassion by reaching out 
            to members in times of need, joy, or crisis be it, illnesses, 
            or bereavement. They also suppor the community through various charitable initiatives."
          />
          <GroupCard
            imgSrc="/Groups/CL.jpg"
            alt="Communion and Liberation"
            title="Communion and Liberation"
            description="A Religious movement focused on living out the
             Christian faith in daily life through community, personal 
             witness, and catechesis.
"
          />
          <GroupCard
            imgSrc="/Groups/catcomes.jpg"
            alt="Catcom Enterprise"
            title="Catcom Enterprise"
            description="This team comprises CATCOM treasurers and secretaries
             who oversee the planning, coordination, and execution of CATCOM
              projects during events. They ensure proper resource management,
               budgeting, and logistical support, helping to bring CATCOM’s 
               initiatives to life with excellence and accountability.."
          />
          <GroupCard
            imgSrc="/Groups/bps.jpg"
            alt="Bible Prayer Service"
            title="Bible Prayer Service "
            description="Fosters spiritual growth through regular Bible study,
             reflections, and intercessory prayers, helping members deepen their
              relationship with God."
          />
          <GroupCard
            imgSrc="/Groups/dancers.jpg"
            alt="Liturgical Dancers"
            title="Liturgical Dancers"
            description="Expresses praise and worship through sacred dance,
             bringing energy, beauty, and meaning to liturgical celebrations
              and special events."
          />
          <GroupCard
            imgSrc="/Groups/technical.jpg"
            alt="Technical Team"
            title="Technical Team "
            description="Handles sound, projection, and media support
             during services and events, ensuring smooth and impactful
              communication during worship and gatherings."
          />
        </div>
        <div>
          <div className={styles.joinForm}>
            <form className={styles.formGrid}>
              <h2>Joining a Group</h2>
              <div className={styles.formRow}>
                <div className={styles.formCol}>
                  <label htmlFor="name">First Name</label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="name">Last Name</label>
                  <input type="text" id="name" name="name" />
                  <label htmlFor="phone">Phone Number</label>
                  <input type="text" id="phone" name="phone" />
                  <label htmlFor="email">Your E-mail</label>
                  <input type="email" id="email" name="email" />
                </div>
                <div className={styles.formCol}>
                  <label className={styles.groupLabel}>
                    Select Which Group(s) to Join
                  </label>
                  <div className={styles.checkboxGroup}>
                    <div>
                      <input
                        type="checkbox"
                        id="choir"
                        name="groups"
                        value="Choir"
                      />
                      <label htmlFor="choir">Choir</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="technical"
                        name="groups"
                        value="Technical Team"
                      />
                      <label htmlFor="technical">Technical Team</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="pastoral"
                        name="groups"
                        value="Pastoral"
                      />
                      <label htmlFor="pastoral">Pastoral</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="Welfare"
                        name="groups"
                        value="Welfare"
                      />
                      <label htmlFor="Welfare">Welfare</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="BPS"
                        name="groups"
                        value="Bible Prayer Service"
                      />
                      <label htmlFor="BPS">Bible Prayer Service</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="Catcomes"
                        name="groups"
                        value="catcomes"
                      />
                      <label htmlFor="Catcomes">Catcom Enterprise</label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="liturgical dancers"
                        name="groups"
                        value="liturgical dancers"
                      />
                      <label htmlFor="liturgical dancers">
                        Liturgical Dancers
                      </label>
                    </div>
                    <div>
                      <input
                        type="checkbox"
                        id="communion and liberation"
                        name="groups"
                        value="communion and liberation"
                      />
                      <label htmlFor="communion and liberation">
                        Communion and Liberation
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <button className={styles.joinBtn}>Join Group</button>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
