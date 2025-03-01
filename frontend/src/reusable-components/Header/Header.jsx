import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Header.module.css";
import { FaBars } from "react-icons/fa";

function Header({ className }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <nav className={`${className}`}>
        <div className={styles.navList}>
          <div className={styles.navLeft}>
            <ul className={styles.navLeftList}>
              <li>JKUAT CATCOM</li>
              <li>
                <NavLink to="/" className={styles.link}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/liturgy" className={styles.link}>
                  Liturgy
                </NavLink>
              </li>
              <li>
                <NavLink to="/community" className={styles.link}>
                  Community
                </NavLink>
              </li>
            </ul>
          </div>

          <div className={styles.logo}>
            <img
              src="/others/ctm_logo.png"
              alt="CATCOM Logo"
              className={styles.catcomLogo}
            />
          </div>

          <div className={styles.navRight}>
            <ul className={styles.navRightList}>
              <li>
                <NavLink to="/about" className={styles.link}>
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/media" className={styles.link}>
                  Media
                </NavLink>
              </li>
              <li>
                <NavLink to="/join-scc" className={styles.link}>
                  Join SCC
                </NavLink>
              </li>
            </ul>

            <FaBars className={styles.burger} onClick={toggleMenu} />
          </div>

          {/* Mobile Menu */}
          <div
            className={`${styles.mobileMenu} ${
              isOpen ? styles.show : styles.hide
            }`}
          >
            <ul className={styles.mobileNavList}>
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
                <NavLink to="/about">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/media">Media</NavLink>
              </li>
              <li>
                <NavLink to="/join-scc">Join SCC</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
