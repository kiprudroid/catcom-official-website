import React from "react";
import "./Footer.css";
import { FooterHeading , Text } from "../../components/Typography/Typography";

function Footer(){
    return (
      <footer className="footer" style={{ fontFamily: "Roboto, sans-serif" }}>
        <div className="footer-content">
          <div className="footer-grid-container">
            <div className="grid-item first">
              <img
                src="/others/ctm_logo.png"
                alt="Catcom Logo"
                className="ctm-logo"
              />
              <p className="location-wrapper">
                JKUAT Catcom <br /> Main Campus <br />
                Juja{" "}
              </p>
            </div>
            <div className="grid-item">
              <FooterHeading>Quick Links</FooterHeading>

              <ul>
                <li>Home</li>
                <li>Liturgy</li>
                <li>Community</li>
                <li>Blog</li>
                <li>Contacts</li>
                <li>Register</li>
              </ul>
            </div>
            <div className="grid-item">
              <FooterHeading>Quick Links</FooterHeading>
              <ul>
                <li>Home</li>
                <li>Liturgy</li>
                <li>Community</li>
                <li>Blog</li>
                <li>Contacts</li>
                <li>Register</li>
              </ul>{" "}
            </div>
            <div className="grid-item">
              <h3>Column 4</h3>
              <p>Content for the fourth column, which is wider.</p>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;