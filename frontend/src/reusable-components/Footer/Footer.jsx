import React from "react";
import "./Footer.css";
import { FooterHeading , Text } from "../../components/Typography/Typography";
import { FaEnvelope, FaFacebook, FaHome, FaInstagramSquare, FaPhone, FaPhoneAlt, FaTiktok, FaTwitter, FaYoutube } from "react-icons/fa";  // FontAwesome

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
              <FooterHeading>Contact</FooterHeading>
              <ul>
                <li>
                  {" "}
                  <FaFacebook />
                  &nbsp; &nbsp; catcomjkuat
                </li>
                <li>
                  {" "}
                  <FaTiktok /> &nbsp; &nbsp; catcomjkuat
                </li>
                <li>
                  {" "}
                  <FaInstagramSquare /> &nbsp; &nbsp; catcomjkuat{" "}
                </li>
                <li>
                  {" "}
                  <FaTwitter /> &nbsp;&nbsp; catcomjkuat
                </li>
              </ul>
            </div>
            <div className="grid-item">
              <h1>&nbsp;</h1>
              <ul>
                <li>
                  <FaYoutube /> &nbsp; &nbsp; catcomjkuat
                </li>
                <li>
                  {" "}
                  <FaEnvelope /> &nbsp; &nbsp; jkuatcatcom18@gmail.com
                </li>
                <li>
                  {" "}
                  <FaPhoneAlt /> &nbsp; &nbsp; +254 743 728621
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
}

export default Footer;