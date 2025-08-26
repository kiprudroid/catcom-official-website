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
        {/* Location / Logo */}
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

        {/* Quick Links */}
        <div className={styles.quickLinks}>
          <SectionHeading>Quick Links</SectionHeading>
          <ul>
            <li>
              <FaHome />
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <FaBookOpen />
              <NavLink to="/liturgy">Liturgy</NavLink>
            </li>
            <li>
              <FaInfoCircle />
              <NavLink to="/about-us">About Us</NavLink>
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

        {/* Contacts */}
        <div className={styles.contact}>
          <div className={styles.contactHeading}>
            <SectionHeading>Contacts</SectionHeading>
          </div>

          <div className={styles.contact1}>
            <ul>
              <li>
                <FaFacebook />
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <FaTiktok />
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <FaInstagramSquare />
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <FaTwitter />
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  catcomjkuat
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.contact2}>
            <ul>
              <li>
                <FaYoutube />
                <NavLink
                  to="https://www.catcom.com/catcomjkuat"
                  target="_blank"
                >
                  catcomjkuat
                </NavLink>
              </li>
              <li>
                <FaEnvelope />
                <NavLink to="mailto:jkuatcatcom18@gmail.com">
                  jkuatcatcom18@gmail.com
                </NavLink>
              </li>
              <li>
                <FaPhoneAlt />
                <span>+254 7XX XXXXXX</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
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
