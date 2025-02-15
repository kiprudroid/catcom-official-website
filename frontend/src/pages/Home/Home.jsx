import React from "react";
import "./Home.css";
import Header from "../../reusable-components/Header/Header";

function Home() {
  return (
    <>
      <div className="grid-container">
        <Header className="header" />
        <div className="item slide-show">
          <img src="./public/others/st augustine.jpg" alt="" />
        </div>
        <div className="item what-are-we">
          <h3>What are we</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ab
            minus ullam, earum, reprehenderit odit soluta eum dolore accusantium
            sit repellendus at quo ipsa sapiente? Rem corrupti quibusdam
            ratione, velit perferendis aperiam magni recusandae exercitationem
            maxime dicta porro ipsam doloremque cum necessitatibus facere
            molestias quo cumque. Possimus sapiente reprehenderit quidem, eaque
            quo fugit eligendi neque, esse corporis, aliquid impedit a.
          </p>
        </div>
        <div className="item vision">
          <h3>Our Vision</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam ab
            minus ullam, earum, reprehenderit odit soluta eum dolore accusantium
            sit repellendus at quo ipsa sapiente? Rem corrupti quibusdam
            ratione, velit perferendis aperiam magni recusandae exercitationem
          </p>
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
