import React from "react";
import { NavLink } from "react-router-dom";
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
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/liturgy">Liturgy</NavLink>
            </li>
            <li>
              <NavLink to="/community">Community</NavLink>
            </li>
            <li>
              <NavLink to="/about">About</NavLink>
            </li>
            <li>
              <NavLink to="/media">Media</NavLink>
            </li>
            <li>
              <NavLink to="/register">Register</NavLink>
            </li>
          </ul>
        </div>

        {/* contact column */}
        <div className={styles.contact}>
          <div className={styles.contactHeading}>
            <FooterHeading>Contacts</FooterHeading>
          </div>

          <div className={styles.contact1}>
            <ul>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaFacebook />
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaTiktok />
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaInstagramSquare /> catcomjkuat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaTwitter /> catcomjkuat
                </NavLink>
              </li>
            </ul>
          </div>

          {/* contact column 2 */}
          <div className={styles.contact2}>
            <ul>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaYoutube /> catcomjkuat
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  <FaEnvelope /> jkuatcatcom18@gmail.com
                </NavLink>
              </li>
              <li>
                <NavLink>
                  <FaPhoneAlt /> +254 7XX XXXXXX
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
