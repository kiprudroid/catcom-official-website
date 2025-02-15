import React from "react";
import "./Home.css";
import Header from "../../reusable-components/Header/Header";
import "@fontsource/inter"; 

function Home() {
  return (
    <>
      <div className="grid-container">
        <Header className="header" />
        <div className="item slide-show">
          <img
            src="./public/others/st augustine.jpg"
            alt=""
            className="slideshow-image"
          />
        </div>
        <div className="item what-are-we">
          <h3
            className="what-are-we-title"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            What are we
          </h3>
          <div className="content-wrapper">
            <p
              className="text-content"
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
        <div className="item vision">
          <h3
            className="what-are-we-title"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            Our Vision
          </h3>
          <div className="content-wrapper">
            <p
              className="text-content"
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
        <div className="item media-content">
          <h3>Media Content</h3>
          <img
            src="/others/Beyond-Century-of-Endeavour-A-History-of-the-Catholic-Church-in-Kenya.jpg"
            alt=""
          />
        </div>
        <div className="item mission">
          <h3>Our Mission</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ab
            minus ullam, earum, reprehenderit odit soluta eum dolore accusantium
            sit repellendus at quo ipsa sapiente? Rem corrupti quibusdam
            ratione, velit perferendis aperiam magni recusandae exercitationem
          </p>
        </div>
        <div className="item weekly-program">
          <h3>Weekly Program</h3>
          <p>lorem150</p>
        </div>
        <div className="item footer">
          <p>
            Lorem ipsum dolor sit Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Ipsum iure inventore dolore commodi, consequatur
            at itaque asperiores consequuntur non sapiente a officiis laboriosam
            modi, recusandae, laudantium facilis maiores eaque voluptate
            voluptatum ipsam porro soluta id labore quis! Nobis, velit nihil?
          </p>
        </div>
      </div>
    </>
  );
}

export default Home;
