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
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.footerContainer}>
        <div className={styles.location}>
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

        {/* Quick Links column */}

        <div className={styles.quickLinks}>
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

        {/* contact column */}
        <div className={styles.contact}>
          <div className={styles.contactHeading}>
            <FooterHeading>Contact</FooterHeading>
          </div>

          <div className={styles.contact1}>
            <ul>
              <li>
                <FaFacebook />
                catcomjkuat
              </li>
              <li>
                <FaTiktok />
                catcomjkuat
              </li>
              <li>
                <FaInstagramSquare /> catcomjkuat
              </li>
              <li>
                <FaTwitter /> catcomjkuat
              </li>
            </ul>
          </div>
          
          {/* contact column 2 */}
          <div className={styles.contact2}>
            <h1>&nbsp;</h1>
            <ul>
              <li>
                <FaYoutube /> catcomjkuat
              </li>
              <li>
                <FaEnvelope /> jkuatcatcom18@gmail.com
              </li>
              <li>
                <FaPhoneAlt /> +254 7XX XXXXXX
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
