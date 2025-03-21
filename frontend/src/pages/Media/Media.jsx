import React from "react";
import styles from "./Media.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import {
  Text,
  Heading,
  SmallText,
} from "../../components/Typography/Typography";

function Media() {
  return (
    <div className={styles.container}>
      <Header />

      <main className={styles.main}>
        {/* Mass Celebrations Section */}
        <section className={styles.section}>
          <Heading className={styles.sectionTitle}>Mass Celebrations</Heading>
          <div className={styles.grid}>
            <div className={styles.card}>
              <SmallText>Wednesday Masses</SmallText>
              <img
                src="/others/placeholder.jpg"
                alt="Wednesday Mass"
                className={styles.image}
              />
            </div>
            <div className={styles.card}>
              <Text>Sunday Masses</Text>
              <img
                src="/others/placeholder.jpg"
                alt="Sunday Mass"
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Events & Activities Section */}
        <section className={styles.section}>
          <Heading className={styles.sectionTitle}>Events & Activities</Heading>
          <div className={styles.grid}>
            {[
              { title: "Catcom Reunion", alt: "Reunion Event" },
              { title: "Social Day", alt: "Social Day Event" },
              { title: "Retreat", alt: "Retreat Event" },
              { title: "Charity", alt: "Charity Event" },
              { title: "Hike", alt: "Hiking Event" },
              { title: "Sports Night", alt: "Sports Event" },
            ].map((item, index) => (
              <div key={index} className={styles.card}>
                <Text>{item.title}</Text>
                <img
                  src="/others/placeholder.jpg"
                  alt={item.alt}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </section>

        {/* Blogs and Books Section */}
        <section className={styles.section}>
          <Heading className={styles.sectionTitle}>Blogs and Books</Heading>
          <div className={styles.grid}>
            <div className={styles.card}>
              <Text>Latest Blog</Text>
              <img
                src="/others/placeholder.jpg"
                alt="Blog"
                className={styles.image}
              />
            </div>
            <div className={styles.card}>
              <Text>Featured Book</Text>
              <img
                src="/others/placeholder.jpg"
                alt="Book"
                className={styles.image}
              />
            </div>
          </div>
        </section>

        {/* Music and Videos Section */}
        <section className={styles.section}>
          <Heading className={styles.sectionTitle}>Music and Videos</Heading>
          <div className={styles.grid}>
            {[1, 2, 3].map((item, index) => (
              <div key={index} className={styles.card}>
                <Text>Media Title {item}</Text>
                <img
                  src="/others/placeholder.jpg"
                  alt={`Media content ${item}`}
                  className={styles.image}
                />
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Media;
