import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.module.css";
import { SectionHeading } from "../../components/Typography/Typography";
import {
  FaEnvelope,
  FaFacebook,
  FaInstagramSquare,
  FaPhoneAlt,
  FaTiktok,
  FaTwitter,
  FaYoutube,
  FaHome,
  FaBookOpen,
  FaUsers,
  FaChurch,
  FaInfoCircle,
} from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer({ className }) {
  return (
    <footer className={`${styles.footer} ${className || ""}`}>
      <div className={styles.footerContainer}>
        <div className={styles.location}>
          <img
            src="/others/catcom-logo.png"
            alt="Catcom Logo"
            className={styles.catcomLogo}
          />
          <p className={styles.locationWrapper}>
            JKUAT Catcom <br /> Main Campus <br />
            Juja
          </p>
        </div>

        <div className={styles.quickLinks}>
          <SectionHeading className={styles.heading}>
            {" "}
            Quick Links
          </SectionHeading>
          <ul>
            <li>
              <FaHome />
              <NavLink to="/home">Home</NavLink>
            </li>
            <li>
              <FaBookOpen />
              <NavLink to="/liturgy">Liturgy</NavLink>
            </li>
            <li>
              <FaInfoCircle />
              <NavLink to="/about">About Us</NavLink>
            </li>
            <li>
              <FaUsers />
              <NavLink to="/groups">Groups</NavLink>
            </li>
            <li>
              <FaChurch />
              <NavLink to="/scc">SCC</NavLink>
            </li>
          </ul>
        </div>

        <div className={styles.contact}>
          <SectionHeading className={styles.heading}>Contacts</SectionHeading>
          <ul>
            <li>
              <FaFacebook />
              <NavLink to="https://www.catcom.com/catcomjkuat" target="_blank">
                catcomjkuat
              </NavLink>
            </li>
            <li>
              <FaTiktok />
              <NavLink to="https://www.catcom.com/catcomjkuat" target="_blank">
                catcomjkuat
              </NavLink>
            </li>
            <li>
              <FaInstagramSquare />
              <NavLink to="https://www.catcom.com/catcomjkuat" target="_blank">
                catcomjkuat
              </NavLink>
            </li>

            <li>
              <FaYoutube />
              <NavLink to="https://www.catcom.com/catcomjkuat" target="_blank">
                catcomjkuat
              </NavLink>
            </li>
            <li>
              <FaEnvelope />
              <NavLink to="mailto:jkuatcatcom18@gmail.com">
                jkuatcatcom18@gmail.com
              </NavLink>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} JKUAT Catcom. All Rights Reserved.</p>
        <p className={styles.tagline}>
          “Rooted in Faith, Growing in Community.”
        </p>
      </div>
    </footer>
  );
}

export default Footer;
