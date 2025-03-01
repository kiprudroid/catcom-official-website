import React from "react";
import "./Footer.module.css";
import { FooterHeading, Text } from "../../components/Typography/Typography";
import {
  FaEnvelope,
  FaFacebook,
  FaHome,
  FaInstagramSquare,
  FaPhone,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa"; // FontAwesome
import styles from "./Footer.module.css";

function Footer({ className }) {
  return (
    <footer
      className={`${styles.footer} ${className}`}
      style={{ fontFamily: "Roboto, sans-serif" }}
    >
      <div className={styles.footerContainer}>
        <div className={styles.gridItemFirst}>
          <img
            src="/others/ctm_logo.png"
            alt="Catcom Logo"
            className={styles.catcomLogo}
          />
          <p className={styles.locationWrapper}>
            JKUAT Catcom <br /> Main Campus <br />
            Juja
          </p>
        </div>
        <div>
          <FooterHeading>Quick Links</FooterHeading>
          {/* Quick Links column */}
          <ul>
            <li>Home</li>
            <li>Liturgy</li>
            <li>Community</li>
            <li>Blog</li>
            <li>Contacts</li>
            <li>Register</li>
          </ul>
        </div>

        {/* contact column */}
        <div>
          <FooterHeading>Contact</FooterHeading>
          <ul>
            <li>
              <FaFacebook />
              &nbsp; &nbsp; catcomjkuat
            </li>
            <li>
              <FaTiktok /> &nbsp; &nbsp; catcomjkuat
            </li>
            <li>
              <FaInstagramSquare /> &nbsp; &nbsp; catcomjkuat{" "}
            </li>
            <li>
              <FaTwitter /> &nbsp;&nbsp; catcomjkuat
            </li>
          </ul>
        </div>

        {/* contact column 2 */}
        <div className={styles.gridItem}>
          <h1>&nbsp;</h1>
          <ul>
            <li>
              <FaYoutube /> &nbsp; &nbsp; catcomjkuat
            </li>
            <li>
              <FaEnvelope /> &nbsp; &nbsp; jkuatcatcom18@gmail.com
            </li>
            <li>
              <FaPhoneAlt /> &nbsp; &nbsp; +254 743 728621
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
