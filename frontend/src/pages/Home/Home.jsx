import React from "react";
import styles from "./Home.module.css";
import Header from "../../reusable-components/Header/Header";
import "@fontsource/inter";
import Footer from "../../reusable-components/Footer/Footer";
import Schedule from "../../components/Schedule/Schedule";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { images } from "../../DataFiles/data";

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  return (
    <>
      <div className={styles.gridContainer}>
        <Header className={styles.header} />

        {/* SlideShow */}
        <div className={styles.slideShow}>
          <Slider {...settings} className={styles.sliderContainer}>
            {images.map((image, index) => (
              <div key={index}>
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className={styles.slideshowImage}
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Weekly Program */}
        <div className={styles.weeklyProgram}>
          <h3
            className={styles.contentTitle}
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Weekly Program
          </h3>

          <div className={styles.contentWrapper}>
            <Schedule />
          </div>
        </div>

        <div className={styles.calendar}>
          <img
            className={styles.calendarImage}
            src="/others/catcom calender.jpg"
            alt=""
          />
        </div>

        {/* Media content */}
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
              A praying, believing and worshiping community for empowering young
              people to live as disciples of Jesus Christ; drawing them into
              responsible participation in the Catholic Church; fostering their
              personal and spiritual growth.
            </p>
          </div>
        </div>

        <div className={styles.mission}>
          <h3
<<<<<<< HEAD
            className={styles.contentTitle}
=======
            className="content-title"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Media Content
          </h3>
          <div className="media-wrapper">
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
                className="media-image"
              />
            ))}
          </div>
        </div>
        <div className="item mission">
          <h3
            className="content-title"
>>>>>>> de9be84 (Changed the logo in the header to png format)
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Mission
          </h3>
          <div className={styles.contentWrapper}>
            <p style={{ color: "#E3D879" }} className={styles.contentTitle}>
              What we do, everyday
            </p>
            <p
              className={styles.textContent}
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              To help people find God, grow their faith, discover their purpose,
              and make a difference.We exist to make Heaven more crowded.
            </p>
          </div>
        </div>

<<<<<<< HEAD
        <div className={styles.footer}>
          <Footer />
        </div>
=======
          <div className="content-wrapper">
            <p
              className="text-content"
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
        <div className="item footer">
          <Footer />
        </div>
>>>>>>> de9be84 (Changed the logo in the header to png format)
      </div>
    </>
  );
}

export default Home;
