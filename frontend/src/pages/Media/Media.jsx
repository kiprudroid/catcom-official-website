import React from "react";
import styles from "./Media.module.css";
import Header from "../../reusable-components/Header/Header";
import Footer from "../../reusable-components/Footer/Footer";
import { Text, Paragraph, Heading , SmallText } from "../../components/Typography/Typography";

function Media() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />
        <div
          className={`${styles.item} ${styles.massCelebrations} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>
            <Heading>Mass Celebrations</Heading>
          </div>
          <div className={styles.col1}>
            <SmallText>Wednesday Masses</SmallText>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <div className={styles.MVcol2}>
              <Text>Sunday Masses</Text>
              <img
                src="/others/placeholder.jpg"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities1} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>
            <Heading>Events & Activities</Heading>
          </div>

          <div className={styles.col1}>
            <Text>Catcom Reunion</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <div className={styles.MVcol2}>
              <Text>Social Day</Text>
              <img
                src="/others/placeholder.jpg"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities2} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}></div>
          <div className={styles.col1}>
            <Text>Retreat</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <div className={styles.MVcol2}>
              <Text>Charity</Text>
              <img
                src="/others/placeholder.jpg"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities3} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}></div>
          <div className={styles.col1}>
            <Text>Hike</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <div className={styles.MVcol2}>
              <Text>Sports and Games Night</Text>
              <img
                src="/others/placeholder.jpg"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${styles.eventsAndActivities4} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}></div>
          <div className={styles.col1}>
            <Text>Final Year Dinner</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <div className={styles.MVcol2}>
              <Text>Cultural Day</Text>
              <img
                src="/others/placeholder.jpg"
                className={styles.mediaImage}
              />
            </div>
          </div>
        </div>
        <div
          className={`${styles.item} ${styles.blogsAndBooks} ${styles.repetitiveRow}`}
        >
          <div className={styles.contentTitle}>
            <Heading>
              Blogs and Books 
            </Heading>
          </div>
          <div className={styles.col1}>
            <Text>Small Title</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.col2}>
            <Text>Small Title</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
        </div>
        <div className={` ${styles.specialRow}`}>
          <div className={styles.contentTitle}>
            <Heading>Music and Videos</Heading>
          </div>
          <div className={styles.MVcol1}>
            <Text>Small Title</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.MVcol2}>
            <Text>Small Title</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
          <div className={styles.MVcol3}>
            <Text>Small Title</Text>
            <img src="/others/placeholder.jpg" className={styles.mediaImage} />
          </div>
        </div>

        <Footer className={styles.footer} />
      </div>
    </>
  );
}

export default Media;
