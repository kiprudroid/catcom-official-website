import React from "react";
import styles from "./Home.module.css";
import Header from "../../reusable-components/Header/Header";
import "@fontsource/inter";
import Footer from "../../reusable-components/Footer/Footer";

function Home() {
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />
        <div className={styles.slideShow}>
          <img
            src="./others/st augustine.jpg"
            alt=""
            className={styles.slideshowImage}
          />
        </div>
        <div className={styles.whatAreWe}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What are we ?
          </h3>
          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              We are a vibrant Catholic Community that encourages healthy growth
              spiritually, socially, and academically, with the ultimate goal of
              encountering Christ in our daily lives. The community supports us
              in recognizing our inherent vocation bestowed upon us by God,
              which involves the task of exploring our talents and capabilities
              and utilizing them for the betterment of others. This friendship
              grants us the opportunity to cultivate our freedom, allowing us to
              lead lives that are dedicated to Christ, with Christ, and for
              Christ. It is a genuine bond that empowers every member to develop
              love for themselves as well as for others.
            </p>
          </div>
        </div>
        <div className={styles.vision}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Vision
          </h3>
          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              ab minus ullam, earum, reprehenderit odit soluta eum dolore
              accusantium sit repellendus at quo ipsa sapiente? Rem corrupti
              quibusdam ratione, velit perferendis aperiam magni recusandae
              exercitationem
            </p>
          </div>
        </div>
        <div className={styles.mediaContent}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Media Content
          </h3>
          <div className={styles.mediaWrapper}>
            {[
              "/others/Beyond-Century-of-Endeavour-A-History-of-the-Catholic-Church-in-Kenya.jpg",
              "/others/placeholder.jpg",
              "/others/placeholder.jpg",
              "/others/placeholder.jpg",
              "/others/kmrm_logo.jpg",
            ].map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`media-content-${index}`}
                className={styles.mediaImage}
              />
            ))}
          </div>
        </div>
        <div className={styles.mission}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Mission
          </h3>
          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam
              ab minus ullam, earum, reprehenderit odit soluta eum dolore
              accusantium sit repellendus at quo ipsa sapiente? Rem corrupti
              quibusdam ratione, velit perferendis aperiam magni recusandae
              exercitationem
            </p>
          </div>
        </div>
        <div className={styles.weeklyProgram}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Weekly Program
          </h3>

          <div className={styles.contentWrapper}>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam
              voluptates quod debitis iusto aspernatur dolor doloremque sint
              atque eligendi sit porro, delectus officiis eum doloribus,
              laboriosam, placeat laborum deleniti fuga facere? Fugit
              consectetur enim numquam ullam, nihil sunt illum veniam
              dignissimos, impedit soluta veritatis repudiandae magni aperiam,
              perspiciatis pariatur? Dolor cumque laborum, nemo dolorem qui
              alias ducimus eos cum facere, soluta velit aspernatur praesentium
              nesciunt incidunt nostrum, tempore mollitia veniam nisi vitae.
              Consequatur, sunt, perferendis odio fugiat atque vel quaerat quam
              illo tenetur beatae pariatur. Autem facilis voluptas nemo facere
              earum similique, reprehenderit, accusantium exercitationem quasi
              adipisci quam voluptate sequi a distinctio minus sint, nobis
              cupiditate et nihil corrupti ratione. Ratione odio nisi nobis
              quidem quam soluta ipsum praesentium similique tenetur nemo?
              Excepturi et cum obcaecati molestiae sunt enim sint itaque ex ea
              voluptatibus atque delectus aliquam nesciunt commodi est
              necessitatibus iste dolore voluptas, velit veritatis
              exercitationem, incidunt culpa. Ex?
            </p>
          </div>
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
